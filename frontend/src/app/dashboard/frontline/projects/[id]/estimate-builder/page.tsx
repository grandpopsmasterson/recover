'use client'

import { SearchIcon } from '@/components/ui/icons/SearchIcon';
import { Button } from '@heroui/button';
import { Autocomplete, AutocompleteItem, AutocompleteSection, Divider } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface Marker {
    id: number;
    position: { x: number; y: number };
    details: {
        id: string;
        category: string;
        name: string;
        description: string;
        dimensions: string;
        unit: string;
        price: number;
        availability: string;
    };
}

interface Position {
    x: number;
    y: number;
}

interface Boundaries {
    maxX: number;
    maxY: number;
}

export default function EstimateBuilder() {
    // Zoom and drag state
    const [isZoomed, setIsZoomed] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
    const [boundaries, setBoundaries] = useState<Boundaries>({ maxX: 0, maxY: 0 });
    const [mouseDownStartX, setMouseDownStartX] = useState<number | null>(null);
    const [mouseDownStartY, setMouseDownStartY] = useState<number | null>(null);
    
    // Marker state
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [selectedMarkerId, setSelectedMarkerId] = useState<number[] | null>(null);
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const [clickPosition, setClickPosition] = useState<Position>({ x: 0, y: 0 });
    const [editingMarkerId, setEditingMarkerId] = useState<number | null>(null);

    //Search Materials State
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [materials, setMaterials] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [isloading, setIsLoading] = useState(false); // No need for the actual use of loading yet
    const [error, setError] = useState<string | null>(null); // Same for errors -- will come in good time

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const optionsRef = useRef<HTMLDivElement | null>(null);
    const anchorRef = useRef<HTMLDivElement | null>(null);
    
    // Materials logic
    useEffect(() => {
        const fetchMaterials = async () => {
            try{
                setIsLoading(true);
                const response = await fetch('/prices.json');
                if (!response.ok) {
                    throw new Error (`HTTP error! Status: ${response.status}`);
                }
                const text = await response.text();
                console.log('Raw response: ', text);
                if (text.trim()) {
                    const data = JSON.parse(text);
                    console.log('parsed ---',data)
                }
                const data = JSON.parse(text);
                console.log(response)

                if (data.materials && Array.isArray(data.materials)) {
                    setMaterials(data.materials);
                } else if (Array.isArray(data)) {
                    setMaterials(data);
                } else {
                    console.error('unexpected data format: ', data);
                    setError('Invalid data format in the JSON file');
                }
                setIsLoading(false);
            } catch (err) {
                setError('Failed to load the materials data');
                setIsLoading(false);
                console.error('Error loading materials', err);
            }
        } ;
        fetchMaterials();
    }, []);

    //Marker Grouping Logic
    const groupedMarkers = markers.reduce((acc, marker) => {
        const materialId = marker.details.id;
        if (!acc[materialId]) {
            acc[materialId] = { material: marker.details, count: 0, markers: [] };
        }
        acc[materialId].count += 1;
        acc[materialId].markers.push(marker);
        return acc;
    }, {} as Record<string, { material: Marker["details"]; count: number; markers: Marker[] }>);
    
    // Image variables 
    const panorama = '/default_panorama.jpg';
    const zoomScale = 2; // Define zoom scale as a constant

    // Calculate boundaries for dragging when zoomed
    useEffect(() => {
        if (isZoomed && containerRef.current && imageRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        
        // Set the boundaries for dragging when zoomed
        const maxX = containerWidth / 2;
        const maxY = containerHeight / 2;
        
        setBoundaries({ maxX, maxY });
        }
    }, [isZoomed]);

    // Toggle zoom while preserving marker positions
    const toggleZoom = (): void => {
        setIsZoomed(!isZoomed);
        setPosition({ x: 0, y: 0 });
        setIsOptionsOpen(false);
    };

    // Handle mouse down for dragging
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (!isZoomed) return;

        if (optionsRef.current && optionsRef.current.contains(e.target as Node)) {
            return;
        }

        // if (anchorRef.current && anchorRef.current.contains(e.target as Node)) {
        //     handleEditMarker()
        // } //TODO REFERENCE OLD CODE TO MAKE THIS WORK ON CLICKING ANCHOR OPEN THE EDIT MENU

        if (isOptionsOpen) {
            setIsOptionsOpen(false);
            setEditingMarkerId(null); 
            //return; //? removed return -- allows users to drag from an open menu state
        }
        
        // Close any open menus
        setIsOptionsOpen(false);
        setEditingMarkerId(null);

        //set the starting mouse position
        setMouseDownStartX(e.clientX);
        setMouseDownStartY(e.clientY);
        
        // Set initial drag position
        setIsDragging(true);
        setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
        });
    };

    // Handle mouse move for dragging
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (!isDragging) return;
        
        // Calculate new position within boundaries
        let newX = e.clientX - dragStart.x;
        let newY = e.clientY - dragStart.y;
        
        // Constrain to boundaries
        newX = Math.max(Math.min(newX, boundaries.maxX), -boundaries.maxX);
        newY = Math.max(Math.min(newY, boundaries.maxY), -boundaries.maxY);
        
        setPosition({ x: newX, y: newY });
    };
    
    // Handle mouse up to end dragging
    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>): void => {
        
        setIsDragging(false);

        if (isOptionsOpen && optionsRef.current && optionsRef.current.contains(e.target as Node)) {
            return;
        }

        if (mouseDownStartX !== null && mouseDownStartY !== null && isZoomed) {
            const deltaX = Math.abs(e.clientX - mouseDownStartX);
            const deltaY = Math.abs(e.clientY - mouseDownStartY);

            if (deltaX < 8 && deltaY < 8) {
                handlePanoramaClick(e);
            }
        }
        setMouseDownStartX(null);
        setMouseDownStartY(null);
    };
    
    // Convert screen coordinates to image coordinates
    const screenToImageCoords = (screenX: number, screenY: number): Position => {
        if (!containerRef.current) return { x: 0, y: 0 };
        
        const rect = containerRef.current.getBoundingClientRect();
        
        // Get position relative to container
        let relativeX = screenX - rect.left;
        let relativeY = screenY - rect.top;
        
        if (isZoomed) {
        // Calculate actual image coordinates when zoomed
        // First get coordinates relative to center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Adjust for current pan position
        const adjustedX = relativeX - centerX - position.x;
        const adjustedY = relativeY - centerY - position.y;
        
        // Scale back to original image coordinates
        const scaledX = adjustedX / zoomScale + centerX;
        const scaledY = adjustedY / zoomScale + centerY;
        
        relativeX = scaledX;
        relativeY = scaledY;
        }
        
        // Convert to percentages
        const percentX = (relativeX / rect.width) * 100;
        const percentY = (relativeY / rect.height) * 100;
        
        return { x: percentX, y: percentY };
    };
    
    // Handle click to place a marker
    const handlePanoramaClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        // Only allow placing markers when zoomed
        if (!isZoomed) return;
        
        // If a marker is currently being edited, close the edit menu
        if (editingMarkerId !== null) {
        setEditingMarkerId(null);
        return;
        }
        
        // Set click position for the options menu (in screen coordinates)
        setClickPosition({ 
        x: e.clientX,
        y: e.clientY
        });
        
        // Show options menu
        setIsOptionsOpen(true);
    };

    // Add a new marker when an option is selected
    const handleOptionsSelect = (option: string): void => {
        //? console.log(option)
        const selectedMaterial = typeof option === 'string'
            ? materials.find(material => material.id === option)
            : option

        if (!selectedMaterial) {
            console.error('Invalid selection or material not found');
            setIsOptionsOpen(false);
            return;
        }

        // If we're editing an existing marker
        if (editingMarkerId !== null) {
        const updatedMarkers = markers.map(marker => 
            marker.id === editingMarkerId 
            ? { ...marker, details: selectedMaterial }
            : marker
        );
        setMarkers(updatedMarkers);
        setEditingMarkerId(null);
        } else {
        // Creating a new marker
        // Convert screen position to image coordinates
        const imgCoords = screenToImageCoords(clickPosition.x, clickPosition.y);
        
        const newMarker: Marker = {
            id: Date.now(),
            position: imgCoords,
            details: selectedMaterial,
        };
        
        setMarkers([...markers, newMarker]);
        }
        setInputValue('');
        setIsOptionsOpen(false);
    };
    
    // Remove a marker
    const handleRemoveMarker = (id: number, event?: React.MouseEvent): void => {
        if (event) {
        event.stopPropagation(); // Prevent opening the options menu
        }
        const updatedMarkers = markers.filter(marker => marker.id !== id);
        setMarkers(updatedMarkers);
        
        // Close any open edit menu
        setEditingMarkerId(null);
    };
    
    // Open edit menu for a marker
    const handleEditMarker = (id: number, screenX: number, screenY: number, event?: React.MouseEvent): void => {
        if (event) {
        event.stopPropagation(); // Prevent opening the options menu
        }
        setEditingMarkerId(id);
        setClickPosition({ x: screenX, y: screenY });
        setIsOptionsOpen(true);
    };

    return (
        <div className='flex h-full overflow-hidden p-4 gap-4'>
        {/* Left panel: Panorama viewer */}
        <div className='w-1/2 relative flex flex-col overflow-auto'>
            {/* Zoom toggle button */}
            <Button
            onPress={toggleZoom}
            className='mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
            >
            {isZoomed ? 'Zoom out' : 'Zoom in'}
            </Button>
            
            {/* Panorama container */}
            <div 
            ref={containerRef}
            className={`relative flex-1 overflow-hidden bg-gray-100 border-2 border-gray-400 rounded-lg
                ${isDragging ? 'cursor-grabbing' : isZoomed ? 'cursor-grab' : 'cursor-default'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            >
            {/* Image with zoom and drag transformation */}
            <div
                ref={imageContainerRef}
                style={{
                transform: isZoomed 
                    ? `scale(${zoomScale}) translate(${position.x / zoomScale}px, ${position.y / zoomScale}px)` 
                    : 'scale(1)',
                transition: isDragging ? 'none' : 'transform 200ms ease-out',
                transformOrigin: 'center center',
                width: '100%',
                height: '100%',
                position: 'relative'
                }}
            >
                <Image
                ref={imageRef}
                src={panorama}
                alt='Panorama'
                fill
                style={{ objectFit: 'cover' }}
                className='pointer-events-none'
                priority
                />
            
                {/* Markers rendered directly on the image */}
                {markers.map((marker) => (
                <div
                    key={marker.id}
                    ref={anchorRef}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 
                    z-10 group ${selectedMarkerId?.includes(marker.id) ? 'z-20' : ''}`}
                    style={{
                    left: `${marker.position.x}%`,
                    top: `${marker.position.y}%`,
                    }}
                    onMouseEnter={() => setSelectedMarkerId([marker.id])}
                    onMouseLeave={() => setSelectedMarkerId(null)}
                >
                    {/* Marker dot */}
                    <div 
                    className={`w-3 h-3 bg-red-500 rounded-full relative
                        ${selectedMarkerId?.includes(marker.id) ? 'ring-2 ring-white scale-125' : ''}`}
                    />
                </div>
                ))}
            </div>
            
            {/* Options menu - rendered relative to the viewport */}
            <AnimatePresence >
                {isOptionsOpen && (
                <motion.div
                ref={optionsRef}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className='fixed bg-white rounded-md shadow-lg p-4 z-30'
                    style={{
                    left: `${clickPosition.x}px`,
                    top: `${clickPosition.y}px`,
                    transform: 'translate(10px, 10px)', // Position to bottom right of cursor
                    }}
                    onClick={(e) => {e.stopPropagation(); e.nativeEvent.stopImmediatePropagation();}}
                >
                    <div className='space-y-2'>
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium">
                        {editingMarkerId !== null ? 'Change marker type' : 'Add marker'}
                        </h3>
                    </div>
                    
                    <Autocomplete
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onSelectionChange={(value: any) => {
                                handleOptionsSelect(value);
                                setInputValue('');
                        }}
                        inputValue={inputValue}
                        onInputChange={(value) => setInputValue(value)}
                        aria-label="Select a material"
                        className='p-4 '
                        classNames={{
                            base: "max-w-xs",
                            listboxWrapper: "max-h-[320px] bg-white",
                            selectorButton: "text-default-500",
                        }}
                        inputProps={{
                            classNames: {
                                input: "ml-1",
                                inputWrapper: "h-[48px]",
                            },
                            onMouseDown: (e: React.MouseEvent) => {
                                e.stopPropagation();
                            },
                            onClick: (e: React.MouseEvent) => {
                                e.stopPropagation();
                            },
                        }}
                        listboxProps={{
                            hideSelectedIcon: true,
                            itemClasses: {
                                base: [
                                    "rounded-medium",
                                    "bg-white",
                                    'shadow-md',
                                    "text-black",
                                    "transition-opacity",
                                    "data-[hover=true]:text-purple-500",
                                    "dark:data-[hover=true]:bg-default-50",
                                    "data-[pressed=true]:opacity-70",
                                    "data-[hover=true]:bg-default-200",
                                    "data-[selectable=true]:focus:bg-default-100",
                                    "data-[focus-visible=true]:ring-default-500",
                                ],
                            },
                            onClick: (e: React.MouseEvent) => {
                                e.stopPropagation();
                            },
                            onMouseDown: (e: React.MouseEvent) => {
                                e.stopPropagation();
                            },
                        }}
                        placeholder="Enter filters"
                        popoverProps={{
                            offset: 10,
                            classNames: {
                                base: "rounded-large",
                                content: "p-1 border-2 border-black bg-white",
                            },
                            onClick: (e: React.MouseEvent) => {
                                e.stopPropagation();
                            },
                            onMouseDown: (e: React.MouseEvent) => {
                                e.stopPropagation();
                            },
                        }}
                        radius="full"
                        startContent={<SearchIcon className="text-default-400" size={20} strokeWidth={2.5} />}
                        variant="bordered"
                    >
                        <AutocompleteSection>
                        {materials
                            .map((item) => (
                                <AutocompleteItem 
                                    key={item.id} 
                                    textValue={item.name}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 items-center">
                                            <div className="flex flex-col">
                                                <span className="text-small">{item.name}</span>
                                                <div className='flex'>
                                                    <span className="text-xs">{item.category}</span>
                                                    <Divider orientation='vertical'/>
                                                    <span className="text-xs">${item.price}/{item.unit}</span>
                                                </div>
                                                <div>
                                                    <span className="text-xs">{item.description}</span>
                                                    <span className="text-xs">{item.availability}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AutocompleteItem>
                            ))}
                    </AutocompleteSection>
                    </Autocomplete>
                    
                    {editingMarkerId !== null && (
                        <Button
                        onPress={() => {
                            handleRemoveMarker(editingMarkerId);
                            setIsOptionsOpen(false);
                        }}
                        className='block w-full text-left px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md mt-4'
                        >
                        Remove marker
                        </Button>
                    )}
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
            </div>
        </div>

        {/* Right panel: Marker details */}
        <div className='w-1/2 space-y-4 overflow-hidden flex flex-col'>
        <div className="h-full overflow-y-auto max-h-[80vh] space-y-4 p-4 border rounded-md">
        {Object.values(groupedMarkers).length === 0 ? (
        <div className='p-4 text-gray-500 text-center border rounded-md'>
            No markers added yet. Zoom in and click on the image to add markers.
        </div>
    ) : (
        Object.values(groupedMarkers).map(({ material, count, markers }) => (
            <div
                key={material.id}
                className='p-4 border rounded-md transition-shadow hover:shadow-md'
                onMouseEnter={() => setSelectedMarkerId(markers.map(m => m.id))}
                onMouseLeave={() => setSelectedMarkerId(null)}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className='font-bold'>{material.name}</h3>
                        <p className='text-gray-600'>{material.description}</p>
                        <p className='text-gray-500 text-sm'>{count !== 0 ? `Amount: ${count}` : ''}</p>
                        <p className='text-gray-500 text-sm'>Cost: ${count * material.price}</p>
                    </div>
                    <div className="flex space-x-1">
                        <button
                            onClick={() => markers.forEach(m => handleRemoveMarker(m.id))}
                            className="p-1 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded"
                            title="Remove all markers with this material"
                        >
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        ))
    )}
        </div>
        </div>
        </div>
    );
}
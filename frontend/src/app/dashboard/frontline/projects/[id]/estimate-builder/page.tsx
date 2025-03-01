'use client'

import { Button } from '@heroui/button';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface Marker {
    id: number;
    position: { x: number; y: number };
    details: {
        id: number;
        title: string;
        description: string;
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
    
    // Marker state
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const [clickPosition, setClickPosition] = useState<Position>({ x: 0, y: 0 });

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    
    // Example marker options
    const options = [
        { id: 1, title: 'Event 1', description: 'Description for Event 1' },
        { id: 2, title: 'Event 2', description: 'Description for Event 2' },
        { id: 3, title: 'Event 3', description: 'Description for Event 3' },
    ];

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
        
        // Close any open menus
        setIsOptionsOpen(false);
        setEditingMarkerId(null);
        
        // Set initial drag position
        setIsDragging(true);
        setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
        });
        
        // Save start position for distance calculation
        setDragStartPos({
        x: e.clientX,
        y: e.clientY
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
        
        // Calculate distance moved for drag detection
        const dx = e.clientX - dragStartPos.x;
        const dy = e.clientY - dragStartPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        setDragDistance(distance);
    };

    // Track distance moved for click vs drag detection
    const [dragDistance, setDragDistance] = useState<number>(0);
    const [dragStartPos, setDragStartPos] = useState<Position>({ x: 0, y: 0 });
    
    // Handle mouse up to end dragging
    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>): void => {
        const wasDragging = isDragging;
        setIsDragging(false);
        
        // Only trigger click if we didn't drag much (less than 5px)
        if (isZoomed && dragDistance < 5 && wasDragging === false) {
        // This was a click, not a drag
        handlePanoramaClick(e);
        }
        
        // Reset drag distance
        setDragDistance(0);
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
    
    // State for marker editing
    const [editingMarkerId, setEditingMarkerId] = useState<number | null>(null);
    
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
    const handleOptionsSelect = (option: typeof options[0]): void => {
        // If we're editing an existing marker
        if (editingMarkerId !== null) {
        const updatedMarkers = markers.map(marker => 
            marker.id === editingMarkerId 
            ? { ...marker, details: option }
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
            details: option,
        };
        
        setMarkers([...markers, newMarker]);
        }
        
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
            onClick={handlePanoramaClick}
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
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 
                    z-10 group ${selectedMarkerId === marker.id ? 'z-20' : ''}`}
                    style={{
                    left: `${marker.position.x}%`,
                    top: `${marker.position.y}%`,
                    }}
                    onMouseEnter={() => setSelectedMarkerId(marker.id)}
                    onMouseLeave={() => setSelectedMarkerId(null)}
                >
                    {/* Marker dot */}
                    <div 
                    className={`w-3 h-3 bg-red-500 rounded-full relative
                        ${selectedMarkerId === marker.id ? 'ring-2 ring-white scale-125' : ''}`}
                    />
                </div>
                ))}
            </div>
            
            {/* Options menu - rendered relative to the viewport */}
            <AnimatePresence>
                {isOptionsOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className='fixed bg-white rounded-md shadow-lg p-4 z-30'
                    style={{
                    left: `${clickPosition.x}px`,
                    top: `${clickPosition.y}px`,
                    transform: 'translate(10px, 10px)', // Position to bottom right of cursor
                    }}
                >
                    <div className='space-y-2'>
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium">
                        {editingMarkerId !== null ? 'Change marker type' : 'Add marker'}
                        </h3>
                    </div>
                    
                    {options.map((option) => (
                        <Button
                        key={option.id}
                        onPress={() => handleOptionsSelect(option)}
                        className='block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md'
                        >
                        {option.title}
                        </Button>
                    ))}
                    
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
        <div className='w-1/2 space-y-4 overflow-y-auto'>
            {markers.length === 0 ? (
            <div className='p-4 text-gray-500 text-center border rounded-md'>
                No markers added yet. Zoom in and click on the image to add markers.
            </div>
            ) : (
            markers.map((marker) => (
                            <div
                key={marker.id}
                className={`p-4 border rounded-md transition-shadow ${
                    selectedMarkerId === marker.id ? 'shadow-lg border-blue-500' : 'hover:shadow-md'
                }`}
                onMouseEnter={() => setSelectedMarkerId(marker.id)}
                onMouseLeave={() => setSelectedMarkerId(null)}
                >
                <div className="flex justify-between items-start">
                    <div>
                    <h3 className='font-bold'>{marker.details.title}</h3>
                    <p className='text-gray-600'>{marker.details.description}</p>
                    </div>
                    <div className="flex space-x-1">
                    <button
                        onClick={() => {
                        if (!containerRef.current) return;
                        const rect = containerRef.current.getBoundingClientRect();
                        
                        // Position the edit menu near the details panel
                        handleEditMarker(
                            marker.id, 
                            rect.right + 600, 
                            window.scrollY + rect.top
                        );
                        }}
                        className="p-1 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded"
                        title="Edit marker"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => handleRemoveMarker(marker.id)}
                        className="p-1 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded"
                        title="Remove marker"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    </div>
                </div>
                <div className="mt-2 text-xs text-gray-400 flex items-center">
                    {/* <span>Position: {marker.position.x.toFixed(1)}%, {marker.position.y.toFixed(1)}%</span> */}
                </div>
                </div>
            ))
            )}
        </div>
        </div>
    );
}
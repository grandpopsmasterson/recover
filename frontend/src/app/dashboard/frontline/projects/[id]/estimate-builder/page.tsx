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

export default function EstimateBuilder() {
    const [isZoomed, setIsZoomed] = useState<boolean>(false);
    const [dragPosition, setDragPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const [clickPosition, setClickPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const constraintsRef = useRef<HTMLDivElement>(null);

    const options = [
        { id: 1, title: 'Event 1', description: 'Description for Event 1' },
        { id: 2, title: 'Event 2', description: 'Description for Event 2' },
        { id: 3, title: 'Event 3', description: 'Description for Event 3' },
    ];

    useEffect(() => {
        if (!isZoomed) {
            setDragPosition({ x: 0, y: 0 });
        }
    }, [isZoomed]);

    const handlePanoramaClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const newX = ((e.clientX - rect.left) / rect.width) * 100;
        const newY = ((e.clientY - rect.top) / rect.height) * 100;

        setClickPosition({ x: newX, y: newY });
        setIsOptionsOpen(true);
    };

    const handleOptionsSelect = (option: typeof options[0]) => {
        const newMarker: Marker = {
            id: Date.now(),
            position: clickPosition,
            details: option,
        };

        setMarkers([...markers, newMarker]);
        setIsOptionsOpen(false);
    };

    const handleZoomToggle = () => {
        setIsZoomed(!isZoomed);
    };

    const panorama = '/default_panorama.jpg';

    return (
        <div className='flex h-screen p-4 gap-4'>
            <div className='w-1/2 relative flex flex-col'>
                <Button
                    onPress={handleZoomToggle}
                    className='mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                >
                    {isZoomed ? 'Zoom out' : 'Zoom in'}
                </Button>

                <div ref={constraintsRef} className='relative flex-1 overflow-hidden bg-gray-100'>
                <motion.div
            ref={constraintsRef}
            layout
            className='relative w-full h-full cursor-grab active:cursor-grabbing'
            animate={{ 
                x: dragPosition.x, 
                y: dragPosition.y,
                scale: isZoomed ? 2 : 1 
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                layout: { duration: 0.3 },
            }}
            drag={isZoomed}
            dragConstraints={constraintsRef}
            dragElastic={0.5}
            dragMomentum={false}
            onDragEnd={(event, info) => {
                // Update the drag position by adding the delta
                setDragPosition(prev => ({
                    x: prev.x + info.delta.x,
                    y: prev.y + info.delta.y
                }));
            }}
            onClick={handlePanoramaClick}
        >
            <Image
                src={panorama}
                alt='Panorama'
                fill
                style={{ objectFit: 'cover' }}
                className='pointer-events-none'
                priority
            />
            {markers.map((marker) => (
                <div
                    key={marker.id}
                    className={`absolute w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 
                        ${selectedMarkerId === marker.id ? 'ring-2 ring-white' : ''
                        }`}
                    style={{
                        left: `${marker.position.x}%`,
                        top: `${marker.position.y}%`,
                    }}
                />
            ))}
        </motion.div>




                </div>

                <AnimatePresence>
                    {isOptionsOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className='absolute bg-white rounded-md shadow-lg p-4 z-10'
                            style={{
                                left: `${clickPosition.x}%`,
                                top: `${clickPosition.y}%`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <div className='space-y-2'>
                                {options.map((option) => (
                                    <Button
                                        key={option.id}
                                        onPress={() => handleOptionsSelect(option)}
                                        className='block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md'
                                    >
                                        {option.title}
                                    </Button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className='w-1/2 space-y-4 overflow-y-auto'>
                {markers.map((marker) => (
                    <div
                        key={marker.id}
                        className='p-4 border rounded-md hover:shadow-lg transition-shadow'
                        onMouseEnter={() => setSelectedMarkerId(marker.id)}
                        onMouseLeave={() => setSelectedMarkerId(null)}
                    >
                        <h3 className='font-bold'>{marker.details.title}</h3>
                        <p className='text-gray-600'>{marker.details.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
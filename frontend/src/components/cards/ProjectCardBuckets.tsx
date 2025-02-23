'use client'

import {  GroupedProjects } from '@/types/project';
import ProjectCard from '@/components/cards/ProjectCard';
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectCardBuckets = ({groupKey, projects, count}: GroupedProjects) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(false);

    // Check if scroll buttons should be shown
    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftScroll(scrollLeft > 0);
            setShowRightScroll(scrollLeft < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [projects]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(checkScroll, 300);
        }
    };

    return (
        <div className="relative w-full">
            {/* Header */}
            <h1 className="text-black mb-4 px-4">{groupKey} <small>{count}</small></h1>
            
            {/* Scroll Container */}
            <div className="relative group">
                {/* Left Scroll Button */}
                {showLeftScroll && (
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-r-lg p-2"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                )}

                {/* Cards Container */}
                <div 
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-4 px-4 pb-4 scroll-smooth no-scrollbar"
                    onScroll={checkScroll}
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {projects.map((project) => (
                        <div key={project.id} className="flex-none w-[280px]">
                            <ProjectCard {...project} />
                        </div>
                    ))}
                </div>

                {/* Right Scroll Button */}
                {showRightScroll && (
                    <button 
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-l-lg p-2"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProjectCardBuckets;
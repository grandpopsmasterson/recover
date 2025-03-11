'use client'

import { GroupedProjects } from '@/types/project';
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
            // Force-show left scroll button if we've scrolled at all
            setShowLeftScroll(scrollLeft > 0);
            setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 5); // Adding a buffer
        }
    };

    // Ensure we check for scrollability on mount and whenever projects change
    useEffect(() => {
        // Initial check
        const initialCheck = () => {
            if (scrollContainerRef.current) {
                const { scrollWidth, clientWidth } = scrollContainerRef.current;
                // Check if content is wider than container (scrollable)
                setShowRightScroll(scrollWidth > clientWidth);
            }
        };
        
        initialCheck();
        
        // Add a slight delay to ensure accurate measurements after render
        const timer = setTimeout(() => {
            initialCheck();
        }, 100);
        
        return () => clearTimeout(timer);
    }, [projects]);
    
    // Set up scroll event listeners
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            // Use the passive option for better performance
            container.addEventListener('scroll', checkScroll, { passive: true });
            
            // Also check on window resize
            window.addEventListener('resize', checkScroll);
        }
        
        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScroll);
            }
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
            const currentScrollLeft = scrollContainerRef.current.scrollLeft;
            
            // For right scroll, immediately show left button before animation starts
            if (direction === 'right') {
                setShowLeftScroll(true);
            }
            
            // Apply the scroll
            scrollContainerRef.current.scrollTo({
                left: direction === 'left' 
                    ? Math.max(0, currentScrollLeft - scrollAmount) 
                    : currentScrollLeft + scrollAmount,
                behavior: 'smooth'
            });
            
            // Safety check - update buttons after animation completes
            setTimeout(checkScroll, 400);
        }
    };

    return (
        <div className="relative w-full">
            {/* Header */}
            <h1 className="text-black mb-4 px-4">{groupKey} <small>{count}</small></h1>
            
            {/* Scroll Container */}
            <div className="relative group">
                {/* Left Scroll Button - Always render but control visibility with opacity and pointer-events */}
                <button 
                    onClick={() => scroll('left')}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-r-lg p-2 transition-opacity duration-200 ${
                        showLeftScroll ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    aria-label="Scroll left"
                    aria-hidden={!showLeftScroll}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Cards Container */}
                <div 
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-4 px-4 pb-4 scroll-smooth no-scrollbar"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                    onScroll={checkScroll}
                >
                    {projects.map((project) => (
                        <div key={project.id} className="flex-none w-[280px]">
                            <ProjectCard {...project} />
                        </div>
                    ))}
                </div>

                {/* Right Scroll Button - Always render but control visibility with opacity and pointer-events */}
                <button 
                    onClick={() => scroll('right')}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-l-lg p-2 transition-opacity duration-200 ${
                        showRightScroll ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                    aria-label="Scroll right"
                    aria-hidden={!showRightScroll}
                >
                    <ChevronRight className="w-6 h-6"/>
                </button>
            </div>
        </div>
    );
};

export default ProjectCardBuckets;
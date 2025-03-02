'use client'

import React, { useEffect, useState } from 'react'
import FilterComponent from '@/components/filters/FilterComponent'
import ProjectCardBuckets from '@/components/cards/ProjectCardBuckets'
import { FilterError, GroupedProjects, ShortProject, filters } from '@/types/project'
import { filterApi } from '@/api/features/filterApi'
import ListView from '@/components/ui/ListView'
import { projectsApi } from '@/api/features/projectsApi'
import { useFilterPersistence } from '@/hooks/filters/useFilterPersistence'
import ProjectGroupCard from '@/components/cards/ProjectGroupCard'

const Ridgeline = () => {
    // State management
    const [displayType, setDisplayType] = useState<'ListCard'|'List'|'Card'>('ListCard');
    const [projects, setProjects] = useState<ShortProject[]>([]);
    const [groupedProjects, setGroupedProjects] = useState<GroupedProjects[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    // Filter management
    const { selectedFilters, setSelectedFilters, isInitialized } = useFilterPersistence();
    const [pendingSelection, setPendingSelection] = useState<string | null>(null);
    const [pendingRemoval, setPendingRemoval] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    // Fetch projects based on filters
    const fetchProjects = async (filterList: string[]) => {
        setIsLoading(true);
        setError(null);
        
        try {
            // Case 1: No filters selected
            if (filterList.length === 0) {
                const data = await projectsApi.getAllProjects(); 
                setProjects(data);
                setDisplayType('List');
                return;
            }
            
            // Case 2: Determine if we should group or just search
            const hasGroupFilter = filterList.some(f => 
                filters.find(ff => ff.name === f)?.group === 'Group'
            );
            
            if (hasGroupFilter) {
                // Group the projects
                const data = await filterApi.group(filterList);
                
                // Transform the data to match expected format
                const formattedGroups = Object.entries(data).map(([key, value]) => ({
                    groupKey: key,
                    count: value.count,
                    projects: value.projects
                }));
                
                setGroupedProjects(formattedGroups);
                setDisplayType('ListCard');
            } else {
                // Search with filters
                const data = await filterApi.search(filterList);
                setProjects(data);
                setDisplayType('List');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
            console.error('Error fetching projects:', error);
        } finally {
            setIsLoading(false);
        }
    }

    // Fetch projects when filters change (with debounce)
    useEffect(() => {
        if (!isInitialized) return;
        
        const debounceTimeout = setTimeout(() => {
            fetchProjects(selectedFilters);
        }, 300);
        
        return () => clearTimeout(debounceTimeout);
    }, [selectedFilters, isInitialized]);

    // Handle pending filter selection
    useEffect(() => {
        if (pendingSelection && !selectedFilters.includes(pendingSelection)) {
            setSelectedFilters([...selectedFilters, pendingSelection]);
            setInputValue('');
            setPendingSelection(null);
        }
    }, [pendingSelection, selectedFilters, setSelectedFilters]);

    // Show loading state while initializing
    if (!isInitialized) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto space-y-4 px-4 py-8">
            {/* Filter section */}
            <div className="flex justify-between w-full rounded-br-lg">
                <FilterComponent 
                    setDisplayType={setDisplayType} 
                    selectedFilters={selectedFilters} 
                    setSelectedFilters={setSelectedFilters} 
                    pendingRemoval={pendingRemoval}
                    setPendingRemoval={setPendingRemoval}
                    setPendingSelection={setPendingSelection}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                />
            </div>
            
            {/* Error message */}
            {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            
            {/* Loading indicator */}
            {isLoading ? (
                <div className="flex justify-center p-8">
                    <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
            ) : (
                /* Project display section */
                <div className='space-y-4'>
                    {displayType === 'ListCard' && groupedProjects.map((group) => (
                        <ProjectGroupCard 
                            key={group.groupKey} 
                            name={group.groupKey} 
                            total={group.count} 
                            redTotal={4} 
                            yellowTotal={18} 
                            greenTotal={19} 
                            revenue={68354} 
                        />
                    ))}
                    {displayType === 'Card' && groupedProjects.map((group) => (
                        <ProjectCardBuckets 
                            key={group.groupKey} 
                            projects={group.projects} 
                            groupKey={group.groupKey} 
                            count={group.count} 
                        />
                    ))}
                    {displayType === 'List' && (
                        <ListView 
                            key={'list'} 
                            groupKey={'key'} 
                            count={projects.length} 
                            projects={projects} 
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default Ridgeline;

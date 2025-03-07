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
    // State 
    const [displayType, setDisplayType] = useState<'ListCard'|'List'|'Card'>('ListCard');
    const [projects, setProjects] = useState<ShortProject[]>([]);
    const [groupedProjects, setGroupedProjects] = useState<GroupedProjects[]>([]);
    const [isTokenReady, setIsTokenReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    
    // Filters
    const { selectedFilters, setSelectedFilters, isInitialized } = useFilterPersistence();
    const [pendingSelection, setPendingSelection] = useState<string | null>(null);
    const [pendingRemoval, setPendingRemoval] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    
    useEffect(() => {
        // Token readiness check
        const checkTokenReady = () => {
            const token = localStorage.getItem('token');
            console.group('Token Readiness Check');
            console.log('Token present:', !!token);
            console.log('Token length:', token ? token.length : 0);
            setIsTokenReady(!!token);
            console.groupEnd();
        };
    
        // Initial token check
        checkTokenReady();
    
        // Listen for storage changes
        const handleStorageChange = (e: StorageEvent) => {
            console.group('Storage Event');
            console.log('Event key:', e.key);
            console.log('New value:', e.newValue);
            console.log('Old value:', e.oldValue);
            
            if (e.key === 'token') {
                checkTokenReady();
            }
            console.groupEnd();
        };
    
        window.addEventListener('storage', handleStorageChange);
    
        // Fetch projects when conditions are met
        if (isInitialized && isTokenReady) {
            console.group('Project Fetch Conditions');
            console.log('Initialized:', isInitialized);
            console.log('Token Ready:', isTokenReady);
            console.log('Selected Filters:', selectedFilters);
    
            const debounceTimeout = setTimeout(() => {
                console.log('Initiating fetch projects');
                fetchProjects(selectedFilters);
            }, 300);
    
            // Cleanup function
            return () => {
                clearTimeout(debounceTimeout);
                window.removeEventListener('storage', handleStorageChange);
                console.log('Cleanup: Debounce timeout cleared');
                console.groupEnd();
            };
        }
    
        // Cleanup for storage listener if conditions aren't met
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            console.log('Cleanup: Storage listener removed');
        };
    }, [isInitialized, isTokenReady, selectedFilters]);

    
    useEffect(() => {
        if (pendingSelection && !selectedFilters.includes(pendingSelection)) {
            setSelectedFilters([...selectedFilters, pendingSelection]);
            setInputValue('');
            setPendingSelection(null);
        }
    }, [pendingSelection, selectedFilters, setSelectedFilters]);


    const fetchProjects = async (filterList: string[]) => {
        setIsLoading(true);
        setError(null);
        
        try {
            if (filterList.length === 0) {
                const data = await projectsApi.getAllProjects(); 
                setProjects(data);
                setDisplayType('List');
                return;
            }
            const hasGroupFilter = filterList.some(f => 
                filters.find(ff => ff.name === f)?.group === 'Group'
            );
            
            if (hasGroupFilter) {
                const groupedData = await filterApi.group(filterList);
                const formattedGroups = Object.entries(groupedData).map(([key, value]) => ({
                    groupKey: key,
                    count: value.count,
                    projects: value.projects
                }));
                
                setGroupedProjects(formattedGroups);
                setDisplayType('ListCard');
            } else {
                // Regular search with filters
                const data = await filterApi.search(filterList);
                setProjects(data);
                setDisplayType('List');
            }
        } catch (err) {
            console.error('Error fetching projects:', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isInitialized || !isTokenReady) {
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

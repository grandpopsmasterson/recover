'use client'

import React, { useEffect, useState } from 'react'
import FilterComponent from '@/components/filters/FilterComponent'
import ProjectCardBuckets from '@/components/cards/ProjectCardBuckets'
import { FilterError, filters } from '@/types/project'
import ListView from '@/components/ui/ListView'
import { useFilterPersistence } from '@/hooks/filters/useFilterPersistence'
import ProjectGroupCard from '@/components/cards/ProjectGroupCard'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { fetchProjectsThunk } from '@/store/thunk/projectThunk'
import { getGroupedProjectsThunk, getMultiQueryThunk } from '@/store/thunk/groupedProjectThunk'

const Ridgeline = () => {

    
    // State 
    const [displayType, setDisplayType] = useState<'ListCard'|'List'|'Card'>('ListCard');
    const { selectedFilters, setSelectedFilters, isInitialized } = useFilterPersistence();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<FilterError|string|null>(null);
    const [pendingSelection, setPendingSelection] = useState<string | null>(null);
    const [pendingRemoval, setPendingRemoval] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    // Pulling from global store
    const projects = useAppSelector(state => state.projects.projects);
    const groupedProjects = useAppSelector(state => state.projects.groupedProject.groupedProjects);
    const isStoreLoading = useAppSelector(state => 
        state.projects.loading || state.projects.groupedProject.loading
    );
    const storeError = useAppSelector(state => 
        state.projects.error || state.projects.groupedProject.error
    );
    const dispatch = useAppDispatch();

    // Update local loading/error state from store
    useEffect(() => {
        setIsLoading(isStoreLoading);
    }, [isStoreLoading]);

    useEffect(() => {
        setError(storeError);
    }, [storeError]);

    useEffect(() => {
        if (!isInitialized) return;
    
        const fetchProjects = async () => {
            try {
                await(dispatch(fetchProjectsThunk({page: 1, pageSize: 10})))
                if (selectedFilters.length === 0) {
                    // Use fetchProjectsThunk with pagination when no filters are applied
                    await dispatch(fetchProjectsThunk({ page: 1, pageSize: 10 }));
                    setDisplayType('List');
                } else if (selectedFilters.length === 1 ) {
                    if (filters.find(item => item.name === selectedFilters.toString() && item.group !== 'Group' )) {
                        await dispatch(getMultiQueryThunk(selectedFilters));
                        return;
                    }
                    await dispatch(getGroupedProjectsThunk(selectedFilters));
                    setDisplayType('ListCard');
                } else {
                    await dispatch(getMultiQueryThunk(selectedFilters));
                    setDisplayType('List');
                }
            } catch (error) {
                console.error('Error fetching projects: ', error);
            }
        };
    
        const debounceTimeout = setTimeout(() => {
            fetchProjects();
        }, 300);
        
        return () => clearTimeout(debounceTimeout);
    }, [selectedFilters, isInitialized, dispatch]);

    // Handle pending selection
    useEffect(() => {
        if (pendingSelection && !selectedFilters.includes(pendingSelection)) {
            setSelectedFilters([...selectedFilters, pendingSelection]);
            setInputValue('');
            setPendingSelection(null);
        }
    }, [pendingSelection, selectedFilters, setSelectedFilters]);

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
            
            {/* Error display */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {typeof error === 'string' ? error : error.message}
                </div>
            )}
            
            {/* Loading indicator */}
            {isLoading && (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}
            
            {/* Content display based on type */}
            {!isLoading && (
                <div className='space-y-2'>
                    {displayType === 'ListCard' && groupedProjects.map((group) => (
                        <ProjectGroupCard 
                            key={group.groupKey} 
                            name={group.groupKey} 
                            total={group.count} 
                            redTotal={4} 
                            yellowTotal={18} 
                            greenTotal={19} 
                            revenue={68354} 
                            setSelectedFilters={setSelectedFilters} 
                            setDisplayType={setDisplayType} 
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
                            groupKey={'all_projects'} 
                            count={projects.length} 
                            projects={projects} 
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Ridgeline;

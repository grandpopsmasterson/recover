// DashboardPage.tsx
'use client'

import React, { useEffect, useState } from 'react'
import FilterComponent from '@/components/filters/FilterComponent'
import ProjectCardBuckets from '@/components/cards/ProjectCardBuckets'
import { FilterError } from '@/types/project'
import ListView from '@/components/ui/ListView'
import { useFilterPersistence } from '@/hooks/filters/useFilterPersistence'
import ProjectGroupCard from '@/components/cards/ProjectGroupCard'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { fetchProjectsThunk } from '@/store/thunk/projectThunk'
import { getGroupedProjectsThunk, getMultiQueryThunk } from '@/store/thunk/groupedProjectThunk'


const Ridgeline = () => {
    const [displayType, setDisplayType] = useState<'ListCard'|'List'|'Card'>('ListCard');
    const { selectedFilters, setSelectedFilters, isInitialized } = useFilterPersistence();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<FilterError|string|null>(null);
    const [pendingSelection, setPendingSelection] = useState<string | null>(null);
    const [pendingRemoval, setPendingRemoval] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    // Pulling from global store
    const project = useAppSelector(state => state.projects.projects);
    const groupedProjects = useAppSelector(state => state.groupedProject);
    const dispatch = useAppDispatch();

    // Only fetch projects after filters are initialized from localStorage
    useEffect(() => {
            const fetchProjects = async (filter: string[]) => {
                setIsLoading(true);
                setError(null);
                try {
                    if (filter.length === 0) {
                        await dispatch(fetchProjectsThunk())
                        setDisplayType('List');
                    } else if (filter.length === 1) {
                        await dispatch(getGroupedProjectsThunk(filter));
                        setDisplayType('ListCard');
                    } else if (filter.length >= 1) {
                        await dispatch(getMultiQueryThunk(filter));
                        setDisplayType('List');
                    }
                } catch (error) {
                    setError(error instanceof Error ? error.message : 'An error occurred');
                    console.error('Error fetching projects: ', error);
                } finally {
                    setIsLoading(false);
                }
            }
            if (isInitialized) {

                const debounceTimeout = setTimeout(() => {
                    fetchProjects(selectedFilters);
                }, 300);
                return () => clearTimeout(debounceTimeout);
            }
    }, [selectedFilters, isInitialized, dispatch]);

    useEffect(() => {
        if (pendingSelection && !selectedFilters.includes(pendingSelection)) {
            setSelectedFilters([...selectedFilters, pendingSelection]);
            setInputValue('');
            setPendingSelection(null);
        }
    }, [pendingSelection, selectedFilters, setSelectedFilters]);

    // Show loading state while initializing
    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto space-y-2 px-4 py-8">
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
            <div className='space-y-2'>
                {displayType === 'ListCard' && groupedProjects.groupedProjects.map((projects) => (
                    <ProjectGroupCard 
                        key={projects.groupKey} 
                        name={projects.groupKey} 
                        total={projects.count} 
                        redTotal={4} 
                        yellowTotal={18} 
                        greenTotal={19} 
                        revenue={68354} 
                    />
                ))}
                {displayType === 'Card' && groupedProjects.groupedProjects.map((projects) => (
                    <ProjectCardBuckets 
                        key={projects.groupKey} 
                        projects={projects.projects} 
                        groupKey={projects.groupKey} 
                        count={projects.count} 
                    />
                ))}
                {displayType === 'List' && (
                    <ListView 
                        key={'list'} 
                        groupKey={'key'} 
                        count={0} 
                        projects={project} 
                    />
                )}
            </div>
        </div>
    )
}

export default Ridgeline

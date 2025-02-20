// DashboardPage.tsx
'use client'

import React, { useEffect, useState } from 'react'
import FilterComponent from './FilterComponent'
import ProjectBuckets from './ProjectBuckets'
import AltitudeListCard from './AltitudeListCard'
import { FilterError, GroupedProjects, ShortProject } from '@/types/project'
import { filterApi } from '@/api/features/filterApi'
import ListView from './ListView'
import { projectsApi } from '@/api/features/projectsApi'
import { useFilterPersistence } from '@/hooks/filters/useFilterPersistence'

const DashboardPage = () => {
    const [displayType, setDisplayType] = useState<'ListCard'|'List'|'Card'>('ListCard');
    const [project, setProject] = useState<ShortProject[]>([]);
    const { selectedFilters, setSelectedFilters, isInitialized } = useFilterPersistence();
    
    const [groupedProjects, setGroupedProjects] = useState<GroupedProjects[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<FilterError|string|null>(null);
    const [pendingSelection, setPendingSelection] = useState<string | null>(null);
    const [pendingRemoval, setPendingRemoval] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const fetchProjects = async (filter: string[]) => {
        setIsLoading(true);
        setError(null);
        try {
            if (filter.length === 0) {
                const data: ShortProject[] = await projectsApi.getAllProjects(); 
                setProject(data);
                setDisplayType('List');
                return;
            } else if (filter.length === 1) {
                const data: GroupedProjects[] = await filterApi.getGroupedProjects(filter);
                setGroupedProjects(data);
                setDisplayType('ListCard');
                return;
            } else if (filter.length >= 1) {
                const data: GroupedProjects[] = await filterApi.getMultiQuery(filter);
                setGroupedProjects(data);
                setDisplayType('List');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
            console.error('Error fetching projects: ', error);
        } finally {
            setIsLoading(false);
        }
    }

    // Only fetch projects after filters are initialized from localStorage
    useEffect(() => {
        if (isInitialized) {
            const debounceTimeout = setTimeout(() => {
                fetchProjects(selectedFilters);
            }, 300);
            return () => clearTimeout(debounceTimeout);
        }
    }, [selectedFilters, isInitialized]);

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
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between w-full bg-recovernavy rounded-bl-lg rounded-br-lg mb-4">
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
                {displayType === 'ListCard' && groupedProjects.map((projects) => (
                    <AltitudeListCard 
                        key={projects.groupKey} 
                        name={projects.groupKey} 
                        total={projects.count} 
                        redTotal={4} 
                        yellowTotal={18} 
                        greenTotal={19} 
                        revenue={68354} 
                    />
                ))}
                {displayType === 'Card' && groupedProjects.map((projects) => (
                    <ProjectBuckets 
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

export default DashboardPage

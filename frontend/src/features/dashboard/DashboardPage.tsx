'use client'

import React, { useEffect, useState } from 'react'
import FilterComponent from './FilterComponent'
import ProjectBuckets from './ProjectBuckets'
import AltitudeListCard from './AltitudeListCard'
import { FilterError, GroupedProjects, ShortProject } from '@/types/project'
import { filterApi } from '@/api/filterApi'

const DashboardPage = () => {

    const [displayType, setDisplayType] = useState<'ListCard'|'List'|'Card'>('ListCard');
    const [project, setProject] = useState<ShortProject[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<string[]>(['Stage']);
    // const id: bigint = BigInt(1);
    
    const [groupedProjects, setGroupedProjects] = useState<GroupedProjects[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<FilterError|string|null>(null);
    const [pendingSelection, setPendingSelection] = useState<string | null>(null);
    const [pendingRemoval, setPendingRemoval] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const fetchProjects = async (filters: string[]) => {
        setIsLoading(true);
        setError(null);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any = await filterApi.getGroupedProjects(filters);
            setGroupedProjects(data);
            console.log(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
            console.error('Error fetching projects: ', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            fetchProjects(selectedFilters);
        }, 300);
        return () => clearTimeout(debounceTimeout);
    }, [selectedFilters]);

    useEffect(() => {
        if (pendingSelection && !selectedFilters.includes(pendingSelection)) {
        setSelectedFilters(prev => [...prev, pendingSelection]);
        setInputValue('');
        setPendingSelection(null);
        //setIsOpen(false);
        }
    }, [pendingSelection, selectedFilters]);

    return (
        <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between w-full bg-recovernavy rounded-bl-lg rounded-br-lg mb-4 ">
                        <FilterComponent 
                            setDisplayType={setDisplayType} 
                            selectedFilters={selectedFilters} 
                            setSelectedFilters={setSelectedFilters} 
                            pendingRemoval={pendingRemoval}
                            setPendingRemoval={setPendingRemoval}
                            setPendingSelection={setPendingSelection}
                            // pendingSelection={pendingSelection}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            />
                    </div>
                    <div className='space-y-2'>
                    {displayType == 'ListCard' ? groupedProjects.map((projects) => (
                        <AltitudeListCard key={projects.groupKey} name={projects.groupKey} total={projects.count} redTotal={4} yellowTotal={18} greenTotal={19} revenue={68354} />
                    )
                    ) : displayType == 'Card' ? groupedProjects.map((projects) => (
                        
                        <ProjectBuckets key={projects.groupKey} projects={projects.projects} groupKey={projects.groupKey} count={projects.count} />
                    )) : (
                        <div className='text-black'>This will one day be a list</div>
                    )}
                    </div>
                    
                    
                </div>
    )
}

export default DashboardPage

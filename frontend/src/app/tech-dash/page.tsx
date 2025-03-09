'use client'

import React, { useState, useEffect } from 'react'
import { filterApi } from '@/api/features/filterApi';
import ProjectCardBuckets from '@/components/cards/ProjectCardBuckets';
import { GroupedProjects, Project } from '@/types/project';
import { Button } from '@heroui/button'
import { useRouter } from 'next/navigation'

export default function TechnicianDashboard() {
    const router = useRouter();
    const [groupedProjects, setGroupedProjects] = useState<GroupedProjects[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const data = await filterApi.group(["Stage"]);
            const formattedGroups = Object.entries(data).map(([key, value]) => ({
                groupKey: key,
                count: value.count,
                projects: value.projects
            }));
            
            setGroupedProjects(formattedGroups);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
            console.error('Error fetching projects:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='text-black flex flex-col items-center max-w-full overflow-hidden'>
            <header className='items-start w-full ml-10 mt-4'>
                <Button onPress={() => router.push('/dashboard')}>
                    Back to main view
                </Button>
            </header>

            <main className="mx-12 gap-6 w-full min-h-[20rem]">
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <div className="border-1 border-blue-500 rounded-xl w-full h-full">
                        {groupedProjects.map((group) => (
                            <ProjectCardBuckets 
                                key={group.groupKey} 
                                projects={group.projects} 
                                groupKey={group.groupKey} 
                                count={group.count} 
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
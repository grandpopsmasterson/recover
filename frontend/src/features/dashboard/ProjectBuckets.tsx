'use client'

import { projectsApi } from '@/api/projectsApi';
import { ShortProject } from '@/types/project';
import React, { useEffect, useState } from 'react'
import ProjectCard from '../project/ProjectCard';

const ProjectBuckets = () => {
    const [projects, setProjects] = useState<ShortProject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const projectData = await projectsApi.getAllProjects();
                console.log('Fetched project data:', projectData); // Debug log
                setProjects(projectData.slice(0, 4));
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching projects:', err); // Debug log
                setError('Failed to fetch projects');
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className='container mx-auto  '>
            <div className="grid gap-6 h-1/4" style={{ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }}>
                {isLoading 
                    ? <p>Loading...</p> 
                    : error 
                    ? <p>{error}</p> 
                    : projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            {...project}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ProjectBuckets
'use client'

import {  GroupedProjects } from '@/types/project';
import ProjectCard from '../project/ProjectCard';

const ProjectBuckets = ({groupKey, projects, count}: GroupedProjects) => {

    return (
        <div className='container mx-auto  '>
            <div className="grid gap-6 h-1/4" style={{ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))' }}>
                <h1 className='text-black'>{groupKey} <small>{count}</small></h1>
                {projects.map((project) => (
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
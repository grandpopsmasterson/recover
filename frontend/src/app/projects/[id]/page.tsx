'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { projectsApi } from '@/api/projectsApi';
import { LongProject } from '@/types/project';
import LongProjectPage from '@/features/project/LongProjectPage';
import Timeline from '@/features/sidebars/Timeline';
import ActivityBar from '@/features/sidebars/ActivityBar';
import DashboardNavBar from '@/features/dashboard/DashboardNavbar';
import ProjectBar from '@/features/project/ProjectBar';

export default function ProjectDetailPage() {
    const params = useParams();
    const [project, setProject] = useState<LongProject | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setIsLoading(true);
                const projectData = await projectsApi.getProject(params.id as string);
                setProject(projectData);
            } catch (err) {
                setError(`'Failed to fetch project details', ${err}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#09090B]">
                <div className="text-green-500">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#09090B]">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#09090B]">
                <div className="text-white">Project not found</div>
            </div>
        );
    }

    return (
        <div className='min-h-screen' style={{color: '#020617'}}>
            <div style={{height: '4rem'}}>
            <DashboardNavBar />
            </div>
            <div>
            <ProjectBar {...project} />
            </div>
        <div className="h-screen w-full flex items-center">
            <Timeline />
            <LongProjectPage {...project} />
            <ActivityBar />
        </div>
        </div>
    );
}
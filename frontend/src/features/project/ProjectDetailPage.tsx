'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { projectsApi } from '@/api/features/projectsApi';
import { LongProject } from '@/types/project';
// import Timeline from '@/features/sidebars/Timeline';
// import ActivityBar from '@/features/sidebars/ActivityBar';
import DashboardNavBar from '@/features/dashboard/DashboardNavbar';
import { ProjectBar } from './ProjectBar';
import LongProjectPage from './LongProjectPage';
import ActivityBox from './ActivityBox';


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
        <div className='flex flex-col min-h-screen'>
            <div style={{height: '4rem'}}>
                <DashboardNavBar />
            </div>
            <div>
                <ProjectBar {...project} />
            </div>
            <div className='p-8 flex w-full gap-2 border-2 border-white-500 min-h-[clamp(20rem,20vw+10rem,45rem)]'>
                    {/* <Timeline /> */}
                <div style={{ flex: '5 1 0' }}>
                    <LongProjectPage {...project} />
                </div>
                <div style={{ flex: '1 1 0', height: '50vh' }} className='mr-20'>
                    <ActivityBox />
                </div>
            </div>
                
        </div>
    );
}
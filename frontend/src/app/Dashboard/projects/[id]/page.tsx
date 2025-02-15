'use client'

import ProjectDetailPage from "@/features/project/ProjectDetailPage";

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { projectsApi } from '@/api/projectsApi';
// import { LongProject } from '@/types/project';
// import DashboardNavBar from '@/features/dashboard/DashboardNavbar';
// import { ProjectBar } from '@/features/project/ProjectBar';
// import LongProjectPage from '@/features/project/LongProjectPage';

export default function ProjectDetail() {

    return (
        <div className='min-h-screen'>
            <ProjectDetailPage />
        </div>
    );
}
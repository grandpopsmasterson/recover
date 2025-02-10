'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { projectsApi } from '@/api/projectsApi';
import { LongProject } from '@/types/project';
import LongProjectCard from '@/features/project/LongProjectCard';

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
               setError('Failed to fetch project details');
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
       <div className="min-h-screen bg-[#09090B]">
           <LongProjectCard {...project} />
       </div>
   );
}
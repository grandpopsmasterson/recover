'use client'

import { useRouter } from "next/navigation"
import Button1 from "@/components/ui/ButtonC"
import DashboardNavBar from "../../features/dashboard/DashboardNavbar"
import ProjectBuckets from "@/features/dashboard/ProjectBuckets";

export default function DashboardPage() {
    
    const router = useRouter();

    

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
            <div className="flex items-end mb-4">
                <Button1 
                onPress={() => router.push('./CreateProject')} 
                color="success"
                className="ml-auto"
                >
                Create Project
                </Button1>
            </div>
                <ProjectBuckets />
            </div>
        </div>
    );
}


// 'use client'
// import { useState, useEffect } from 'react'
// import { projectsApi } from '@/api/projectsApi'
// import { useRouter } from "next/navigation"
// import { ShortProject } from '@/types/project'
// import Button1 from "@/components/ui/ButtonC"
// import DashboardNavBar from "../../features/dashboard/DashboardNavbar"
// import DashboardCard from '@/features/project/ProjectCard'

// export default function DashboardPage() {
//     const [projects, setProjects] = useState<ShortProject[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const router = useRouter();

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 setIsLoading(true);
//                 const projectData = await projectsApi.getAllProjects();
//                 console.log('Fetched project data:', projectData); // Debug log
//                 setProjects(projectData.slice(0, 4));
//                 setIsLoading(false);
//             } catch (err) {
//                 console.error('Error fetching projects:', err); // Debug log
//                 setError('Failed to fetch projects');
//                 setIsLoading(false);
//             }
//         };
//         fetchProjects();
//     }, []);

//     if (isLoading) {
//         return <div className="flex justify-center items-center h-screen">Loading...</div>;
//       }
    
//       if (error) {
//         return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
//       }

//     return (
//         <div>
//             <div className="container mx-auto px-4 py-8">
//             <div className="flex items-end mb-4">
//                 <Button1 
//                 onPress={() => router.push('./CreateProject')} 
//                 color="success"
//                 className="ml-auto"
//                 >
//                 Create Project
//                 </Button1>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {projects.map((project) => (
//                 <DashboardCard
//                     key={project.streetAddress}
//                     {...project}
//                 />
//                 ))}
//             </div>
//             </div>
//         </div>
//     );
// }
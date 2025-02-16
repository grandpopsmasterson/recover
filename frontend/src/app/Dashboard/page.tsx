'use client'

import { useRouter } from "next/navigation"
//import Button1 from "@/components/ui/ButtonC"
import ProjectBuckets from "@/features/dashboard/ProjectBuckets";
import { Button } from "@heroui/button";

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        // Check if the user is on the /dashboard route
        if (window.location.pathname === '/dashboard') {
            router.push('/dashboard/altitude'); // Redirect to /dashboard/altitude
        }
    }, [router]); // Add router to the dependency array


    // Render a loading message while redirecting (optional but good UX)
    if (window.location.pathname === '/dashboard') {
        return <div>Redirecting...</div>;
    }

    return (
        <div>
            <div className="container mx-auto px-4 py-8">
            <div className="flex items-end mb-4 mt-4">
                <Button 
                onPress={() => router.push('./createProject')} 
                color="secondary"
                className="ml-auto"
                >
                Create Project
                </Button>
            </div>
                <ProjectBuckets />
            </div>
        </div>
    );
}

//this page doesn't exist, it literally just re-routes to altitude
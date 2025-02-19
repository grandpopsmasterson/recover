'use client'

import { useRouter } from "next/navigation"
import Button1 from "@/components/ui/ButtonC"
import ProjectBuckets from "@/features/dashboard/ProjectBuckets";

export default function BucketsPage() {
    
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
'use client'

import { useRouter } from "next/navigation"
//import Button1 from "@/components/ui/ButtonC"
import ProjectBuckets from "@/features/dashboard/ProjectBuckets";
import { Button } from "@heroui/button";
import FilterComponent from "@/features/dashboard/FilterComponent";
import AltitudeListCard from "@/features/dashboard/AltitudeListCard";

export default function DashboardPage() {
    const router = useRouter();

    const id: bigint = BigInt(1);

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
            <div>
                <FilterComponent />
            </div>
                <ProjectBuckets />
                <AltitudeListCard id={id} stage={'PENDING SALE'} total={24} redTotal={4} yellowTotal={18} greenTotal={19} revenue={68354} />
            </div>
        </div>
    );
}

//this page doesn't exist, it literally just re-routes to altitude
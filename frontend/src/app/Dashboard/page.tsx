'use client'

import Button1 from "@/components/ui/ButtonC"
import DashboardNavBar from "../../features/dashboard/DashboardNavbar"
import { useRouter } from "next/navigation"

export default function Project() {

    const router = useRouter();

    return (
        <div>
            <DashboardNavBar />
            <div className="flex items-end">
                <Button1 onPress={() => router.push('./CreateProject')} color="success">Create Project</Button1>
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen"> 
                <h1 className="text-3xl">Dashboard </h1> 
                <p>Still under construction! Check back later</p> 
                <p>click the recover logo to return to the homepage</p>
            </div>
        </div>
    )
}
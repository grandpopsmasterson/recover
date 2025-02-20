'use client'
// import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import DashboardNavBar from '@/features/dashboard/DashboardNavbar'
import Button1 from '@/components/ui/ButtonC';

export default function AlpinePage() {
    
    const router = useRouter();
    
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    // if (isLoading) {
    //     return <div className="flex justify-center items-center h-screen">Loading...</div>;
    // }

    // if (error) {
    //     return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    // }


    return (
        <div>
            {/* {isLoading ? (
                <div className="flex justify-center items-center h-[calc(100vh-64px)]">Loading...</div>
            ) : error ? (
                <div className="flex justify-center items-center h-[calc(100vh-64px)]">No data to display</div>
            ) : ( */}
            <DashboardNavBar />

            <div className="flex flex-col items-center p-4">
                Altitude Page: place to display franchise statistics
                <Button1 className="px-4 py-1 text-white rounded-lg"
                    onPress={() => router.push('/dashboard/ridgeline')}>Go to Ridgeline</Button1>
            </div>
        
        </div>
    );
}
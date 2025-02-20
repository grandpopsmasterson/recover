'use client'

import { useRouter } from "next/navigation"
import DashboardPage from "@/features/dashboard/DashboardPage";

export default function RidgelinePage() {
    
    const router = useRouter();

    return (
        <div>
            <DashboardPage />
        </div>
    );
}
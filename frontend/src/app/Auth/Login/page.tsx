// app/auth/login/page.tsx
'use client';

import LogInCard from "@/features/auth/LogInCard";


export default function LogIn() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <LogInCard/>
            </div>
        </div>
    )
}
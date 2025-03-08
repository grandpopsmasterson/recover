'use client';

import LogInCard from "@/components/cards/LogInCard";
import { Alert, AlertDescription } from "@/components/shadcn/ui/alert";
import React, { useEffect, useState } from "react";

export default function LogIn() {
    const [authAlert, setAuthAlert] = useState<string | null>(null);

    useEffect(() => {
        const alertMessage = localStorage.getItem('auth_alert');
        if (alertMessage) {
            setAuthAlert(alertMessage);
            localStorage.removeItem('auth_alert');
        }
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen space-y-10">
                {authAlert && (
                    <Alert variant="destructive" className="rounded-2xl py-1 w-[clamp(20rem,25vw+5rem,45rem)]">
                        <AlertDescription>{authAlert}</AlertDescription>
                    </Alert>
                )}
                <LogInCard/>
            </div>
        </div>
    )
}
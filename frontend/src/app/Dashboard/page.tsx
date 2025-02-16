'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react"; // Import useEffect

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
        <div></div>
    );
}

//this page doesn't exist, it literally just re-routes to altitude
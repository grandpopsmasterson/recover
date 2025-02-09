'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        // If no token and not already on login page, redirect to login
        if (!token && !pathname.includes('/Auth/Login,/Auth/SignUp')) {
            router.push('/');
        }
    }, [router, pathname]);

    // You might want to add a loading state here
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token && !pathname.includes('/login')) {
        return null; // or a loading spinner
    }

    return <>{children}</>;
};
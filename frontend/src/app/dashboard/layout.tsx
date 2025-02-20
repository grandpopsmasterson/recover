'use client';

import { ProtectedRoute } from '@/config/ProtectedRoute';
import DashboardNavBar from '@/features/dashboard/DashboardNavbar';

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen mx-auto">
                <div className="flex-1">
                    <DashboardNavBar />
                    <main className="p-6">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
'use client';

import { ProtectedRoute } from '@/config/ProtectedRoute';

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className="flex h-screen">
                <div className="flex-1">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
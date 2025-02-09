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
                    <header className="flex justify-between p-4 border-b">
                    </header>
                    <main className="p-6">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
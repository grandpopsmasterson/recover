'use client';

import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import DashboardNavBar from '@/components/navbars/DashboardNavbar';
import { AppSidebar } from '@/components/shadcn/components/app-sidebar';
import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/shadcn/ui/sidebar';
import { ProtectedRoute } from '@/config/protected_route';

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>           
            <div className="min-h-screen relative"> 
                <SidebarProvider>
                <DashboardNavBar />
                    <AppSidebar />
                
                    <div className="absolute top-16 left-0 right-0"> {/* Position content below navbar */}
                        <Breadcrumbs />
                        <main className="p-6">
                            <SidebarTrigger />
                            {children}
                        </main>
                    </div>
                </SidebarProvider>
            </div>
            
        </ProtectedRoute>
    );
}
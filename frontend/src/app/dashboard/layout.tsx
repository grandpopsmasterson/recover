'use client';

import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { AppSidebar } from '@/components/shadcn/components/app-sidebar';
import { Separator } from '@/components/shadcn/ui/separator';
import { 
    SidebarInset, 
    SidebarProvider, 
    SidebarTrigger 
} from '@/components/shadcn/ui/sidebar';
import DashboardNavBar from '@/components/navbars/DashboardNavbar';
import { ProtectedRoute } from '@/config/protected_route';

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute> 
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex flex-col gap-2 transition-[width,height] ease-linear">
                        <div className="w-full">
                        <DashboardNavBar /> 
                        </div>    
                                      
                        <div className="relative flex items-center gap-2 px-4">   
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />  
                            <Breadcrumbs />      
                        </div>
                    </header>
                    <main>
                        {children}
                    </main>   
                </SidebarInset>
            </SidebarProvider> 
        </ProtectedRoute>
    )
}
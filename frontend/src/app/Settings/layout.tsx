'use client';
import { ProtectedRoute } from "@/config/ProtectedRoute";
import DashboardNavBar from "@/features/dashboard/DashboardNavbar";
import { Avatar, ListboxItem, Listbox } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
export default function SettingsLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const pathName = usePathname();
    const router = useRouter();
    
    return (
        <ProtectedRoute>
            <div className="flex h-screen">
                <div className="flex-1">
                    <DashboardNavBar />
                    <div className="settings--content">
                        <div className="profile--sidebar">
                            <Avatar
                                isBordered
                                size="lg"
                                className="text-large"
                                src=""
                                name="User"
                            />
                            <h3>User Name</h3>

                            <Listbox aria-label="Actions" onAction={(key) => router.push(`/settings/${key}`)}>
                                <ListboxItem key="">Account</ListboxItem>
                                <ListboxItem key="notifications">Notifications</ListboxItem>
                                <ListboxItem key="billing">Billing and Payments</ListboxItem>
                                <ListboxItem key="security" className="text-danger">Security</ListboxItem>
                            </Listbox>
                        </div>
                    </div>
                    <main className="p-6">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    )
}
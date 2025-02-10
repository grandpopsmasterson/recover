'use client';
import { ProtectedRoute } from "@/config/ProtectedRoute";
import DashboardNavBar from "@/features/dashboard/DashboardNavbar";
import { Avatar, Divider, Tabs, Tab } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
export default function SettingsLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const pathName = usePathname();

    const activeTab = pathName.split('/').pop()
    
    return (
        <ProtectedRoute>
            <div className="flex flex-col">
                <DashboardNavBar />
                <div className="settings--layout h-max w-full py-6 px-10">
                    <div className="flex flex-row">
                        <div className="profile--sidebar flex flex-col justify-start content-center items-center basis-md py-15 px-10">
                            <Avatar
                                isBordered
                                size="lg"
                                className="text-large"
                                src=""
                                name="User"
                            />
                            <h3>User Name</h3>
                            <div className="w-full my-2">
                                <Divider orientation="horizontal" className="border-solid"/>
                            </div>

                            <Tabs
                                isVertical={true}
                                size="md"
                                variant="underlined"
                                selectedKey={activeTab}>
                                <Tab key="settings" title="Settings" href="/settings" />
                                <Tab key="billing" title="Billing and Payments" href="/settings/billing" />
                                <Tab key="notifications" title="Notifications" href="/settings/notifications"/>
                                <Tab key="security" title="Security" href="/settings/security"/>
                            </Tabs>
                        </div>

                        <div className="mx-2 flex">
                            <Divider orientation="vertical"/>
                        </div>

                        <main className="settings--main basis-lg">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}
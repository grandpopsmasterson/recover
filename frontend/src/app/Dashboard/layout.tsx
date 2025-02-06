import { NotificationCenter } from "@/features/notification/notificationCenter";

export default function DashboardLayout({
    children
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">
          <header className="flex justify-between p-4 border-b">
            <UserBox />
            <NotificationCenter />
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    );
  }
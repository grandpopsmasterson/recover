
//sidebar and userBox were removed and Notification bar
export default function DashboardLayout({
    children
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex h-screen">
        <div className="flex-1">
          <header className="flex justify-between p-4 border-b">
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    );
  }
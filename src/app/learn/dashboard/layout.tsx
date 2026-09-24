import { LearnDashboardSidebar } from '@/components/learn/dashboard-sidebar';

export default function LearnDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen bg-slate-50 dark:bg-[#0a0b0e]">
      {/* Left Sidebar */}
      <LearnDashboardSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 overflow-auto">
        {children}
      </main>
    </div>
  );
}

import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { DashboardHeader } from '@/components/layout/dashboard-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="ml-0 lg:ml-72">
        <DashboardHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

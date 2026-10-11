import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { DashboardHeader } from '@/components/layout/dashboard-header';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Fetch real session from Neon DB via NextAuth
  const session = await auth();

  // 2. Protect the route
  if (!session?.user) {
    redirect("/login");
  }

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
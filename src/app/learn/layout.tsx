import { auth } from '@/auth';
import { LearnHeader } from '@/components/layout/learn-header';
import { LearnDashboardSidebar } from '@/components/learn/dashboard-sidebar';
import { LearnDashboardHeader } from '@/components/learn/dashboard-header';

export default async function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isAuthenticatedLearner = session?.user?.role === 'LEARNER';

  if (isAuthenticatedLearner) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0b0e]">
        <LearnDashboardHeader />
        <div className="flex min-h-[calc(100vh-5rem)]">
          <LearnDashboardSidebar />
          <main className="min-w-0 flex-1 overflow-auto lg:ml-16">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <LearnHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}

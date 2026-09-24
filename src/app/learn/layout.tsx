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
      <div className="flex h-full min-h-screen bg-slate-50 dark:bg-[#0a0b0e]">
        <LearnDashboardSidebar />
        <div className="flex min-w-0 flex-1 flex-col lg:ml-72">
          <LearnDashboardHeader />
          <main className="flex-1 overflow-auto">{children}</main>
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

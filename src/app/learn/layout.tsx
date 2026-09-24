import { LearnHeader } from '@/components/layout/learn-header';
import { LearnFooter } from '@/components/layout/learn-footer';

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <LearnHeader />
      <main className="flex-1">{children}</main>
      {/* <LearnFooter /> */}
    </div>
  );
}

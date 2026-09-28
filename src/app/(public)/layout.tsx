'use client';

import { usePathname } from 'next/navigation';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {!isHomePage && <PublicHeader />}
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </>
  );
}

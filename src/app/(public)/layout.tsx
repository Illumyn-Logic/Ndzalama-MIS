'use client';

import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { ContactBubble } from '@/components/common/contact-bubble';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
      <ContactBubble />
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { ContactBubble } from '@/components/common/contact-bubble';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [compactHeader, setCompactHeader] = useState(false);

  // Top bar visibility: immediate snap behavior - hide when scrollY > 0, show only at scrollY === 0
  useEffect(() => {
    function handleScroll() {
      const shouldHideTopBar = window.scrollY > 0;
      setCompactHeader((prev) => (prev !== shouldHideTopBar ? shouldHideTopBar : prev));
    }

    // Set initial state
    setCompactHeader(window.scrollY > 0);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="public-experience flex min-h-full flex-1 flex-col">
      <PublicHeader compactHeader={compactHeader} />
      <main className="flex-1">{children}</main>
      <PublicFooter />
      <ContactBubble key={compactHeader ? 'visible' : 'hidden'} show={compactHeader} />
    </div>
  );
}

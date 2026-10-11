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
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for contact bubble
  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 100);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
      <ContactBubble show={scrolled} />
    </>
  );
}

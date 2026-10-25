'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { courses, type CourseCategory, type CourseProvider } from '@/data/courses';
import {
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaArrowRight,
} from 'react-icons/fa';

/* ─── dropdown data ───────────────────────────────────────────────── */

const aboutLinks = [
  { label: 'About Ndzalama', href: '/about' },
  { label: 'Why Choose Us', href: '/why-choose-us' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

const accreditationLinks = [
  { label: 'Become Accredited Training Provider', href: '/accreditation-services' },
  { label: 'Register a TVET College', href: '/accreditation-services/tvet' },
  { label: 'Be SETA Registered', href: '/accreditation-services/seta' },
  { label: 'Verify Certificate', href: '/verify' },
];

const courseMenuGroups: {
  title: string;
  provider: CourseProvider;
  categories: CourseCategory[];
}[] = [
  { title: 'ETDP SETA', provider: 'ETDP SETA', categories: ['Occupational Certificates', 'Skills Programmes'] },
  { title: 'Services SETA', provider: 'Services SETA', categories: ['Skills Programmes'] },
  { title: 'HWSETA', provider: 'HWSETA', categories: ['Occupational Certificates', 'First Aid Programmes'] },
  { title: 'Skill Builder Courses', provider: 'Skill Builder', categories: ['Skill Builder Courses'] },
  { title: 'Legacy Qualifications', provider: 'Legacy Unit Standards', categories: ['Legacy Qualifications'] },
];

/* ─── helpers ─────────────────────────────────────────────────────── */

/** Close dropdown when clicking outside */
function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    function listener(e: MouseEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    }
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

/* ─── sub-components ──────────────────────────────────────────────── */

interface DropdownProps {
  label: string;
  href?: string;
  isActive: boolean;
  children: React.ReactNode;
}

function NavDropdown({ label, href, isActive, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useClickOutside(ref, close);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {href ? (
        <Link
          href={href}
          className={cn(
            'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors',
            isActive ? 'text-brand-primary dark:text-brand-secondary' : 'text-slate-900 hover:text-brand-primary dark:text-slate-200 dark:hover:text-brand-secondary',
          )}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {label}
          <FaChevronDown
            className={cn('text-[10px] mt-0.5 transition-transform', open && 'rotate-180')}
            aria-hidden="true"
          />
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors',
            isActive ? 'text-brand-primary dark:text-brand-secondary' : 'text-slate-900 hover:text-brand-primary dark:text-slate-200 dark:hover:text-brand-secondary',
          )}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {label}
          <FaChevronDown
            className={cn('text-[10px] mt-0.5 transition-transform', open && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
      )}

      {open && (
        <div
          role="menu"
          className="absolute top-full left-0 z-50 min-w-56 border border-[#e5e4e7] bg-white py-2 shadow-xl dark:border-brand-primary-light/40 dark:bg-[#183018]"
        >
          {children}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      role="menuitem"
      href={href}
      className="block px-4 py-2.5 text-sm text-slate-800 transition-colors hover:bg-brand-secondary/10 hover:text-brand-primary dark:text-slate-200 dark:hover:text-brand-secondary"
    >
      {label}
    </Link>
  );
}

/* ─── courses mega dropdown ───────────────────────────────────────── */

function CoursesDropdown({ isActive }: { isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<CourseProvider>('ETDP SETA');
  const [expandedCategory, setExpandedCategory] = useState<CourseCategory | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(false);
    setSelectedProvider('ETDP SETA');
    setExpandedCategory(null);
  }, []);
  useClickOutside(ref, close);

  const openMenu = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  };

  const scheduleClose = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onFocus={openMenu}
      onBlur={(event) => {
        if (!ref.current?.contains(event.relatedTarget as Node)) scheduleClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') close();
      }}
    >
      <button
        type="button"
        onClick={openMenu}
        className={cn(
          'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors',
          isActive ? 'text-brand-primary dark:text-brand-secondary' : 'text-slate-900 hover:text-brand-primary dark:text-slate-200 dark:hover:text-brand-secondary',
        )}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Courses
        <FaChevronDown
          className={cn('text-[10px] mt-0.5 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="region"
          aria-label="Browse courses by category"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
          className="absolute left-1/2 top-full z-50 w-[min(48rem,calc(100vw-2rem))] -translate-x-1/2 border-t-2 border-brand-secondary bg-white shadow-2xl dark:bg-[#183018]"
        >
          <div className="grid grid-cols-[12rem_minmax(0,1fr)]">
            <div className="border-r border-brand-neutral bg-brand-neutral/40 p-3 dark:border-gray-700 dark:bg-black/10">
              <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Training areas
              </p>
              <div className="space-y-1">
                {courseMenuGroups.map((group) => (
                  <button
                    key={group.provider}
                    type="button"
                    onMouseEnter={() => {
                      setSelectedProvider(group.provider);
                      setExpandedCategory(null);
                    }}
                    onFocus={() => {
                      setSelectedProvider(group.provider);
                      setExpandedCategory(null);
                    }}
                    onClick={() => {
                      setSelectedProvider(group.provider);
                      setExpandedCategory(null);
                    }}
                    className={cn(
                      'flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-xs font-semibold transition-colors',
                      selectedProvider === group.provider
                        ? 'bg-[#e8f0e8] text-brand-primary shadow-sm dark:bg-[#234523] dark:text-brand-secondary'
                        : 'text-slate-700 hover:bg-[#f5f9f5] hover:text-brand-primary dark:text-slate-300 dark:hover:bg-[#234523]',
                    )}
                    aria-pressed={selectedProvider === group.provider}
                  >
                    {group.title}
                    <FaChevronRight className="shrink-0 text-[9px]" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            {courseMenuGroups.filter((group) => group.provider === selectedProvider).map((group) => (
              <section key={group.provider} className="p-5">
                <h2 className="mb-3 text-sm font-bold text-brand-primary dark:text-brand-secondary">
                  {group.title}
                </h2>
                <div className="space-y-1">
                  {group.categories.map((category) => {
                    const categoryCourses = courses.filter(
                      (course) => course.seta === group.provider && course.category === category,
                    );
                    const expanded = expandedCategory === category;
                    const panelId = `course-category-${category.toLowerCase().replace(/\W+/g, '-')}`;

                    return (
                      <div key={category} className="border-b border-gray-100 last:border-0 dark:border-gray-700">
                        <button
                          type="button"
                          onClick={() => setExpandedCategory(expanded ? null : category)}
                          className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-sm font-semibold text-slate-900 transition-colors hover:bg-brand-neutral/50 dark:text-gray-200"
                          aria-expanded={expanded}
                          aria-controls={panelId}
                        >
                          <span>{category}</span>
                          <FaChevronDown
                            className={cn('shrink-0 text-[10px] transition-transform', expanded && 'rotate-180')}
                            aria-hidden="true"
                          />
                        </button>
                        {expanded && (
                          <div id={panelId} className="grid grid-cols-2 gap-x-4 gap-y-1 px-3 pb-3">
                            {categoryCourses.map((course) => (
                              <Link
                                key={course.id}
                                href={`/courses/${course.slug}`}
                                onClick={close}
                                className="border-l-2 border-transparent px-2 py-1.5 text-sm leading-snug text-slate-700 transition-colors hover:border-brand-secondary hover:bg-brand-neutral/50 hover:text-brand-primary dark:text-slate-300 dark:hover:text-brand-secondary"
                              >
                                {course.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            <div className="col-span-2 border-t border-gray-200 px-5 py-3 text-right dark:border-gray-700">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition-colors hover:text-brand-secondary dark:text-brand-secondary"
                onClick={close}
              >
                View All Courses
                <FaArrowRight className="text-xs" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── main component ──────────────────────────────────────────────── */

export function PublicHeader({ compactHeader }: { compactHeader: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileAccreditationOpen, setMobileAccreditationOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const user = session?.user;
  const isLearner = user?.role === 'LEARNER';
  
  function getInitials(name?: string | null) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
  
  const initials = getInitials(user?.name);

  const isAboutActive =
    pathname === '/about' ||
    pathname === '/why-choose-us' ||
    pathname === '/faq' ||
    pathname === '/privacy-policy';

  const isCoursesActive = pathname.startsWith('/courses');

  const isAccreditationActive = pathname.startsWith('/accreditation-services');

  return (
    <header className="w-full sticky top-0 z-50">
      {/* ── top bar ── */}
      <div
        className={cn(
          'hidden overflow-hidden bg-brand-primary text-sm text-white transition-[max-height,opacity] duration-300 ease-in-out md:block',
          compactHeader ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100',
        )}
      >
        <Container className="flex items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-6">
            <a
              href="mailto:headoffice@ndzalama.org.za"
              className="flex items-center gap-2 text-white/90 transition-colors hover:text-brand-secondary"
            >
              <FaEnvelope aria-hidden="true" />
              headoffice@ndzalama.org.za
            </a>
            <a
              href="tel:+27155900732"
              className="flex items-center gap-2 text-white/90 transition-colors hover:text-brand-secondary"
            >
              <FaPhone aria-hidden="true" />
              +(27) 15-5900-732
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=27664832441"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/90 transition-colors hover:text-brand-secondary"
            >
              <FaWhatsapp aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-0 overflow-hidden border border-white/25 shadow-xs">
              {[
                { href: 'https://www.facebook.com/ndzalamatraining.co.za', label: 'Facebook', Icon: FaFacebookF, bg: 'bg-[#efa936] hover:bg-[#df9926]' },
                { href: '#', label: 'Instagram', Icon: FaInstagram, bg: 'bg-[#249c9b] hover:bg-[#1e8887]' },
                { href: '#', label: 'Twitter', Icon: FaTwitter, bg: 'bg-[#ed704c] hover:bg-[#d85e3a]' },
                { href: '#', label: 'LinkedIn', Icon: FaLinkedinIn, bg: 'bg-[#6b6570] hover:bg-[#58535d]' },
              ].map(({ href, label, Icon, bg }) => (
                <a
                  key={label}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel={href !== '#' ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className={cn(
                    'flex h-6 w-6 items-center justify-center text-white text-[11px] transition-colors hover:brightness-110',
                    bg,
                  )}
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </Container>
      </div>

      {/* ── main nav ── */}
      <div className="bg-white dark:bg-[#071407] border-b border-[#e5e4e7] dark:border-brand-primary-light/40 shadow-sm">
        <Container className="py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/brand/logo.png"
              alt="Ndzalama Training"
              width={160}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            <Link
              href="/"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                pathname === '/'
                  ? 'text-brand-primary dark:text-brand-secondary'
                  : 'text-slate-900 hover:text-brand-primary dark:text-slate-200 dark:hover:text-brand-secondary',
              )}
            >
              Home
            </Link>

            {/* About dropdown */}
            <NavDropdown label="About" isActive={isAboutActive}>
              {aboutLinks.map((l) => (
                <DropdownItem key={l.href} href={l.href} label={l.label} />
              ))}
            </NavDropdown>

            {/* Courses mega dropdown */}
            <CoursesDropdown isActive={isCoursesActive} />

            {/* Accreditation dropdown (includes Verify) */}
            <NavDropdown label="Accreditation" isActive={isAccreditationActive}>
              {accreditationLinks.map((l) => (
                <DropdownItem key={l.href} href={l.href} label={l.label} />
              ))}
            </NavDropdown>

            <Link
              href="/posts"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                pathname.startsWith('/posts')
                  ? 'text-brand-primary dark:text-brand-secondary'
                  : 'text-slate-900 hover:text-brand-primary dark:text-slate-200 dark:hover:text-brand-secondary',
              )}
            >
              Updates
            </Link>

            <Link
              href="/contact"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                pathname === '/contact'
                  ? 'text-brand-primary dark:text-brand-secondary'
                  : 'text-slate-900 hover:text-brand-primary dark:text-slate-200 dark:hover:text-brand-secondary',
              )}
            >
              Contact
            </Link>

            {/* Learning CTA */}
            <div className="ml-3 flex items-center gap-2">
              {user && isLearner ? (
                // Logged-in learner on public site - show profile
                <Link
                  href="/learn/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center bg-brand-secondary text-xs font-bold text-white"
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white hidden lg:block">
                    Continue Learning
                  </span>
                </Link>
              ) : (
                // Guest user - Grey Block CTA
                <Link
                  href="/learn"
                  className="group flex items-center gap-2 border border-white/25 bg-[#4b5157] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:border-white hover:bg-[#383d42] dark:bg-[#323940] dark:hover:bg-[#252b31]"
                >
                  <span>Start Learning</span>
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-[#333] dark:text-white p-1"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6" aria-hidden="true" />
            ) : (
              <FaBars className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </Container>

        {/* ── mobile menu ── */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-[#e5e4e7] dark:border-brand-primary-light/40 bg-white dark:bg-[#071407]"
          >
            <Container className="py-4 flex flex-col gap-1">
              <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-sm font-medium text-slate-900 transition-colors hover:bg-brand-secondary/10 hover:text-brand-primary dark:text-slate-200 dark:hover:text-brand-secondary">Home</Link>

              {/* About accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileAboutOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-2 px-3 text-sm font-medium text-slate-900 transition-colors hover:bg-brand-secondary/10 hover:text-brand-primary dark:text-slate-200 dark:hover:text-brand-secondary"
                  aria-expanded={mobileAboutOpen}
                >
                  About
                  <FaChevronDown className={cn('text-xs transition-transform', mobileAboutOpen && 'rotate-180')} aria-hidden="true" />
                </button>
                {mobileAboutOpen && (
                  <div className="pl-4 mt-1 flex flex-col gap-1">
                    {aboutLinks.map((l) => (
                      <Link key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="block rounded py-2 px-3 text-sm text-slate-700 transition-colors hover:bg-brand-secondary/10 hover:text-brand-primary dark:text-slate-300 dark:hover:text-brand-secondary">{l.label}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Courses accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileCoursesOpen((v) => !v)}
                  className="w-full flex items-center justify-between rounded py-2 px-3 text-sm font-medium text-slate-900 transition-colors hover:bg-brand-secondary/10 hover:text-brand-primary dark:text-slate-200 dark:hover:text-brand-secondary"
                  aria-expanded={mobileCoursesOpen}
                >
                  Courses
                  <FaChevronDown className={cn('text-xs transition-transform', mobileCoursesOpen && 'rotate-180')} aria-hidden="true" />
                </button>
                {mobileCoursesOpen && (
                  <div className="pl-4 mt-1 flex flex-col gap-2">
                    {courseMenuGroups.map((group) => (
                      <section key={group.provider}>
                        <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-widest text-brand-primary dark:text-brand-secondary">
                          {group.title}
                        </p>
                        {group.categories.map((category) => {
                          const categoryCourses = courses.filter(
                            (course) => course.seta === group.provider && course.category === category,
                          );

                          return (
                            <div key={category}>
                              {group.categories.length > 1 && (
                                <p className="px-3 pt-1 text-[9px] font-semibold uppercase tracking-wide text-text-secondary">
                                  {category}
                                </p>
                              )}
                              {categoryCourses.map((course) => (
                                <Link
                                  key={course.id}
                                  href={`/courses/${course.slug}`}
                                  onClick={() => setIsOpen(false)}
                                  className="block rounded px-3 py-1.5 text-xs text-slate-700 transition-colors hover:bg-brand-secondary/10 hover:text-brand-primary dark:text-slate-300 dark:hover:text-brand-secondary"
                                >
                                  {course.title}
                                </Link>
                              ))}
                            </div>
                          );
                        })}
                      </section>
                    ))}
                    <Link href="/courses" onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2 px-3 text-sm font-semibold text-brand-secondary hover:underline">
                      View All Courses <FaArrowRight className="text-xs" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/posts" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-sm font-medium text-slate-900 transition-colors hover:bg-brand-secondary/10 hover:text-brand-primary dark:text-slate-200 dark:hover:text-brand-secondary">Updates</Link>

              {/* Accreditation accordion (includes Verify) */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileAccreditationOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-2 px-3 text-sm font-medium text-slate-900 transition-colors hover:bg-brand-secondary/10 hover:text-brand-primary dark:text-slate-200 dark:hover:text-brand-secondary"
                  aria-expanded={mobileAccreditationOpen}
                >
                  Accreditation
                  <FaChevronDown className={cn('text-xs transition-transform', mobileAccreditationOpen && 'rotate-180')} aria-hidden="true" />
                </button>
                {mobileAccreditationOpen && (
                  <div className="pl-4 mt-1 flex flex-col gap-1">
                    {accreditationLinks.map((l) => (
                      <Link key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="block py-2 px-3 text-sm text-slate-700 transition-colors hover:bg-brand-secondary/10 hover:text-brand-primary dark:text-slate-300 dark:hover:text-brand-secondary">{l.label}</Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/contact" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-sm font-medium text-slate-900 transition-colors hover:bg-brand-secondary/10 hover:text-brand-primary dark:text-slate-200 dark:hover:text-brand-secondary">Contact</Link>

              <div className="mt-3 flex flex-col gap-2 border-t border-[#e5e4e7] pt-3 dark:border-[#2e303a]">
                {user && isLearner ? (
                  // Logged-in learner
                  <Link
                    href="/learn/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold bg-brand-secondary text-white hover:bg-brand-secondary-dark transition-colors"
                  >
                    <div
                      className="flex h-6 w-6 items-center justify-center bg-white/20 text-xs font-bold"
                      aria-hidden="true"
                    >
                      {initials}
                    </div>
                    Continue Learning
                  </Link>
                ) : (
                  // Guest - Grey Block CTA
                  <Link
                    href="/learn"
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-center gap-2 border border-white/20 bg-[#4b5157] py-2.5 px-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-[#383d42] dark:bg-[#323940]"
                  >
                    <span>Start Learning</span>
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </Container>
          </div>
        )}
      </div>
    </header>
  );
}

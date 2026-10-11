'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';
import { courses, type CourseCategory } from '@/data/courses';
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

// Organized by SETA
const coursesBySETA = {
  'ETDP SETA': {
    'Occupational Certificates': [
      { code: 'OC-97154', title: 'Occupational Trainer', href: '/courses/occupational-trainer' },
      { code: 'OC-101321', title: 'Training and Development Practitioner', href: '/courses/training-development-practitioner' },
      { code: 'OC-97542', title: 'Early Childhood Development Practitioner', href: '/courses/ecd-practitioner', meta: 'L4 - 131 credits' },
    ],
    'Skills Programmes': [
      { code: 'SP-220319', title: 'Learning and Development Facilitator', href: '/courses/learning-development-facilitator' },
      { code: 'SP-220320', title: 'Assessment Practitioner', href: '/courses/assessment-practitioner' },
      { code: 'SP-220321', title: 'Skills Development Facilitation Practitioner', href: '/courses/sdf-practitioner' },
      { code: 'SP-220322', title: 'Workplace-based Practitioner Programme', href: '/courses/workplace-based-practitioner' },
      { code: 'SP-211001', title: 'Assistant Life Coach', href: '/courses/assistant-life-coach' },
    ],
  },
  'Services SETA': {
    'Skills Programmes': [
      { code: 'SP-201201', title: 'Workplace Preparation', href: '/courses/workplace-preparation' },
      { code: 'SP-211009', title: 'Workplace Essential Skills', href: '/courses/workplace-essential-skills' },
      { code: 'SP-211010', title: 'New Venture Creation', href: '/courses/new-venture-creation' },
    ],
  },
  'HWSETA': {
    'Occupational Certificates': [
      { code: 'OC-121929', title: 'Occupational Health and Safety Officer', href: '/courses/ohs-officer' },
      { code: 'OC-121930', title: 'Occupational Health and Safety Assistant', href: '/courses/ohs-assistant' },
    ],
    'First Aid Programmes': [
      { code: 'SP-230801', title: 'Basic Emergency First Aid Responder', href: '/courses/basic-first-aid' },
      { code: 'SP-230802', title: 'Intermediate Emergency First Aid Responder', href: '/courses/intermediate-first-aid' },
      { code: 'SP-230803', title: 'Advanced Emergency First Aid Responder', href: '/courses/advanced-first-aid' },
    ],
  },
  'Legacy Qualifications': {
    'Unit Standards Based': [
      // Add legacy unit standard courses here
      { code: 'US-xxxxx', title: 'Example Legacy Course', href: '/courses/legacy-example' },
    ],
  },
  'Short Courses': {
    'Professional Development': [
      // Non-accredited short courses
      { code: 'SC-001', title: 'Example Short Course', href: '/courses/short-course-example' },
    ],
  },
};

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
            'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors hover:text-brand-secondary',
            isActive ? 'text-brand-secondary' : 'text-text-primary dark:text-gray-300',
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
            'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors hover:text-brand-secondary',
            isActive ? 'text-brand-secondary' : 'text-text-primary dark:text-gray-300',
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
          className="absolute top-full left-0 min-w-56 bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
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
      className="block px-4 py-2.5 text-sm text-text-primary dark:text-gray-300 hover:bg-brand-secondary/10 hover:text-brand-secondary transition-colors"
    >
      {label}
    </Link>
  );
}

/* ─── courses mega dropdown ───────────────────────────────────────── */

function CoursesDropdown({ isActive }: { isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const [expandedSETA, setExpandedSETA] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    setExpandedSETA(null);
    setExpandedCategory(null);
  }, []);
  useClickOutside(ref, close);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/courses"
        className={cn(
          'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors hover:text-brand-secondary',
          isActive ? 'text-brand-secondary' : 'text-text-primary dark:text-gray-300',
        )}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Courses
        <FaChevronDown
          className={cn('text-[10px] mt-0.5 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </Link>

      {open && (
        <div
          role="menu"
          className="fixed left-0 right-0 top-[calc(100%+1px)] bg-white dark:bg-[#1f2028] border-t-2 border-brand-primary shadow-2xl z-50"
          style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
        >
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="grid grid-cols-4 gap-6">
              {Object.entries(coursesBySETA).map(([setaName, categories]) => {
                const setaKey = setaName.replace(/\s+/g, '-');
                const isExpanded = expandedSETA === setaKey;
                
                return (
                  <div key={setaName} className="border-r border-gray-200 dark:border-gray-700 pr-6 last:border-r-0">
                    <button
                      onClick={() => setExpandedSETA(isExpanded ? null : setaKey)}
                      className="w-full flex items-center justify-between text-left px-3 py-2 bg-brand-neutral/30 hover:bg-brand-neutral transition-colors mb-3"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-brand-secondary">
                        {setaName}
                      </span>
                      <FaChevronDown
                        className={cn('text-[10px] transition-transform', isExpanded && 'rotate-180')}
                        aria-hidden="true"
                      />
                    </button>
                    
                    {isExpanded && (
                      <div className="space-y-3">
                        {Object.entries(categories).map(([categoryName, programmes]) => {
                          const catKey = `${setaKey}-${categoryName.replace(/\s+/g, '-')}`;
                          const isCatExpanded = expandedCategory === catKey;
                          
                          return (
                            <div key={categoryName}>
                              <button
                                onClick={() => setExpandedCategory(isCatExpanded ? null : catKey)}
                                className="w-full flex items-center justify-between text-left px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              >
                                <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wide">
                                  {categoryName}
                                </span>
                                <FaChevronRight
                                  className={cn('text-[8px] transition-transform', isCatExpanded && 'rotate-90')}
                                  aria-hidden="true"
                                />
                              </button>
                              
                              {isCatExpanded && (
                                <div className="mt-1 space-y-0.5 pl-2">
                                  {programmes.map((prog) => (
                                    <Link
                                      role="menuitem"
                                      key={prog.code}
                                      href={prog.href}
                                      className="block px-2 py-1.5 text-xs text-text-primary dark:text-gray-300 hover:text-brand-secondary hover:bg-brand-neutral/50 transition-colors"
                                      onClick={close}
                                    >
                                      <span className="font-mono text-text-muted">[{prog.code}]</span>
                                      {' '}
                                      <span>{prog.title}</span>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-4 text-center">
              <Link
                role="menuitem"
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-2 bg-brand-secondary text-white text-sm font-semibold hover:bg-brand-secondary-dark transition-colors"
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

export function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileAccreditationOpen, setMobileAccreditationOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const user = session?.user;
  const isLearner = user?.role === 'LEARNER';
  
  function getInitials(name?: string | null) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
  
  const initials = getInitials(user?.name);

  // Track scroll position
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
      const currentScrollY = window.scrollY;
      
      // Show contact bar when scrolling up or at top
      // Hide when scrolling down past 100px
      if (currentScrollY < 50) {
        setScrolled(false);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrolled(true);
      } else if (currentScrollY < lastScrollY) {
        setScrolled(false);
      }
      
      lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
          "bg-brand-primary text-white text-sm py-2 hidden md:block transition-all duration-300",
          scrolled ? "-translate-y-full opacity-0 h-0 overflow-hidden" : "translate-y-0 opacity-100"
        )}
      >
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="mailto:headoffice@ndzalama.org.za"
              className="flex items-center gap-2 hover:text-brand-secondary transition-colors"
            >
              <FaEnvelope aria-hidden="true" />
              headoffice@ndzalama.org.za
            </a>
            <a
              href="tel:+27155900732"
              className="flex items-center gap-2 hover:text-brand-secondary transition-colors"
            >
              <FaPhone aria-hidden="true" />
              +(27) 15-5900-732
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=27664832441"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-brand-secondary transition-colors"
            >
              <FaWhatsapp aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>

          <div className="flex items-center gap-3">
            {[
              { href: 'https://www.facebook.com/ndzalamatraining.co.za', label: 'Facebook', Icon: FaFacebookF },
              { href: '#', label: 'Instagram', Icon: FaInstagram },
              { href: '#', label: 'Twitter', Icon: FaTwitter },
              { href: '#', label: 'LinkedIn', Icon: FaLinkedinIn },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href !== '#' ? '_blank' : undefined}
                rel={href !== '#' ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="hover:text-brand-secondary transition-colors"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </Container>
      </div>

      {/* ── main nav ── */}
      <div className="bg-white dark:bg-[#16171d] border-b border-[#e5e4e7] dark:border-[#2e303a] shadow-sm">
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
                'px-4 py-2 text-sm font-medium transition-colors hover:text-brand-secondary',
                pathname === '/' ? 'text-brand-secondary' : 'text-text-primary dark:text-gray-300',
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
                'px-4 py-2 text-sm font-medium transition-colors hover:text-brand-secondary',
                pathname.startsWith('/posts') ? 'text-brand-secondary' : 'text-text-primary dark:text-gray-300',
              )}
            >
              Updates
            </Link>

            <Link
              href="/contact"
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors hover:text-brand-secondary',
                pathname === '/contact' ? 'text-brand-secondary' : 'text-text-primary dark:text-gray-300',
              )}
            >
              Contact
            </Link>

            {/* CTA - Single "Student Portal" button */}
            <div className="flex items-center gap-2 ml-3">
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
                    {user.name?.split(' ')[0]}
                  </span>
                </Link>
              ) : (
                // Guest user - single CTA button
                <Link
                  href="/learn"
                  className="px-5 py-2 text-sm font-semibold bg-brand-secondary text-white hover:bg-brand-secondary-dark transition-colors shadow-sm flex items-center gap-2"
                >
                  Begin Your Journey
                  <FaArrowRight className="text-xs" aria-hidden="true" />
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
            className="lg:hidden border-t border-[#e5e4e7] dark:border-[#2e303a] bg-white dark:bg-[#16171d]"
          >
            <Container className="py-4 flex flex-col gap-1">
              {/* Contact info strip */}
              <div className="flex flex-col gap-2 pb-3 mb-3 border-b border-[#e5e4e7] dark:border-[#2e303a]">
                <a href="mailto:headoffice@ndzalama.org.za" className="flex items-center gap-2 text-sm text-brand-primary dark:text-brand-secondary">
                  <FaEnvelope aria-hidden="true" /> headoffice@ndzalama.org.za
                </a>
                <a href="tel:+27155900732" className="flex items-center gap-2 text-sm text-brand-primary dark:text-brand-secondary">
                  <FaPhone aria-hidden="true" /> +(27) 15-5900-732
                </a>
              </div>

              <Link href="/" className="block py-2 px-3 text-sm font-medium hover:bg-brand-secondary/10 hover:text-brand-secondary transition-colors text-text-primary dark:text-gray-300">Home</Link>

              {/* About accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileAboutOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-2 px-3 text-sm font-medium hover:bg-brand-secondary/10 hover:text-brand-secondary transition-colors text-text-primary dark:text-gray-300"
                  aria-expanded={mobileAboutOpen}
                >
                  About
                  <FaChevronDown className={cn('text-xs transition-transform', mobileAboutOpen && 'rotate-180')} aria-hidden="true" />
                </button>
                {mobileAboutOpen && (
                  <div className="pl-4 mt-1 flex flex-col gap-1">
                    {aboutLinks.map((l) => (
                      <Link key={l.href} href={l.href} className="block py-2 px-3 text-sm text-text-secondary dark:text-gray-400 rounded hover:bg-brand-secondary/10 hover:text-brand-secondary transition-colors">{l.label}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Courses accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileCoursesOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-2 px-3 text-sm font-medium rounded hover:bg-brand-secondary/10 hover:text-brand-secondary transition-colors text-text-primary dark:text-gray-300"
                  aria-expanded={mobileCoursesOpen}
                >
                  Courses
                  <FaChevronDown className={cn('text-xs transition-transform', mobileCoursesOpen && 'rotate-180')} aria-hidden="true" />
                </button>
                {mobileCoursesOpen && (
                  <div className="pl-4 mt-1 flex flex-col gap-2">
                    {Object.entries(coursesBySETA).map(([setaName, categories]) => (
                      <div key={setaName}>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary dark:text-brand-secondary px-3 pt-2 pb-1">
                          {setaName}
                        </p>
                        {Object.entries(categories).map(([categoryName, programmes]) => (
                          <div key={categoryName} className="pl-2">
                            <p className="text-[9px] font-semibold uppercase tracking-wide text-text-secondary px-3 pt-1.5 pb-0.5">
                              {categoryName}
                            </p>
                            {programmes.map((prog) => (
                              <Link 
                                key={prog.code} 
                                href={prog.href} 
                                className="block py-1.5 px-3 text-xs text-text-secondary dark:text-gray-400 rounded hover:bg-brand-secondary/10 hover:text-brand-secondary transition-colors"
                              >
                                {prog.title}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                    <Link href="/courses" className="flex items-center gap-2 py-2 px-3 text-sm font-semibold text-brand-secondary hover:underline">
                      View All Courses <FaArrowRight className="text-xs" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/posts" className="block py-2 px-3 text-sm font-medium hover:bg-brand-secondary/10 hover:text-brand-secondary transition-colors text-text-primary dark:text-gray-300">Updates</Link>

              {/* Accreditation accordion (includes Verify) */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileAccreditationOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-2 px-3 text-sm font-medium hover:bg-brand-secondary/10 hover:text-brand-secondary transition-colors text-text-primary dark:text-gray-300"
                  aria-expanded={mobileAccreditationOpen}
                >
                  Accreditation
                  <FaChevronDown className={cn('text-xs transition-transform', mobileAccreditationOpen && 'rotate-180')} aria-hidden="true" />
                </button>
                {mobileAccreditationOpen && (
                  <div className="pl-4 mt-1 flex flex-col gap-1">
                    {accreditationLinks.map((l) => (
                      <Link key={l.href} href={l.href} className="block py-2 px-3 text-sm text-text-secondary dark:text-gray-400 hover:bg-brand-secondary/10 hover:text-brand-secondary transition-colors">{l.label}</Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/contact" className="block py-2 px-3 text-sm font-medium hover:bg-brand-secondary/10 hover:text-brand-secondary transition-colors text-text-primary dark:text-gray-300">Contact</Link>

              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[#e5e4e7] dark:border-[#2e303a]">
                {user && isLearner ? (
                  // Logged-in learner
                  <Link
                    href="/learn/dashboard"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold bg-brand-secondary text-white hover:bg-brand-secondary-dark transition-colors"
                  >
                    <div
                      className="flex h-6 w-6 items-center justify-center bg-white/20 text-xs font-bold"
                      aria-hidden="true"
                    >
                      {initials}
                    </div>
                    My Dashboard
                  </Link>
                ) : (
                  // Guest - single CTA button
                  <Link
                    href="/learn"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-semibold bg-brand-secondary text-white hover:bg-brand-secondary-dark transition-colors"
                  >
                    Begin Your Journey
                    <FaArrowRight className="text-xs" aria-hidden="true" />
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

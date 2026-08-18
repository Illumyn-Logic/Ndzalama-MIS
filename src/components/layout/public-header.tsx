'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
];

const courseCategories: CourseCategory[] = [
  'Occupational Certificates',
  'Skills Programmes',
  'Short Courses',
  'OD-ETDP NC',
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
            'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded transition-colors hover:text-[#84ba3f]',
            isActive ? 'text-[#84ba3f]' : 'text-[#333] dark:text-gray-300',
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
            'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded transition-colors hover:text-[#84ba3f]',
            isActive ? 'text-[#84ba3f]' : 'text-[#333] dark:text-gray-300',
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
          className="absolute top-full left-0 min-w-56 bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
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
      className="block px-4 py-2.5 text-sm text-[#333] dark:text-gray-300 hover:bg-[#84ba3f]/10 hover:text-[#84ba3f] transition-colors"
    >
      {label}
    </Link>
  );
}

/* ─── courses mega dropdown ───────────────────────────────────────── */

function CoursesDropdown({ isActive }: { isActive: boolean }) {
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
      <Link
        href="/courses"
        className={cn(
          'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded transition-colors hover:text-[#84ba3f]',
          isActive ? 'text-[#84ba3f]' : 'text-[#333] dark:text-gray-300',
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
          className="absolute top-full left-0 w-[480px] bg-white dark:bg-[#1f2028] border border-[#e5e4e7] dark:border-[#2e303a] rounded-xl shadow-xl py-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="grid grid-cols-2 gap-x-4 px-4">
            {courseCategories.map((category) => {
              const categoryCourses = courses.filter((c) => c.category === category);
              return (
                <div key={category} className="mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#006600] dark:text-[#84ba3f] px-1 mb-1.5">
                    {category}
                  </p>
                  {categoryCourses.map((course) => (
                    <Link
                      role="menuitem"
                      key={course.slug}
                      href={`/courses/${course.slug}`}
                      className="flex items-center gap-1.5 px-1 py-1.5 text-sm text-[#333] dark:text-gray-300 hover:text-[#84ba3f] transition-colors rounded group"
                    >
                      <FaChevronRight className="text-[8px] text-[#84ba3f] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" aria-hidden="true" />
                      {course.title}
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="border-t border-[#e5e4e7] dark:border-[#2e303a] mt-2 pt-2 px-4">
            <Link
              role="menuitem"
              href="/courses"
              className="flex items-center gap-2 text-sm font-semibold text-[#84ba3f] hover:text-[#6ea032] transition-colors"
            >
              View All Courses
              <FaArrowRight className="text-xs" aria-hidden="true" />
            </Link>
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
  const pathname = usePathname();

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
      <div className="bg-[#006600] text-white text-sm py-2 hidden md:block">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="mailto:headoffice@ndzalama.org.za"
              className="flex items-center gap-2 hover:text-[#84ba3f] transition-colors"
            >
              <FaEnvelope aria-hidden="true" />
              headoffice@ndzalama.org.za
            </a>
            <a
              href="tel:+27155900732"
              className="flex items-center gap-2 hover:text-[#84ba3f] transition-colors"
            >
              <FaPhone aria-hidden="true" />
              +(27) 15-5900-732
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=27664832441"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#84ba3f] transition-colors"
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
                className="hover:text-[#84ba3f] transition-colors"
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
                'px-4 py-2 text-sm font-medium rounded transition-colors hover:text-[#84ba3f]',
                pathname === '/' ? 'text-[#84ba3f]' : 'text-[#333] dark:text-gray-300',
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

            {/* Accreditation dropdown */}
            <NavDropdown label="Accreditation" isActive={isAccreditationActive}>
              {accreditationLinks.map((l) => (
                <DropdownItem key={l.href} href={l.href} label={l.label} />
              ))}
            </NavDropdown>

            <Link
              href="/contact"
              className={cn(
                'px-4 py-2 text-sm font-medium rounded transition-colors hover:text-[#84ba3f]',
                pathname === '/contact' ? 'text-[#84ba3f]' : 'text-[#333] dark:text-gray-300',
              )}
            >
              Contact
            </Link>

            {/* CTA group */}
            <div className="flex items-center gap-2 ml-3">
              <Link
                href="/register"
                className="px-5 py-2 text-sm font-semibold rounded-full bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors"
              >
                Apply Now
              </Link>
              <Link
                href="/login"
                className="px-5 py-2 text-sm font-semibold rounded-full border-2 border-[#6b7280] text-[#6b7280] hover:bg-[#6b7280] hover:text-white transition-colors dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-500 dark:hover:text-white"
              >
                Student Portal
              </Link>
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
                <a href="mailto:headoffice@ndzalama.org.za" className="flex items-center gap-2 text-sm text-[#006600] dark:text-[#84ba3f]">
                  <FaEnvelope aria-hidden="true" /> headoffice@ndzalama.org.za
                </a>
                <a href="tel:+27155900732" className="flex items-center gap-2 text-sm text-[#006600] dark:text-[#84ba3f]">
                  <FaPhone aria-hidden="true" /> +(27) 15-5900-732
                </a>
              </div>

              <Link href="/" className="block py-2 px-3 text-sm font-medium rounded hover:bg-[#84ba3f]/10 hover:text-[#84ba3f] transition-colors text-[#333] dark:text-gray-300">Home</Link>

              {/* About accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileAboutOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-2 px-3 text-sm font-medium rounded hover:bg-[#84ba3f]/10 hover:text-[#84ba3f] transition-colors text-[#333] dark:text-gray-300"
                  aria-expanded={mobileAboutOpen}
                >
                  About
                  <FaChevronDown className={cn('text-xs transition-transform', mobileAboutOpen && 'rotate-180')} aria-hidden="true" />
                </button>
                {mobileAboutOpen && (
                  <div className="pl-4 mt-1 flex flex-col gap-1">
                    {aboutLinks.map((l) => (
                      <Link key={l.href} href={l.href} className="block py-2 px-3 text-sm text-[#555] dark:text-gray-400 rounded hover:bg-[#84ba3f]/10 hover:text-[#84ba3f] transition-colors">{l.label}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Courses accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileCoursesOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-2 px-3 text-sm font-medium rounded hover:bg-[#84ba3f]/10 hover:text-[#84ba3f] transition-colors text-[#333] dark:text-gray-300"
                  aria-expanded={mobileCoursesOpen}
                >
                  Courses
                  <FaChevronDown className={cn('text-xs transition-transform', mobileCoursesOpen && 'rotate-180')} aria-hidden="true" />
                </button>
                {mobileCoursesOpen && (
                  <div className="pl-4 mt-1 flex flex-col gap-1">
                    {courseCategories.map((category) => {
                      const categoryCourses = courses.filter((c) => c.category === category);
                      return (
                        <div key={category}>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#006600] dark:text-[#84ba3f] px-3 pt-2 pb-1">
                            {category}
                          </p>
                          {categoryCourses.map((course) => (
                            <Link key={course.slug} href={`/courses/${course.slug}`} className="block py-1.5 px-3 text-sm text-[#555] dark:text-gray-400 rounded hover:bg-[#84ba3f]/10 hover:text-[#84ba3f] transition-colors">
                              {course.title}
                            </Link>
                          ))}
                        </div>
                      );
                    })}
                    <Link href="/courses" className="flex items-center gap-2 py-2 px-3 text-sm font-semibold text-[#84ba3f] hover:underline">
                      View All Courses <FaArrowRight className="text-xs" aria-hidden="true" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Accreditation accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileAccreditationOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-2 px-3 text-sm font-medium rounded hover:bg-[#84ba3f]/10 hover:text-[#84ba3f] transition-colors text-[#333] dark:text-gray-300"
                  aria-expanded={mobileAccreditationOpen}
                >
                  Accreditation
                  <FaChevronDown className={cn('text-xs transition-transform', mobileAccreditationOpen && 'rotate-180')} aria-hidden="true" />
                </button>
                {mobileAccreditationOpen && (
                  <div className="pl-4 mt-1 flex flex-col gap-1">
                    {accreditationLinks.map((l) => (
                      <Link key={l.href} href={l.href} className="block py-2 px-3 text-sm text-[#555] dark:text-gray-400 rounded hover:bg-[#84ba3f]/10 hover:text-[#84ba3f] transition-colors">{l.label}</Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/contact" className="block py-2 px-3 text-sm font-medium rounded hover:bg-[#84ba3f]/10 hover:text-[#84ba3f] transition-colors text-[#333] dark:text-gray-300">Contact</Link>

              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[#e5e4e7] dark:border-[#2e303a]">
                <Link
                  href="/register"
                  className="block py-2.5 px-3 text-sm font-semibold rounded-full bg-[#84ba3f] text-white text-center hover:bg-[#6ea032] transition-colors"
                >
                  Apply Now
                </Link>
                <Link
                  href="/login"
                  className="block py-2.5 px-3 text-sm font-semibold rounded-full border-2 border-[#6b7280] text-[#6b7280] text-center hover:bg-[#6b7280] hover:text-white transition-colors"
                >
                  Student Portal
                </Link>
              </div>
            </Container>
          </div>
        )}
      </div>
    </header>
  );
}

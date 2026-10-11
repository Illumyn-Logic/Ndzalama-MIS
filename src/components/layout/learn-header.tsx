'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  FaHome, 
  FaBook, 
  FaInfoCircle, 
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChevronDown
} from 'react-icons/fa';

function getInitials(name?: string | null) {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function LearnHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = session?.user;
  const isLearner = user?.role === 'LEARNER';
  const initials = getInitials(user?.name);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/learn');
    router.refresh();
  };
  
  // Determine if we're on the authenticated dashboard
  const isDashboardView = pathname.startsWith('/learn/dashboard');

  // Different nav links for authenticated learners on dashboard
  const dashboardNavLinks = [
    { href: '/learn/', label: 'Home', icon: FaHome },
    { href: '/learn/dashboard', label: 'Learn', icon: FaBook },
    // { href: '/learn/ai-tutor', label: 'AI Tutor', icon: FaQuestionCircle },
    { href: '/learn/certification', label: 'Certification', icon: FaInfoCircle },
    
  ];

  const guestNavLinks = [
    { href: '/learn', label: 'Home', icon: FaHome },
    { href: '/learn/courses', label: 'Courses', icon: FaBook },
    { href: '/learn/about', label: 'About', icon: FaInfoCircle },
  ];

  const navLinks = (isLearner && isDashboardView) ? dashboardNavLinks : guestNavLinks;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#16171d]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#2e303a] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/learn" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/brand/logo.png"
              alt="Ndzalama Training"
              width={140}
              height={42}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="LMS navigation">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || (href !== '/learn' && href !== '/learn/dashboard' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'text-[#84ba3f] bg-[#84ba3f]/10'
                      : 'text-slate-700 dark:text-slate-300 hover:text-[#84ba3f] hover:bg-slate-100 dark:hover:bg-slate-800'
                  )}
                >
                  <Icon className="text-xs" aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
            
            {/* Search (only on dashboard) */}
            {isLearner && isDashboardView && (
              <div className="relative ml-2">
                <input
                  type="search"
                  placeholder="Search courses..."
                  className="w-64 pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}
          </nav>

          {/* Right side: Auth-aware CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              title="Back to public home"
              aria-label="Back to public home"
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#84ba3f] dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <FaHome aria-hidden="true" />
              <span className="hidden sm:inline">Public home</span>
            </Link>
            {user && isLearner ? (
              // Logged-in learner - Enhanced profile with dropdown
              <>
                {isDashboardView && (
                  <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-[#84ba3f]">36,900</span>
                      <span className="text-[10px] text-slate-500">XP</span>
                    </div>
                  </div>
                )}
                
                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#84ba3f] text-xs font-bold text-white"
                      aria-hidden="true"
                    >
                      {initials}
                    </div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white hidden md:block">
                      {user.name?.split(' ')[0] || 'User'}
                    </span>
                    <FaChevronDown 
                      className={cn(
                        "text-xs text-slate-500 transition-transform hidden md:block",
                        dropdownOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setDropdownOpen(false)}
                        aria-hidden="true"
                      />
                      
                      {/* Menu */}
                      <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-[#16171d] border border-slate-200 dark:border-[#2e303a] shadow-lg z-20 overflow-hidden">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-slate-200 dark:border-[#2e303a]">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {user.email}
                          </p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                          <Link
                            href="/learn/dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <FaHome className="text-xs" aria-hidden="true" />
                            Dashboard
                          </Link>
                          
                          <Link
                            href="/learn/profile"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <FaUser className="text-xs" aria-hidden="true" />
                            My Profile
                          </Link>

                          <Link
                            href="/learn/settings"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <FaCog className="text-xs" aria-hidden="true" />
                            Settings
                          </Link>
                        </div>

                        {/* Logout */}
                        <div className="border-t border-slate-200 dark:border-[#2e303a] py-1">
                          <button
                            onClick={() => {
                              setDropdownOpen(false);
                              handleSignOut();
                            }}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                          >
                            <FaSignOutAlt className="text-xs" aria-hidden="true" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              // Guest
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-[#84ba3f] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 text-sm font-bold rounded-full bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

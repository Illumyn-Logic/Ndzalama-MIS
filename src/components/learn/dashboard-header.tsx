'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  FaBell,
  FaBook,
  FaChevronDown,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from 'react-icons/fa';
import { cn } from '@/lib/utils';

export function LearnDashboardHeader() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState('');

  const firstName = session?.user?.name?.split(' ')[0] || 'Learner';
  const initials = session?.user?.name
    ?.split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = search.trim();
    router.push(query ? `/learn/courses?search=${encodeURIComponent(query)}` : '/learn/courses');
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-[#111318]/95">
      <div className="flex min-h-20 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="Return to Ndzalama Training homepage">
          <Image
            src="/images/brand/logo.png"
            alt="Ndzalama Training"
            width={150}
            height={45}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-700 lg:block" />
        <div className="hidden min-w-0 lg:block">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#84ba3f]">Learning hub</p>
          <p className="truncate text-sm font-bold text-slate-900 dark:text-white">Learner dashboard</p>
        </div>

        <form onSubmit={handleSearch} className="ml-auto hidden max-w-md flex-1 md:block">
          <label className="relative block">
            <span className="sr-only">Search courses</span>
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses and learning resources"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#84ba3f] focus:ring-2 focus:ring-[#84ba3f]/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </label>
        </form>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Learner quick links">
          <Link
            href="/learn/courses"
            className={cn(
              'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors',
              pathname === '/learn/courses'
                ? 'bg-[#84ba3f]/10 text-[#006600] dark:text-[#84ba3f]'
                : 'text-slate-600 hover:bg-slate-100 hover:text-[#006600] dark:text-slate-300 dark:hover:bg-slate-800'
            )}
          >
            <FaBook className="text-xs" aria-hidden="true" />
            Courses
          </Link>
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#006600] dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FaBell aria-hidden="true" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#84ba3f]" />
          </button>
        </nav>

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((open) => !open)}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 transition-colors hover:border-[#84ba3f] dark:border-slate-700 dark:bg-slate-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#006600] text-xs font-bold text-white">
              {initials}
            </span>
            <span className="hidden max-w-24 truncate text-left text-xs font-bold text-slate-900 dark:text-white lg:block">
              {firstName}
            </span>
            <FaChevronDown className="hidden text-[10px] text-slate-400 sm:block" aria-hidden="true" />
          </button>

          {profileOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-10 h-full w-full cursor-default"
                onClick={() => setProfileOpen(false)}
                aria-label="Close profile menu"
              />
              <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-[#16171d]" role="menu">
                <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                  <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{session?.user?.name}</p>
                  <p className="truncate text-xs text-slate-500">{session?.user?.email}</p>
                </div>
                <Link href="/learn/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800" role="menuitem">
                  <FaUser className="text-xs" aria-hidden="true" /> My profile
                </Link>
                <button type="button" onClick={handleSignOut} className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-950/20" role="menuitem">
                  <FaSignOutAlt className="text-xs" aria-hidden="true" /> Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden dark:border-slate-800">
        <Link href="/learn" className="whitespace-nowrap rounded-lg bg-[#84ba3f]/10 px-3 py-1.5 text-xs font-bold text-[#006600] dark:text-[#84ba3f]">Dashboard</Link>
        <Link href="/learn/courses" className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Courses</Link>
        <Link href="/learn/dashboard/assignments" className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Assignments</Link>
      </div>
    </header>
  );
}

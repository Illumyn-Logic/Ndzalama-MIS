'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import {
  FaTachometerAlt,
  FaClock,
  FaTrophy,
  FaClipboardList,
  FaBook,
  FaDumbbell,
  FaCheckCircle,
  FaProjectDiagram,
  FaTasks,
  FaCertificate,
  FaSignOutAlt,
  FaCog,
} from 'react-icons/fa';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const navigationItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/learn/dashboard',
    icon: <FaTachometerAlt />,
  },
  {
    label: 'My Activity',
    href: '/learn/dashboard/activity',
    icon: <FaClock />,
  },
  {
    label: 'Leaderboard',
    href: '/learn/dashboard/leaderboard',
    icon: <FaTrophy />,
  },
  {
    label: 'Assignments',
    href: '/learn/dashboard/assignments',
    icon: <FaClipboardList />,
    badge: 1,
  },
];

const learnSection: { title: string; items: NavItem[] } = {
  title: 'Learn',
  items: [
    {
      label: 'Career Tracks',
      href: '/learn/dashboard/tracks',
      icon: <FaProjectDiagram />,
    },
    {
      label: 'Courses',
      href: '/learn/dashboard/courses',
      icon: <FaBook />,
    },
    {
      label: 'Practice',
      href: '/learn/dashboard/practice',
      icon: <FaDumbbell />,
    },
    {
      label: 'Assessments',
      href: '/learn/dashboard/assessments',
      icon: <FaCheckCircle />,
    },
  ],
};

const applySection: { title: string; items: NavItem[] } = {
  title: 'Apply',
  items: [
    {
      label: 'Projects',
      href: '/learn/dashboard/projects',
      icon: <FaTasks />,
    },
    {
      label: 'Certifications',
      href: '/learn/dashboard/certifications',
      icon: <FaCertificate />,
    },
  ],
};

function getInitials(name?: string | null) {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function LearnDashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const initials = getInitials(user?.name);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/learn');
    router.refresh();
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-[#16171d] border-r border-slate-200 dark:border-slate-800 hidden lg:flex flex-col">
      {/* Brand Header */}
      {/* <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#84ba3f] to-[#006600] text-lg font-extrabold text-white shadow-md">
          N
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#84ba3f]">
            Learning Hub
          </p>
          <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
            Ndzalama LMS
          </h2>
        </div>
      </div> */}

      {/* User Profile Card */}
      {/* <div className="mx-4 mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
        <Link
          href="/learn/dashboard/profile"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#84ba3f] to-[#006600] text-white text-sm font-bold flex items-center justify-center shrink-0 shadow">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              36,900 XP
            </p>
          </div>
        </Link>
      </div> */}

       {/* Progress Card */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Getting Started
            </span>
            <span className="text-xs font-bold text-[#84ba3f]">3/4</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#006600] to-[#84ba3f] rounded-full transition-all"
              style={{ width: '75%' }}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-6">
        {/* Main Navigation */}
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all',
                  isActive
                    ? 'bg-[#84ba3f]/10 text-[#006600] dark:text-[#84ba3f]'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'text-base',
                      isActive
                        ? 'text-[#006600] dark:text-[#84ba3f]'
                        : 'text-slate-500'
                    )}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Learn Section */}
        <div>
          <h3 className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-2">
            {learnSection.title}
          </h3>
          <div className="space-y-1">
            {learnSection.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-[#84ba3f]/10 text-[#006600] dark:text-[#84ba3f]'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  )}
                >
                  <span
                    className={cn(
                      'text-sm',
                      isActive
                        ? 'text-[#006600] dark:text-[#84ba3f]'
                        : 'text-slate-500'
                    )}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Apply Section */}
        <div>
          <h3 className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600 mb-2">
            {applySection.title}
          </h3>
          <div className="space-y-1">
            {applySection.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-[#84ba3f]/10 text-[#006600] dark:text-[#84ba3f]'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  )}
                >
                  <span
                    className={cn(
                      'text-sm',
                      isActive
                        ? 'text-[#006600] dark:text-[#84ba3f]'
                        : 'text-slate-500'
                    )}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Settings & Logout */}
      <div className="px-4 pb-4 space-y-1">
        <Link
          href="/learn/settings"
          className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all"
        >
          <FaCog className="text-sm text-slate-500" />
          <span>Settings</span>
        </Link>
        
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
        >
          <FaSignOutAlt className="text-sm" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

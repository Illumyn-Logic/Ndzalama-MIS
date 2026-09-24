'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  FaTachometerAlt,
  FaClock,
  FaTrophy,
  FaClipboardList,
  FaBook,
  FaDumbbell,
  FaProjectDiagram,
  FaCertificate,
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
    href: '/learn',
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
  ],
};

const applySection: { title: string; items: NavItem[] } = {
  title: 'Apply',
  items: [
    {
      label: 'Certifications',
      href: '/learn/dashboard/certifications',
      icon: <FaCertificate />,
    },
  ],
};

export type SidebarExpansionMode = 'always' | 'hover' | 'never';

export const SIDEBAR_EXPANSION_STORAGE_KEY = 'ndzalama-sidebar-expansion';

export function LearnDashboardSidebar() {
  const pathname = usePathname();
  const [expansionMode, setExpansionMode] = useState<SidebarExpansionMode>('hover');
  const labelClassName = expansionMode === 'always'
    ? 'max-w-40 opacity-100'
    : 'max-w-0 overflow-hidden opacity-0 transition-all group-hover:max-w-40 group-hover:opacity-100 group-focus-within:max-w-40 group-focus-within:opacity-100';

  useEffect(() => {
    const applyStoredMode = () => {
      const storedMode = window.localStorage.getItem(SIDEBAR_EXPANSION_STORAGE_KEY);
      if (storedMode === 'always' || storedMode === 'hover' || storedMode === 'never') {
        setExpansionMode(storedMode);
      }
    };

    applyStoredMode();
    window.addEventListener('ndzalama-sidebar-expansion-change', applyStoredMode);
    return () => window.removeEventListener('ndzalama-sidebar-expansion-change', applyStoredMode);
  }, []);

  return (
    <aside className={cn(
      'group fixed inset-x-auto bottom-0 left-0 top-20 z-30 hidden flex-col border-r border-slate-200 bg-white transition-[width] duration-200 dark:border-slate-800 dark:bg-[#16171d] lg:flex',
      expansionMode === 'always'
        ? 'w-52'
        : expansionMode === 'never'
          ? 'w-16'
          : 'w-16 hover:w-52 focus-within:w-52'
    )}>

      {/* Navigation */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-2 py-6">
        {/* Main Navigation */}
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/learn' && pathname === '/learn/dashboard');
            return (
              <Link
                key={item.label}
                href={item.href}
                title={item.label}
                className={cn(
                  'flex items-center justify-between gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all',
                  isActive
                    ? 'bg-[#84ba3f]/10 text-[#006600] dark:text-[#84ba3f]'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                )}
              >
                <div className="flex min-w-0 items-center gap-3">
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
                  <span className={cn('truncate', labelClassName)}>{item.label}</span>
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
            <h3 className={cn('mb-2 truncate px-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600', labelClassName)}>
            {learnSection.title}
          </h3>
          <div className="space-y-1">
            {learnSection.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  title={item.label}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
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
                  <span className={cn('truncate', labelClassName)}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Apply Section */}
        <div>
            <h3 className={cn('mb-2 truncate px-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600', labelClassName)}>
            {applySection.title}
          </h3>
          <div className="space-y-1">
            {applySection.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  title={item.label}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
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
                  <span className={cn('truncate', labelClassName)}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

    </aside>
  );
}

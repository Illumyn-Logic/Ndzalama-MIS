'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  FaBook,
  FaCalendarAlt,
  FaCertificate,
  FaChartLine,
  FaClipboardList,
  FaComments,
  FaFileExport,
  FaGraduationCap,
  FaHistory,
  FaShieldAlt,
  FaTasks,
  FaUserGraduate,
  FaUserPlus,
  FaUsers,
} from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface AdminNavigationItem {
  label: string;
  href?: string;
  icon: ReactNode;
}

interface AdminNavigationSection {
  label: string;
  items: AdminNavigationItem[];
}

const sections: AdminNavigationSection[] = [
  {
    label: 'Workspace',
    items: [{ label: 'Dashboard', href: '/admin', icon: <FaChartLine aria-hidden="true" /> }],
  },
  {
    label: 'Learner lifecycle',
    items: [
      { label: 'Applications', icon: <FaClipboardList aria-hidden="true" /> },
      { label: 'Enrolments', icon: <FaUserPlus aria-hidden="true" /> },
      { label: 'Learner records', href: '/admin/learners', icon: <FaUserGraduate aria-hidden="true" /> },
      { label: 'Users & roles', icon: <FaUsers aria-hidden="true" /> },
    ],
  },
  {
    label: 'Learning delivery',
    items: [
      { label: 'Programmes', href: '/admin/programmes', icon: <FaGraduationCap aria-hidden="true" /> },
      { label: 'Courses & lessons', href: '/admin/courses', icon: <FaBook aria-hidden="true" /> },
      { label: 'Cohorts & schedules', icon: <FaCalendarAlt aria-hidden="true" /> },
    ],
  },
  {
    label: 'Quality & support',
    items: [
      { label: 'Assessment & PoE', icon: <FaTasks aria-hidden="true" /> },
      { label: 'Learner interventions', icon: <FaComments aria-hidden="true" /> },
      { label: 'Moderation', icon: <FaShieldAlt aria-hidden="true" /> },
    ],
  },
  {
    label: 'Credentials & compliance',
    items: [
      { label: 'Certificates & badges', icon: <FaCertificate aria-hidden="true" /> },
      { label: 'QCTO reporting', icon: <FaFileExport aria-hidden="true" /> },
      { label: 'Audit trail', icon: <FaHistory aria-hidden="true" /> },
    ],
  },
];

interface AdminNavigationProps {
  variant: 'sidebar' | 'mobile';
  onNavigate?: () => void;
}

export function AdminNavigation({ variant, onNavigate }: AdminNavigationProps) {
  const pathname = usePathname();
  const isSidebar = variant === 'sidebar';

  return (
    <nav aria-label="Admin navigation" className={isSidebar ? 'space-y-5' : 'space-y-3'}>
      {sections.map((section) => (
        <section key={section.label} aria-label={section.label}>
          <h3 className={cn(
            'mb-1 px-3 text-[10px] font-bold uppercase tracking-[0.16em]',
            isSidebar ? 'text-sky-200/60' : 'text-slate-500 dark:text-slate-400',
          )}>
            {section.label}
          </h3>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = Boolean(
                item.href && (pathname === item.href || (item.href !== '/admin' && pathname.startsWith(`${item.href}/`))),
              );
              const itemClassName = cn(
                'flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-xs font-semibold transition-colors',
                item.href
                  ? isSidebar
                    ? isActive
                      ? 'bg-white/15 text-white ring-1 ring-inset ring-white/15'
                      : 'text-sky-100/85 hover:bg-white/8 hover:text-white'
                    : isActive
                      ? 'bg-lime-50 text-[#006600] dark:bg-lime-950/40 dark:text-[#a8d76b]'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  : isSidebar
                    ? 'cursor-not-allowed text-sky-100/50'
                    : 'cursor-not-allowed text-slate-400 dark:text-slate-500',
              );
              const contents = (
                <>
                  <span className={cn(
                    'flex w-4 shrink-0 justify-center text-sm',
                    item.href ? (isSidebar ? 'text-[#a8d76b]' : 'text-[#006600] dark:text-[#84ba3f]') : 'opacity-70',
                  )}>
                    {item.icon}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.href ? null : (
                    <span className={cn(
                      'shrink-0 text-[9px] font-semibold uppercase tracking-wide',
                      isSidebar ? 'text-sky-200/60' : 'text-slate-400 dark:text-slate-500',
                    )}>
                      Planned
                    </span>
                  )}
                </>
              );

              return (
                <li key={item.label}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={isActive ? 'page' : undefined}
                      className={itemClassName}
                    >
                      {contents}
                    </Link>
                  ) : (
                    <span aria-disabled="true" className={itemClassName}>
                      {contents}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </nav>
  );
}
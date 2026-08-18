'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { label: 'Dashboard', href: '/admin', icon: '▣' },
  { label: 'Learners', href: '/admin/learners', icon: '◔' },
  { label: 'Courses', href: '/admin/courses', icon: '▤' },
  { label: 'Enrollments', href: '/admin/enrollments', icon: '◫' },
  { label: 'Assessments', href: '/admin/assessors', icon: '◍' },
  { label: 'Facilitators', href: '/admin/facilitators', icon: '◌' },
  { label: 'Schedules', href: '/admin/schedules', icon: '◐' },
  { label: 'Reports', href: '/admin/reports', icon: '◒' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 w-72 bg-[#03367A] text-white shadow-2xl hidden lg:flex flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-lg font-bold">
          N
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-100/80">
            Ndzalama
          </p>
          <h2 className="text-lg font-semibold">Admin LMS</h2>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Admin navigation">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href + '/'));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                isActive
                  ? 'bg-white/10 text-white shadow-inner ring-1 ring-white/20'
                  : 'text-slate-200 hover:bg-white/5 hover:text-white',
              )}
            >
              <span className="inline-flex w-5 justify-center text-base" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Status */}
      <div className="m-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-sky-100/80">
          System status
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-slate-200">Platform online</span>
          <span
            className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]"
            aria-label="Online"
          />
        </div>
      </div>
    </aside>
  );
}

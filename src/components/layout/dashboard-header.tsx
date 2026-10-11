'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaBars, FaHome, FaTimes } from 'react-icons/fa';
import { AdminNavigation } from '@/components/layout/admin-navigation';

function getInitials(name?: string | null) {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role || 'GUEST';
  const isAdminWorkspace = ['SUPER_ADMIN', 'ADMIN', 'REGISTRAR', 'FINANCE_OFFICER'].includes(role);
  const initials = getInitials(user?.name);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur-md dark:bg-[#16171d]/90 dark:border-slate-800">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#84ba3f]">
              {/* Format SUPER_ADMIN to Super Admin */}
              {role.replace('_', ' ')} WORKSPACE
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 font-mono">ETDP SETA: ETDP0204</span>
          </div>
          <h1 className="mt-0.5 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Ndzalama Unified Portal
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {isAdminWorkspace && (
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close admin navigation' : 'Open admin navigation'}
              aria-expanded={menuOpen}
              className="rounded-md border border-slate-200 p-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#84ba3f] dark:border-[#2e303a] dark:text-slate-200 lg:hidden"
            >
              {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </button>
          )}
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:border-[#84ba3f] hover:text-[#84ba3f] transition dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
          >
            <FaHome aria-hidden="true" />
            Back to public home
          </Link>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-3.5 py-1.5 dark:bg-slate-800/80 dark:border-slate-700">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#84ba3f] text-xs font-bold text-white shadow-sm shrink-0"
              aria-hidden="true"
            >
              {initials}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
      {menuOpen && isAdminWorkspace && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-slate-200 bg-white p-3 shadow-lg dark:border-[#2e303a] dark:bg-[#16171d] lg:hidden">
          <AdminNavigation variant="mobile" onNavigate={() => setMenuOpen(false)} />
          <Link href="/" onClick={() => setMenuOpen(false)} className="mt-3 flex items-center gap-3 border-t border-slate-200 px-3 py-3 text-sm font-semibold text-slate-500 dark:border-[#2e303a] dark:text-slate-400">
            <FaHome aria-hidden="true" />Back to public home
          </Link>
        </div>
      )}
    </header>
  );
}
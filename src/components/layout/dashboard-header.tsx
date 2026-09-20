'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaHome } from 'react-icons/fa';

function getInitials(name?: string | null) {
  if (!name) return 'U';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function DashboardHeader() {
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role || 'GUEST';
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
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:border-[#84ba3f] hover:text-[#84ba3f] transition dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
          >
            <FaHome aria-hidden="true" />
            Public Website
          </Link>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-3.5 py-1.5 dark:bg-slate-800/80 dark:border-slate-700">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#84ba3f] text-xs font-bold text-white shadow-sm flex-shrink-0"
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
    </header>
  );
}
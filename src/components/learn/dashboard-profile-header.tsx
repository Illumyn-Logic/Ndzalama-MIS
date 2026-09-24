'use client';

import { useSession } from 'next-auth/react';
import {
  FaBolt,
  FaFire,
  FaDumbbell,
} from 'react-icons/fa';

export function DashboardProfileHeader() {
  const { data: session } = useSession();
  const user = session?.user;

  const firstName = user?.name?.split(' ')[0] || 'Learner';

  return (
    <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Profile Info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#84ba3f] to-[#006600] flex items-center justify-center text-white text-xl font-bold shadow-md">
            {firstName[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Hey, {firstName}!
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              36,900 XP
            </p>
          </div>
        </div>

        {/* Right: Quick Stats */}
        <div className="hidden md:flex items-center gap-4">
          {/* Review Button */}
          <button className="relative p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors group">
            <FaDumbbell className="text-xl text-slate-600 dark:text-slate-400 group-hover:text-[#84ba3f]" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
              3
            </span>
          </button>

          {/* Streak */}
          <button className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors">
            <FaFire className="text-xl text-orange-500" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              0 days
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

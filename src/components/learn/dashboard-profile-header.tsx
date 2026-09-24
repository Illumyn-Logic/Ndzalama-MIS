'use client';

import { useSession } from 'next-auth/react';
import {
  FaFire,
  FaDumbbell,
} from 'react-icons/fa';

export function DashboardProfileHeader() {
  const { data: session } = useSession();
  const user = session?.user;

  const firstName = user?.name?.split(' ')[0] || 'Learner';

  return (
    <div className="border-b border-slate-200 pb-4 dark:border-slate-800">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Profile Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#006600] text-lg font-bold text-white">
            {firstName[0]}
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              Hey, {firstName}!
            </h1>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              36,900 XP
            </p>
          </div>
        </div>

        {/* Right: Quick Stats */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Review Button */}
          <button aria-label="Review items" className="relative rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:border-[#84ba3f] hover:text-[#006600] dark:border-slate-700 dark:bg-slate-900 dark:hover:text-[#84ba3f]">
            <FaDumbbell className="text-sm" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          {/* Streak */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <FaFire className="text-sm text-orange-500" />
            <span>
              0 days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

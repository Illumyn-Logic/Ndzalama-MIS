'use client';

import { useEffect, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import {
  SIDEBAR_EXPANSION_STORAGE_KEY,
  SidebarExpansionMode,
} from '@/components/learn/dashboard-sidebar';

const modes: Array<{
  value: SidebarExpansionMode;
  label: string;
  description: string;
}> = [
  {
    value: 'always',
    label: 'Always expanded',
    description: 'Keep the full navigation labels visible.',
  },
  {
    value: 'hover',
    label: 'Expand on hover',
    description: 'Show the full rail when you move over it.',
  },
  {
    value: 'never',
    label: 'Never expand',
    description: 'Keep the icon rail compact and use tooltips.',
  },
];

export default function LearnerSettingsPage() {
  const [mode, setMode] = useState<SidebarExpansionMode>('hover');

  useEffect(() => {
    const storedMode = window.localStorage.getItem(SIDEBAR_EXPANSION_STORAGE_KEY);
    if (storedMode === 'always' || storedMode === 'hover' || storedMode === 'never') {
      setMode(storedMode);
    }
  }, []);

  const updateMode = (nextMode: SidebarExpansionMode) => {
    setMode(nextMode);
    window.localStorage.setItem(SIDEBAR_EXPANSION_STORAGE_KEY, nextMode);
    window.dispatchEvent(new Event('ndzalama-sidebar-expansion-change'));
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-10 lg:px-10">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#84ba3f]/15 text-[#006600] dark:text-[#84ba3f]">
          <FaCog aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#84ba3f]">Learner preferences</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Choose how much space the learning navigation uses.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#16171d]">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Sidebar behavior</h2>
        <div className="mt-4 space-y-2">
          {modes.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-[#84ba3f] dark:border-slate-700 dark:hover:border-[#84ba3f]"
            >
              <input
                type="radio"
                name="sidebar-expansion"
                value={option.value}
                checked={mode === option.value}
                onChange={() => updateMode(option.value)}
                className="mt-1 accent-[#006600]"
              />
              <span>
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">{option.label}</span>
                <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">{option.description}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
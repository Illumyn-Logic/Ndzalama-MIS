'use client';

import { FaDesktop, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '@/context/theme-provider';

const options = [
  { value: 'light', label: 'Light', icon: FaSun },
  { value: 'dark', label: 'Dark', icon: FaMoon },
  { value: 'system', label: 'System', icon: FaDesktop },
] as const;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme();
  const activeOption = options.find((option) => option.value === theme) ?? options[2];
  const currentIndex = options.findIndex((option) => option.value === theme);
  const nextOption = options[(currentIndex + 1) % options.length];
  const Icon = activeOption.value === 'system'
    ? activeOption.icon
    : resolvedTheme === 'dark' ? FaMoon : FaSun;

  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-2.5 py-2 text-xs font-semibold text-slate-700 dark:border-[#2e303a] dark:bg-[#16171d]/80 dark:text-slate-200">
        <FaDesktop className="text-[11px]" aria-hidden="true" />
        <span className="hidden sm:inline">System</span>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setTheme(nextOption.value)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-2.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-[#84ba3f] hover:text-[#006600] focus:outline-none focus:ring-2 focus:ring-[#84ba3f]/30 dark:border-[#2e303a] dark:bg-[#16171d]/80 dark:text-slate-200 dark:hover:text-[#84ba3f]"
        aria-label={`Theme: ${activeOption.label}. Switch to ${nextOption.label} theme.`}
        title={`Switch to ${nextOption.label} theme`}
      >
        <Icon className="text-[11px]" aria-hidden="true" />
        <span className="hidden sm:inline">{activeOption.label}</span>
      </button>
    </div>
  );
}

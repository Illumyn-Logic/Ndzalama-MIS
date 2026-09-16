'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDemoAuth } from '@/context/demo-auth-context';
import { demoUsers, type UserRole } from '@/lib/offline-data';
import { cn } from '@/lib/utils';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaShieldAlt,
  FaUserShield,
  FaGlobe,
  FaChevronUp,
  FaTimes,
  FaExchangeAlt,
} from 'react-icons/fa';

const roleMeta: Record<
  UserRole,
  { label: string; icon: React.ReactNode; color: string; targetUrl: string; desc: string }
> = {
  visitor: {
    label: 'Visitor / Public',
    icon: <FaGlobe aria-hidden="true" />,
    color: 'bg-slate-600',
    targetUrl: '/',
    desc: 'Public website, catalog & enquiries',
  },
  learner: {
    label: 'Learner (Lerato)',
    icon: <FaUserGraduate aria-hidden="true" />,
    color: 'bg-emerald-600',
    targetUrl: '/dashboard/learner',
    desc: 'Active courses, modules, PoE & results',
  },
  facilitator: {
    label: 'Facilitator (Masilo)',
    icon: <FaChalkboardTeacher aria-hidden="true" />,
    color: 'bg-amber-600',
    targetUrl: '/dashboard/facilitator',
    desc: 'Attendance registers & cohort sessions',
  },
  assessor: {
    label: 'Assessor (Innocent)',
    icon: <FaClipboardCheck aria-hidden="true" />,
    color: 'bg-sky-600',
    targetUrl: '/dashboard/assessor',
    desc: 'PoE grading queue & rubric scoring',
  },
  moderator: {
    label: 'Moderator (Ferdie)',
    icon: <FaShieldAlt aria-hidden="true" />,
    color: 'bg-indigo-600',
    targetUrl: '/dashboard/moderator',
    desc: '10% sample QA review & reports',
  },
  sme_mentor: {
    label: 'Host Mentor (Sanette)',
    icon: <FaChalkboardTeacher aria-hidden="true" />,
    color: 'bg-teal-600',
    targetUrl: '/dashboard/mentor',
    desc: 'Workplace practical logbook sign-offs',
  },
  admin: {
    label: 'Admin (Sarah)',
    icon: <FaUserShield aria-hidden="true" />,
    color: 'bg-rose-600',
    targetUrl: '/dashboard/admin',
    desc: 'LMIS leads, cohorts, SETA exports',
  },
  super_admin: {
    label: 'Director (Basani)',
    icon: <FaUserShield aria-hidden="true" />,
    color: 'bg-purple-600',
    targetUrl: '/dashboard/admin',
    desc: 'Full operational governance & oversight',
  },
};

export function DemoRoleSwitcher() {
  const { currentRole, switchRole } = useDemoAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setIsOpen(false);
    const target = roleMeta[role].targetUrl;
    router.push(target);
  };

  const activeMeta = roleMeta[currentRole] || roleMeta.visitor;

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {/* Expanded Menu Modal */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#16171d] border border-slate-200 dark:border-[#2e303a] shadow-2xl p-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#84ba3f]">
                Interactive Demo Mode
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FaExchangeAlt className="text-xs text-[#84ba3f]" aria-hidden="true" />
                Switch Persona & Workspace
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              aria-label="Close role switcher"
            >
              <FaTimes aria-hidden="true" />
            </button>
          </div>

          <div className="mt-3 space-y-1.5 max-h-80 overflow-y-auto pr-1">
            {(Object.keys(roleMeta) as UserRole[]).map((roleKey) => {
              const meta = roleMeta[roleKey];
              const user = demoUsers[roleKey];
              const isSelected = currentRole === roleKey;

              return (
                <button
                  key={roleKey}
                  onClick={() => handleRoleSelect(roleKey)}
                  className={cn(
                    'w-full text-left p-2.5 rounded-xl transition-all flex items-center gap-3 border',
                    isSelected
                      ? 'border-[#84ba3f] bg-[#84ba3f]/10 shadow-sm'
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  )}
                >
                  <div
                    className={cn(
                      'w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm shrink-0 shadow-sm',
                      meta.color
                    )}
                  >
                    {meta.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {meta.label}
                      </p>
                      {isSelected && (
                        <span className="text-[10px] font-semibold text-[#84ba3f] bg-[#84ba3f]/15 px-1.5 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {meta.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Single URL (`ndzalama.co.za`)</span>
            <span className="text-[#84ba3f] font-medium">ETDP SETA & QCTO</span>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2.5 px-3.5 py-2.5 rounded-full text-white shadow-xl transition-all hover:scale-105 active:scale-95 border-2 border-white/20 backdrop-blur-md',
          activeMeta.color
        )}
        aria-label="Toggle demo persona switcher"
        aria-expanded={isOpen}
      >
        <span className="text-base">{activeMeta.icon}</span>
        <div className="text-left hidden sm:block">
          <p className="text-[10px] uppercase font-bold tracking-wider opacity-80 leading-none">
            Demo Persona
          </p>
          <p className="text-xs font-bold leading-tight truncate max-w-[130px]">
            {activeMeta.label.split(' (')[0]}
          </p>
        </div>
        <FaChevronUp
          className={cn('text-xs transition-transform', isOpen && 'rotate-180')}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

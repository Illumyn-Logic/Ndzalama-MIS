'use client';

import { FaBriefcase, FaBuilding, FaPhone, FaEnvelope } from 'react-icons/fa';
import { HostEmployer } from '@prisma/client';

interface EmployerReportCardProps {
  employer?: HostEmployer | null;
}

export function EmployerReportCard({ employer }: EmployerReportCardProps) {
  if (!employer) return null;

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-3 flex items-center gap-2">
        <FaBriefcase className="text-sm text-[#84ba3f]" />
        <h3 className="text-base font-bold">Sponsor Details</h3>
      </div>

      {/* Company Info */}
      <div className="mb-3 border-b border-white/10 pb-3">
        <div className="mb-3 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#006600]">
            <FaBuilding className="text-sm" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold mb-0.5">{employer.companyName}</h4>
            {employer.tradingName && employer.tradingName !== employer.companyName && (
              <p className="text-xs opacity-70">T/A {employer.tradingName}</p>
            )}
            <p className="text-xs opacity-60 mt-1">
              SDL: {employer.sdlNumber}
            </p>
          </div>
        </div>

        {/* SETA Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#84ba3f]/20 border border-[#84ba3f]/30">
          <span className="text-xs font-semibold text-[#84ba3f]">
            {employer.setaAffiliation}
          </span>
        </div>
      </div>

      {/* Contact Person */}
      <div className="space-y-2">
        <p className="text-xs font-semibold opacity-70 uppercase tracking-wider">
          Contact Person
        </p>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 space-y-2">
          <p className="text-sm font-bold">{employer.contactPersonName}</p>
          
          <div className="flex items-center gap-2 text-xs opacity-80">
            <FaEnvelope className="text-[10px]" />
            <a
              href={`mailto:${employer.contactEmail}`}
              className="hover:text-[#84ba3f] transition-colors"
            >
              {employer.contactEmail}
            </a>
          </div>
          
          <div className="flex items-center gap-2 text-xs opacity-80">
            <FaPhone className="text-[10px]" />
            <a
              href={`tel:${employer.contactPhone}`}
              className="hover:text-[#84ba3f] transition-colors"
            >
              {employer.contactPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-[10px] opacity-60 leading-relaxed">
          Your training is sponsored by this employer. Progress reports are shared
          monthly for compliance tracking.
        </p>
      </div>
    </div>
  );
}

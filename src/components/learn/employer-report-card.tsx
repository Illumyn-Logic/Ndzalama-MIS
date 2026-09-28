'use client';

import { FaBriefcase, FaBuilding, FaPhone, FaEnvelope } from 'react-icons/fa';
import { HostEmployer } from '@prisma/client';

interface EmployerReportCardProps {
  employer?: HostEmployer | null;
}

export function EmployerReportCard({ employer }: EmployerReportCardProps) {
  if (!employer) return null;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-2xl border border-slate-700 dark:border-slate-800 p-5 text-white">
      <div className="flex items-center gap-2 mb-4">
        <FaBriefcase className="text-[#84ba3f]" />
        <h3 className="text-lg font-bold">Sponsor Details</h3>
      </div>

      {/* Company Info */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#84ba3f] to-[#006600] flex items-center justify-center flex-shrink-0">
            <FaBuilding className="text-xl" />
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

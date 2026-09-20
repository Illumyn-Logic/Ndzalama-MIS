'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { verifiableCertificates, type VerifiableCertificate } from '@/lib/offline_data';
import {
  FaShieldAlt,
  FaCheckCircle,
  FaSearch,
  FaAward,
  FaBuilding,
  FaCalendarCheck,
  FaQrcode,
  FaExclamationTriangle,
} from 'react-icons/fa';

export default function VerifyPage() {
  const [certQuery, setCertQuery] = useState('');
  const [result, setResult] = useState<VerifiableCertificate | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certQuery.trim()) return;

    const query = certQuery.trim().toLowerCase();
    const match = verifiableCertificates.find(
      (c) =>
        c.certificateNumber.toLowerCase() === query ||
        c.verificationHash.toLowerCase() === query
    );

    setResult(match || null);
    setHasSearched(true);
  };

  const loadSample = (sampleNum: string) => {
    setCertQuery(sampleNum);
    const match = verifiableCertificates.find((c) => c.certificateNumber === sampleNum);
    setResult(match || null);
    setHasSearched(true);
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#0e0f14] min-h-screen">
      <Container className="max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#84ba3f]/15 text-[#4c7a1f] dark:text-[#84ba3f] text-xs font-bold uppercase tracking-wider mb-3">
            <FaShieldAlt aria-hidden="true" />
            Official Credential Verification
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Verify Ndzalama Credentials
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Verify the authenticity of qualifications, statements of results, and unit standard
            credits issued under ETDP SETA Accreditation <strong>ETDP0204</strong>.
          </p>
        </div>

        {/* Search Form Card */}
        <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-lg p-6 sm:p-8 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FaSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                aria-hidden="true"
              />
              <input
                type="text"
                value={certQuery}
                onChange={(e) => setCertQuery(e.target.value)}
                placeholder="Enter Certificate Number (e.g. NDZ-CERT-2026-8831) or Verification Hash"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#84ba3f] text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 rounded-2xl font-bold bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-md flex items-center justify-center gap-2 text-sm shrink-0"
            >
              <FaCheckCircle aria-hidden="true" />
              Verify Now
            </button>
          </form>

          {/* Sample quick buttons for testing */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>Try sample certificates:</span>
            <button
              type="button"
              onClick={() => loadSample('NDZ-CERT-2026-8831')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[#84ba3f] font-mono hover:bg-[#84ba3f]/10 transition-colors"
            >
              NDZ-CERT-2026-8831 (Facilitator)
            </button>
            <button
              type="button"
              onClick={() => loadSample('NDZ-CERT-2026-4412')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[#84ba3f] font-mono hover:bg-[#84ba3f]/10 transition-colors"
            >
              NDZ-CERT-2026-4412 (ODETDP NC)
            </button>
          </div>
        </div>

        {/* Search Results Display */}
        {hasSearched && (
          <div>
            {result ? (
              <div className="bg-white dark:bg-[#16171d] rounded-3xl border-2 border-[#84ba3f] shadow-2xl p-8 sm:p-10 relative overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                {/* Status Watermark */}
                <div className="absolute top-0 right-0 bg-[#84ba3f] text-white px-6 py-1.5 rounded-bl-2xl text-xs font-bold tracking-wider flex items-center gap-1.5 uppercase shadow-sm">
                  <FaCheckCircle aria-hidden="true" /> Verified & Authentic
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#006600]/10 text-[#006600] dark:text-[#84ba3f] flex items-center justify-center text-2xl shrink-0">
                    <FaAward aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#84ba3f] uppercase tracking-wider">
                      Official SAQA Accredited Credential
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {result.qualificationTitle}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      Certificate No: <strong className="text-slate-800 dark:text-slate-200">{result.certificateNumber}</strong>
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 my-6">
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-semibold">Awarded To</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{result.learnerName}</p>
                    <p className="text-xs text-slate-500 font-mono">ID: {result.idNumberMasked}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-semibold">SAQA / NQF Level</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      SAQA ID: {result.saqaId} (NQF Level {result.nqfLevel})
                    </p>
                    <p className="text-xs text-[#84ba3f] font-semibold">{result.credits} National Credits</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-semibold">Issue Date</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1.5">
                      <FaCalendarCheck className="text-[#84ba3f] text-xs" aria-hidden="true" />
                      {result.issueDate}
                    </p>
                    <p className="text-xs text-slate-500">SETA Batch: {result.setaEndorsementRef}</p>
                  </div>
                </div>

                {/* Security Seal & Hash */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <FaBuilding className="text-[#006600] dark:text-[#84ba3f]" aria-hidden="true" />
                    <span>
                      Training Provider: <strong>Ndzalama Training (PTY) LTD</strong> (Accreditation: <strong>{result.accreditationNumber}</strong>)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 truncate max-w-xs">
                    <FaQrcode className="shrink-0 text-sm text-[#84ba3f]" aria-hidden="true" />
                    <span className="truncate">Hash: {result.verificationHash}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-rose-200 dark:border-rose-900/50 shadow p-8 text-center animate-in fade-in duration-200">
                <FaExclamationTriangle className="text-3xl text-rose-500 mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  No Matching Credential Found
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  We could not find a record matching &ldquo;{certQuery}&rdquo;. Please verify the certificate number or contact our registrar at{' '}
                  <a href="mailto:headoffice@ndzalama.org.za" className="text-[#84ba3f] underline">
                    headoffice@ndzalama.org.za
                  </a>.
                </p>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

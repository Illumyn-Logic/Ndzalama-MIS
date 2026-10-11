'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/container';
import { verifiableCertificates, type VerifiableCertificate } from '@/lib/offline_data';
import {
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
    <>
      {/* Hero: Canopy Header */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#102e14] via-[#163f1b] to-[#0c2210] text-white dark:from-[#061408] dark:via-[#091f0c] dark:to-[#040e05] py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(123,198,45,0.15),transparent_60%)]" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 bg-black/25 backdrop-blur-xs border border-white/20 text-xs font-semibold uppercase tracking-[0.22em] text-white/95">
              <span className="h-2 w-2 rounded-full bg-[#efa936] shadow-xs shadow-amber-400" aria-hidden="true" />
              <span>Official Verification Registry</span>
              <span className="text-white/30">|</span>
              <span className="text-white/80">ETDP0204</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Verify Ndzalama Credentials
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
              Verify the authenticity of qualifications, statements of results, and unit standard credits issued under ETDP SETA Accreditation <strong>ETDP0204</strong>.
            </p>
          </div>
        </Container>
      </section>

      {/* Flush 4-Block Strip */}
      <div className="grid h-2.5 grid-cols-4 gap-0 shadow-xs" aria-hidden="true">
        <span className="bg-[#efa936]" />
        <span className="bg-[#249c9b]" />
        <span className="bg-[#ed704c]" />
        <span className="bg-[#6b6570]" />
      </div>

      <section className="py-16 bg-slate-50 dark:bg-[#0b1a0b] min-h-screen">
        <Container className="max-w-4xl">
          {/* Search Form Card */}
          <div className="bg-white dark:bg-[#122415] rounded-3xl border border-slate-200 dark:border-white/10 shadow-lg p-6 sm:p-8 mb-8">
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
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-white/15 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3.5 rounded-2xl font-bold bg-brand-primary text-white hover:bg-brand-primary-light transition-colors shadow-md flex items-center justify-center gap-2 text-sm shrink-0"
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
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-brand-primary dark:text-brand-secondary font-mono hover:bg-brand-primary/10 transition-colors"
              >
                NDZ-CERT-2026-8831 (Facilitator)
              </button>
              <button
                type="button"
                onClick={() => loadSample('NDZ-CERT-2026-4412')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-brand-primary dark:text-brand-secondary font-mono hover:bg-brand-primary/10 transition-colors"
              >
                NDZ-CERT-2026-4412 (ODETDP NC)
              </button>
            </div>
          </div>

          {/* Search Results Display */}
          {hasSearched && (
            <div>
              {result ? (
                <div className="bg-white dark:bg-[#122415] rounded-3xl border-2 border-brand-primary shadow-2xl p-8 sm:p-10 relative overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {/* Status Watermark */}
                  <div className="absolute top-0 right-0 bg-brand-primary text-white px-6 py-1.5 rounded-bl-2xl text-xs font-bold tracking-wider flex items-center gap-1.5 uppercase shadow-sm">
                    <FaCheckCircle aria-hidden="true" /> Verified &amp; Authentic
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary dark:text-brand-secondary flex items-center justify-center text-2xl shrink-0">
                      <FaAward aria-hidden="true" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-brand-primary dark:text-brand-secondary uppercase tracking-wider">
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
                    <p className="text-xs text-brand-primary dark:text-brand-secondary font-semibold">{result.credits} National Credits</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase font-semibold">Issue Date</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-1.5">
                      <FaCalendarCheck className="text-brand-primary dark:text-brand-secondary text-xs" aria-hidden="true" />
                      {result.issueDate}
                    </p>
                    <p className="text-xs text-slate-500">SETA Batch: {result.setaEndorsementRef}</p>
                  </div>
                </div>

                {/* Security Seal & Hash */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <FaBuilding className="text-brand-primary dark:text-brand-secondary" aria-hidden="true" />
                    <span>
                      Training Provider: <strong>Ndzalama Training (PTY) LTD</strong> (Accreditation: <strong>{result.accreditationNumber}</strong>)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 truncate max-w-xs">
                    <FaQrcode className="shrink-0 text-sm text-brand-primary dark:text-brand-secondary" aria-hidden="true" />
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
                  <a href="mailto:headoffice@ndzalama.org.za" className="text-brand-primary underline dark:text-brand-secondary">
                    headoffice@ndzalama.org.za
                  </a>.
                </p>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
    </>
  );
}

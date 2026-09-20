'use client';

import React, { useState } from 'react';
import { initialModeratorQueue, type ModeratorQueueItem } from '@/lib/offline_data';
import {
  FaShieldAlt,
  FaCheckCircle,
  FaFileAlt,
  FaCheckDouble,
  FaFileExport,
  FaBuilding,
  FaUserCheck,
} from 'react-icons/fa';

export default function ModeratorDashboardPage() {
  const [samples, setSamples] = useState<ModeratorQueueItem[]>(initialModeratorQueue);
  const [selectedSample, setSelectedSample] = useState<ModeratorQueueItem | null>(samples[0]);
  const [notes, setNotes] = useState(
    'Assessor evaluation conforms strictly to ETDP SETA VACS principles (Valid, Authentic, Current, Sufficient). Decision endorsed.'
  );
  const [decisionNotice, setDecisionNotice] = useState<string | null>(null);

  const handleEndorseDecision = (decision: 'Upheld' | 'Overturned') => {
    if (!selectedSample) return;

    setSamples((prev) =>
      prev.map((s) =>
        s.id === selectedSample.id
          ? { ...s, moderationStatus: decision, moderatorNotes: notes }
          : s
      )
    );

    setDecisionNotice(
      `Moderation decision recorded for ${selectedSample.learnerName}: ${decision.toUpperCase()} — added to SETA Verification Audit file.`
    );

    setTimeout(() => setDecisionNotice(null), 5000);
  };

  return (
    <div className="space-y-8">
      {/* Moderator Header */}
      <div className="bg-gradient-to-r from-[#1e1b4b] to-[#03367A] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
            Internal Moderation & Quality Assurance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Welcome, Lead Moderator Ferdie Wevell
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-xl">
            Moderator Registration: <strong>ETDP-MOD-4419</strong>. Conducting statistical 10%–20% cohort sampling to ensure assessment validity and SETA compliance.
          </p>
        </div>
        <div className="bg-white/10 p-3 rounded-2xl border border-white/20 text-right shrink-0">
          <span className="text-[10px] uppercase font-bold text-indigo-200">Sampling Rate</span>
          <p className="text-2xl font-bold text-emerald-400">15% Achieved</p>
        </div>
      </div>

      {decisionNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <FaCheckCircle className="text-emerald-500 text-sm" aria-hidden="true" />
          {decisionNotice}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Sampled Batch */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FaCheckDouble className="text-[#84ba3f]" aria-hidden="true" />
              10% Moderation Sample Queue
            </h3>
            <span className="text-xs text-slate-400">{samples.length} Samples</span>
          </div>

          <div className="space-y-3">
            {samples.map((s) => {
              const isSelected = selectedSample?.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedSample(s)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#84ba3f] bg-white dark:bg-[#16171d] shadow-lg ring-2 ring-[#84ba3f]/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#16171d]/60 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300">
                      {s.sampledReason}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        s.moderationStatus === 'Upheld'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                          : s.moderationStatus === 'Overturned'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                      }`}
                    >
                      {s.moderationStatus}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {s.learnerName}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">{s.courseTitle}</p>

                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Assessor: {s.assessorName}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Score: {s.score}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Moderation QA Review Workbench */}
        {selectedSample && (
          <div className="lg:col-span-7 bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#84ba3f]">
                  Moderation QA Decision
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedSample.learnerName}
                </h3>
                <p className="text-xs text-slate-500">{selectedSample.courseTitle}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Assessor Judgement</span>
                <span className="text-xs font-bold text-emerald-600">
                  {selectedSample.assessorDecision} ({selectedSample.score}%)
                </span>
              </div>
            </div>

            {/* QA Checklist */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                Quality Assurance Criteria Checklist
              </h4>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
                <span>1. Was the assessment instrument valid and aligned to SAQA criteria?</span>
                <FaCheckCircle className="text-emerald-500 shrink-0" aria-hidden="true" />
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
                <span>2. Is the candidate evidence authentic and verifiable?</span>
                <FaCheckCircle className="text-emerald-500 shrink-0" aria-hidden="true" />
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
                <span>3. Did the assessor provide actionable, constructive feedback?</span>
                <FaCheckCircle className="text-emerald-500 shrink-0" aria-hidden="true" />
              </div>
            </div>

            {/* Moderator Notes */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
                Moderator Official Endorsement Report
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
              />
            </div>

            {/* Decision Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Moderator: <strong>Ferdie Wevell</strong> (ETDP-MOD-4419)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEndorseDecision('Overturned')}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border border-rose-300 text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Overturn
                </button>
                <button
                  type="button"
                  onClick={() => handleEndorseDecision('Upheld')}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-md flex items-center gap-1.5"
                >
                  <FaUserCheck aria-hidden="true" />
                  Upheld & Endorse for SETA
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

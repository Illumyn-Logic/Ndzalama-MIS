'use client';

import React, { useState } from 'react';
import { initialAssessorQueue, type AssessorQueueItem } from '@/lib/offline_data';
import {
  FaTasks,
  FaCheckCircle,
  FaTimesCircle,
  FaFilePdf,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaUserGraduate,
  FaCheck,
} from 'react-icons/fa';

export default function AssessorDashboardPage() {
  const [queue, setQueue] = useState<AssessorQueueItem[]>(initialAssessorQueue);
  const [selectedSubmission, setSelectedSubmission] = useState<AssessorQueueItem | null>(queue[0]);
  const [score, setScore] = useState<number>(85);
  const [isCompetent, setIsCompetent] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string>(
    'Candidate has successfully demonstrated the application of outcomes-based assessment criteria and VACS principles.'
  );
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  const handleGradeSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    const newStatus: AssessorQueueItem['status'] = isCompetent
      ? 'Assessed - Competent'
      : 'Remediation Required';

    setQueue((prev) =>
      prev.map((item) =>
        item.submissionId === selectedSubmission.submissionId
          ? {
              ...item,
              status: newStatus,
              score,
              assessorNotes: feedback,
            }
          : item
      )
    );

    setSaveNotice(
      `Assessment saved for ${selectedSubmission.learnerName}: ${
        isCompetent ? 'COMPETENT (C)' : 'NOT YET COMPETENT (NYC)'
      } — forwarded to Internal Moderator queue.`
    );

    setTimeout(() => setSaveNotice(null), 5000);
  };

  return (
    <div className="space-y-8">
      {/* Assessor Banner */}
      <div className="bg-gradient-to-r from-[#03367A] to-[#1e3a8a] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
            ETDP SETA Registered Assessor Workbench
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Welcome, Assessor Innocent Mabunda
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl">
            Assessor Registration Number: <strong>ETDP-ASS-8812</strong>. Reviewing candidate Portfolios of Evidence against SAQA criteria.
          </p>
        </div>
        <div className="bg-white/10 p-3 rounded-2xl border border-white/20 text-right shrink-0">
          <span className="text-[10px] uppercase font-bold text-sky-200">Pending in Queue</span>
          <p className="text-2xl font-bold text-[#84ba3f]">
            {queue.filter((q) => q.status === 'Awaiting Assessment').length} Submissions
          </p>
        </div>
      </div>

      {saveNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <FaCheckCircle className="text-emerald-500 text-sm" aria-hidden="true" />
          {saveNotice}
        </div>
      )}

      {/* Main Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Submissions Queue */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FaTasks className="text-[#84ba3f]" aria-hidden="true" />
            Candidate Submission Queue
          </h3>

          <div className="space-y-3">
            {queue.map((item) => {
              const isSelected = selectedSubmission?.submissionId === item.submissionId;
              return (
                <div
                  key={item.submissionId}
                  onClick={() => setSelectedSubmission(item)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#84ba3f] bg-white dark:bg-[#16171d] shadow-lg ring-2 ring-[#84ba3f]/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#16171d]/60 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-slate-500">
                      {item.moduleCode} (US {item.unitStandardId})
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        item.status === 'Awaiting Assessment'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                          : item.status === 'Assessed - Competent'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.learnerName}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">{item.courseTitle}</p>

                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Submitted: {item.submittedAt}</span>
                    <span>Attempt #{item.attemptNumber}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Rubric Scoring & Evaluation Workbench */}
        {selectedSubmission && (
          <div className="lg:col-span-7 bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#84ba3f]">
                  Assessment Decision Tool
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedSubmission.learnerName}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedSubmission.courseTitle} • Unit Standard {selectedSubmission.unitStandardId}
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                {selectedSubmission.submissionId}
              </span>
            </div>

            {/* Candidate Uploaded Files */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
                Candidate Portfolio Files
              </label>
              <div className="space-y-2">
                {selectedSubmission.files.map((file) => (
                  <div
                    key={file}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <span className="flex items-center gap-2 font-mono font-medium text-slate-800 dark:text-slate-200">
                      <FaFilePdf className="text-rose-500" aria-hidden="true" />
                      {file}
                    </span>
                    <button className="text-[#84ba3f] font-bold hover:underline">
                      View Evidence
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation Form */}
            <form onSubmit={handleGradeSubmission} className="space-y-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
                    Overall Competency Judgment
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setIsCompetent(true)}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        isCompetent
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 shadow-sm'
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      <FaCheck aria-hidden="true" />
                      Competent (C)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCompetent(false)}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        !isCompetent
                          ? 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 shadow-sm'
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      <FaTimesCircle aria-hidden="true" />
                      NYC
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
                    Score Percentage (%)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
                  Assessor Feedback & VACS Evidence Report
                </label>
                <textarea
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
                />
              </div>

              <div className="pt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Assessor Signature: <strong>Innocent Mabunda</strong></span>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-xs font-bold bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-md flex items-center gap-2"
                >
                  <FaClipboardCheck aria-hidden="true" />
                  Sign & Submit Decision
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { cohortSchedules, detailedCourses } from '@/lib/offline-data';
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
  FaBook,
  FaFileUpload,
  FaCheck,
} from 'react-icons/fa';

interface AttendanceLearner {
  id: string;
  name: string;
  idNumber: string;
  isPresent: boolean;
}

const initialCohortLearners: AttendanceLearner[] = [
  { id: '1', name: 'Lerato Ndlovu', idNumber: '9308145220083', isPresent: true },
  { id: '2', name: 'Mandla Khumalo', idNumber: '8511045230089', isPresent: true },
  { id: '3', name: 'Nandi Mahlangu', idNumber: '9208220980084', isPresent: true },
  { id: '4', name: 'Tshepo Sithole', idNumber: '8803155120087', isPresent: false },
  { id: '5', name: 'Aphiwe Mokoena', idNumber: '9405125890082', isPresent: true },
];

export default function FacilitatorDashboardPage() {
  const [learners, setLearners] = useState<AttendanceLearner[]>(initialCohortLearners);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  const toggleAttendance = (id: string) => {
    setLearners((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isPresent: !l.isPresent } : l))
    );
  };

  const handleSaveRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const presentCount = learners.filter((l) => l.isPresent).length;
    setSaveNotice(
      `Daily Attendance Register saved: ${presentCount} / ${learners.length} learners marked present. SETA audit record logged.`
    );
    setTimeout(() => setSaveNotice(null), 5000);
  };

  return (
    <div className="space-y-8">
      {/* Facilitator Header */}
      <div className="bg-gradient-to-r from-[#006600] to-[#03367A] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#d8ebbe]">
            Classroom & Facilitation Management
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Welcome, Lead Facilitator Masilo Diale
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
            ETDP SETA Facilitator Reg: <strong>ETDP-FAC-2009-418</strong>. Managing active classroom cohorts in Polokwane and Tzaneen.
          </p>
        </div>
        <div className="bg-white/10 p-3 rounded-2xl border border-white/20 text-right shrink-0">
          <span className="text-[10px] uppercase font-bold text-[#d8ebbe]">Active Cohorts</span>
          <p className="text-2xl font-bold text-white">2 Batches</p>
        </div>
      </div>

      {saveNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <FaCheckCircle className="text-emerald-500 text-sm" aria-hidden="true" />
          {saveNotice}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Active Cohort Attendance Register */}
        <div id="attendance" className="lg:col-span-7 bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#84ba3f]">
                Daily Session Register
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                FAC-2026-Q3-PLK (Facilitator Workshop)
              </h3>
              <p className="text-xs text-slate-500">Polokwane Head Office • Day 2 of 3</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              {learners.filter((l) => l.isPresent).length} / {learners.length} Present
            </span>
          </div>

          <form onSubmit={handleSaveRegister} className="space-y-4">
            <div className="space-y-2">
              {learners.map((learner) => (
                <div
                  key={learner.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {learner.name}
                    </p>
                    <p className="text-[11px] font-mono text-slate-400">ID: {learner.idNumber}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleAttendance(learner.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      learner.isPresent
                        ? 'bg-emerald-500 text-white shadow'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
                    }`}
                  >
                    {learner.isPresent ? (
                      <>
                        <FaCheck aria-hidden="true" /> Present
                      </>
                    ) : (
                      <>
                        <FaTimesCircle aria-hidden="true" /> Absent
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-xs font-bold bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-md flex items-center gap-2"
              >
                <FaCheckCircle aria-hidden="true" />
                Save SETA Attendance Register
              </button>
            </div>
          </form>
        </div>

        {/* Right: Cohort Materials & Actions */}
        <div id="resources" className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-6 sm:p-8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#84ba3f]">
              Session Resources
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Facilitation Guides & Slides
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Download or distribute learner guides and practical exercise templates.
            </p>

            <div className="mt-4 space-y-2.5 text-xs">
              {[
                { title: 'Facilitator Learner Guide (US 117871).pdf', size: '3.4 MB' },
                { title: 'Session Plan Template & Icebreakers.docx', size: '1.2 MB' },
                { title: 'Classroom Multimedia Slide Deck.pptx', size: '8.1 MB' },
              ].map((res) => (
                <div
                  key={res.title}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                    {res.title}
                  </span>
                  <span className="text-[11px] text-[#84ba3f] font-bold hover:underline cursor-pointer">
                    Download
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full py-2.5 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-[#84ba3f] hover:text-[#84ba3f] text-xs font-bold transition-colors flex items-center justify-center gap-2">
              <FaFileUpload aria-hidden="true" />
              Upload New Class Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

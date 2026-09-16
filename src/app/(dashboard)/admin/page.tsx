'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { initialApplications, cohortSchedules, type LearnerApplication } from '@/lib/offline-data';
import {
  FaUserGraduate,
  FaFileExport,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaFilter,
  FaFilePdf,
  FaBuilding,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt,
  FaSearch,
} from 'react-icons/fa';

export default function AdminDashboardPage() {
  const [applications, setApplications] = useState<LearnerApplication[]>(initialApplications);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<LearnerApplication | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleStatusChange = (appId: string, newStatus: LearnerApplication['status']) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleSetaExport = () => {
    setExportNotice('Generated SETA NLRD Export: ETDP_SETA_NLRD_UPLOAD_2026_Q3.csv (4 Records Prepared)');
    setTimeout(() => setExportNotice(null), 5000);
  };

  const filteredApps = applications.filter((app) =>
    filterStatus === 'all' ? true : app.status === filterStatus
  );

  return (
    <div className="space-y-8">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#03367A] to-[#006600] text-white p-6 sm:p-8 rounded-3xl shadow-lg">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#d8ebbe]">
            Labour Market & Logistics System (LMIS)
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Operations & Registration Centre
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl">
            Managing candidate applications, compliance document verification, SETA NLRD export reporting, and cohort logistics.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleSetaExport}
            className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition-colors shadow"
          >
            <FaFileExport aria-hidden="true" />
            Generate SETA NLRD Export
          </button>
          <Link
            href="/apply"
            className="px-4 py-2.5 rounded-xl bg-[#84ba3f] hover:bg-[#6ea032] text-white font-bold text-xs flex items-center gap-2 transition-colors shadow"
          >
            + New Learner Lead
          </Link>
        </div>
      </div>

      {exportNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <FaCheckCircle className="text-emerald-500 text-sm" aria-hidden="true" />
          {exportNotice}
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#16171d] p-5 rounded-2xl border border-slate-200 dark:border-[#2e303a] shadow-sm">
          <span className="text-xs text-slate-500 font-semibold uppercase">Pending Leads</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">
            {applications.filter((a) => a.status === 'submitted' || a.status === 'under_review').length}
          </p>
          <span className="text-[11px] text-slate-400">Needs registrar review</span>
        </div>
        <div className="bg-white dark:bg-[#16171d] p-5 rounded-2xl border border-slate-200 dark:border-[#2e303a] shadow-sm">
          <span className="text-xs text-slate-500 font-semibold uppercase">Verified Dossiers</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-sky-600 mt-1">
            {applications.filter((a) => a.status === 'documents_verified').length}
          </p>
          <span className="text-[11px] text-slate-400">Ready for cohort placement</span>
        </div>
        <div className="bg-white dark:bg-[#16171d] p-5 rounded-2xl border border-slate-200 dark:border-[#2e303a] shadow-sm">
          <span className="text-xs text-slate-500 font-semibold uppercase">Active Cohorts</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">
            {cohortSchedules.length}
          </p>
          <span className="text-[11px] text-slate-400">Polokwane, Tzaneen, Gauteng</span>
        </div>
        <div className="bg-white dark:bg-[#16171d] p-5 rounded-2xl border border-slate-200 dark:border-[#2e303a] shadow-sm">
          <span className="text-xs text-slate-500 font-semibold uppercase">Accreditation</span>
          <p className="text-xl sm:text-2xl font-extrabold text-[#006600] dark:text-[#84ba3f] mt-1">
            ETDP0204
          </p>
          <span className="text-[11px] text-slate-400">SETA Accredited since 2003</span>
        </div>
      </div>

      {/* SECTION: LMIS Applicant Pipeline Kanban & Table */}
      <section id="pipeline" className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#84ba3f]">
              LMIS Intake Queue
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Application & Enrollment Pipeline
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl text-xs">
            {[
              { id: 'all', label: 'All Leads' },
              { id: 'submitted', label: 'New' },
              { id: 'under_review', label: 'In Review' },
              { id: 'documents_verified', label: 'Verified' },
              { id: 'invoiced', label: 'Invoiced' },
              { id: 'accepted_enrolled', label: 'Enrolled' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  filterStatus === f.id
                    ? 'bg-white dark:bg-slate-900 text-[#84ba3f] shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5 font-bold">App Ref & Date</th>
                <th className="px-4 py-3.5 font-bold">Applicant Details</th>
                <th className="px-4 py-3.5 font-bold">Programme & Campus</th>
                <th className="px-4 py-3.5 font-bold">Funding Model</th>
                <th className="px-4 py-3.5 font-bold">Docs Status</th>
                <th className="px-4 py-3.5 font-bold">Stage</th>
                <th className="px-4 py-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5">
                    <span className="font-mono font-bold text-slate-900 dark:text-white block">
                      {app.appNumber}
                    </span>
                    <span className="text-[11px] text-slate-400">{app.submittedAt}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      {app.applicantName}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">ID: {app.idNumber}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-slate-900 dark:text-white block">
                      {app.courseTitle}
                    </span>
                    <span className="text-[11px] text-[#84ba3f]">{app.preferredCampus}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {app.fundingType}
                    </span>
                    {app.employerName && (
                      <span className="text-[10px] text-slate-400 block mt-0.5 truncate max-w-[130px]">
                        {app.employerName}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          app.documents.idCard && app.documents.matric ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      <span className="text-[11px] text-slate-600 dark:text-slate-400">
                        {app.documents.idCard && app.documents.matric ? 'ID + Matric' : 'Pending'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value as LearnerApplication['status'])}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border focus:outline-none ${
                        app.status === 'submitted'
                          ? 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                          : app.status === 'under_review'
                          ? 'bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300'
                          : app.status === 'documents_verified'
                          ? 'bg-sky-50 border-sky-200 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300'
                          : app.status === 'invoiced'
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                      }`}
                    >
                      <option value="submitted">1. New Lead</option>
                      <option value="under_review">2. Under Review</option>
                      <option value="documents_verified">3. Docs Verified</option>
                      <option value="invoiced">4. Invoiced</option>
                      <option value="accepted_enrolled">5. Enrolled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => setSelectedApp(app)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#84ba3f] hover:text-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[11px] transition-colors"
                    >
                      Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION: Cohort Logistics & Schedules */}
      <section id="cohorts" className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#84ba3f]">
              Logistics & Venues
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Upcoming Training Cohorts
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {cohortSchedules.length} Scheduled Batches
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cohortSchedules.map((sched) => {
            const seatsLeft = sched.capacity - sched.enrolledCount;
            return (
              <div
                key={sched.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono font-bold text-slate-500">{sched.code}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        seatsLeft <= 5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {seatsLeft} Seats Available
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {sched.courseTitle}
                  </h4>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <p className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-[#84ba3f] text-[10px]" aria-hidden="true" />
                      {sched.startDate} – {sched.endDate}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <FaBuilding className="text-[#84ba3f] text-[10px]" aria-hidden="true" />
                      {sched.location} ({sched.deliveryMode})
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Facilitator: <strong>{sched.facilitator}</strong>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold">
                    {sched.enrolledCount} / {sched.capacity} Enrolled
                  </span>
                  <Link
                    href={`/apply?course=${sched.courseId}`}
                    className="text-[#84ba3f] font-bold hover:underline"
                  >
                    Reserve Seat →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MODAL: Learner Compliance Dossier Review */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#84ba3f]">
                  Learner Compliance Dossier
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedApp.applicantName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-2"
                aria-label="Close modal"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                <span className="text-slate-400">SA ID Number:</span>
                <p className="font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedApp.idNumber}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                <span className="text-slate-400">Contact Number:</span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedApp.phone}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                <span className="text-slate-400">Applied Programme:</span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedApp.courseTitle}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                <span className="text-slate-400">Funding Model:</span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">{selectedApp.fundingType}</p>
              </div>
            </div>

            {/* Compliance Checklist */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                SETA Compliance Checklist
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-500" aria-hidden="true" />
                    Certified ID Document Uploaded
                  </span>
                  <span className="text-[#84ba3f] font-bold">Verified</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-500" aria-hidden="true" />
                    Matric / Highest Qualification Verified
                  </span>
                  <span className="text-[#84ba3f] font-bold">Verified</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-500" aria-hidden="true" />
                    POPIA Consent Signed Electronically
                  </span>
                  <span className="text-[#84ba3f] font-bold">Compliant</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleStatusChange(selectedApp.id, 'accepted_enrolled');
                  setSelectedApp(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#84ba3f] text-white hover:bg-[#6ea032] shadow"
              >
                Approve & Enrol into LMS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

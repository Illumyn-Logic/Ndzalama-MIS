'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  learnerEnrolledCourses,
  detailedCourses,
  cohortSchedules,
  type LearnerEnrolledCourse,
  type DetailedCourse,
} from '@/lib/offline-data';
import {
  FaBook,
  FaFileUpload,
  FaAward,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaExternalLinkAlt,
  FaUserGraduate,
  FaQrcode,
  FaPlusCircle,
  FaCreditCard,
  FaIdCard,
  FaBuilding,
  FaTimes,
  FaCheck,
  FaExclamationCircle,
  FaReceipt,
} from 'react-icons/fa';

interface LearnerNlrdProfile {
  fullName: string;
  idNumber: string;
  gender: string;
  equity: string;
  homeLanguage: string;
  disability: string;
  highestEducation: string;
  streetAddress: string;
  townCity: string;
  province: string;
  isNlrdVerified: boolean;
}

interface InvoiceItem {
  invoiceNo: string;
  courseTitle: string;
  amount: number;
  status: 'Paid' | 'Pending Payment' | 'Employer Invoiced';
  issueDate: string;
  popUploaded?: boolean;
}

export default function LearnerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'learning' | 'explore' | 'profile' | 'billing'>('learning');
  const [courses, setCourses] = useState<LearnerEnrolledCourse[]>(learnerEnrolledCourses);
  const [selectedCourse, setSelectedCourse] = useState<LearnerEnrolledCourse>(learnerEnrolledCourses[1] || learnerEnrolledCourses[0]);
  
  // NLRD Master Dossier State
  const [profile, setProfile] = useState<LearnerNlrdProfile>({
    fullName: 'Lerato Nomvula Ndlovu',
    idNumber: '9308145220083',
    gender: 'Female',
    equity: 'African',
    homeLanguage: 'Sepedi',
    disability: 'None',
    highestEducation: 'Matric / National Senior Certificate',
    streetAddress: '42 Hans Van Rensburg Street',
    townCity: 'Polokwane',
    province: 'Limpopo',
    isNlrdVerified: true,
  });
  const [isProfileEditing, setIsProfileEditing] = useState(false);

  // Invoices & Billing State
  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    {
      invoiceNo: 'NDZ-INV-2026-081',
      courseTitle: 'Conduct Outcomes-Based Assessment (Assessor - US 115753)',
      amount: 4500,
      status: 'Paid',
      issueDate: '2026-06-10',
    },
    {
      invoiceNo: 'NDZ-INV-2026-104',
      courseTitle: 'National Certificate: OD-ETDP (SAQA 50334)',
      amount: 28500,
      status: 'Pending Payment',
      issueDate: '2026-08-01',
    },
  ]);

  // Modals & Notices
  const [enrollingCourse, setEnrollingCourse] = useState<DetailedCourse | null>(null);
  const [selectedCohortId, setSelectedCohortId] = useState<string>('');
  const [fundingType, setFundingType] = useState<string>('Self-Funded (EFT / Card)');
  const [uploadPopForInv, setUploadPopForInv] = useState<InvoiceItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const detailedInfo = detailedCourses.find((c) => c.id === selectedCourse.courseId) || detailedCourses[0];

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  // Handle 1-Click Enrollment
  const handleConfirmEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollingCourse) return;

    const newEnrolled: LearnerEnrolledCourse = {
      enrollmentId: `ENR-2026-00${courses.length + 1}`,
      courseId: enrollingCourse.id,
      courseTitle: enrollingCourse.title,
      code: enrollingCourse.slug.toUpperCase().slice(0, 8),
      progressPercentage: 5,
      currentModule: enrollingCourse.modules[0]?.title || 'Orientation & Unit Standard Intro',
      status: 'Enrolled - Active',
      facilitator: 'Masilo Diale',
      startDate: '2026-09-01',
    };

    setCourses([newEnrolled, ...courses]);
    setSelectedCourse(newEnrolled);

    // Create Invoice
    const newInv: InvoiceItem = {
      invoiceNo: `NDZ-INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      courseTitle: enrollingCourse.title,
      amount: enrollingCourse.price,
      status: fundingType.includes('Company') ? 'Employer Invoiced' : 'Pending Payment',
      issueDate: new Date().toISOString().split('T')[0],
    };
    setInvoices([newInv, ...invoices]);

    setEnrollingCourse(null);
    setActiveTab('learning');
    showNotification(
      `Successfully enrolled in ${enrollingCourse.title}! Master profile applied automatically without re-entering details.`
    );
  };

  const handleSimulatePoEUpload = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification(
      'Portfolio of Evidence (PoE) submitted! Assigned to Assessor Innocent Mabunda for rubric grading.'
    );
  };

  const handlePopUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadPopForInv) return;

    setInvoices((prev) =>
      prev.map((inv) =>
        inv.invoiceNo === uploadPopForInv.invoiceNo ? { ...inv, popUploaded: true } : inv
      )
    );
    setUploadPopForInv(null);
    showNotification('Proof of Payment (POP) uploaded! Finance department will verify and mark as Paid.');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#006600] to-[#03367A] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d8ebbe]">
              Student Portal & LMS
            </span>
            <span className="text-white/40">•</span>
            <span className="text-xs text-sky-200">ETDP SETA Reg: <strong>ETDP0204</strong></span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Welcome, {profile.fullName}!
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
            Candidate ID: <strong className="font-mono">{profile.idNumber}</strong> • Learner No: <strong className="font-mono">NDZ-LRN-2026-0089</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('explore')}
            className="px-4 py-2.5 rounded-xl bg-[#84ba3f] hover:bg-[#6ea032] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors"
          >
            <FaPlusCircle aria-hidden="true" />
            Explore & Enrol in New Course
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition-colors"
          >
            <FaIdCard aria-hidden="true" />
            SETA Compliance Profile
          </button>
        </div>
      </div>

      {/* Global Toast Notification */}
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in shadow-sm">
          <FaCheckCircle className="text-emerald-500 text-base shrink-0" aria-hidden="true" />
          {notification}
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl text-xs font-bold w-fit">
        <button
          onClick={() => setActiveTab('learning')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'learning'
              ? 'bg-white dark:bg-slate-900 text-[#006600] dark:text-[#84ba3f] shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <FaBook aria-hidden="true" />
          My Learning Hub ({courses.length})
        </button>
        <button
          onClick={() => setActiveTab('explore')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'explore'
              ? 'bg-white dark:bg-slate-900 text-[#006600] dark:text-[#84ba3f] shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <FaPlusCircle aria-hidden="true" />
          Course Catalog (1-Click Enrol)
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'billing'
              ? 'bg-white dark:bg-slate-900 text-[#006600] dark:text-[#84ba3f] shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <FaReceipt aria-hidden="true" />
          Invoices & Payments ({invoices.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-white dark:bg-slate-900 text-[#006600] dark:text-[#84ba3f] shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <FaIdCard aria-hidden="true" />
          SETA NLRD Dossier
        </button>
      </div>

      {/* TAB 1: MY LEARNING HUB */}
      {activeTab === 'learning' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Active Programmes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {courses.map((c) => {
              const isSelected = selectedCourse.enrollmentId === c.enrollmentId;
              return (
                <div
                  key={c.enrollmentId}
                  onClick={() => setSelectedCourse(c)}
                  className={`p-6 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#84ba3f] bg-white dark:bg-[#16171d] shadow-lg ring-2 ring-[#84ba3f]/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#16171d]/60 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-mono font-bold text-slate-500">{c.code}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          c.status === 'Certified'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                            : c.status === 'PoE Uploaded'
                            ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {c.courseTitle}
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      Current Focus: <strong>{c.currentModule}</strong>
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-400">Progress</span>
                      <span className="text-[#84ba3f]">{c.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#03367A] to-[#84ba3f] rounded-full transition-all duration-500"
                        style={{ width: `${c.progressPercentage}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 text-right">
                      Facilitator: {c.facilitator}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Module Syllabus & PoE Dropzone */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Modules */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#84ba3f]">
                      Course Curriculum & Lessons
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {selectedCourse.courseTitle}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#84ba3f]">
                    {detailedInfo.modules.length} Modules
                  </span>
                </div>

                <div className="space-y-4">
                  {detailedInfo.modules.map((mod, idx) => (
                    <div
                      key={mod.code}
                      className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-[#03367A] dark:text-sky-400">
                          {mod.code}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#84ba3f]/15 text-[#84ba3f]">
                          {mod.credits} Credits
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{mod.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{mod.description}</p>
                      <div className="pt-2 flex items-center gap-3 text-xs">
                        <button className="text-[#84ba3f] font-bold hover:underline flex items-center gap-1">
                          <FaDownload className="text-[10px]" aria-hidden="true" />
                          Learner Guide (PDF)
                        </button>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <button className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-semibold">
                          Activity Workbook
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Digital PoE Dropzone */}
            <div id="poe" className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-6 sm:p-8">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#84ba3f]">
                  Digital PoE Dropbox
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  Submit Portfolio of Evidence
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Upload your completed assignments and workplace evidence for Assessor grading.
                </p>

                <form onSubmit={handleSimulatePoEUpload} className="mt-6 space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
                      Target Unit Standard / Module
                    </label>
                    <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#84ba3f]">
                      {detailedInfo.modules.map((m) => (
                        <option key={m.code} value={m.code}>
                          {m.code}: {m.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 text-center">
                    <FaFileUpload className="text-3xl text-[#84ba3f] mx-auto mb-2" aria-hidden="true" />
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Drag & Drop PoE PDF Files
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Max file size 25MB (PDF or DOCX)
                    </p>
                    <input
                      type="file"
                      required
                      className="mt-4 text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#84ba3f] file:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-bold text-xs bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <FaFileUpload aria-hidden="true" />
                    Submit PoE to Assessor Queue
                  </button>
                </form>
              </div>

              {/* Verified Certificate Card */}
              {selectedCourse.certificateNumber && (
                <div className="bg-gradient-to-br from-emerald-950/20 to-sky-950/20 rounded-3xl border border-emerald-300 dark:border-emerald-800 p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <FaAward className="text-2xl text-[#84ba3f]" aria-hidden="true" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#84ba3f] tracking-wider">
                        Official Award
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Certificate Issued & Verified
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                    Cert No: <strong>{selectedCourse.certificateNumber}</strong>
                  </p>
                  <div className="mt-4 pt-3 border-t border-emerald-200 dark:border-emerald-900 flex items-center justify-between text-xs">
                    <Link
                      href={`/verify`}
                      className="text-[#84ba3f] font-bold hover:underline flex items-center gap-1.5"
                    >
                      <FaQrcode aria-hidden="true" />
                      Public QR Verification
                    </Link>
                    <button className="px-3 py-1.5 rounded-lg bg-[#84ba3f] text-white font-bold text-[11px]">
                      Download PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COURSE CATALOG & 1-CLICK ENROLMENT */}
      {activeTab === 'explore' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Explore Available Programmes
              </h3>
              <p className="text-xs text-slate-500">
                Enrol seamlessly into additional qualifications and short courses with your verified SETA profile.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {detailedCourses.length} Programmes Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailedCourses.map((course) => {
              const isAlreadyEnrolled = courses.some((c) => c.courseId === course.id);
              return (
                <div
                  key={course.id}
                  className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-[#84ba3f]/15 text-[#84ba3f]">
                        {course.category}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">
                        NQF Level {course.nqfLevel}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {course.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {course.shortDesc}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-400">Credits:</span>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{course.credits} Credits</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Tuition:</span>
                        <p className="font-bold text-[#006600] dark:text-[#84ba3f]">R{course.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {isAlreadyEnrolled ? (
                      <button
                        disabled
                        className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-bold cursor-not-allowed"
                      >
                        ✓ Currently Enrolled
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEnrollingCourse(course);
                          setSelectedCohortId(cohortSchedules.find((s) => s.courseId === course.id)?.id || '');
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#84ba3f] hover:bg-[#6ea032] text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <FaPlusCircle aria-hidden="true" />
                        1-Click Enrol (Apply Profile)
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: INVOICES & PAYMENTS */}
      {activeTab === 'billing' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#84ba3f]">
                  Tuition Invoices & Payment Receipts
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Payment History & Statements
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Total Outstanding</span>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white">
                  R{invoices
                    .filter((i) => i.status === 'Pending Payment')
                    .reduce((acc, curr) => acc + curr.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-4 py-3.5 font-bold">Invoice Ref</th>
                    <th className="px-4 py-3.5 font-bold">Programme Description</th>
                    <th className="px-4 py-3.5 font-bold">Amount</th>
                    <th className="px-4 py-3.5 font-bold">Date Issued</th>
                    <th className="px-4 py-3.5 font-bold">Status</th>
                    <th className="px-4 py-3.5 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {invoices.map((inv) => (
                    <tr key={inv.invoiceNo} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="px-4 py-3.5 font-mono font-bold text-slate-900 dark:text-white">
                        {inv.invoiceNo}
                      </td>
                      <td className="px-4 py-3.5 text-slate-800 dark:text-slate-200">
                        {inv.courseTitle}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                        R{inv.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500">{inv.issueDate}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            inv.status === 'Paid'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                              : inv.popUploaded
                              ? 'bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                          }`}
                        >
                          {inv.popUploaded && inv.status !== 'Paid' ? 'POP Under Review' : inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {inv.status === 'Pending Payment' && !inv.popUploaded ? (
                          <button
                            onClick={() => setUploadPopForInv(inv)}
                            className="px-3 py-1.5 rounded-lg bg-[#84ba3f] text-white hover:bg-[#6ea032] font-bold text-[11px] transition-colors"
                          >
                            Upload POP
                          </button>
                        ) : (
                          <button className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold text-[11px] underline">
                            Download Tax Invoice
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SETA NLRD MASTER PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#84ba3f]">
                National Learners&apos; Records Database (NLRD)
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Master SETA Compliance Dossier
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Completed once upon registration. Used automatically for all course applications, certificates, and SETA credit uploads.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <FaCheckCircle aria-hidden="true" />
              Verified & Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Full Legal Name</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1 text-sm">{profile.fullName}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">SA ID Number</span>
              <p className="font-mono font-bold text-slate-900 dark:text-white mt-1 text-sm">{profile.idNumber}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Gender & Equity</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1 text-sm">
                {profile.gender} • {profile.equity}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Home Language</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1 text-sm">{profile.homeLanguage}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Disability Status</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1 text-sm">{profile.disability}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Highest Qualification</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1 text-sm">{profile.highestEducation}</p>
            </div>
            <div className="sm:col-span-2 lg:col-span-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 font-semibold uppercase text-[10px]">Residential Address</span>
              <p className="font-bold text-slate-900 dark:text-white mt-1 text-sm">
                {profile.streetAddress}, {profile.townCity}, {profile.province}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: 1-CLICK ENROLMENT DIALOG */}
      {enrollingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#84ba3f]">
                  1-Click Course Enrolment
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {enrollingCourse.title}
                </h3>
              </div>
              <button
                onClick={() => setEnrollingCourse(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-2"
                aria-label="Close modal"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleConfirmEnrollment} className="space-y-4 text-xs">
              {/* Profile pre-fill confirmation */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 flex items-center gap-3">
                <FaCheckCircle className="text-emerald-600 text-lg shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Learner Profile Applied: {profile.fullName} (ID: {profile.idNumber})
                  </p>
                  <p className="text-[11px] text-slate-500">
                    No need to re-type demographic information.
                  </p>
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
                  Select Preferred Intake Cohort / Venue
                </label>
                <select
                  value={selectedCohortId}
                  onChange={(e) => setSelectedCohortId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
                >
                  {cohortSchedules
                    .filter((s) => s.courseId === enrollingCourse.id)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.startDate} ({s.location} - {s.deliveryMode})
                      </option>
                    ))}
                  <option value="virtual">Virtual Live Intake (Next Month)</option>
                  <option value="distance">Distance / Flexible Self-Paced</option>
                </select>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
                  Payment / Funding Method
                </label>
                <select
                  value={fundingType}
                  onChange={(e) => setFundingType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
                >
                  <option value="Self-Funded (EFT / Card)">Self-Funded (EFT / Direct Deposit)</option>
                  <option value="Corporate Sponsored (Employer SDL)">Corporate Sponsored (Invoice Employer)</option>
                  <option value="SETA Grant / Bursary">SETA Discretionary Grant / Bursary</option>
                </select>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span>Tuition Total:</span>
                <strong className="text-base text-[#006600] dark:text-[#84ba3f]">
                  R{enrollingCourse.price.toLocaleString()}
                </strong>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEnrollingCourse(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#84ba3f] text-white hover:bg-[#6ea032] shadow-md flex items-center gap-1.5"
                >
                  <FaCheck aria-hidden="true" />
                  Confirm Enrolment & Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PROOF OF PAYMENT UPLOAD */}
      {uploadPopForInv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#84ba3f]">
                  Payment Verification
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Upload Proof of Payment
                </h3>
              </div>
              <button
                onClick={() => setUploadPopForInv(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
                aria-label="Close modal"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handlePopUpload} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900">
                <span className="text-slate-400">Invoice:</span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                  {uploadPopForInv.invoiceNo} — R{uploadPopForInv.amount.toLocaleString()}
                </p>
              </div>

              <div className="p-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 text-center">
                <FaCreditCard className="text-2xl text-[#84ba3f] mx-auto mb-2" aria-hidden="true" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Select Bank POP Receipt (PDF or JPG)
                </p>
                <input
                  type="file"
                  required
                  className="mt-3 text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#84ba3f] file:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setUploadPopForInv(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold bg-[#84ba3f] text-white hover:bg-[#6ea032] shadow-md"
                >
                  Submit POP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

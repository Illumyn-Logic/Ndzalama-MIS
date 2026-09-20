'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useDemoAuth } from '@/context/demo-auth-context';
import { detailedCourses } from '@/lib/offline_data';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaGraduationCap,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
} from 'react-icons/fa';

export function ApplyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCourse = searchParams.get('course') || '';
  const { switchRole } = useDemoAuth();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    courseSlug: initialCourse,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const selectedCourseObj = detailedCourses.find((c) => c.slug === form.courseSlug);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = 'Full legal name is required.';
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Valid email address is required.';
    if (!form.phone.trim()) errs.phone = 'Contact number is required.';
    if (!form.password || form.password.length < 6)
      errs.password = 'Password must be at least 6 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate instantaneous registration into learner profile
    await new Promise((res) => setTimeout(res, 500));

    // Switch active demo role to learner and route into learner LMS portal
    switchRole('learner');
    router.push('/dashboard/learner');
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-xl p-8 sm:p-10">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#84ba3f]/15 text-[#4c7a1f] dark:text-[#84ba3f] text-xs font-bold uppercase tracking-wider mb-2">
            <FaShieldAlt aria-hidden="true" />
            Quick Platform Onboarding
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Register & Access Portal
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Create your account once. You can complete your SETA compliance dossier, select intake cohorts, and manage payments directly inside your Learner LMS.
          </p>
        </div>

        {/* Selected Course Teaser (if coming from /courses/...) */}
        {selectedCourseObj && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#84ba3f] tracking-wider">
                Interested Programme
              </span>
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {selectedCourseObj.title}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                {selectedCourseObj.credits} Credits • Level {selectedCourseObj.nqfLevel}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, courseSlug: '' }))}
              className="text-[11px] text-slate-400 hover:text-rose-500 underline shrink-0"
            >
              Change
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Full Legal Name *
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" aria-hidden="true" />
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="e.g. Lerato Ndlovu"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
              />
            </div>
            {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" aria-hidden="true" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
              />
            </div>
            {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Mobile Contact Number *
            </label>
            <div className="relative">
              <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" aria-hidden="true" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+27 72 000 0000"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
              />
            </div>
            {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Create Password *
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" aria-hidden="true" />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Minimum 6 characters"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
              />
            </div>
            {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
          </div>

          {!selectedCourseObj && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Programme Interest <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <FaGraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" aria-hidden="true" />
                <select
                  value={form.courseSlug}
                  onChange={(e) => setForm({ ...form, courseSlug: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"
                >
                  <option value="">— Select if you have a specific course in mind —</option>
                  {detailedCourses.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title} (Level {c.nqfLevel}, {c.credits} Credits)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl font-bold text-sm bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                'Creating Account & Entering Portal…'
              ) : (
                <>
                  Register & Enter Learner LMS
                  <FaArrowRight className="text-xs" aria-hidden="true" />
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-2 text-xs text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-[#84ba3f] font-bold hover:underline">
              Student Portal Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaArrowRight, FaGraduationCap, FaShieldAlt } from 'react-icons/fa';
import { detailedCourses } from '@/lib/offline_data';

export function ApplyForm() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get('course') || '';
  const selectedCourse = detailedCourses.find((course) => course.slug === courseSlug);

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-[#2e303a] dark:bg-[#16171d] sm:p-10">
        <div className="mb-8 text-center">
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-primary dark:bg-brand-secondary/15 dark:text-brand-secondary">
            <FaShieldAlt aria-hidden="true" />
            Learner Registration
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Continue to learner registration
          </h2>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
            Create your account through our registration portal. After registering, sign in to continue your application and manage your learning journey.
          </p>
        </div>

        {selectedCourse ? (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
            <FaGraduationCap className="shrink-0 text-xl text-brand-primary dark:text-brand-secondary" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand-primary dark:text-brand-secondary">
                Interested programme
              </p>
              <p className="truncate text-xs font-bold text-slate-900 dark:text-white">
                {selectedCourse.title}
              </p>
              <p className="text-[11px] text-slate-500">
                {selectedCourse.credits} credits · Level {selectedCourse.nqfLevel}
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Still choosing a programme?
            </p>
            <Link
              href="/courses"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:underline dark:text-brand-secondary"
            >
              Browse accredited courses <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <Link
            href="/register"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary py-3.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-brand-primary-light"
          >
            Continue to registration <FaArrowRight className="text-xs" aria-hidden="true" />
          </Link>
          <p className="text-center text-xs text-slate-500">
            Already registered?{' '}
            <Link
              href="/login"
              className="font-bold text-brand-primary hover:underline dark:text-brand-secondary"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
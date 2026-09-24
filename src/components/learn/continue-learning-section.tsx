'use client';

import Link from 'next/link';
import { FaBook, FaClock } from 'react-icons/fa';

interface Course {
  id: string;
  title: string;
  progress: number;
  timeRemaining: string;
  category: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Microsoft Copilot in Excel',
    progress: 5,
    timeRemaining: '2 hr 51 min',
    category: 'Course',
  },
  {
    id: '2',
    title: 'AI-Assisted Coding for Developers',
    progress: 14,
    timeRemaining: '3 hr 20 min',
    category: 'Course',
  },
  {
    id: '3',
    title: 'Intermediate Git',
    progress: 5,
    timeRemaining: '1 hr 45 min',
    category: 'Course',
  },
  {
    id: '4',
    title: 'Introduction to Power BI',
    progress: 10,
    timeRemaining: '4 hr 15 min',
    category: 'Course',
  },
];

export function ContinueLearningSection() {
  return (
    <section className="space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <FaBook className="text-sm text-[#84ba3f]" />
            Pick up where you left off
          </h2>
        </div>
        <Link
          href="/learn/dashboard/activity"
          className="text-xs font-semibold text-[#006600] hover:underline dark:text-[#84ba3f]"
        >
          See All in My Activity →
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {mockCourses.map((course) => (
          <Link
            key={course.id}
            href={`/learn/dashboard/courses/${course.id}`}
            className="group rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-[#84ba3f] dark:border-slate-800 dark:bg-[#16171d]"
          >
            {/* Category Badge */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400">
                {course.category}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#84ba3f]/10">
                <FaBook className="text-xs text-[#84ba3f]" />
              </div>
            </div>

            {/* Course Title */}
            <h3 className="mb-2 min-h-[2.25rem] text-sm font-bold leading-tight text-slate-900 dark:text-white">
              {course.title}
            </h3>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Progress</span>
                <span className="font-bold text-[#84ba3f]">{course.progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-[#84ba3f] transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {/* Time Remaining */}
            <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <FaClock className="text-[10px]" />
                <span className="text-[11px]">{course.timeRemaining}</span>
              </div>
              <span className="text-[11px] font-bold text-[#006600] opacity-0 transition-opacity group-hover:opacity-100 dark:text-[#84ba3f]">
                Continue
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

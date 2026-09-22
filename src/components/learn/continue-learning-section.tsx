'use client';

import Link from 'next/link';
import { FaBook, FaClock, FaArrowRight } from 'react-icons/fa';

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
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FaBook className="text-[#84ba3f]" />
            Pick up where you left off
          </h2>
        </div>
        <Link
          href="/learn/dashboard/activity"
          className="text-sm font-semibold text-[#006600] dark:text-[#84ba3f] hover:underline"
        >
          See All in My Activity →
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockCourses.map((course) => (
          <Link
            key={course.id}
            href={`/learn/dashboard/courses/${course.id}`}
            className="group bg-white dark:bg-[#16171d] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-md hover:border-[#84ba3f] transition-all"
          >
            {/* Category Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {course.category}
              </span>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#84ba3f]/10 to-[#006600]/10 flex items-center justify-center">
                <FaBook className="text-[#84ba3f]" />
              </div>
            </div>

            {/* Course Title */}
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-3 line-clamp-2 min-h-[2.5rem]">
              {course.title}
            </h3>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500">Progress</span>
                <span className="font-bold text-[#84ba3f]">{course.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#006600] to-[#84ba3f] rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {/* Time Remaining */}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <FaClock />
                <span>{course.timeRemaining}</span>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-[#84ba3f] text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Continue
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

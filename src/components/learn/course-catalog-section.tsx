'use client';

import Link from 'next/link';
import { FaBook, FaStar, FaClock, FaPlusCircle } from 'react-icons/fa';

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  rating: number;
  enrolled: number;
  isNew?: boolean;
}

const mockCatalog: Course[] = [
  {
    id: '1',
    title: 'Conduct Outcomes-Based Assessment',
    category: 'Assessor Development',
    duration: '40 hours',
    rating: 4.8,
    enrolled: 234,
    isNew: true,
  },
  {
    id: '2',
    title: 'Training Development Practitioner',
    category: 'Skills Development',
    duration: '120 hours',
    rating: 4.9,
    enrolled: 567,
  },
  {
    id: '3',
    title: 'Project Management Fundamentals',
    category: 'Management',
    duration: '60 hours',
    rating: 4.7,
    enrolled: 891,
  },
];

export function CourseCatalogSection() {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Explore Course Catalog
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Discover new learning opportunities and expand your skills
          </p>
        </div>
        <Link
          href="/learn/dashboard/courses"
          className="text-sm font-semibold text-[#006600] dark:text-[#84ba3f] hover:underline"
        >
          View All Courses →
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCatalog.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-[#16171d] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md hover:border-[#84ba3f] transition-all group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                {course.isNew && (
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#84ba3f]/10 text-[#84ba3f] text-xs font-bold mb-2">
                    NEW
                  </span>
                )}
                <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                  {course.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight line-clamp-2">
                  {course.title}
                </h3>
              </div>
            </div>

            {/* Course Meta */}
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
              <div className="flex items-center gap-1">
                <FaStar className="text-amber-400" />
                <span className="font-semibold">{course.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaClock />
                <span>{course.duration}</span>
              </div>
            </div>

            {/* Enrollment Info */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {course.enrolled.toLocaleString()} enrolled
              </span>
              <button className="px-3 py-1.5 rounded-lg bg-[#84ba3f] hover:bg-[#6ea032] text-white text-xs font-bold flex items-center gap-1.5 transition-colors opacity-0 group-hover:opacity-100">
                <FaPlusCircle />
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-[#006600]/5 to-[#84ba3f]/5 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Looking for something specific?
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Browse our full catalog of {mockCatalog.length * 10}+ courses across multiple disciplines
        </p>
        <Link
          href="/learn/dashboard/courses"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#84ba3f] hover:bg-[#6ea032] text-white text-sm font-bold transition-colors shadow-sm"
        >
          <FaBook />
          Browse All Courses
        </Link>
      </div>
    </section>
  );
}

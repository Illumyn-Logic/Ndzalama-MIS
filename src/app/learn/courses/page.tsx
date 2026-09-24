'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { 
  FaGraduationCap, 
  FaClock, 
  FaCertificate,
  FaCheckCircle,
  FaArrowRight,
  FaBook,
  FaUsers,
  FaStar
} from 'react-icons/fa';

// Sample course data (will be replaced with database queries)
const courses = [
  {
    id: '1',
    code: '242401001',
    title: 'Training Development Practitioner',
    category: 'ETDP SETA',
    level: 'NQF Level 5',
    duration: '12 months',
    credits: 120,
    description: 'Develop skills in training design, facilitation, and assessment.',
    modules: 6,
    enrolled: 234,
    rating: 4.8,
    popular: true,
  },
  {
    id: '2',
    code: '115753',
    title: 'Occupational Certificate: Contact Centre Support',
    category: 'Services SETA',
    level: 'NQF Level 3',
    duration: '6 months',
    credits: 60,
    description: 'Master customer service and contact centre operations.',
    modules: 4,
    enrolled: 189,
    rating: 4.6,
    popular: true,
  },
  {
    id: '3',
    code: '101321',
    title: 'Business Administration Services',
    category: 'Services SETA',
    level: 'NQF Level 4',
    duration: '9 months',
    credits: 90,
    description: 'Comprehensive business administration and office management training.',
    modules: 5,
    enrolled: 156,
    rating: 4.7,
    popular: false,
  },
];

export default function LearnCoursesPage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a]">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-[#006600] to-[#03367A] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-[#84ba3f]/20 text-[#84ba3f] text-sm font-semibold tracking-wide uppercase">
              Browse Courses
            </span>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Accredited Training Programmes
            </h1>
            
            <p className="text-lg md:text-xl text-white/90">
              Choose from our range of SETA-accredited qualifications designed to advance your career.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section (placeholder) */}
      <section className="bg-white dark:bg-[#16171d] border-b border-slate-200 dark:border-[#2e303a] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filter by:</span>
              <button className="px-4 py-2 rounded-lg bg-[#84ba3f] text-white text-sm font-medium">
                All Courses
              </button>
              <button className="px-4 py-2 rounded-lg border border-slate-300 dark:border-[#2e303a] text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-[#0a0a0a]">
                ETDP SETA
              </button>
              <button className="px-4 py-2 rounded-lg border border-slate-300 dark:border-[#2e303a] text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-[#0a0a0a]">
                Services SETA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-[#16171d] rounded-2xl border border-slate-200 dark:border-[#2e303a] overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-br from-[#006600] to-[#03367A] text-white p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wide">
                      {course.category}
                    </span>
                    {course.popular && (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#84ba3f] text-white text-xs font-bold">
                        <FaStar className="text-[10px]" aria-hidden="true" />
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-white/80">
                    {course.level} • {course.code}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-200 dark:border-[#2e303a]">
                    <div className="flex items-center gap-2 text-sm">
                      <FaClock className="text-[#84ba3f]" aria-hidden="true" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaBook className="text-[#84ba3f]" aria-hidden="true" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {course.modules} Modules
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaCertificate className="text-[#84ba3f]" aria-hidden="true" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {course.credits} Credits
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaUsers className="text-[#84ba3f]" aria-hidden="true" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {course.enrolled} Enrolled
                      </span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-[#84ba3f]">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`text-xs ${i < Math.floor(course.rating) ? 'text-[#84ba3f]' : 'text-slate-300 dark:text-slate-700'}`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {course.rating}
                    </span>
                  </div>

                  {/* CTA */}
                  {isAuthenticated ? (
                    <Link
                      href="/learn"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors"
                    >
                      View in Dashboard
                      <FaArrowRight className="text-xs" aria-hidden="true" />
                    </Link>
                  ) : (
                    <Link
                      href={`/register`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors"
                    >
                      Apply Now
                      <FaArrowRight className="text-xs" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-[#16171d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaGraduationCap className="text-5xl text-[#84ba3f] mx-auto mb-4" aria-hidden="true" />
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            We offer custom training solutions tailored to your organization's needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/learn/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-md"
            >
              Contact Us
            </Link>
            <Link
              href="/qualifications"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base border-2 border-slate-300 dark:border-[#2e303a] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#0a0a0a] transition-colors"
            >
              View All Qualifications
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

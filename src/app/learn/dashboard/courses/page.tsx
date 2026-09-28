import { FaBook } from 'react-icons/fa';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0b0e] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <FaBook className="text-[#84ba3f]" />
          All Courses
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Browse our complete catalog of courses and qualifications
        </p>
      </div>

      {/* Coming Soon */}
      <div className="bg-white dark:bg-[#16171d] rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
        <FaBook className="text-6xl text-slate-300 dark:text-slate-700 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Course Catalog Coming Soon
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Browse and enroll in our full range of SETA-accredited courses
        </p>
      </div>
    </div>
  );
}

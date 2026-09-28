import { FaClipboardList } from 'react-icons/fa';

export default function AssignmentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0b0e] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <FaClipboardList className="text-[#84ba3f]" />
          My Assignments
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          View and manage all your course assignments and deadlines
        </p>
      </div>

      {/* Coming Soon */}
      <div className="bg-white dark:bg-[#16171d] rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
        <FaClipboardList className="text-6xl text-slate-300 dark:text-slate-700 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Assignments Dashboard Coming Soon
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Complete assignment tracking with due dates, submission status, and grading
        </p>
      </div>
    </div>
  );
}

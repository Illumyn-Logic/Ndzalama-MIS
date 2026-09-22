import { FaClock } from 'react-icons/fa';

export default function MyActivityPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0b0e] p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <FaClock className="text-[#84ba3f]" />
          My Activity
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Track your learning history, daily streak, and XP earned
        </p>
      </div>

      {/* Coming Soon */}
      <div className="bg-white dark:bg-[#16171d] rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center">
        <FaClock className="text-6xl text-slate-300 dark:text-slate-700 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Activity Dashboard Coming Soon
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          View your complete learning history, daily streak progress, and XP breakdown
        </p>
      </div>
    </div>
  );
}

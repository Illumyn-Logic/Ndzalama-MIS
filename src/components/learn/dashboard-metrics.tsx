'use client';

import { FaCheckCircle, FaClock, FaFileAlt, FaChartLine } from 'react-icons/fa';
import { Enrollment, Qualification, CourseModule, Lesson, LessonProgress } from '@prisma/client';

type EnrollmentWithRelations = Enrollment & {
  qualification: Qualification & {
    modules: (CourseModule & {
      lessons: (Lesson & {
        progressRecords: LessonProgress[];
      })[];
    })[];
  };
  lessonProgress: LessonProgress[];
};

interface DashboardMetricsProps {
  enrollments: EnrollmentWithRelations[];
  loggedHours: number;
  pendingPoE: number;
  approvedPoE: number;
}

export function DashboardMetrics({
  enrollments,
  loggedHours,
  pendingPoE,
  approvedPoE,
}: DashboardMetricsProps) {
  // Calculate overall qualification progress
  const totalLessons = enrollments.reduce((sum, enrollment) => {
    return (
      sum +
      enrollment.qualification.modules.reduce((moduleSum, module) => {
        return moduleSum + module.lessons.length;
      }, 0)
    );
  }, 0);

  const completedLessons = enrollments.reduce((sum, enrollment) => {
    return sum + enrollment.lessonProgress.filter((p) => p.isCompleted).length;
  }, 0);

  const overallProgress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // PoE Audit Status Traffic Light
  const poeStatus =
    approvedPoE > 0 && pendingPoE === 0
      ? 'green'
      : pendingPoE > 0
      ? 'amber'
      : 'red';

  const statusColors = {
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Overall Progress */}
      <MetricCard
        icon={<FaChartLine className="text-2xl" />}
        label="Overall Progress"
        value={`${overallProgress}%`}
        subtext={`${completedLessons} of ${totalLessons} lessons`}
        color="from-[#84ba3f] to-[#006600]"
        progress={overallProgress}
      />

      {/* Logged Learning Hours */}
      <MetricCard
        icon={<FaClock className="text-2xl" />}
        label="Logged Hours"
        value={`${loggedHours}`}
        subtext="QCTO audit compliant"
        color="from-blue-500 to-blue-700"
        badge="hrs"
      />

      {/* PoE Audit Status */}
      <div className="bg-white dark:bg-[#16171d] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white shadow-lg`}
          >
            <FaFileAlt className="text-2xl" />
          </div>
          {/* Traffic Light Indicator */}
          <div className="flex items-center gap-1.5">
            <div
              className={`w-3 h-3 rounded-full ${statusColors[poeStatus]} shadow-md`}
            />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
              {poeStatus === 'green'
                ? 'Approved'
                : poeStatus === 'amber'
                ? 'Under Review'
                : 'Action Required'}
            </span>
          </div>
        </div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
          PoE Audit Status
        </h3>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">
          {approvedPoE} / {approvedPoE + pendingPoE}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {pendingPoE > 0 ? `${pendingPoE} pending review` : 'All approved'}
        </p>
      </div>

      {/* Active Enrollments */}
      <MetricCard
        icon={<FaCheckCircle className="text-2xl" />}
        label="Active Courses"
        value={enrollments.length.toString()}
        subtext="In training"
        color="from-orange-500 to-orange-700"
      />
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  color: string;
  progress?: number;
  badge?: string;
}

function MetricCard({
  icon,
  label,
  value,
  subtext,
  color,
  progress,
  badge,
}: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-[#16171d] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}
        >
          {icon}
        </div>
        {badge && (
          <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
        {label}
      </h3>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtext}</p>

      {progress !== undefined && (
        <div className="mt-4">
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

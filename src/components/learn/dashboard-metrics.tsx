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
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {/* Overall Progress */}
      <MetricCard
        icon={<FaChartLine className="text-base" />}
        label="Overall Progress"
        value={`${overallProgress}%`}
        subtext={`${completedLessons} of ${totalLessons} lessons`}
        progress={overallProgress}
      />

      {/* Logged Learning Hours */}
      <MetricCard
        icon={<FaClock className="text-base" />}
        label="Logged Hours"
        value={`${loggedHours}`}
        subtext="QCTO audit compliant"
        badge="hrs"
      />

      {/* PoE Audit Status */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#16171d]">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
            <FaFileAlt className="text-sm" />
          </div>
          {/* Traffic Light Indicator */}
          <div className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${statusColors[poeStatus]}`} />
            <span className="text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400">
              {poeStatus === 'green'
                ? 'Approved'
                : poeStatus === 'amber'
                ? 'Under Review'
                : 'Action Required'}
            </span>
          </div>
        </div>
        <h3 className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
          PoE Audit Status
        </h3>
        <p className="text-xl font-bold text-slate-900 dark:text-white">
          {approvedPoE} / {approvedPoE + pendingPoE}
        </p>
        <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
          {pendingPoE > 0 ? `${pendingPoE} pending review` : 'All approved'}
        </p>
      </div>

      {/* Active Enrollments */}
      <MetricCard
        icon={<FaCheckCircle className="text-2xl" />}
        label="Active Courses"
        value={enrollments.length.toString()}
        subtext="In training"
      />
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  progress?: number;
  badge?: string;
}

function MetricCard({
  icon,
  label,
  value,
  subtext,
  progress,
  badge,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#16171d]">
      <div className="mb-3 flex items-center justify-items-start gap-1.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {icon}
        </div>
        <h3 className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
        {label}
      </h3>

        {badge && (
          <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {badge}
          </span>
        )}
      </div>

      
      
      <p className="text-xl font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{subtext}</p>

      {progress !== undefined && (
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-[#84ba3f] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaFileAlt,
  FaUsers,
  FaClock,
} from 'react-icons/fa';
import type {
  Enrollment,
  Qualification,
  CourseModule,
  Cohort,
  CampusVenue,
} from '@prisma/client';

type EnrollmentWithRelations = Enrollment & {
  qualification: Qualification & {
    modules: CourseModule[];
  };
  cohort?: (Cohort & {
    venue: CampusVenue;
  }) | null;
};

interface UpcomingMilestonesProps {
  enrollments: EnrollmentWithRelations[];
}

interface Milestone {
  id: string;
  type: 'assessment' | 'session' | 'deadline';
  title: string;
  date: Date;
  location?: string;
  status: 'upcoming' | 'due-soon' | 'overdue';
  icon: React.ReactNode;
}

export function UpcomingMilestones({ enrollments }: UpcomingMilestonesProps) {
  const milestones: Milestone[] = [];

  // Generate milestones from enrollments
  enrollments.forEach((enrollment) => {
    // Add cohort sessions
    if (enrollment.cohort) {
      const sessionDate = new Date(enrollment.cohort.startDate);
      const now = new Date();
      const daysUntil = Math.ceil(
        (sessionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (sessionDate > now && daysUntil <= 30) {
        milestones.push({
          id: `session-${enrollment.cohort.id}`,
          type: 'session',
          title: `${enrollment.cohort.name} - Live Session`,
          date: sessionDate,
          location: enrollment.cohort.venue.name,
          status: daysUntil <= 3 ? 'due-soon' : 'upcoming',
          icon: <FaUsers />,
        });
      }
    }

    // Add module assessment deadlines (estimated)
    enrollment.qualification.modules.forEach((module, index) => {
      // Estimate assessment date (e.g., 2 weeks per module)
      const estimatedDate = new Date();
      estimatedDate.setDate(estimatedDate.getDate() + (index + 1) * 14);

      milestones.push({
        id: `assessment-${module.id}`,
        type: 'assessment',
        title: `${module.title} - PoE Submission`,
        date: estimatedDate,
        status: 'upcoming',
        icon: <FaFileAlt />,
      });
    });
  });

  // Sort by date
  milestones.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Take only next 5 milestones
  const upcomingMilestones = milestones.slice(0, 5);

  return (
    <div className="bg-white dark:bg-[#16171d] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center gap-2 mb-4">
        <FaCalendarAlt className="text-[#84ba3f]" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Upcoming Milestones
        </h3>
      </div>

      {upcomingMilestones.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
            <FaCheckCircle className="text-xl text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No upcoming milestones
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingMilestones.map((milestone) => (
            <MilestoneItem key={milestone.id} milestone={milestone} />
          ))}
        </div>
      )}
    </div>
  );
}

function MilestoneItem({ milestone }: { milestone: Milestone }) {
  const statusColors = {
    upcoming: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    'due-soon':
      'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
    overdue: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
  };

  const iconColors = {
    upcoming: 'text-blue-600 dark:text-blue-400',
    'due-soon': 'text-amber-600 dark:text-amber-400',
    overdue: 'text-red-600 dark:text-red-400',
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.ceil(
      (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays <= 7) return `In ${diffDays} days`;

    return date.toLocaleDateString('en-ZA', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-[#84ba3f] transition-colors">
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
          statusColors[milestone.status]
        }`}
      >
        <span className={iconColors[milestone.status]}>{milestone.icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
          {milestone.title}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <FaClock className="text-[10px]" />
            <span>{formatDate(milestone.date)}</span>
          </div>
          {milestone.location && (
            <>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {milestone.location}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

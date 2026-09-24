import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { DashboardMetrics } from '@/components/learn/dashboard-metrics';
import { ResumeLearningCard } from '@/components/learn/resume-learning-card';
import { UpcomingMilestones } from '@/components/learn/upcoming-milestones';
import { AssessorFeedbackFeed } from '@/components/learn/assessor-feedback-feed';
import { EmployerReportCard } from '@/components/learn/employer-report-card';
import { ContinueLearningSection } from '@/components/learn/continue-learning-section';
import { DashboardProfileHeader } from '@/components/learn/dashboard-profile-header';

export default async function LearnDashboardPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect('/login');
  }

  // Fetch learner's active enrollments with related data
  const enrollments = await prisma.enrollment.findMany({
    where: {
      learnerId: session.user.id,
      status: {
        in: ['ENROLLED', 'IN_TRAINING', 'POE_SUBMITTED', 'ASSESSMENT_IN_PROGRESS'],
      },
    },
    include: {
      qualification: {
        include: {
          modules: {
            include: {
              lessons: {
                include: {
                  progressRecords: {
                    where: {
                      enrollmentId: session.user.id,
                    },
                  },
                },
              },
              assessmentTasks: {
                include: {
                  submissions: {
                    where: {
                      enrollmentId: session.user.id,
                    },
                    include: {
                      assessorReview: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      cohort: {
        include: {
          venue: true,
        },
      },
      hostEmployer: true,
      lessonProgress: true,
      submissions: {
        include: {
          task: {
            include: {
              module: true,
            },
          },
          assessorReview: {
            include: {
              assessor: {
                include: {
                  profile: true,
                },
              },
            },
          },
        },
        orderBy: {
          submittedAt: 'desc',
        },
        take: 5,
      },
    },
  });

  // Calculate total logged learning hours (from completed lessons)
  const completedLessons = await prisma.lessonProgress.count({
    where: {
      enrollmentId: { in: enrollments.map((e) => e.id) },
      isCompleted: true,
    },
  });

  // Estimate learning hours (assuming 30 min per lesson)
  const loggedHours = Math.round((completedLessons * 0.5) * 10) / 10;

  // Count pending PoE submissions
  const pendingPoE = await prisma.assessmentSubmission.count({
    where: {
      enrollmentId: { in: enrollments.map((e) => e.id) },
      outcome: {
        in: ['SUBMITTED', 'UNDER_ASSESSMENT'],
      },
    },
  });

  const approvedPoE = await prisma.assessmentSubmission.count({
    where: {
      enrollmentId: { in: enrollments.map((e) => e.id) },
      outcome: 'COMPETENT',
    },
  });

  return (
    <div className="min-h-screen bg-[#f7f8f5] px-4 py-6 dark:bg-[#0a0b0e] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-360 space-y-8">
      <DashboardProfileHeader />

      <section className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-5 dark:border-slate-800 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#84ba3f]">Your learning journey</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">My courses</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Pick up where you left off or review your progress.</p>
        </div>
        <a href="/learn/courses" className="text-sm font-bold text-[#006600] hover:underline dark:text-[#84ba3f]">Explore all courses</a>
      </section>

      <DashboardMetrics
        enrollments={enrollments}
        loggedHours={loggedHours}
        pendingPoE={pendingPoE}
        approvedPoE={approvedPoE}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)]">
        <div className="space-y-6">
          <ResumeLearningCard enrollments={enrollments} />
          <ContinueLearningSection />
        </div>

        <div className="space-y-6">
          <UpcomingMilestones enrollments={enrollments} />
          <AssessorFeedbackFeed
            submissions={enrollments.flatMap((e) => e.submissions)}
          />
          {enrollments.some((e) => e.hostEmployer) && (
            <EmployerReportCard
              employer={enrollments.find((e) => e.hostEmployer)?.hostEmployer}
            />
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

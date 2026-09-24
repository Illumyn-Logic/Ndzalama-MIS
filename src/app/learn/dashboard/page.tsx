import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { DashboardMetrics } from '@/components/learn/dashboard-metrics';
import { ResumeLearningCard } from '@/components/learn/resume-learning-card';
import { UpcomingMilestones } from '@/components/learn/upcoming-milestones';
import { AssessorFeedbackFeed } from '@/components/learn/assessor-feedback-feed';
import { EmployerReportCard } from '@/components/learn/employer-report-card';
import { ContinueLearningSection } from '@/components/learn/continue-learning-section';

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
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0b0e] p-6 space-y-6">
      {/* Top Row: Key Metrics */}
      <DashboardMetrics
        enrollments={enrollments}
        loggedHours={loggedHours}
        pendingPoE={pendingPoE}
        approvedPoE={approvedPoE}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Resume Learning + Milestones */}
        <div className="lg:col-span-2 space-y-6">
          <ResumeLearningCard enrollments={enrollments} />
          <ContinueLearningSection />
        </div>

        {/* Right Column: Feedback + Employer Card */}
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
  );
}

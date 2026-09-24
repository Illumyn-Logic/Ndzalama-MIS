'use client';

import {
  FaComment,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUser,
  FaClock,
} from 'react-icons/fa';
import {
  AssessmentSubmission,
  AssessmentTask,
  CourseModule,
  AssessmentReview,
  User,
  Profile,
} from '@prisma/client';

type SubmissionWithReview = AssessmentSubmission & {
  task: AssessmentTask & {
    module: CourseModule;
  };
  assessorReview?: (AssessmentReview & {
    assessor: User & {
      profile: Profile | null;
    };
  }) | null;
};

interface AssessorFeedbackFeedProps {
  submissions: SubmissionWithReview[];
}

export function AssessorFeedbackFeed({
  submissions,
}: AssessorFeedbackFeedProps) {
  // Filter only submissions with assessor feedback
  const feedbackItems = submissions.filter((s) => s.assessorReview);

  return (
    <div className="bg-white dark:bg-[#16171d] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center gap-2 mb-4">
        <FaComment className="text-[#84ba3f]" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Assessor Feedback
        </h3>
      </div>

      {feedbackItems.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
            <FaComment className="text-xl text-slate-400" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No feedback yet
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Submit your PoE to receive assessor comments
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {feedbackItems.map((submission) => (
            <FeedbackItem key={submission.id} submission={submission} />
          ))}
        </div>
      )}
    </div>
  );
}

function FeedbackItem({ submission }: { submission: SubmissionWithReview }) {
  const review = submission.assessorReview;
  if (!review) return null;

  const assessorName =
    review.assessor.profile?.firstName && review.assessor.profile?.lastName
      ? `${review.assessor.profile.firstName} ${review.assessor.profile.lastName}`
      : review.assessor.email.split('@')[0];

  const isCompetent = review.isCompetent;

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMins > 0) return `${diffMins}m ago`;
    return 'Just now';
  };

  return (
    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-[#84ba3f] transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#84ba3f] to-[#006600] flex items-center justify-center text-white text-xs font-bold">
            {assessorName[0].toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              {assessorName}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Assessor
            </p>
          </div>
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
            isCompetent
              ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
              : 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
          }`}
        >
          {isCompetent ? (
            <>
              <FaCheckCircle className="text-[10px]" />
              <span>Competent</span>
            </>
          ) : (
            <>
              <FaExclamationTriangle className="text-[10px]" />
              <span>NYC</span>
            </>
          )}
        </div>
      </div>

      {/* Module Info */}
      <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
        {submission.task.module.title}
      </p>

      {/* Feedback Content */}
      <div className="bg-white dark:bg-slate-800/50 rounded-lg p-3 mb-2">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {review.feedbackReport.length > 150
            ? `${review.feedbackReport.substring(0, 150)}...`
            : review.feedbackReport}
        </p>
      </div>

      {/* Remediation Plan (if NYC) */}
      {!isCompetent && review.remediationPlan && (
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-2">
          <p className="text-xs font-semibold text-amber-800 dark:text-amber-400 mb-1">
            📋 Remediation Required:
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-300">
            {review.remediationPlan}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <FaClock />
          <span>{timeAgo(review.reviewedAt)}</span>
        </div>
        <button className="text-xs font-semibold text-[#006600] dark:text-[#84ba3f] hover:underline">
          View Full Feedback →
        </button>
      </div>
    </div>
  );
}

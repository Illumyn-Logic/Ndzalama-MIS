'use client';

import Link from 'next/link';
import { FaPlay, FaLock, FaCheckCircle, FaClock } from 'react-icons/fa';
import type {
  Enrollment,
  Qualification,
  CourseModule,
  Lesson,
  LessonProgress,
  AssessmentTask,
  AssessmentSubmission,
} from '@prisma/client';

type EnrollmentWithRelations = Enrollment & {
  qualification: Qualification & {
    modules: (CourseModule & {
      lessons: (Lesson & {
        progressRecords: LessonProgress[];
      })[];
      assessmentTasks: (AssessmentTask & {
        submissions: AssessmentSubmission[];
      })[];
    })[];
  };
  lessonProgress: LessonProgress[];
};

interface ResumeLearningCardProps {
  enrollments: EnrollmentWithRelations[];
}

export function ResumeLearningCard({ enrollments }: ResumeLearningCardProps) {
  if (enrollments.length === 0) {
    return (
      <div className="bg-white dark:bg-[#16171d] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
          <FaPlay className="text-2xl text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          No Active Courses
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Enroll in a qualification to start your learning journey
        </p>
        <Link
          href="/learn/dashboard/courses"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#84ba3f] to-[#006600] text-white font-semibold hover:shadow-lg transition-shadow"
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  // Find the course with most recent activity
  const activeEnrollment = enrollments[0];
  const qualification = activeEnrollment.qualification;

  // Find next incomplete lesson
  let nextLesson: (Lesson & { module: CourseModule }) | null = null;
  let isLocked = false;

  for (const module of qualification.modules) {
    const incompleteLessons = module.lessons.filter(
      (lesson) =>
        !activeEnrollment.lessonProgress.some(
          (p) => p.lessonId === lesson.id && p.isCompleted
        )
    );

    if (incompleteLessons.length > 0) {
      nextLesson = { ...incompleteLessons[0], module };

      // Check if previous module's assessment is complete
      const moduleIndex = qualification.modules.indexOf(module);
      if (moduleIndex > 0) {
        const prevModule = qualification.modules[moduleIndex - 1];
        const hasPassedPrevAssessment = prevModule.assessmentTasks.some((task) =>
          task.submissions.some((sub) => sub.outcome === 'COMPETENT')
        );

        if (!hasPassedPrevAssessment) {
          isLocked = true;
        }
      }
      break;
    }
  }

  const totalLessons = qualification.modules.reduce(
    (sum, m) => sum + m.lessons.length,
    0
  );
  const completedLessons = activeEnrollment.lessonProgress.filter(
    (p) => p.isCompleted
  ).length;
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-[#84ba3f] to-[#006600] rounded-2xl border border-[#84ba3f]/20 p-6 text-white shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider opacity-90 mb-1">
            Resume Learning
          </p>
          <h2 className="text-xl font-bold">{qualification.title}</h2>
        </div>
        <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold">
          {Math.round(progress)}% Complete
        </div>
      </div>

      {nextLesson ? (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              {isLocked ? (
                <FaLock className="text-white/70" />
              ) : (
                <FaPlay className="text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold opacity-80 mb-0.5">
                {nextLesson.module.title}
              </p>
              <h3 className="text-sm font-bold">{nextLesson.title}</h3>
              {isLocked && (
                <p className="text-xs opacity-70 mt-1">
                  🔒 Complete previous module assessment to unlock
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 text-center">
          <FaCheckCircle className="text-3xl mx-auto mb-2 opacity-90" />
          <p className="text-sm font-semibold">All lessons completed!</p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs opacity-80">
          <span>{completedLessons} lessons completed</span>
          <span>{totalLessons - completedLessons} remaining</span>
        </div>
      </div>

      {/* Action Button */}
      {nextLesson && !isLocked ? (
        <Link
          href={`/learn/courses/${qualification.id}/modules/${nextLesson.module.id}/lessons/${nextLesson.id}`}
          className="block w-full py-3 px-4 rounded-xl bg-white text-[#006600] font-bold text-center hover:shadow-xl transition-shadow"
        >
          Continue Lesson →
        </Link>
      ) : isLocked ? (
        <button
          disabled
          className="block w-full py-3 px-4 rounded-xl bg-white/30 text-white font-bold text-center cursor-not-allowed"
        >
          <FaLock className="inline mr-2" />
          Locked
        </button>
      ) : (
        <Link
          href={`/learn/courses/${qualification.id}`}
          className="block w-full py-3 px-4 rounded-xl bg-white text-[#006600] font-bold text-center hover:shadow-xl transition-shadow"
        >
          View Course Details
        </Link>
      )}
    </div>
  );
}

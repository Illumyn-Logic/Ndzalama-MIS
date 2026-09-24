'use client';

import Link from 'next/link';
import { FaPlay, FaLock, FaCheckCircle } from 'react-icons/fa';
import {
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
  let nextLesson: (Lesson & { courseModule: CourseModule }) | null = null;
  let isLocked = false;

  for (const courseModule of qualification.modules) {
    const incompleteLessons = courseModule.lessons.filter(
      (lesson) =>
        !activeEnrollment.lessonProgress.some(
          (p) => p.lessonId === lesson.id && p.isCompleted
        )
    );

    if (incompleteLessons.length > 0) {
      nextLesson = { ...incompleteLessons[0], courseModule };

      // Check if previous module's assessment is complete
      const moduleIndex = qualification.modules.indexOf(courseModule);
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
    <div className="rounded-xl border border-[#84ba3f]/30 bg-[#006600] p-5 text-white">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] opacity-80">
            Resume Learning
          </p>
          <h2 className="text-lg font-bold">{qualification.title}</h2>
        </div>
        <div className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold">
          {Math.round(progress)}% Complete
        </div>
      </div>

      {nextLesson ? (
        <div className="mb-3 rounded-lg bg-white/10 p-3">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
              {isLocked ? (
                <FaLock className="text-white/70" />
              ) : (
                <FaPlay className="text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold opacity-80 mb-0.5">
                {nextLesson.courseModule.title}
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
        <div className="mb-3 rounded-lg bg-white/10 p-3 text-center">
          <FaCheckCircle className="text-3xl mx-auto mb-2 opacity-90" />
          <p className="text-sm font-semibold">All lessons completed!</p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
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
          href={`/learn/courses/${qualification.id}/modules/${nextLesson.courseModule.id}/lessons/${nextLesson.id}`}
          className="block w-full rounded-lg bg-white px-4 py-2.5 text-center text-sm font-bold text-[#006600] transition-shadow hover:shadow-xl"
        >
          Continue Lesson →
        </Link>
      ) : isLocked ? (
        <button
          disabled
          className="block w-full cursor-not-allowed rounded-lg bg-white/20 px-4 py-2.5 text-center text-sm font-bold text-white"
        >
          <FaLock className="inline mr-2" />
          Locked
        </button>
      ) : (
        <Link
          href={`/learn/courses/${qualification.id}`}
          className="block w-full rounded-lg bg-white px-4 py-2.5 text-center text-sm font-bold text-[#006600] transition-shadow hover:shadow-xl"
        >
          View Course Details
        </Link>
      )}
    </div>
  );
}

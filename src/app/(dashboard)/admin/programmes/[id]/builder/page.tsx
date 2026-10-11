import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AssessmentForm, CurriculumAssignmentForm, CurriculumTestForm, LessonForm, ProgrammeResourceForm, RemoveProgrammeResourceButton, TopicEditForm, TopicLessonForms } from '@/components/admin/programmes/forms';

const builderSteps = ['Module', 'Topic', 'Lesson', 'Test or Assessment', 'Resources'];

export default async function ProgrammeBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const qualification = await prisma.qualification.findUnique({
    where: { id },
    include: {
      resources: { orderBy: { createdAt: 'asc' } },
      modules: {
        orderBy: { orderIndex: 'asc' },
        include: {
          resources: { orderBy: { createdAt: 'asc' } },
          assessmentTasks: { orderBy: { order: 'asc' } },
          tests: { orderBy: { order: 'asc' } },
          assignments: { orderBy: { createdAt: 'asc' } },
          topics: {
            orderBy: { order: 'asc' },
            include: {
              resources: { orderBy: { createdAt: 'asc' } },
              tests: { orderBy: { order: 'asc' } },
              assignments: { orderBy: { createdAt: 'asc' } },
              lessons: {
                orderBy: { orderIndex: 'asc' },
                  include: {
                  resources: { orderBy: { createdAt: 'asc' } },
                  programmeResources: { orderBy: { createdAt: 'asc' } },
                  tests: { orderBy: { order: 'asc' } },
                  assignments: { orderBy: { createdAt: 'asc' } },
                },
              },
            },
          },
        },
      },
    },
  });
  if (!qualification) notFound();

  return <div className="space-y-7">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Link href={`/admin/programmes/${id}`} className="text-sm font-semibold text-[#006600] dark:text-[#84ba3f]">← {qualification.title}</Link>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#006600] dark:text-[#84ba3f]">Programme Page Builder</p>
        <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">Build the full learning hierarchy</h1>
        <p className="mt-1 text-sm text-slate-500">Topics sit between Modules and Lessons. Tests are separate from assessments.</p>
      </div>
      <Link href={`/admin/programmes/${id}/export`} target="_blank" className="inline-flex items-center justify-center rounded-md border border-[#006600] px-4 py-2 text-sm font-semibold text-[#006600] dark:text-[#84ba3f]">Export PDF</Link>
    </header>

    <ol className="grid grid-cols-2 gap-2 border-y border-slate-200 py-4 dark:border-[#2e303a] sm:grid-cols-5">
      {builderSteps.map((step, index) => <li key={step} className="flex items-center gap-2 text-sm"><span className="grid size-7 shrink-0 place-items-center rounded-full border border-[#84ba3f] text-xs font-bold text-[#006600] dark:text-[#84ba3f]">{index + 1}</span><span className="font-semibold text-slate-800 dark:text-slate-200">{step}</span></li>)}
    </ol>

    <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
      <nav aria-label="Curriculum outline" className="self-start lg:sticky lg:top-6">
        <h2 className="mb-3 text-sm font-bold uppercase text-slate-500">Curriculum outline</h2>
        <ol className="space-y-2 border-l border-slate-200 pl-4 text-sm dark:border-[#2e303a]">
          {qualification.modules.map((module) => <li key={module.id}><a className="font-semibold text-slate-800 hover:text-[#006600] dark:text-slate-200 dark:hover:text-[#84ba3f]" href={`#${module.id}`}>{module.code ?? module.moduleCode} · {module.title}</a><ol className="ml-3 mt-1 space-y-1 border-l border-slate-200 pl-3 text-xs text-slate-500 dark:border-[#2e303a]">{module.topics.map((topic) => <li key={topic.id}><a href={`#${topic.id}`} className="hover:text-[#006600] dark:hover:text-[#84ba3f]">{topic.title}</a></li>)}</ol></li>)}
        </ol>
        <Link href={`/admin/programmes/${id}/modules/new`} className="mt-5 inline-flex rounded-md bg-[#006600] px-3 py-2 text-sm font-semibold text-white hover:bg-[#03367A]">Add Module</Link>
      </nav>

      <div className="min-w-0 space-y-7">
        <section className="border-b border-slate-200 pb-6 dark:border-[#2e303a]">
          <h2 className="font-bold">Programme resources</h2>
          <div className="mt-3 space-y-2">{qualification.resources.map((resource) => <div key={resource.id}><a href={resource.url} target="_blank" rel="noreferrer" className="text-sm text-[#006600] underline dark:text-[#84ba3f]">{resource.label} · {resource.kind}</a><RemoveProgrammeResourceButton id={resource.id} /></div>)}</div>
          <div className="mt-3"><ProgrammeResourceForm parent={{ qualificationId: id }} /></div>
        </section>

        {qualification.modules.map((module) => <section id={module.id} key={module.id} className="scroll-mt-6 border-b border-slate-200 pb-8 dark:border-[#2e303a]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><p className="text-xs font-bold uppercase text-[#006600] dark:text-[#84ba3f]">{module.code ?? module.moduleCode} · {module.type}</p><h2 className="text-xl font-bold">{module.title}</h2><p className="text-sm text-slate-500">{module.credits} credits · {module.notionalHours} notional hours</p></div>
            <Link href={`/admin/modules/${module.id}`} className="text-sm font-semibold text-[#006600] hover:underline dark:text-[#84ba3f]">Edit module</Link>
          </div>
          {module.resources.map((resource) => <div key={resource.id} className="mt-2 inline-block"><a href={resource.url} target="_blank" rel="noreferrer" className="text-sm text-[#006600] underline dark:text-[#84ba3f]">{resource.label}</a><RemoveProgrammeResourceButton id={resource.id} /></div>)}
          <div className="mt-3"><ProgrammeResourceForm parent={{ moduleId: module.id }} /></div>
          <div className="mt-5 grid gap-6 xl:grid-cols-2">
            <section><h3 className="mb-2 text-sm font-bold">Assessments</h3><ul className="mb-3 space-y-1 text-sm">{module.assessmentTasks.map((assessment) => <li key={assessment.id}>{assessment.kind} · {assessment.title}</li>)}</ul><AssessmentForm moduleId={module.id} /></section>
            <section><h3 className="mb-2 text-sm font-bold">Tests</h3><div className="mb-3 space-y-3">{module.tests.map((test) => <CurriculumTestForm key={test.id} parent={{ moduleId: module.id }} test={test} />)}</div><CurriculumTestForm parent={{ moduleId: module.id }} /></section>
            <section><h3 className="mb-2 text-sm font-bold">Assignments</h3><div className="mb-3 space-y-3">{module.assignments.map((assignment) => <CurriculumAssignmentForm key={assignment.id} parent={{ moduleId: module.id }} assignment={assignment} />)}</div><CurriculumAssignmentForm parent={{ moduleId: module.id }} /></section>
          </div>

          <div className="mt-7 border-l-2 border-[#84ba3f] pl-4">
            <h3 className="font-bold">Topics</h3>
            <div className="mt-3"><TopicLessonForms moduleId={module.id} /></div>
            <div className="mt-5 space-y-5">
              {module.topics.map((topic) => <article id={topic.id} key={topic.id} className="scroll-mt-6 border-t border-slate-200 pt-4 dark:border-[#2e303a]">
                <div className="flex flex-wrap items-center justify-between gap-2"><h4 className="font-semibold">{topic.order}. {topic.title}</h4><TopicEditForm topic={topic} /></div>
                {topic.resources.map((resource) => <div key={resource.id} className="mt-2 inline-block"><a href={resource.url} target="_blank" rel="noreferrer" className="text-sm text-[#006600] underline dark:text-[#84ba3f]">{resource.label}</a><RemoveProgrammeResourceButton id={resource.id} /></div>)}
                <div className="mt-3"><ProgrammeResourceForm parent={{ topicId: topic.id }} /></div>
                <div className="mt-4 grid gap-4 xl:grid-cols-2">
                  <section><h5 className="mb-2 text-sm font-semibold">Topic tests</h5><div className="mb-2 space-y-3">{topic.tests.map((test) => <CurriculumTestForm key={test.id} parent={{ topicId: topic.id }} test={test} />)}</div><CurriculumTestForm parent={{ topicId: topic.id }} /></section>
                  <section><h5 className="mb-2 text-sm font-semibold">Topic assignments</h5><div className="mb-2 space-y-3">{topic.assignments.map((assignment) => <CurriculumAssignmentForm key={assignment.id} parent={{ topicId: topic.id }} assignment={assignment} />)}</div><CurriculumAssignmentForm parent={{ topicId: topic.id }} /></section>
                </div>
                <div className="mt-5 space-y-4 border-l border-slate-200 pl-4 dark:border-[#2e303a]">
                  <h5 className="text-sm font-semibold">Lessons</h5>
                  {topic.lessons.map((lesson) => <div key={lesson.id} className="border-t border-slate-100 pt-3 dark:border-[#2e303a]">
                    <LessonForm topicId={topic.id} moduleId={module.id} lesson={lesson} />
                    {[...lesson.resources, ...lesson.programmeResources].map((resource) => <div key={resource.id} className="mt-2 inline-block"><a href={resource.url} target="_blank" rel="noreferrer" className="text-sm text-[#006600] underline dark:text-[#84ba3f]">{resource.label}</a>{'lessonId' in resource && <RemoveProgrammeResourceButton id={resource.id} />}</div>)}
                    <div className="mt-3"><ProgrammeResourceForm parent={{ lessonId: lesson.id }} /></div>
                    <div className="mt-4 grid gap-4 xl:grid-cols-2">
                      <section><h6 className="mb-2 text-sm font-semibold">Lesson tests</h6><div className="mb-2 space-y-3">{lesson.tests.map((test) => <CurriculumTestForm key={test.id} parent={{ lessonId: lesson.id }} test={test} />)}</div><CurriculumTestForm parent={{ lessonId: lesson.id }} /></section>
                      <section><h6 className="mb-2 text-sm font-semibold">Lesson assignments</h6><div className="mb-2 space-y-3">{lesson.assignments.map((assignment) => <CurriculumAssignmentForm key={assignment.id} parent={{ lessonId: lesson.id }} assignment={assignment} />)}</div><CurriculumAssignmentForm parent={{ lessonId: lesson.id }} /></section>
                    </div>
                  </div>)}
                  <LessonForm topicId={topic.id} moduleId={module.id} />
                </div>
              </article>)}
            </div>
          </div>
        </section>)}
      </div>
    </div>
  </div>;
}
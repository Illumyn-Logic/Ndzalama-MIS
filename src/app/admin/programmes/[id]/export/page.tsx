import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PrintButton } from '@/components/admin/programmes/print-button';

export default async function ProgrammeExportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const programme = await prisma.qualification.findUnique({
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
              lessons: { orderBy: { orderIndex: 'asc' }, include: { resources: { orderBy: { createdAt: 'asc' } }, programmeResources: { orderBy: { createdAt: 'asc' } }, tests: { orderBy: { order: 'asc' } }, assignments: { orderBy: { createdAt: 'asc' } } } },
            },
          },
        },
      },
    },
  });
  if (!programme) notFound();
  const totalModuleCredits = programme.modules.reduce((sum, module) => sum + module.credits, 0);
  const totalNotionalHours = programme.modules.reduce((sum, module) => sum + module.notionalHours, 0);
  const totalLessonMinutes = programme.modules.reduce((sum, module) => sum + module.topics.reduce((topicSum, topic) => topicSum + topic.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.durationMinutes, 0), 0), 0);
  const resources = (items: Array<{ id: string; label: string; kind: string; url: string }>) => items.length ? <ul className="mt-2 list-disc pl-5">{items.map((item) => <li key={item.id}>{item.label} ({item.kind}) · {item.url}</li>)}</ul> : null;

  return <main className="export-page mx-auto max-w-4xl px-6 py-8 text-slate-900">
    <style>{`@media print { @page { margin: 18mm; } .export-page { max-width: none; padding: 0; } .export-module { break-inside: avoid-page; } a { color: inherit; text-decoration: none; } }`}</style>
    <div className="mb-8 flex items-start justify-between gap-4 print:hidden"><p className="text-sm text-slate-500">Programme structure export</p><PrintButton /></div>
    <header className="border-b-2 border-slate-900 pb-5"><p className="text-sm font-bold uppercase">{programme.accreditation ?? programme.framework.replaceAll('_', ' ')}</p><h1 className="mt-2 text-3xl font-bold">{programme.title}</h1><p className="mt-2">{programme.saqaId ?? programme.qctoCode ?? programme.code} · NQF {programme.nqfLevel} · {programme.credits} programme credits · {programme.durationValue} {programme.durationUnit.toLowerCase()}</p><p className="mt-1">Module totals: {totalModuleCredits} credits · {totalNotionalHours} notional hours · {Math.round(totalLessonMinutes / 60 * 10) / 10} lesson hours</p></header>
    {programme.fullDescription && <section className="py-5"><h2 className="text-xl font-bold">Programme description</h2><p className="mt-2 whitespace-pre-line">{programme.fullDescription}</p></section>}
    {programme.resources.length > 0 && <section className="border-t border-slate-300 py-4"><h2 className="font-bold">Programme resources</h2>{resources(programme.resources)}</section>}
    <section className="space-y-6 py-5"><h2 className="text-2xl font-bold">Programme structure</h2>
      {programme.modules.map((module) => <article key={module.id} className="export-module border-t border-slate-300 pt-4">
        <h3 className="text-lg font-bold">{module.code ?? module.moduleCode}: {module.title}</h3><p className="text-sm">{module.type.replaceAll('_', ' ')} · {module.credits} credits · {module.notionalHours} notional hours</p>{resources(module.resources)}
        {module.assessmentTasks.length > 0 && <div className="mt-3"><h4 className="font-semibold">Assessments</h4><ul className="list-disc pl-5">{module.assessmentTasks.map((item) => <li key={item.id}>{item.kind}: {item.title}{item.instructions ? ` · ${item.instructions}` : ''}</li>)}</ul></div>}
        {module.tests.length > 0 && <div className="mt-3"><h4 className="font-semibold">Tests</h4><ul className="list-disc pl-5">{module.tests.map((item) => <li key={item.id}>{item.title}{item.durationMinutes ? ` · ${item.durationMinutes} min` : ''}{item.passMark !== null ? ` · pass ${item.passMark}%` : ''}</li>)}</ul></div>}
        {module.assignments.length > 0 && <div className="mt-3"><h4 className="font-semibold">Assignments</h4><ul className="list-disc pl-5">{module.assignments.map((item) => <li key={item.id}>{item.title}{item.instructions ? ` · ${item.instructions}` : ''}{item.evidenceRequirements.length > 0 ? ` · Evidence: ${item.evidenceRequirements.join('; ')}` : ''}</li>)}</ul></div>}
        <div className="mt-4 space-y-4 pl-4">
          {module.topics.map((topic) => <section key={topic.id} className="border-l-2 border-slate-300 pl-4"><h4 className="font-semibold">{topic.order}. {topic.title}</h4>{resources(topic.resources)}
            {topic.tests.length > 0 && <p className="mt-2"><strong>Tests:</strong> {topic.tests.map((item) => item.title).join(', ')}</p>}
            {topic.assignments.length > 0 && <p className="mt-2"><strong>Assignments:</strong> {topic.assignments.map((item) => item.title).join(', ')}</p>}
            <ol className="mt-3 space-y-3">{topic.lessons.map((lesson) => <li key={lesson.id}><h5 className="font-medium">{lesson.orderIndex}. {lesson.title} · {lesson.durationMinutes} minutes</h5>{lesson.contentBody && <p className="mt-1 whitespace-pre-line">{lesson.contentBody}</p>}{resources([...lesson.resources, ...lesson.programmeResources])}{lesson.tests.length > 0 && <p className="mt-1"><strong>Tests:</strong> {lesson.tests.map((item) => item.title).join(', ')}</p>}{lesson.assignments.length > 0 && <p className="mt-1"><strong>Assignments:</strong> {lesson.assignments.map((item) => item.title).join(', ')}</p>}</li>)}</ol>
          </section>)}
        </div>
      </article>)}
    </section>
  </main>;
}
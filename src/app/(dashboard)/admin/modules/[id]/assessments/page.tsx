import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AssessmentForm } from '@/components/admin/programmes/forms';

export default async function AssessmentsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const module = await prisma.courseModule.findUnique({ where: { id }, include: { assessmentTasks: { orderBy: { order: 'asc' } } } });
  if (!module) notFound();
  return <div className="space-y-6"><div><Link href={`/admin/modules/${id}`} className="text-sm font-semibold text-[#006600] dark:text-[#84ba3f]">← {module.title}</Link><h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">Assessment tasks</h1><p className="mt-1 text-sm text-slate-500">Create formative and summative evidence requirements for this module.</p></div><section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-[#2e303a] dark:bg-[#16171d]"><h2 className="mb-4 text-lg font-bold">New assessment</h2><AssessmentForm moduleId={id} /></section><section className="space-y-3">{module.assessmentTasks.map((task) => <article key={task.id} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-[#2e303a] dark:bg-[#16171d]"><div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><div><span className="mr-2 rounded-full bg-slate-100 px-2 py-1 text-xs font-bold dark:bg-[#0a0a0a]">{task.kind}</span><strong>{task.order}. {task.title}</strong></div><span className="text-sm text-slate-500">{task.maxMarks} marks</span></div><AssessmentForm moduleId={id} task={task} /></article>)}{module.assessmentTasks.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 dark:border-[#2e303a]">No assessment tasks yet.</div>}</section></div>;
}

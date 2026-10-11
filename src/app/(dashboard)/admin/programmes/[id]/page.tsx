import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProgrammeAvailabilityActions, QualificationForm } from '@/components/admin/programmes/forms';

export default async function ProgrammeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const qualification = await prisma.qualification.findUnique({ where: { id }, include: { modules: { orderBy: { orderIndex: 'asc' } } } });
  if (!qualification) notFound();
  const registrationRef = qualification.saqaId ?? qualification.qctoCode ?? qualification.code;
  const formValue = { ...qualification, price: Number(qualification.price) };
  return <div className="space-y-7">
    <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-[#2e303a] sm:flex-row sm:items-start sm:justify-between">
      <div><Link href="/admin/programmes" className="text-sm font-semibold text-[#006600] dark:text-[#84ba3f]">← Programs / Courses</Link><p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#006600] dark:text-[#84ba3f]">{qualification.framework.replaceAll('_', ' ')}</p><h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{qualification.title}</h1><p className="mt-2 text-sm text-slate-500">{registrationRef} · NQF {qualification.nqfLevel} · {qualification.credits} credits · {qualification.durationValue} {qualification.durationUnit.toLowerCase()} · R {Number(qualification.price).toFixed(2)}</p>
        <div className="mt-4"><ProgrammeAvailabilityActions id={id} isActive={qualification.isActive} status={qualification.status} /></div>
      </div>
      <div className="flex flex-wrap gap-2"><Link href={`/admin/programmes/${id}/builder`} className="rounded-md bg-[#006600] px-4 py-2 text-sm font-semibold text-white hover:bg-[#03367A]">Open Programme Builder</Link><Link href={`/admin/programmes/${id}/export`} target="_blank" className="rounded-md border border-[#006600] px-4 py-2 text-sm font-semibold text-[#006600] dark:text-[#84ba3f]">Export PDF</Link></div>
    </header>
    <section className="space-y-4 border-b border-slate-200 pb-7 dark:border-[#2e303a]"><div><h2 className="text-lg font-bold">Programme details</h2><p className="text-sm text-slate-500">Edit the programme identity, qualification, duration and availability.</p></div><QualificationForm qualification={formValue} /></section>
    <section><div className="flex items-center justify-between gap-4"><div><h2 className="text-lg font-bold">Curriculum modules</h2><p className="text-sm text-slate-500">{qualification.modules.length} modules in this programme.</p></div><Link href={`/admin/programmes/${id}/modules/new`} className="rounded-md border border-[#006600] px-3 py-2 text-sm font-semibold text-[#006600] dark:text-[#84ba3f]">Add module</Link></div>
      <ol className="mt-4 divide-y divide-slate-200 border-y border-slate-200 dark:divide-[#2e303a] dark:border-[#2e303a]">{qualification.modules.map((module) => <li key={module.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"><Link href={`/admin/modules/${module.id}`} className="font-semibold text-slate-900 hover:text-[#006600] dark:text-white dark:hover:text-[#84ba3f]">{module.code ?? module.moduleCode} · {module.title}</Link><span className="text-sm text-slate-500">{module.type.replaceAll('_', ' ')} · {module.credits} credits · {module.notionalHours} hours</span></li>)}</ol>
    </section>
  </div>;
}

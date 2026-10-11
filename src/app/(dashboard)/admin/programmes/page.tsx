import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { QualificationFramework, QualificationStatus } from '@prisma/client';

export default async function ProgrammesPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; type?: string }> }) {
  const params = await searchParams;
  const query = params.q?.trim() ?? '';
  const status = Object.values(QualificationStatus).includes(params.status as QualificationStatus) ? params.status as QualificationStatus : undefined;
  const type = Object.values(QualificationFramework).includes(params.type as QualificationFramework) ? params.type as QualificationFramework : undefined;
  const qualifications = await prisma.qualification.findMany({
    where: {
      ...(query ? { OR: [{ title: { contains: query, mode: 'insensitive' } }, { code: { contains: query, mode: 'insensitive' } }, { saqaId: { contains: query, mode: 'insensitive' } }, { qctoCode: { contains: query, mode: 'insensitive' } }] } : {}),
      ...(status ? { status } : { status: { not: QualificationStatus.ARCHIVED } }),
      ...(type ? { framework: type } : {}),
    },
    include: { _count: { select: { modules: true } } },
    orderBy: { title: 'asc' },
  });
  return <div className="space-y-6">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-xs font-bold uppercase tracking-widest text-[#006600] dark:text-[#84ba3f]">Programme management</p><h1 className="text-3xl font-bold text-slate-900 dark:text-white">Programs / Courses</h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Create programmes, then build their learning hierarchy.</p></div>
      <Link href="/admin/programmes/new" className="rounded-md bg-[#006600] px-4 py-2 text-sm font-semibold text-white hover:bg-[#03367A]">Add Program/Course</Link>
    </header>
    <form className="grid gap-3 border-y border-slate-200 py-4 dark:border-[#2e303a] sm:grid-cols-[1fr_12rem_14rem_auto]">
      <label><span className="sr-only">Search programmes</span><input name="q" defaultValue={query} placeholder="Search title or registration reference" className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:border-[#84ba3f] focus:outline-none dark:border-[#2e303a]" /></label>
      <label><span className="sr-only">Filter by type</span><select name="type" defaultValue={type ?? ''} className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm dark:border-[#2e303a]"><option value="">All types</option>{[QualificationFramework.QCTO_OCCUPATIONAL_CERTIFICATE, QualificationFramework.SKILLS_PROGRAMME, QualificationFramework.SHORT_COURSE].map((item) => <option key={item} value={item}>{item.replaceAll('_', ' ')}</option>)}</select></label>
      <label><span className="sr-only">Filter by status</span><select name="status" defaultValue={status ?? ''} className="w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm dark:border-[#2e303a]"><option value="">Active and drafts</option>{Object.values(QualificationStatus).map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
      <button className="rounded-md border border-[#006600] px-4 py-2 text-sm font-semibold text-[#006600] hover:bg-[#006600] hover:text-white dark:text-[#84ba3f]">Filter</button>
    </form>
    <div className="overflow-x-auto border-y border-slate-200 dark:border-[#2e303a]"><table className="w-full min-w-212.5 text-left text-sm"><thead className="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-[#2e303a]"><tr><th className="py-3 pr-4">Programme</th><th className="px-4 py-3">Registration</th><th className="px-4 py-3">NQF / Credits</th><th className="px-4 py-3">Duration</th><th className="px-4 py-3">Cost</th><th className="px-4 py-3">Status</th><th className="py-3 pl-4">Modules</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-[#2e303a]">{qualifications.map((item) => <tr key={item.id}><td className="py-4 pr-4"><Link href={`/admin/programmes/${item.id}`} className="font-semibold text-slate-900 hover:text-[#006600] dark:text-white dark:hover:text-[#84ba3f]">{item.title}</Link><span className="mt-1 block text-xs text-slate-500">{item.framework.replaceAll('_', ' ')}</span></td><td className="px-4 py-4">{item.saqaId ?? item.qctoCode ?? item.code}</td><td className="px-4 py-4">{item.nqfLevel} / {item.credits}</td><td className="px-4 py-4">{item.durationValue} {item.durationUnit.toLowerCase()}</td><td className="px-4 py-4">R {Number(item.price).toFixed(2)}</td><td className="px-4 py-4"><span className={item.status === QualificationStatus.ACTIVE ? 'font-semibold text-green-700 dark:text-green-400' : item.status === QualificationStatus.ARCHIVED ? 'font-semibold text-slate-500' : 'font-semibold text-amber-700 dark:text-amber-400'}>{item.status}</span></td><td className="py-4 pl-4">{item._count.modules}</td></tr>)}</tbody></table>{qualifications.length === 0 && <p className="py-12 text-center text-sm text-slate-500">No programmes match these filters.</p>}</div>
  </div>;
}

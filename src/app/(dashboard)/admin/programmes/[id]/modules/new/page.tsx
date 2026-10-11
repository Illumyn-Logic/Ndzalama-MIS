import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ModuleForm } from '@/components/admin/programmes/forms';

export default async function NewModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const qualification = await prisma.qualification.findUnique({ where: { id }, select: { id: true, title: true } });
  if (!qualification) notFound();
  return <div className="mx-auto max-w-3xl space-y-6"><div><Link href={`/admin/programmes/${id}`} className="text-sm font-semibold text-[#006600] dark:text-[#84ba3f]">← {qualification.title}</Link><h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">Add module</h1></div><section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-[#2e303a] dark:bg-[#16171d]"><ModuleForm qualificationId={id} /></section></div>;
}

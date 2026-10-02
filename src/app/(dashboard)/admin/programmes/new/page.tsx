import Link from 'next/link';
import { QualificationForm } from '@/components/admin/programmes/forms';

export default function NewProgrammePage() {
  return <div className="mx-auto max-w-4xl space-y-6"><div><Link href="/admin/programmes" className="text-sm font-semibold text-[#006600] dark:text-[#84ba3f]">← Programs / Courses</Link><p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#006600] dark:text-[#84ba3f]">Stage 1 · Programme identity</p><h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">Add Program/Course</h1></div><section className="border-y border-slate-200 py-6 dark:border-[#2e303a]"><QualificationForm /></section></div>;
}

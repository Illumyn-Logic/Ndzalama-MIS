import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Courses | Admin' };

export default function AdminCoursesPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-700 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Course Management</h1>
      <p className="text-slate-500">Coming soon — course catalogue and programme management.</p>
    </div>
  );
}

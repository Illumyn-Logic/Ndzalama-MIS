import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Learners | Admin' };

export default function LearnersPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-700 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Learner Management</h1>
      <p className="text-slate-500">Coming soon — learner records and enrollment history.</p>
    </div>
  );
}

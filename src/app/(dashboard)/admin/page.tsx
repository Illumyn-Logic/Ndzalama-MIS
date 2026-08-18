import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin Dashboard | Ndzalama' };

const stats = [
  { label: 'Total learners', value: '1,248', change: '+12.4%', tone: 'emerald' },
  { label: 'Active courses', value: '38', change: '+5 new', tone: 'sky' },
  { label: 'Completion rate', value: '84%', change: '+7.2%', tone: 'violet' },
  { label: 'Pending approvals', value: '23', change: '-6 this week', tone: 'amber' },
] as const;

const chartData = [64, 48, 72, 56, 82, 68, 91];

const enrollmentRows = [
  { name: 'Aphiwe Mokoena', course: 'ECD Practitioner L4', status: 'Enrolled', date: '08 Aug 2026' },
  { name: 'Lerato Ndlovu', course: 'Workplace Preparation', status: 'In progress', date: '04 Aug 2026' },
  { name: 'Mandla Khumalo', course: 'Occupational Trainer', status: 'Awaiting review', date: '02 Aug 2026' },
  { name: 'Nandi Mahlangu', course: 'Facilitation Skills', status: 'Completed', date: '31 Jul 2026' },
];

const courseRows = [
  { name: 'Occupational Trainer', learners: 232, completion: '82%', status: 'On track' },
  { name: 'Workplace Essential Skills', learners: 188, completion: '76%', status: 'Needs review' },
  { name: 'Training Development Practitioner', learners: 154, completion: '88%', status: 'On track' },
  { name: 'Early Childhood Development', learners: 126, completion: '71%', status: 'At risk' },
];

const approvals = [
  'New learner applications pending review',
  'Venue booking approval for Durban cohort',
  'Assessment submission flagged for moderation',
];

type Tone = 'emerald' | 'sky' | 'violet' | 'amber';
const toneStyles: Record<Tone, string> = {
  emerald: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100',
  sky: 'bg-sky-50 text-sky-700 ring-1 ring-sky-100',
  violet: 'bg-violet-50 text-violet-700 ring-1 ring-violet-100',
  amber: 'bg-amber-50 text-amber-700 ring-1 ring-amber-100',
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Overview
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Welcome back, Sarah
          </h2>
        </div>
        <button className="inline-flex items-center justify-center rounded-xl bg-[#84ba3f] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6ea032]">
          + Create new course
        </button>
      </div>

      {/* KPI stats */}
      <section aria-label="Key metrics" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${toneStyles[stat.tone]}`}>
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Chart + Enrollments */}
      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        {/* Activity chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Performance
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Learner activity
              </h3>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              +22% vs last month
            </span>
          </div>
          <div className="flex h-52 items-end gap-3" aria-label="Weekly activity chart">
            {chartData.map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-[#03367A] to-[#84ba3f]"
                  style={{ height: `${value}%` }}
                  aria-label={`${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][index]}: ${value}%`}
                />
                <span className="text-xs text-slate-400">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent enrollments */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Recent
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">
              New enrollments
            </h3>
          </div>
          <div className="space-y-4">
            {enrollmentRows.map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                <div>
                  <p className="font-semibold text-slate-800">{row.name}</p>
                  <p className="text-xs text-slate-500">{row.course}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-500">{row.date}</p>
                  <span className="mt-1 inline-flex rounded-full bg-sky-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-700">
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course table + Quick actions */}
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        {/* Course performance table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Portfolio
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">
              Course performance
            </h3>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Course</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Learners</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Completion</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {courseRows.map((course) => (
                  <tr key={course.name} className="text-sm text-slate-700">
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {course.name}
                    </td>
                    <td className="px-4 py-3">{course.learners}</td>
                    <td className="px-4 py-3">{course.completion}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                          course.status === 'On track'
                            ? 'bg-emerald-100 text-emerald-700'
                            : course.status === 'Needs review'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions + Approvals */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Actions
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">Quick actions</h3>
            <div className="mt-4 space-y-3">
              {['Review applications', 'Schedule assessment', 'Publish announcement', 'Download attendance'].map(
                (action) => (
                  <button
                    key={action}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-[#84ba3f] hover:text-[#03367A]"
                  >
                    <span>{action}</span>
                    <span aria-hidden="true">→</span>
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Approvals
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">Needs attention</h3>
            <ul className="mt-4 space-y-3">
              {approvals.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600"
                >
                  <span
                    className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#84ba3f]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

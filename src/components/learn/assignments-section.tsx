'use client';

import Link from 'next/link';
import { FaClipboardList, FaCalendarAlt, FaArrowRight, FaExclamationCircle } from 'react-icons/fa';

interface Assignment {
  id: string;
  type: 'Track' | 'Course' | 'Assessment';
  title: string;
  dueDate: string;
  status: 'Missed' | 'Due Soon' | 'On Track';
  daysLate?: number;
}

const mockAssignments: Assignment[] = [
  {
    id: '1',
    type: 'Track',
    title: 'Associate Data Scientist',
    dueDate: '31 days late',
    status: 'Missed',
    daysLate: 31,
  },
  {
    id: '2',
    type: 'Assessment',
    title: 'Microsoft Copilot Quiz',
    dueDate: 'Due in 3 days',
    status: 'Due Soon',
  },
];

export function AssignmentsSection() {
  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FaClipboardList className="text-[#84ba3f]" />
            My Assignments
          </h2>
        </div>
        <Link
          href="/learn/dashboard/assignments"
          className="text-sm font-semibold text-[#006600] dark:text-[#84ba3f] hover:underline"
        >
          See All →
        </Link>
      </div>

      {/* Desktop: Table View */}
      <div className="hidden md:block bg-white dark:bg-[#16171d] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Assignment
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Due Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {mockAssignments.map((assignment) => (
              <tr
                key={assignment.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {assignment.type}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <Link
                    href={`/learn/dashboard/assignments/${assignment.id}`}
                    className="text-sm font-semibold text-slate-900 dark:text-white hover:text-[#84ba3f] hover:underline"
                  >
                    {assignment.title}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <FaCalendarAlt />
                    <span>{assignment.dueDate}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      assignment.status === 'Missed'
                        ? 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300'
                        : assignment.status === 'Due Soon'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                    }`}
                  >
                    {assignment.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <Link
                    href={`/learn/dashboard/assignments/${assignment.id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#006600] dark:text-[#84ba3f] hover:underline"
                  >
                    <FaArrowRight />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card View */}
      <div className="md:hidden space-y-3">
        {mockAssignments.map((assignment) => (
          <Link
            key={assignment.id}
            href={`/learn/dashboard/assignments/${assignment.id}`}
            className="block bg-white dark:bg-[#16171d] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-md hover:border-[#84ba3f] transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {assignment.type}
                  </span>
                  {assignment.status === 'Missed' && (
                    <FaExclamationCircle className="text-red-500 text-sm" />
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {assignment.title}
                </h3>
              </div>
              <FaArrowRight className="text-slate-400 shrink-0 mt-1" />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <FaCalendarAlt />
                <span>{assignment.dueDate}</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  assignment.status === 'Missed'
                    ? 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300'
                    : assignment.status === 'Due Soon'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                }`}
              >
                {assignment.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

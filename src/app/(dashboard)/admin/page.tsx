import Link from 'next/link';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaClipboardList,
  FaClock,
  FaFileAlt,
  FaGraduationCap,
  FaUsers,
} from 'react-icons/fa';

const activeEnrollmentStatuses = ['ENROLLED', 'IN_TRAINING', 'POE_SUBMITTED', 'ASSESSMENT_IN_PROGRESS'] as const;
const pendingApplicationStatuses = ['SUBMITTED', 'UNDER_REVIEW'] as const;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

function learnerName(profile: { firstName: string; lastName: string } | null, email: string) {
  return profile ? `${profile.firstName} ${profile.lastName}` : email;
}

function isDatabaseUnavailable(error: unknown) {
  if (!(error instanceof Error)) return false;
  if (error.message.includes("Can't reach database server")) return true;
  return ('errorCode' in error && error.errorCode === 'P1001') || ('code' in error && error.code === 'P1001');
}

function Metric({ label, value, detail, icon: Icon, tone }: {
  label: string;
  value: number;
  detail: string;
  icon: typeof FaUsers;
  tone: string;
}) {
  return (
    <article className="flex min-w-0 items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-[#2e303a] dark:bg-[#16171d]">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone}`}>
        <Icon aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-bold leading-none text-slate-900 dark:text-white">{value.toLocaleString('en-ZA')}</p>
        <h2 className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">{label}</h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{detail}</p>
      </div>
    </article>
  );
}

export default async function AdminDashboardPage() {
  const session = await auth();
  const now = new Date();
  const firstName = session?.user?.name?.trim().split(/\s+/)[0] ?? 'team';
  const role = session?.user?.role === 'SUPER_ADMIN' ? 'Executive overview' : 'Operations overview';

  try {
    const [activeProgrammes, activeLearners, pendingApplications, activeEnrollments, activeCohorts, pendingReviews, recentApplications, recentEnrollments, upcomingCohorts, programmes] = await Promise.all([
    prisma.qualification.count({ where: { isActive: true } }),
    prisma.user.count({ where: { role: 'LEARNER', isActive: true } }),
    prisma.application.count({ where: { status: { in: [...pendingApplicationStatuses] } } }),
    prisma.enrollment.count({ where: { status: { in: [...activeEnrollmentStatuses] } } }),
    prisma.cohort.count({ where: { endDate: { gte: now }, isEnrollmentOpen: true } }),
    prisma.assessmentSubmission.count({ where: { outcome: 'SUBMITTED' } }),
    prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        applicationNumber: true,
        status: true,
        createdAt: true,
        applicant: { select: { email: true, profile: { select: { firstName: true, lastName: true } } } },
        qualification: { select: { title: true } },
      },
    }),
    prisma.enrollment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        enrollmentNumber: true,
        status: true,
        startDate: true,
        learner: { select: { email: true, profile: { select: { firstName: true, lastName: true } } } },
        qualification: { select: { title: true } },
      },
    }),
    prisma.cohort.findMany({
      where: { endDate: { gte: now }, isEnrollmentOpen: true },
      orderBy: { startDate: 'asc' },
      take: 4,
      select: {
        id: true,
        code: true,
        name: true,
        startDate: true,
        endDate: true,
        capacity: true,
        qualification: { select: { title: true } },
        venue: { select: { name: true } },
        _count: { select: { enrollments: true } },
      },
    }),
    prisma.qualification.findMany({
      where: { isActive: true },
      orderBy: { title: 'asc' },
      take: 4,
      select: { id: true, title: true, saqaId: true, nqfLevel: true, _count: { select: { modules: true } } },
    }),
    ]);

  const stats = [
    { label: 'Pending applications', value: pendingApplications, detail: 'Submitted or awaiting review', icon: FaClipboardList, tone: 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300' },
    { label: 'Active learners', value: activeLearners, detail: 'Registered learner accounts', icon: FaUsers, tone: 'bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300' },
    { label: 'Active enrollments', value: activeEnrollments, detail: 'Currently in a programme', icon: FaBookOpen, tone: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300' },
    { label: 'Active qualifications', value: activeProgrammes, detail: 'Published programme records', icon: FaGraduationCap, tone: 'bg-lime-100 text-lime-900 dark:bg-lime-950/50 dark:text-lime-300' },
  ];

    return (
    <div className="mx-auto max-w-360 space-y-7">
      <section className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 dark:border-[#2e303a] sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#006600] dark:text-[#84ba3f]">{role}</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Welcome back, {firstName}</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">A live view of Ndzalama programme delivery and learner operations.</p>
        </div>
        <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <FaCalendarAlt className="text-[#006600] dark:text-[#84ba3f]" aria-hidden="true" />
          {new Intl.DateTimeFormat('en-ZA', { dateStyle: 'full' }).format(now)}
        </p>
      </section>

      <section aria-label="Operations metrics" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => <Metric key={stat.label} {...stat} />)}
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-[#2e303a] dark:bg-[#16171d]">
          <span className="text-sm text-slate-600 dark:text-slate-300">Open cohorts</span><strong className="text-lg text-slate-900 dark:text-white">{activeCohorts}</strong>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-[#2e303a] dark:bg-[#16171d]">
          <span className="text-sm text-slate-600 dark:text-slate-300">Assessment reviews due</span><strong className="text-lg text-slate-900 dark:text-white">{pendingReviews}</strong>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-[#2e303a] dark:bg-[#16171d]">
          <span className="text-sm text-slate-600 dark:text-slate-300">Accreditation</span><strong className="font-mono text-sm text-[#006600] dark:text-[#84ba3f]">ETDP0204</strong>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div id="application-queue" className="rounded-lg border border-slate-200 bg-white dark:border-[#2e303a] dark:bg-[#16171d]">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-[#2e303a]">
            <div><p className="text-xs font-bold uppercase tracking-wider text-[#006600] dark:text-[#84ba3f]">Intake queue</p><h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Recent applications</h2></div>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">{pendingApplications} pending</span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-[#2e303a]">
            {recentApplications.map((application) => <div key={application.id} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{learnerName(application.applicant.profile, application.applicant.email)}</p><p className="mt-1 truncate text-xs text-slate-500">{application.qualification.title} <span className="px-1">·</span> {application.applicationNumber}</p></div><div className="flex shrink-0 items-center gap-3 text-xs"><span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-700 dark:bg-[#0a0a0a] dark:text-slate-200">{application.status.replaceAll('_', ' ')}</span><span className="text-slate-500">{formatDate(application.createdAt)}</span></div></div>)}
            {recentApplications.length === 0 && <p className="px-5 py-8 text-center text-sm text-slate-500">No applications have been received yet.</p>}
          </div>
          <div className="border-t border-slate-200 px-5 py-3 dark:border-[#2e303a]"><a href="#application-queue" className="inline-flex items-center gap-2 text-xs font-bold text-[#006600] dark:text-[#84ba3f]">Application queue <FaArrowRight aria-hidden="true" /></a></div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white dark:border-[#2e303a] dark:bg-[#16171d]">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-[#2e303a]">
            <div><p className="text-xs font-bold uppercase tracking-wider text-[#006600] dark:text-[#84ba3f]">Programme portfolio</p><h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Active qualifications</h2></div>
            <Link href="/admin/programmes" aria-label="View all qualifications" className="rounded-md p-2 text-[#006600] hover:bg-lime-50 focus:outline-none focus:ring-2 focus:ring-[#84ba3f] dark:text-[#84ba3f] dark:hover:bg-[#0a0a0a]"><FaArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-[#2e303a]">
            {programmes.map((programme) => <Link key={programme.id} href={`/admin/programmes/${programme.id}`} className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#84ba3f] dark:hover:bg-[#0a0a0a]"><span className="min-w-0"><strong className="block truncate text-sm text-slate-900 dark:text-white">{programme.title}</strong><span className="mt-1 block text-xs text-slate-500">SAQA {programme.saqaId ?? 'Not set'} · NQF {programme.nqfLevel}</span></span><span className="shrink-0 text-right text-xs text-slate-500"><strong className="block text-sm text-slate-900 dark:text-white">{programme._count.modules}</strong>modules</span></Link>)}
            {programmes.length === 0 && <div className="px-5 py-8 text-center"><p className="text-sm text-slate-500">No active qualifications yet.</p><Link href="/admin/programmes/new" className="mt-3 inline-block text-sm font-bold text-[#006600] dark:text-[#84ba3f]">Create qualification</Link></div>}
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white dark:border-[#2e303a] dark:bg-[#16171d]">
          <div className="border-b border-slate-200 px-5 py-4 dark:border-[#2e303a]"><p className="text-xs font-bold uppercase tracking-wider text-[#006600] dark:text-[#84ba3f]">Learner activity</p><h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Latest enrollments</h2></div>
          <div className="divide-y divide-slate-100 dark:divide-[#2e303a]">
            {recentEnrollments.map((enrollment) => <div key={enrollment.id} className="flex items-center justify-between gap-3 px-5 py-4"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{learnerName(enrollment.learner.profile, enrollment.learner.email)}</p><p className="mt-1 truncate text-xs text-slate-500">{enrollment.qualification.title}</p></div><div className="shrink-0 text-right"><span className="block text-xs font-semibold text-slate-700 dark:text-slate-200">{enrollment.status.replaceAll('_', ' ')}</span><span className="mt-1 block text-xs text-slate-500">{formatDate(enrollment.startDate)}</span></div></div>)}
            {recentEnrollments.length === 0 && <p className="px-5 py-8 text-center text-sm text-slate-500">No learner enrollments yet.</p>}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white dark:border-[#2e303a] dark:bg-[#16171d]">
          <div className="border-b border-slate-200 px-5 py-4 dark:border-[#2e303a]"><p className="text-xs font-bold uppercase tracking-wider text-[#006600] dark:text-[#84ba3f]">Delivery calendar</p><h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Upcoming cohorts</h2></div>
          <div className="divide-y divide-slate-100 dark:divide-[#2e303a]">
            {upcomingCohorts.map((cohort) => <div key={cohort.id} className="flex items-start justify-between gap-3 px-5 py-4"><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{cohort.qualification.title}</p><p className="mt-1 truncate text-xs text-slate-500">{cohort.code} · {cohort.venue.name}</p><p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500"><FaClock aria-hidden="true" />{formatDate(cohort.startDate)} – {formatDate(cohort.endDate)}</p></div><span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-[#0a0a0a] dark:text-slate-200">{cohort._count.enrollments}/{cohort.capacity}</span></div>)}
            {upcomingCohorts.length === 0 && <p className="px-5 py-8 text-center text-sm text-slate-500">No open cohorts scheduled.</p>}
          </div>
        </div>
      </section>

      <section aria-labelledby="quick-actions-title" className="rounded-lg border border-slate-200 bg-white p-5 dark:border-[#2e303a] dark:bg-[#16171d]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-[#006600] dark:text-[#84ba3f]">Shortcuts</p><h2 id="quick-actions-title" className="mt-1 text-lg font-bold text-slate-900 dark:text-white">Quick actions</h2></div><div className="flex flex-wrap gap-2"><Link href="/admin/programmes/new" className="inline-flex items-center gap-2 rounded-md bg-[#006600] px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-[#03367A] focus:outline-none focus:ring-2 focus:ring-[#84ba3f]"> <FaGraduationCap aria-hidden="true" /> New qualification</Link><Link href="/admin/programmes" className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:border-[#84ba3f] focus:outline-none focus:ring-2 focus:ring-[#84ba3f] dark:border-[#2e303a] dark:text-slate-200"><FaFileAlt aria-hidden="true" /> Curriculum builder</Link><Link href="/admin/courses" className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:border-[#84ba3f] focus:outline-none focus:ring-2 focus:ring-[#84ba3f] dark:border-[#2e303a] dark:text-slate-200"><FaBookOpen aria-hidden="true" /> Course catalogue</Link><Link href="/admin/learners" className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:border-[#84ba3f] focus:outline-none focus:ring-2 focus:ring-[#84ba3f] dark:border-[#2e303a] dark:text-slate-200"><FaUsers aria-hidden="true" /> Learner records</Link></div></div>
      </section>
    </div>
    );
  } catch (error) {
    if (!isDatabaseUnavailable(error)) throw error;

    return (
      <section role="alert" className="mx-auto max-w-2xl rounded-lg border border-amber-300 bg-white p-6 dark:border-amber-900 dark:bg-[#16171d]">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">Live data unavailable</p>
        <h1 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">The operations dashboard could not reach the database.</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Check the database connection, then retry to load current applications, learners, and programme activity.</p>
        <a href="/admin" className="mt-5 inline-flex rounded-md bg-[#006600] px-4 py-2 text-sm font-semibold text-white hover:bg-[#03367A] focus:outline-none focus:ring-2 focus:ring-[#84ba3f]">Retry dashboard</a>
      </section>
    );
  }
}

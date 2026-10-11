import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { courses } from '@/data/courses';
import { detailedCourses, cohortSchedules } from '@/lib/offline_data';
import { Container } from '@/components/ui/container';
import { PublicPageHero } from '@/components/common/public-page-hero';
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaArrowRight,
} from 'react-icons/fa';

export async function generateStaticParams() {
  return [...new Set([...detailedCourses, ...courses].map((course) => course.slug))].map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<'/courses/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params;
  const course = detailedCourses.find((item) => item.slug === slug);
  const catalogueCourse = courses.find((item) => item.slug === slug);
  if (!course && !catalogueCourse) return {};
  return {
    title: `${course?.title ?? catalogueCourse?.title} | Ndzalama Training`,
    description: course?.shortDesc ?? catalogueCourse?.shortDesc,
  };
}

export default async function CourseDetailPage(
  props: PageProps<'/courses/[slug]'>,
) {
  const { slug } = await props.params;
  const course = detailedCourses.find((c) => c.slug === slug);
  if (!course) {
    const catalogueCourse = courses.find((item) => item.slug === slug);
    if (!catalogueCourse) notFound();

    return (
      <>
        <PublicPageHero
          eyebrow={catalogueCourse.accredited ? catalogueCourse.seta : 'Self-paced Skill Builder'}
          title={catalogueCourse.title}
          description={catalogueCourse.shortDesc}
        />
        <section className="min-h-screen bg-slate-50 py-16 dark:bg-[#0b1a0b]">
        <Container>
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-2 text-xs text-text-muted">
              <Link href="/" className="hover:text-brand-secondary">Home</Link>
              <span>/</span>
              <Link href="/courses" className="hover:text-brand-secondary">Courses</Link>
              <span>/</span>
              <span>{catalogueCourse.title}</span>
            </div>
            <p className="text-xs font-bold uppercase text-brand-secondary">
              {catalogueCourse.accredited ? catalogueCourse.seta : 'Self-paced Skill Builder'}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-primary dark:text-white sm:text-4xl">
              {catalogueCourse.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-text-secondary dark:text-gray-300">
              {catalogueCourse.fullDesc}
            </p>
            {catalogueCourse.note && (
              <p className="mt-4 text-sm font-semibold text-brand-primary dark:text-brand-secondary">
                {catalogueCourse.note}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/apply?course=${catalogueCourse.slug}`}
                className="inline-flex items-center gap-2 bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-light"
              >
                Enquire / Enrol <FaArrowRight className="text-xs" aria-hidden="true" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center border border-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-neutral dark:border-brand-secondary dark:text-brand-secondary"
              >
                Browse all courses
              </Link>
            </div>
          </div>
        </Container>
        </section>
      </>
    );
  }

  const schedules = cohortSchedules.filter((s) => s.courseId === course.id);

  return (
    <>
      <PublicPageHero
        eyebrow={`${course.category} | ${course.framework}`}
        title={course.title}
        description={course.shortDesc}
      />
      <section className="py-16 bg-slate-50 dark:bg-[#0b1a0b] min-h-screen">
      <Container>
        {/* Breadcrumb & Category */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-brand-primary dark:hover:text-brand-secondary">Home</Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-brand-primary dark:hover:text-brand-secondary">Courses</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-200 font-semibold">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Card */}
            <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary dark:bg-brand-secondary/15 dark:text-brand-secondary">
                  {course.category}
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {course.framework}
                </span>
                {course.saqaId && (
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
                    SAQA ID: {course.saqaId}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                {course.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {course.fullDesc}
              </p>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                  <span className="text-xs text-slate-400 font-semibold uppercase">NQF Level</span>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">Level {course.nqfLevel}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Credits</span>
                  <p className="text-xl font-bold text-brand-primary dark:text-brand-secondary mt-1">{course.credits} Credits</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Duration</span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">{course.duration}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Accreditation</span>
                  <p className="text-sm sm:text-base font-bold text-brand-primary dark:text-brand-secondary mt-1">ETDP SETA</p>
                </div>
              </div>
            </div>

            {/* Curriculum Breakdown: Modules & Unit Standards */}
            <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-8 sm:p-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-brand-secondary">
                    Curriculum Matrix
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Modules & Unit Standards
                  </h2>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {course.modules.length} Components
                </span>
              </div>

              <div className="space-y-4">
                {course.modules.map((mod, index) => (
                  <div
                    key={mod.code}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 hover:border-brand-primary dark:hover:border-brand-secondary transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-brand-primary text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-xs font-mono font-bold text-brand-primary dark:text-brand-secondary-light">
                          {mod.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-secondary/15 text-brand-secondary-dark dark:text-brand-secondary">
                          {mod.credits} Credits
                        </span>
                        {mod.duration && (
                          <span className="text-xs text-slate-500">{mod.duration}</span>
                        )}
                      </div>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {mod.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience & Prerequisites */}
            <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-8 sm:p-10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-brand-secondary">
                Candidate Profile
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Who Should Attend?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.targetAudience.map((audience) => (
                  <div
                    key={audience}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800"
                  >
                    <FaCheckCircle className="text-brand-primary dark:text-brand-secondary text-sm shrink-0" aria-hidden="true" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {audience}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Column */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Course Booking Card */}
            <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-xl p-6 sm:p-8">
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 shadow">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
              </div>

              <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-400 uppercase font-semibold">Standard Tuition</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-brand-primary dark:text-brand-secondary">
                    R{course.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400">per candidate</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  * Group discounts available for 4+ delegates.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href={`/apply?course=${course.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold bg-brand-primary text-white hover:bg-brand-primary-light transition-colors shadow-md text-sm"
                >
                  <FaGraduationCap aria-hidden="true" />
                  Apply / Book Online
                </Link>
                <a
                  href="https://api.whatsapp.com/send?phone=27664832441"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs"
                >
                  WhatsApp Fast Enquiry
                </a>
              </div>
            </div>

            {/* Upcoming Schedules Widget */}
            <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                <FaCalendarAlt className="text-brand-primary dark:text-brand-secondary" aria-hidden="true" />
                Upcoming Intakes
              </h3>

              {schedules.length > 0 ? (
                <div className="space-y-3">
                  {schedules.map((sched) => {
                    const seatsLeft = sched.capacity - sched.enrolledCount;
                    return (
                      <div
                        key={sched.id}
                        className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {sched.startDate} – {sched.endDate}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              seatsLeft <= 5
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {seatsLeft} seats left
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                          <FaMapMarkerAlt className="text-brand-primary dark:text-brand-secondary" aria-hidden="true" />
                          <span>{sched.location} ({sched.deliveryMode})</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  Custom in-house corporate dates available on request. Contact our training coordinator.
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
      </section>
    </>
  );
}

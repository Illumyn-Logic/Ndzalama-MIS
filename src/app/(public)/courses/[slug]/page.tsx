import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { detailedCourses, cohortSchedules, type DetailedCourse } from '@/lib/offline_data';
import { Container } from '@/components/ui/container';
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaClock,
  FaUsers,
  FaAward,
  FaFileAlt,
  FaArrowRight,
  FaTag,
} from 'react-icons/fa';

export async function generateStaticParams() {
  return detailedCourses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  props: PageProps<'/courses/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params;
  const course = detailedCourses.find((c) => c.slug === slug);
  if (!course) return {};
  return {
    title: `${course.title} | Ndzalama Training`,
    description: course.shortDesc,
  };
}

export default async function CourseDetailPage(
  props: PageProps<'/courses/[slug]'>,
) {
  const { slug } = await props.params;
  const course = detailedCourses.find((c) => c.slug === slug);
  if (!course) notFound();

  const schedules = cohortSchedules.filter((s) => s.courseId === course.id);

  return (
    <section className="py-16 bg-slate-50 dark:bg-[#0e0f14] min-h-screen">
      <Container>
        {/* Breadcrumb & Category */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-[#84ba3f]">Home</Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-[#84ba3f]">Courses</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-200 font-semibold">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Card */}
            <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-8 sm:p-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#84ba3f]/15 text-[#84ba3f]">
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
                  <p className="text-xl font-bold text-[#84ba3f] mt-1">{course.credits} Credits</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Duration</span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">{course.duration}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Accreditation</span>
                  <p className="text-sm sm:text-base font-bold text-[#006600] dark:text-[#84ba3f] mt-1">ETDP SETA</p>
                </div>
              </div>
            </div>

            {/* Curriculum Breakdown: Modules & Unit Standards */}
            <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-sm p-8 sm:p-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#84ba3f]">
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
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 hover:border-[#84ba3f] transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-[#84ba3f] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#03367A] dark:text-sky-400">
                          {mod.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#84ba3f]/15 text-[#84ba3f]">
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
              <span className="text-xs font-bold uppercase tracking-wider text-[#84ba3f]">
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
                    <FaCheckCircle className="text-[#84ba3f] text-sm shrink-0" aria-hidden="true" />
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
                  <span className="text-3xl font-extrabold text-[#006600] dark:text-[#84ba3f]">
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
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shadow-lg text-sm"
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
                <FaCalendarAlt className="text-[#84ba3f]" aria-hidden="true" />
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
                          <FaMapMarkerAlt className="text-[#84ba3f]" aria-hidden="true" />
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
  );
}

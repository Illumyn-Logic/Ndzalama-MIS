import type { Metadata } from 'next';
import { courses, courseCategories } from '@/data/courses';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { CourseCard } from '@/components/common/course-card';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse accredited programmes, legacy qualifications, and self-paced skill builder courses.',
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = courseCategories.find((category) => category === params.category);
  const filteredCourses = selectedCategory
    ? courses.filter((course) => course.category === selectedCategory)
    : courses;

  return (
    <>
      {/* Hero: Canopy & Curriculum Header */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#102e14] via-[#163f1b] to-[#0c2210] text-white dark:from-[#061408] dark:via-[#091f0c] dark:to-[#040e05] py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(123,198,45,0.15),transparent_60%)]" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 bg-black/25 backdrop-blur-xs border border-white/20 text-xs font-semibold uppercase tracking-[0.22em] text-white/95">
              <span className="h-2 w-2 rounded-full bg-[#efa936] shadow-xs shadow-amber-400" aria-hidden="true" />
              <span>Accredited Curriculum</span>
              <span className="text-white/30">|</span>
              <span className="text-white/80">SAQA &amp; QCTO</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Explore Our Programmes
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
              Choose from ETDP SETA, Services SETA, and HWSETA accredited qualifications, legacy unit standards, and self-paced professional courses.
            </p>
          </div>
        </Container>
      </section>

      {/* Flush 4-Block Strip */}
      <div className="grid h-2.5 grid-cols-4 gap-0 shadow-xs" aria-hidden="true">
        <span className="bg-[#efa936]" />
        <span className="bg-[#249c9b]" />
        <span className="bg-[#ed704c]" />
        <span className="bg-[#6b6570]" />
      </div>

      <section className="py-16 bg-slate-50 dark:bg-[#0b1a0b] min-h-screen">
        <Container>
          <SectionTitle
            title="Course Catalogue"
            subtitle="Accredited qualifications, legacy unit standards, and self-paced skill builders"
          />
          <nav aria-label="Filter courses by category" className="mb-8 flex flex-wrap gap-2">
            <Link
              href="/courses"
              aria-current={selectedCategory ? undefined : 'page'}
              className={`border px-4 py-2 text-sm font-semibold transition-colors ${
                selectedCategory
                  ? 'border-slate-200 bg-white text-slate-700 hover:border-[#8eaf6a] dark:border-white/15 dark:bg-[#132214] dark:text-white/75'
                  : 'border-[#547b36] bg-[#547b36] text-white'
              }`}
            >
              All courses
            </Link>
            {courseCategories.map((category) => (
              <Link
                key={category}
                href={`/courses?category=${encodeURIComponent(category)}`}
                aria-current={selectedCategory === category ? 'page' : undefined}
                className={`border px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'border-[#547b36] bg-[#547b36] text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-[#8eaf6a] dark:border-white/15 dark:bg-[#132214] dark:text-white/75'
                }`}
              >
                {category}
              </Link>
            ))}
          </nav>
          {selectedCategory && (
            <h2 className="mb-5 text-xl font-bold text-slate-800 dark:text-white">
              {selectedCategory}
            </h2>
          )}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <p className="border border-dashed border-slate-300 p-8 text-center text-slate-600 dark:border-white/20 dark:text-white/70">
              No courses are currently listed in this category.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}

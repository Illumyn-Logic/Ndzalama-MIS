import type { Metadata } from 'next';
import { courses } from '@/data/courses';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { CourseCard } from '@/components/common/course-card';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse accredited programmes, legacy qualifications, and self-paced skill builder courses.',
};

export default function CoursesPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

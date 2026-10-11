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
    <section className="py-16">
      <Container>
        <SectionTitle
          title="Explore Our Courses"
          subtitle="Accredited programmes, legacy qualifications, and self-paced skill builders"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from 'next';
import { courses } from '@/data/courses';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { CourseCard } from '@/components/common/course-card';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse our full range of SAQA-accredited training programmes.',
};

export default function CoursesPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionTitle
          title="All Courses"
          subtitle="Our full range of accredited programmes"
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

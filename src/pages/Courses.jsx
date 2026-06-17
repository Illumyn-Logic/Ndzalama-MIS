import { courses } from '../data/courses';
import { Container } from '../components/ui/Container';
import { SectionTitle } from '../components/ui/SectionTitle';
import { CourseCard } from '../components/common/CourseCard';

export const Courses = () => (
    <section className="py-16">
        <Container>
            <SectionTitle title="All Courses" subtitle="Our full range of accredited programmes" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </Container>
    </section>
);
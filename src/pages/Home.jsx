import { courses } from '../data/courses';
import { testimonials } from '../data/testimonials';
import { Container } from '../components/ui/Container';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { CourseCard } from '../components/common/CourseCard';
import { TestimonialCard } from '../components/common/TestimonialCard';

export const Home = () => {
    const featuredCourses = courses.slice(0, 3);

    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-r from-[#84ba3f] to-[#a3d46a] text-white py-20">
                <Container className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold">Welcome to Ndzalama Training</h1>
                    <p className="mt-4 text-xl md:text-2xl max-w-2xl mx-auto">
                        We will make your dreams come true
                    </p>
                    <Button as="a" href="/courses" variant="secondary" className="mt-8">
                        Explore Courses
                    </Button>
                </Container>
            </section>

            {/* Courses */}
            <section className="py-16">
                <Container>
                    <SectionTitle title="Our Courses" subtitle="Choose from our accredited training programmes" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Button as="a" href="/courses" variant="outline">
                            View All Courses
                        </Button>
                    </div>
                </Container>
            </section>

            {/* Testimonials */}
            <section className="bg-[#f9f9f9] dark:bg-[#1f2028] py-16">
                <Container>
                    <SectionTitle title="What Our Clients Say" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {testimonials.map(testimonial => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>
                </Container>
            </section>
        </>
    );
};
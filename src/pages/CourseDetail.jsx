import { useParams } from 'react-router-dom';
import { courses } from '../data/courses';
import { schedules } from '../data/schedules';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export const CourseDetail = () => {
    const { slug } = useParams();
    const course = courses.find(c => c.slug === slug);
    if (!course) return <div className="py-16 text-center">Course not found.</div>;

    const courseSchedules = schedules.filter(s => s.courseId === course.id);

    return (
        <section className="py-16">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Image & info */}
                    <div className="lg:col-span-1">
                        <img src={course.image} alt={course.title} className="w-full rounded-lg shadow-md" />
                        <div className="mt-6 space-y-4">
                            <p className="text-sm text-[#666] dark:text-gray-400">
                                <span className="font-semibold text-[#333] dark:text-white">Duration:</span> {course.duration}
                            </p>
                            <Button as="a" href={`/apply?course=${course.slug}`} className="w-full">
                                Book Now
                            </Button>
                        </div>
                    </div>
                    {/* Right: Description & schedules */}
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl font-bold text-[#333] dark:text-white">{course.title}</h1>
                        <p className="mt-4 text-[#666] dark:text-gray-300">{course.fullDesc}</p>

                        <h3 className="mt-8 text-xl font-semibold text-[#333] dark:text-white">Upcoming Schedules</h3>
                        {courseSchedules.length === 0 ? (
                            <p className="mt-2 text-[#666] dark:text-gray-400">No schedules available yet.</p>
                        ) : (
                            <ul className="mt-4 space-y-2">
                                {courseSchedules.map(s => (
                                    <li key={s.id} className="flex flex-wrap justify-between items-center p-3 bg-[#f9f9f9] dark:bg-[#1f2028] rounded-md">
                                        <span className="text-sm text-[#333] dark:text-white">
                                            {s.startDate} – {s.endDate}
                                        </span>
                                        <span className="text-sm text-[#666] dark:text-gray-400">{s.location}</span>
                                        <span className="text-sm text-[#84ba3f]">{s.capacity} seats</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </Container>
        </section>
    );
};
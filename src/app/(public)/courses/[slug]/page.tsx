import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { courses } from '@/data/courses';
import { schedules } from '@/data/schedules';
import { Container } from '@/components/ui/container';

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata(
  props: PageProps<'/courses/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.shortDesc,
  };
}

export default async function CourseDetailPage(
  props: PageProps<'/courses/[slug]'>,
) {
  const { slug } = await props.params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  const courseSchedules = schedules.filter((s) => s.courseId === course.id);

  return (
    <section className="py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="relative w-full h-56 rounded-lg overflow-hidden shadow-md">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            </div>
            <div className="mt-6 space-y-4">
              <p className="text-sm text-[#666] dark:text-gray-400">
                <span className="font-semibold text-[#333] dark:text-white">
                  Duration:
                </span>{' '}
                {course.duration}
              </p>
              <Link
                href={`/register?course=${course.slug}`}
                className="block w-full text-center px-6 py-3 rounded-lg font-medium bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-[#333] dark:text-white">
              {course.title}
            </h1>
            <p className="mt-4 text-[#666] dark:text-gray-300 leading-relaxed">
              {course.fullDesc}
            </p>

            <h3 className="mt-8 text-xl font-semibold text-[#333] dark:text-white">
              Upcoming Schedules
            </h3>
            {courseSchedules.length === 0 ? (
              <p className="mt-2 text-[#666] dark:text-gray-400">
                No schedules available yet. Contact us to request a date.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {courseSchedules.map((s) => (
                  <li
                    key={s.id}
                    className="flex flex-wrap justify-between items-center p-3 bg-[#f9f9f9] dark:bg-[#1f2028] rounded-md gap-2"
                  >
                    <span className="text-sm text-[#333] dark:text-white font-medium">
                      {s.startDate} – {s.endDate}
                    </span>
                    <span className="text-sm text-[#666] dark:text-gray-400">
                      {s.location}
                    </span>
                    <span className="text-sm text-[#84ba3f] font-medium">
                      {s.capacity} seats
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

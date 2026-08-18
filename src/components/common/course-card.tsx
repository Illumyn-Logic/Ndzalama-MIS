import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '@/data/courses';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group block bg-white dark:bg-[#16171d] rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
    >
      <div className="relative w-full h-48">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#333] dark:text-white group-hover:text-[#84ba3f] transition-colors">
          {course.title}
        </h3>
        <p className="mt-2 text-sm text-[#666] dark:text-gray-400">
          {course.shortDesc}
        </p>
        <p className="mt-3 text-sm text-[#84ba3f] font-medium">
          Duration: {course.duration}
        </p>
      </div>
    </Link>
  );
}

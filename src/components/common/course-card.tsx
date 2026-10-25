import Link from 'next/link';
import Image from 'next/image';
import type { Course } from '@/data/courses';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const getProviderBadge = () => {
    const p = course.seta || '';
    if (p.includes('ETDP')) {
      return 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30';
    }
    if (p.includes('Services')) {
      return 'bg-teal-500/10 text-teal-800 dark:text-teal-300 border-teal-500/30';
    }
    if (p.includes('HWSETA')) {
      return 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border-rose-500/30';
    }
    return 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30';
  };

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group relative block bg-[#f7f3ee] dark:bg-[#102213] border border-[#e8dfd3] dark:border-white/10 hover:border-[#d9cdb5] dark:hover:border-white/40 shadow-sm hover:shadow-xl transition-all overflow-hidden"
    >
      <div className="relative w-full h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <Image
          src={course.image.startsWith('/images/courses/placeholder-') ? '/images/clients/carousel/01.jpg' : course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>
      <div className="p-6">
        <div className="mb-2.5">
          <span className={`inline-block px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider border ${getProviderBadge()}`}>
            {course.accredited ? course.seta : `${course.seta} · ${course.delivery ?? 'Self-paced'}`}
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#222] dark:text-white group-hover:text-brand-secondary transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="mt-2 text-sm text-[#555] dark:text-[#b8c7b4] line-clamp-2 leading-relaxed">
          {course.shortDesc}
        </p>
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Duration: <strong className="text-slate-800 dark:text-slate-200">{course.duration}</strong></span>
          <span className="text-brand-secondary dark:text-brand-secondary-light group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
            Details &rarr;
          </span>
        </div>
      </div>
      {/* Crisp white/accent hover underline indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-secondary dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
    </Link>
  );
}

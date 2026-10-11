import type { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-[#183018] p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-1 text-brand-primary dark:text-brand-secondary" aria-label={`${testimonial.rating} out of 5 stars`}>
        {'★'.repeat(testimonial.rating)}
        {'☆'.repeat(5 - testimonial.rating)}
      </div>
      <p className="mt-3 text-[#333] dark:text-[#edf4e9] italic">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full bg-brand-primary dark:bg-brand-secondary flex items-center justify-center text-white dark:text-brand-primary-dark font-bold shrink-0"
          aria-hidden="true"
        >
          {testimonial.clientName.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-[#333] dark:text-white">
            {testimonial.clientName}
          </p>
          <p className="text-sm text-[#666] dark:text-gray-400">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}

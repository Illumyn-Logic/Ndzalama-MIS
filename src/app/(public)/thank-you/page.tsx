import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Thank You',
};

export default function ThankYouPage() {
  return (
    <section className="py-24">
      <Container className="text-center">
        <div className="text-6xl mb-6" aria-hidden="true">🎉</div>
        <h1 className="text-4xl font-bold text-[#333] dark:text-white">
          Thank you for your booking!
        </h1>
        <p className="mt-4 text-lg text-[#666] dark:text-gray-400 max-w-xl mx-auto">
          We&apos;ve received your application and will be in touch shortly to confirm your spot.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium border-2 border-[#84ba3f] text-[#84ba3f] hover:bg-[#84ba3f] hover:text-white transition-colors"
          >
            Browse More Courses
          </Link>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { PublicPageHero } from '@/components/common/public-page-hero';
import { FaCheckCircle } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Thank You',
};

export default function ThankYouPage() {
  return (
    <>
      <PublicPageHero
        eyebrow="Application Received"
        title="Thank you for your booking!"
        description="We have received your application and will be in touch shortly to confirm your spot."
      />
      <section className="bg-slate-50 py-16 dark:bg-[#0b1a0b]">
        <Container className="text-center">
        <FaCheckCircle className="mx-auto mb-6 text-5xl text-brand-primary dark:text-brand-secondary" aria-hidden="true" />
        <h1 className="text-4xl font-bold text-[#333] dark:text-white">
          Thank you for your booking!
        </h1>
        <p className="mt-4 mx-auto max-w-xl text-lg text-[#666] dark:text-gray-400">
          Your next step is just around the corner. Browse the catalogue while our team prepares your enrolment confirmation.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-brand-primary px-6 py-3 font-medium text-white transition-colors hover:bg-brand-primary-light"
          >
            Back to Home
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center rounded-lg border border-[#4b5157] bg-[#4b5157] px-6 py-3 font-medium text-white transition-colors hover:border-[#383d42] hover:bg-[#383d42]"
          >
            Browse More Courses
          </Link>
        </div>
        </Container>
      </section>
    </>
  );
}

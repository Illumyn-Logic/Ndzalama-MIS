import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Container } from '@/components/ui/container';
import { PublicPageHero } from '@/components/common/public-page-hero';
import { ApplyForm } from './apply-form';

export const metadata: Metadata = {
  title: 'Course Application',
  description: 'Apply for a Ndzalama Training programme. Submit your application form to secure your spot.',
};

export default function ApplyPage() {
  return (
    <>
      <PublicPageHero
        eyebrow="Learner Registration"
        title="Course Application Form"
        description="Complete the required details and our team will be in touch to confirm your enrolment."
      />
      <section className="bg-slate-50 py-16 dark:bg-[#0b1a0b]">
        <Container>
          <Suspense fallback={<div className="mx-auto min-h-64 max-w-xl" aria-hidden="true" />}>
            <ApplyForm />
          </Suspense>
        </Container>
      </section>
    </>
  );
}

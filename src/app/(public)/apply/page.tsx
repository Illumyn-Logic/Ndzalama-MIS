import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { ApplyForm } from './apply-form';

export const metadata: Metadata = {
  title: 'Course Application',
  description: 'Apply for a Ndzalama Training programme. Submit your application form to secure your spot.',
};

export default function ApplyPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionTitle
          title="Course Application Form"
          subtitle="Complete all required sections and submit — we'll be in touch to confirm your enrolment."
        />
        <ApplyForm />
      </Container>
    </section>
  );
}

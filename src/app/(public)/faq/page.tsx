'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { FaChevronDown } from 'react-icons/fa';
import { cn } from '@/lib/utils';

// Note: metadata export cannot be used in a Client Component — move to a layout
// or wrapper if SSR metadata is required. Static content is fine here.

const faqs = [
  {
    q: 'Is Ndzalama Training accredited?',
    a: 'Yes. Ndzalama Training is accredited by ETDP SETA and all our programmes are registered with SAQA and aligned to the National Qualifications Framework (NQF).',
  },
  {
    q: 'What courses do you offer?',
    a: 'We offer a range of programmes including Facilitator Training, Assessor Training, Moderator Training, Skills Development Facilitator (SDF), the OD-ETDP Occupational Certificate, and Early Childhood Development (ECD), among others.',
  },
  {
    q: 'Where are your training sessions held?',
    a: 'Our sessions are held at venues across South Africa, including Tzaneen, Polokwane, Johannesburg and Durban. We also offer distance-based options for selected programmes.',
  },
  {
    q: 'How do I apply for a course?',
    a: "You can apply by creating an account on our Learner Portal and completing the Course Application Form. Alternatively, click 'Apply Now' in the navigation bar.",
  },
  {
    q: 'Can my employer sponsor my training?',
    a: 'Yes. Many of our learners are sponsored by their employers. We support WSP/ATR submissions and can assist with SETA grant funding documentation.',
  },
  {
    q: 'What are the entry requirements?',
    a: 'Entry requirements vary per programme. Most short courses require at least a Matric (Grade 12) certificate. The OD-ETDP qualification may require prior experience in the ETD field. Contact us for specific requirements.',
  },
  {
    q: 'Will I receive a certificate after completing a course?',
    a: 'Yes. On successful completion of all assessments, you will receive a Statement of Results and, where applicable, a SAQA-registered qualification certificate.',
  },
  {
    q: 'How do I contact Ndzalama Training?',
    a: 'You can reach us by phone at +(27) 15-5900-732, via email at headoffice@ndzalama.org.za, or on WhatsApp at +27 66 483 2441. Our offices are located at 04 Annecke Street, Premier Park, Tzaneen.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#e5e4e7] dark:border-[#2e303a] rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-[#333] dark:text-white hover:bg-[#84ba3f]/5 transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        <FaChevronDown
          className={cn(
            'shrink-0 text-[#84ba3f] transition-transform',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-[#555] dark:text-gray-400 leading-relaxed border-t border-[#e5e4e7] dark:border-[#2e303a] pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <section className="py-16">
      <Container>
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about studying with Ndzalama Training"
        />
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm text-[#666] dark:text-gray-400">
            Still have questions?{' '}
            <a href="/contact" className="text-[#84ba3f] font-medium hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}

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
    <div className="border border-[#e5e4e7] dark:border-[#2e303a] rounded-xl overflow-hidden bg-white dark:bg-[#122415] shadow-xs">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-[#333] dark:text-white hover:bg-brand-primary/5 dark:hover:bg-white/5 transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        <FaChevronDown
          className={cn(
            'shrink-0 text-brand-primary dark:text-brand-secondary transition-transform',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-[#555] dark:text-gray-300 leading-relaxed border-t border-[#e5e4e7] dark:border-white/10 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      {/* Hero: Canopy Header */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#102e14] via-[#163f1b] to-[#0c2210] text-white dark:from-[#061408] dark:via-[#091f0c] dark:to-[#040e05] py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(123,198,45,0.15),transparent_60%)]" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 bg-black/25 backdrop-blur-xs border border-white/20 text-xs font-semibold uppercase tracking-[0.22em] text-white/95">
              <span className="h-2 w-2 rounded-full bg-[#efa936] shadow-xs shadow-amber-400" aria-hidden="true" />
              <span>Learner &amp; Corporate FAQ</span>
              <span className="text-white/30">|</span>
              <span className="text-white/80">Help Centre</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
              Find clear answers on SETA accreditation, assessment requirements, certificate verification, and enrolment processes.
            </p>
          </div>
        </Container>
      </section>

      {/* Flush 4-Block Strip */}
      <div className="grid h-2.5 grid-cols-4 gap-0 shadow-xs" aria-hidden="true">
        <span className="bg-[#efa936]" />
        <span className="bg-[#249c9b]" />
        <span className="bg-[#ed704c]" />
        <span className="bg-[#6b6570]" />
      </div>

      <section className="py-16 bg-slate-50 dark:bg-[#0b1a0b] min-h-screen">
        <Container>
          <SectionTitle
            title="Questions &amp; Guidance"
            subtitle="Everything you need to know about studying with Ndzalama Training"
          />
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
          <div className="mt-12 text-center p-8 bg-white dark:bg-[#122415] rounded-2xl max-w-xl mx-auto border border-slate-200 dark:border-white/10 shadow-sm">
            <p className="text-sm text-[#444] dark:text-gray-300">
              Have a specific question about your organisation&apos;s training plan?
            </p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center justify-center px-6 py-2.5 rounded-full font-bold bg-brand-primary text-white hover:bg-brand-primary-light transition-colors text-sm shadow-md"
            >
              Contact our team
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

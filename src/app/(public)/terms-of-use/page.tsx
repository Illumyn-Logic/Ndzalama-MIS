import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { PublicPageHero } from '@/components/common/public-page-hero';

export const metadata: Metadata = {
  title: 'Terms of Use | Ndzalama Training',
  description:
    'Review the terms of use for the Ndzalama Training website and our online training services.',
};

const terms = [
  {
    title: 'Website use',
    text:
      'The Ndzalama Training website is intended to provide information about our services, programmes and training opportunities. You agree to use the site responsibly and not for unlawful, abusive or disruptive activity.',
  },
  {
    title: 'Information accuracy',
    text:
      'We aim to keep the information on our website accurate and up to date, but we cannot guarantee that all content will always be complete, current or error-free. Programme details, dates and pricing may change without prior notice.',
  },
  {
    title: 'Booking and enquiries',
    text:
      'When you submit an enrolment or enquiry form, you are providing information necessary for us to respond, assess your needs and manage your request. We may contact you using the details provided to discuss your training or service requirements.',
  },
  {
    title: 'Intellectual property',
    text:
      'All website content, branding, materials and design are the property of Ndzalama Training unless otherwise stated. Reproduction or unauthorised use is not permitted without written permission.',
  },
  {
    title: 'Third-party links',
    text:
      'Our website may contain links to external websites for convenience or information-sharing. We are not responsible for the content, privacy policies or practices of such third-party sites.',
  },
  {
    title: 'Limitation of liability',
    text:
      'Ndzalama Training is not liable for direct, indirect, incidental or consequential damages arising from the use of this website or information contained herein, except where required by law.',
  },
];

export default function TermsOfUsePage() {
  return (
    <>
      <PublicPageHero
        eyebrow="Policies & Governance"
        title="Terms of Use"
        description="Guidelines for using our website and services."
      />
      <section className="bg-slate-50 py-16 dark:bg-[#0b1a0b]">
        <Container className="max-w-4xl">

        <div className="mt-10 space-y-8 rounded-3xl border border-[#e5e4e7] bg-white p-6 shadow-sm dark:border-[#2e303a] dark:bg-[#171b22] md:p-10">
          <p className="text-base leading-8 text-[#4a4f57] dark:text-gray-300">
            By accessing and using the Ndzalama Training website, you agree to be bound
            by these terms of use. We encourage all users to read them carefully and to
            contact us if anything is unclear.
          </p>

          {terms.map((term) => (
            <div key={term.title}>
              <h3 className="text-2xl font-semibold text-[#17171d] dark:text-white">
                {term.title}
              </h3>
              <p className="mt-3 text-base leading-8 text-[#4a4f57] dark:text-gray-300">
                {term.text}
              </p>
            </div>
          ))}

          <div>
            <h3 className="text-2xl font-semibold text-[#17171d] dark:text-white">
              Final note
            </h3>
            <p className="mt-3 text-base leading-8 text-[#4a4f57] dark:text-gray-300">
              We may update these terms from time to time. Continued use of the website
              after updates are published constitutes acceptance of the revised terms.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/privacy-policy"
              className="inline-flex items-center rounded-full border border-brand-primary px-5 py-3 font-medium text-brand-primary transition-colors hover:bg-brand-primary hover:text-white dark:border-brand-secondary dark:text-brand-secondary dark:hover:bg-brand-secondary dark:hover:text-[#0b1a0b]"
            >
              Privacy policy
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-brand-primary px-5 py-3 font-medium text-white transition-colors hover:bg-brand-primary-light"
            >
              Contact us
            </Link>
          </div>
        </div>
        </Container>
      </section>
    </>
  );
}

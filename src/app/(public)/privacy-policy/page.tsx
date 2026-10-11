import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { PublicPageHero } from '@/components/common/public-page-hero';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ndzalama Training',
  description:
    'Learn how Ndzalama Training handles personal information, website data and client communications.',
};

const policySections = [
  {
    title: 'Information we collect',
    items: [
      'Contact information provided through registration, enquiry and application forms.',
      'Demographic information you share directly with us, such as training interest or needs.',
      'Website activity and technical information needed to improve the user experience and security.',
      'Location and communication data relevant to the delivery of training support or service enquiries.',
    ],
  },
  {
    title: 'How we use information',
    items: [
      'To respond to inquiries, support requests and training bookings.',
      'To provide access to services, programmes, updates and learner communication.',
      'To improve our website, offerings and internal reporting processes.',
      'To maintain accurate records and meet legal or contractual obligations.',
    ],
  },
  {
    title: 'Disclosure of information',
    items: [
      'We do not sell personal data to third parties for marketing purposes.',
      'We may share information with trusted service providers that help us manage communications, training logistics or administrative processes.',
      'Information may be disclosed when required by law, contractual obligations or to safeguard legitimate rights and interests.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PublicPageHero
        eyebrow="Policies & Governance"
        title="Privacy Policy"
        description="How we collect, use and protect your information."
      />
      <section className="bg-slate-50 py-16 dark:bg-[#0b1a0b]">
        <Container className="max-w-4xl">

        <div className="mt-10 space-y-8 rounded-3xl border border-[#e5e4e7] bg-white p-6 shadow-sm dark:border-[#2e303a] dark:bg-[#171b22] md:p-10">
          <p className="text-base leading-8 text-[#4a4f57] dark:text-gray-300">
            Ndzalama Training is committed to protecting the privacy of learners,
            clients, partners and website visitors. We collect and process personal
            information only where it is necessary to deliver our services, respond to
            enquiries and improve the experience we provide.
          </p>

          <p className="text-base leading-8 text-[#4a4f57] dark:text-gray-300">
            Any information submitted through our forms is used for the purpose stated on
            the form and is not shared with outside parties unless required to provide a
            requested service, to comply with a legal obligation or to support the delivery
            of training-related operations.
          </p>

          {policySections.map((section) => (
            <div key={section.title}>
              <h3 className="text-2xl font-semibold text-[#17171d] dark:text-white">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#4a4f57] dark:text-gray-300">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-primary dark:bg-brand-secondary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-2xl font-semibold text-[#17171d] dark:text-white">
              Your rights
            </h3>
            <p className="mt-4 text-base leading-8 text-[#4a4f57] dark:text-gray-300">
              You may request access, correction or deletion of personal information held
              by Ndzalama Training where applicable. If you believe information is
              inaccurate or no longer necessary for the stated purpose, please contact us
              and we will review the request promptly.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#17171d] dark:text-white">
              Contact us
            </h3>
            <p className="mt-4 text-base leading-8 text-[#4a4f57] dark:text-gray-300">
              For privacy questions, requests, concerns or complaints, please contact us at{' '}
              <a
                href="mailto:headoffice@ndzalama.org.za"
                className="font-medium text-brand-primary underline decoration-brand-secondary underline-offset-4 hover:text-brand-primary-light dark:text-brand-secondary"
              >
                headoffice@ndzalama.org.za
              </a>
              .
            </p>
          </div>

          <div className="rounded-2xl bg-[#f7f7f5] p-4 text-sm text-[#4a4f57] dark:bg-[#11161c] dark:text-gray-300">
            This policy may be updated from time to time to reflect changes in practice,
            legal requirements or service improvements. Continued use of our website or
            engagement with our services indicates acceptance of the latest version.
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/terms-of-use"
              className="inline-flex items-center rounded-full border border-brand-primary px-5 py-3 font-medium text-brand-primary transition-colors hover:bg-brand-primary hover:text-white dark:border-brand-secondary dark:text-brand-secondary dark:hover:bg-brand-secondary dark:hover:text-[#0b1a0b]"
            >
              Read our terms of use
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

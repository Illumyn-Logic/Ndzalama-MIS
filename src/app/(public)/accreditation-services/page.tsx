import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { accreditationServices } from '@/data/accreditationServices';
import { AwardLogoStrip } from '@/components/common/award-logo-strip';
import { PublicPageHero } from '@/components/common/public-page-hero';
import { FaArrowRight, FaCheckCircle, FaFileDownload } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Accreditation Services | Ndzalama Training',
  description:
    'Ndzalama helps organisations become accredited training providers, register as TVET colleges, and achieve SETA registration.',
};

export default function AccreditationServicesPage() {
  return (
    <>
      <PublicPageHero
        eyebrow="Beyond Training"
        title="Accreditation Services"
        description="Ndzalama is a SAQA-accredited training provider ourselves, and we help other organisations achieve the same recognition — from provider accreditation to TVET college and SETA registration."
      />

      {/* Services */}
      <section className="py-16">
        <Container>
          <SectionTitle
            title="How we can help"
            subtitle="Practical, hands-on support to get your organisation formally recognised"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {accreditationServices.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-[#e5e4e7] bg-white p-6 shadow-sm dark:border-[#2e303a] dark:bg-[#171b22]"
              >
                <span className="text-3xl" aria-hidden="true">
                  {service.icon}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[#333] dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#666] dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Proof of accreditation */}
      <section className="bg-[#f5f6f4] dark:bg-[#12141a] py-16">
        <Container className="max-w-4xl">
          <div className="rounded-3xl bg-white dark:bg-[#171b22] p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#333] dark:text-white flex items-center gap-2">
                <FaCheckCircle className="text-brand-primary dark:text-brand-secondary" aria-hidden="true" />
                Our own accreditation
              </h3>
              <p className="mt-3 text-[#4a4f57] dark:text-gray-300 max-w-xl">
                Ndzalama Training has been accredited with ETDP SETA since 2002
                (accreditation number ETDP0204). Contact us for proof of accreditation
                documentation.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary-light"
            >
              <FaFileDownload aria-hidden="true" />
              Request proof of accreditation
            </Link>
          </div>
        </Container>
      </section>

      {/* Awarding / accrediting bodies */}
      <section className="py-16">
        <Container>
          <SectionTitle title="Recognised by" subtitle="The accrediting and awarding bodies behind our work" />
          <AwardLogoStrip />
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-brand-primary py-16 text-white dark:bg-[#0e2411]">
        <Container className="max-w-3xl text-center">
          <h3 className="text-3xl font-bold">Ready to get accredited?</h3>
          <p className="mt-4 text-white/85">
            Speak to our team about becoming an accredited training provider, registering
            your TVET college, or achieving SETA registration.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-brand-primary transition-colors hover:bg-[#edf5ec]"
            >
              Contact us
              <FaArrowRight aria-hidden="true" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center rounded-full bg-[#4b5157] hover:bg-[#383d42] border border-white/30 hover:border-white px-6 py-3 font-semibold text-white transition-colors"
            >
              Book training instead
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

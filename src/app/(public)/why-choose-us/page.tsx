import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { FaArrowRight, FaCheckCircle, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Why Choose Ndzalama | Ndzalama Training',
  description:
    'Why learners and organisations choose Ndzalama Training for accredited, practical, people-centred education and development.',
};

const reasons = [
  'Accredited and NQF-aligned learning pathways that support professional recognition.',
  'Expert facilitators with both academic grounding and real-world industry experience.',
  'Supportive, culturally responsive training delivered with compassion and professionalism.',
  'Responsive service and practical learning design tailored to business and community needs.',
  'Strong focus on quality, progression and long-term skills development.',
  'A learner experience rooted in trust, respect and measurable outcomes.',
];

const team = [
  {
    name: 'Sanette Wevell',
    role: 'Managing Director',
    image: '/images/team/sanette-wevell.jpg',
  },
  {
    name: 'Shane Mailula',
    role: 'Training Practitioner',
    image: '/images/team/shane-mailula.jpg',
  },
  {
    name: 'Ferdinand Bester',
    role: 'Facilitator & Assessor',
    image: '/images/team/ferdinand-bester.jpg',
  },
  {
    name: 'Innocent Mabunda',
    role: 'Training Practitioner',
    image: '/images/team/innocent-mabunda.jpg',
  },
  {
    name: 'Ferdie Wevell',
    role: 'Operations',
    image: '/images/team/ferdie-wevell.jpg',
  },
  {
    name: 'Samuel Motloutsi',
    role: 'Facilitator',
    image: '/images/team/samuel-motloutsi.jpg',
  },
  {
    name: 'Shinners Mongwe',
    role: 'Assessor',
    image: '/images/team/shinners-mongwe.jpg',
  },
];

export default function WhyChooseUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#03367A] text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/hero-02.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[#03367A]/75" aria-hidden="true" />
        </div>
        <Container className="relative z-10 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#cfe8a7]">
              Why choose us
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
              People-centred learning, credible outcomes and genuine support.
            </h1>
          </div>
        </Container>
      </section>

      {/* Reasons grid */}
      <section className="py-16">
        <Container className="max-w-5xl">
          <SectionTitle
            title="Why choose Ndzalama?"
            subtitle="People-centred learning, credible outcomes and genuine support"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="flex items-start gap-3 rounded-2xl border border-[#e5e4e7] bg-white p-5 shadow-sm dark:border-[#2e303a] dark:bg-[#171b22]"
              >
                <FaCheckCircle className="mt-1 shrink-0 text-[#84ba3f]" aria-hidden="true" />
                <p className="text-[#4a4f57] dark:text-gray-300">{reason}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team section */}
      <section className="bg-[#f7f7f5] py-16 dark:bg-[#12151b]">
        <Container>
          <SectionTitle
            title="Meet our team"
            subtitle="Experienced practitioners committed to your growth"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="group rounded-2xl border border-[#e5e4e7] bg-white p-5 text-center shadow-sm transition-transform hover:-translate-y-1 dark:border-[#2e303a] dark:bg-[#171b22]"
              >
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-[#84ba3f]/30">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="112px"
                  />
                </div>
                <h4 className="mt-4 text-base font-semibold text-[#17171d] dark:text-white">
                  {member.name}
                </h4>
                <p className="mt-1 text-sm text-[#84ba3f]">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA block */}
      <section className="py-16">
        <Container className="max-w-5xl">
          <div className="rounded-3xl bg-[#03367A] p-8 text-white">
            <h3 className="text-3xl font-bold">A learning partner built for real growth</h3>
            <p className="mt-4 max-w-2xl text-white/85">
              We care about every learner, every employer and every intervention we support.
              Our work is grounded in quality, inclusion and the belief that learning should
              bring real transformation to people and organisations.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-[#03367A] transition-colors hover:bg-[#eef6df]"
              >
                Read our story
                <FaArrowRight aria-hidden="true" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Book training
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

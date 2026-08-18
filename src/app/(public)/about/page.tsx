import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import {
  FaArrowRight,
  FaBuilding,
  FaCheckCircle,
  FaHeart,
  FaLightbulb,
  FaQuoteLeft,
  FaUsers,
} from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'About Ndzalama | Ndzalama Training',
  description:
    'Learn about Ndzalama Training — our story, values, vision, and the leadership behind our accredited learning programmes.',
};

const pillars = [
  {
    title: 'Our Story',
    text:
      'Established in 2002 as Ndzalama Competency Learning, we have grown into a trusted, ETDP SETA-accredited training provider focused on practical, people-centred development.',
  },
  {
    title: 'Our Purpose',
    text:
      'We help individuals and organisations build competence, confidence, and career progression through accredited education, facilitation, and workplace development.',
  },
  {
    title: 'Our Identity',
    text:
      'The green baobab symbol reflects growth, wisdom, and resilience — values that shape the way we train, support, and lead.',
  },
];

const values = [
  'Honor',
  'Wisdom',
  'Accountability',
  'Identity',
  'Spirit-filled service',
  'Loyalty',
  'Humility',
];

const highlights = [
  {
    icon: <FaUsers className="text-2xl text-[#84ba3f]" aria-hidden="true" />,
    title: 'People first',
    text: 'We believe learning should feel welcoming, respectful, and empowering for every learner and employer we work with.',
  },
  {
    icon: <FaLightbulb className="text-2xl text-[#84ba3f]" aria-hidden="true" />,
    title: 'Outcome-based learning',
    text: 'Our programmes are built on practical, role-relevant outcomes that translate into workplace performance and measurable growth.',
  },
  {
    icon: <FaHeart className="text-2xl text-[#84ba3f]" aria-hidden="true" />,
    title: 'Compassionate excellence',
    text: 'We combine strong academic standards with a caring, supportive approach that helps learners thrive in their own context.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#006600] text-white">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/hero-ndzali.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[#006600]/80" aria-hidden="true" />
        </div>
        <Container className="relative z-10 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#cfe8a7]">
              About Ndzalama
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              Training with heart, purpose and professional excellence.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">
              Ndzalama Training is a nationally recognised education, training and
              development partner helping learners, employers and communities unlock
              meaningful growth through accredited learning and facilitation.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionTitle
                title="Who we are"
                subtitle="A trusted ETDP SETA-accredited training provider"
              />
              <p className="mt-6 text-lg leading-8 text-[#4a4f57] dark:text-gray-300">
                Ndzalama Training was established in 2002 and has grown into a valued
                provider of education, training and development interventions,
                consultation and facilitation services. Our purpose is to strengthen the
                competitiveness of industries and the productivity of individuals by
                closing gaps in knowledge, skills and professional capability.
              </p>
              <p className="mt-5 text-lg leading-8 text-[#4a4f57] dark:text-gray-300">
                We create learning pathways that are aligned to the National
                Qualifications Framework and designed to respond to real community, sector
                and workplace needs. Our work supports both personal advancement and the
                broader transformation goals of South Africa.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e5e4e7] bg-[#f7f7f5] p-8 shadow-sm dark:border-[#2e303a] dark:bg-[#1b1e27]">
              <div className="mb-5 flex items-center gap-3">
                <span className="rounded-full bg-[#84ba3f]/15 p-3 text-[#006600]">
                  <FaBuilding aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold text-[#17171d] dark:text-white">
                  Our mission
                </h3>
              </div>
              <p className="text-[#4a4f57] dark:text-gray-300">
                To provide affordable, accessible and high-quality education that is
                responsive to the needs of learners, employers and the communities we
                serve.
              </p>

              <div className="mt-8 border-t border-[#dfe3d9] pt-6 dark:border-[#2e303a]">
                <h3 className="text-xl font-semibold text-[#17171d] dark:text-white">
                  Our vision
                </h3>
                <p className="mt-3 text-[#4a4f57] dark:text-gray-300">
                  To be the leading provider nationally, empowering learners through
                  training, facilitation and development with a compassionate spirit of
                  excellence.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f7f7f5] py-16 dark:bg-[#12151b]">
        <Container>
          <SectionTitle title="Our foundations" subtitle="The values behind the work" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-[#e5e4e7] bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 dark:border-[#2e303a] dark:bg-[#171b22]"
              >
                <h3 className="text-xl font-semibold text-[#17171d] dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-[#4a4f57] dark:text-gray-300">{pillar.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="rounded-[2rem] bg-[#03367A] p-8 text-white shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-white/10 p-3">
                  <FaQuoteLeft aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d8ebbe]">
                  Leadership
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-white/20">
                  <Image
                    src="/images/team/sanette-wevell.jpg"
                    alt="Sanette Wevell"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">Sanette Wevell</h3>
                  <p className="mt-1 text-[#dfeaf8]">Managing Director of Ndzalama Training</p>
                </div>
              </div>

              <p className="mt-6 text-base leading-7 text-white/85">
                Sanette is a nationally recognised ETDP practitioner and a servant-leader
                who believes in growing people with love, wisdom and excellence. Her
                leadership is rooted in service, accountability and a deep commitment to
                helping others achieve their full potential.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="mt-0.5 text-[#84ba3f]" aria-hidden="true" />
                  Responsible for strategic leadership and management of the organisation.
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="mt-0.5 text-[#84ba3f]" aria-hidden="true" />
                  Experienced in facilitation, assessment, moderation and programme delivery.
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="mt-0.5 text-[#84ba3f]" aria-hidden="true" />
                  Dedicated to facilitating learning pathways that support professional growth.
                </li>
              </ul>
            </div>

            <div>
              <SectionTitle
                title="What drives us"
                subtitle="A culture built on genuine care and growth"
              />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-[#e5e4e7] bg-white p-5 shadow-sm dark:border-[#2e303a] dark:bg-[#171b22]">
                    <div className="mb-4">{item.icon}</div>
                    <h4 className="text-lg font-semibold text-[#17171d] dark:text-white">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[#4a4f57] dark:text-gray-300">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f7f7f5] py-16 dark:bg-[#12151b]">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <SectionTitle
                title="Why choose Ndzalama?"
                subtitle="Because learning should be practical, supportive and relevant"
              />
              <div className="mt-8 space-y-5">
                {[
                  'Our programmes are aligned to the NQF and SAQA standards, giving learners a credible route to professional recognition.',
                  'We design training that responds to the real needs of organisations, communities and the workplace.',
                  'Facilitators are able to work in local languages and communicate with sensitivity to diverse learner contexts.',
                  'We value relationships, responsiveness and service excellence throughout the learning journey.',
                ].map((statement) => (
                  <div key={statement} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm dark:bg-[#171b22]">
                    <FaCheckCircle className="mt-1 text-[#84ba3f]" aria-hidden="true" />
                    <p className="text-[#4a4f57] dark:text-gray-300">{statement}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#e5e4e7] bg-white p-8 shadow-sm dark:border-[#2e303a] dark:bg-[#171b22]">
              <h3 className="text-2xl font-semibold text-[#17171d] dark:text-white">
                Our values
              </h3>
              <ul className="mt-6 space-y-3">
                {values.map((value) => (
                  <li key={value} className="flex items-center gap-3 text-[#4a4f57] dark:text-gray-300">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#84ba3f]" aria-hidden="true" />
                    {value}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#84ba3f] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#6ea032]"
              >
                Speak to our team
                <FaArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

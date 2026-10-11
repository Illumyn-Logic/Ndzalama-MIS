import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { courses } from '@/data/courses';
import { testimonials } from '@/data/testimonials';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { CourseCard } from '@/components/common/course-card';
import { TestimonialCard } from '@/components/common/testimonial-card';
import { AwardLogoStrip } from '@/components/common/award-logo-strip';
import {
  FaArrowRight,
  FaCheckCircle,
  FaUserGraduate,
  FaCalendarAlt,
} from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Ndzalama Training — SAQA-accredited training programmes in facilitation, assessment, moderation, and more.',
};

export default function HomePage() {
  const featuredCourses = courses.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-brand-primary text-white"
      >
        {/* Background photo with dark overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/backgrounds/hero-02.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/85 to-brand-primary/75" aria-hidden="true" />
        </div>

        {/* Decorative squares */}
        <span
          className="absolute -top-24 -right-24 w-96 h-96 bg-brand-secondary/15 pointer-events-none z-10"
          aria-hidden="true"
        />
        <span
          className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 pointer-events-none z-10"
          aria-hidden="true"
        />

        <Container className="relative z-10 py-8">
          <div className="max-w-3xl">
            <span className="inline-block mb-4 px-4 py-1.5 bg-brand-secondary/20 text-brand-secondary text-sm font-semibold tracking-wide uppercase">
              SAQA Accredited Training
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Welcome to{' '}
              <span className="text-brand-secondary">Ndzalama</span>{' '}
              Training
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
              We make your dreams come true — professional, accredited training
              programmes that empower individuals and organisations across South Africa.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
              {[
                'NQF-aligned qualifications',
                'ETDP SETA accredited',
                'Nationwide delivery',
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <FaCheckCircle className="text-brand-secondary" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold bg-brand-secondary text-white hover:bg-[#6ea032] transition-colors"
              >
                Explore Courses
                <FaArrowRight className="text-sm" aria-hidden="true" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold border-2 border-white/40 text-white hover:bg-white/10 transition-colors"
              >
                Book Training
              </Link>
            </div>
          </div>

          {/* Stat cards */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
            {[
              { icon: <FaUserGraduate aria-hidden="true" />, value: '5 000+', label: 'Learners Trained' },
              { icon: <FaCheckCircle aria-hidden="true" />, value: '20+', label: 'Accredited Programmes' },
              { icon: <FaCalendarAlt aria-hidden="true" />, value: '20+', label: 'Years of Excellence' },
            ].map(({ icon, value, label }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm p-5 flex flex-col gap-1"
              >
                <span className="text-brand-secondary text-xl">{icon}</span>
                <span className="text-2xl font-bold text-white">{value}</span>
                <span className="text-xs text-white/60 uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partner and accreditation logos */}
      <section className="border-b border-[#e5e4e7] bg-brand-neutral py-10 dark:border-[#2e303a] dark:bg-[#1f2028]">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-sm shrink-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
                Our network
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#333] dark:text-white">
                Trusted learning partners
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#666] dark:text-gray-400">
                Working with organisations that strengthen learning and skills development.
              </p>
            </div>
            <div className="min-w-0 flex-1 md:max-w-3xl">
              <AwardLogoStrip compact />
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <Container>
          <SectionTitle
            title="Our Courses"
            subtitle="Choose from our accredited training programmes"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-6 py-3 font-medium border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white transition-colors"
            >
              View All Courses
            </Link>
          </div>
        </Container>
      </section>

      {/* About Ndzalama summary */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <div>
              <SectionTitle
                title="About Ndzalama"
                subtitle="A training partner rooted in purpose, excellence and community impact"
              />
              <p className="mt-5 text-lg leading-8 text-[#4a4f57] dark:text-gray-300">
                Ndzalama Training was established in 2002 to help individuals and organisations
                grow through accessible, high-quality education and development. We work across
                workplaces, community structures and learning environments to strengthen skills,
                confidence and professional progression.
              </p>
              <p className="mt-4 text-lg leading-8 text-[#4a4f57] dark:text-gray-300">
                Our work is guided by a compassionate leadership style, a people-first culture and
                a strong commitment to the National Qualifications Framework, ETDP SETA alignment
                and meaningful outcomes.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center bg-brand-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-[#6ea032]"
                >
                  Read our story
                </Link>
                <Link
                  href="/why-choose-us"
                  className="inline-flex items-center justify-center border border-brand-secondary px-6 py-3 font-semibold text-brand-secondary transition-colors hover:bg-brand-secondary hover:text-white"
                >
                  Why choose us
                </Link>
              </div>
            </div>

            <div className="bg-brand-primary p-8 text-white shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-neutral">
                Leadership
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden border-2 border-white/20">
                  <Image
                    src="/images/team/sanette-wevell.jpg"
                    alt="Sanette Wevell"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">Sanette Wevell</h3>
                  <p className="mt-1 text-[#dfeaf8]">Managing Director</p>
                </div>
              </div>
              <p className="mt-5 text-base leading-7 text-white/85">
                Under her leadership, Ndzalama continues to create opportunities for learning,
                service excellence and professional growth with heart, wisdom and accountability.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Ndzalama */}
      <section className="bg-brand-primary text-white py-16">
        <Container>
          <SectionTitle title="Why Choose Ndzalama?" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: '🏅',
                heading: 'SAQA Accredited',
                body: 'All our programmes are registered with SAQA and aligned to NQF unit standards.',
              },
              {
                icon: '🧑‍🏫',
                heading: 'Expert Facilitators',
                body: 'Our facilitators are qualified practitioners with real-world industry experience.',
              },
              {
                icon: '📋',
                heading: 'SETA Compliance',
                body: 'We support your WSP/ATR submissions and SETA-aligned reporting requirements.',
              },
            ].map(({ icon, heading, body }) => (
              <div key={heading} className="flex flex-col items-center gap-3">
                <span className="text-4xl" aria-hidden="true">{icon}</span>
                <h3 className="text-xl font-semibold">{heading}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Accreditation Services teaser */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center bg-brand-neutral dark:bg-[#1a2415] p-8 md:p-12">
            <div>
              <span className="inline-block mb-3 px-4 py-1.5 bg-brand-secondary/20 text-brand-primary dark:text-brand-secondary text-sm font-semibold tracking-wide uppercase">
                Beyond Training
              </span>
              <h2 className="text-3xl font-bold text-[#333] dark:text-white">
                Accreditation Services
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-[#4a4f57] dark:text-gray-300">
                We also help other organisations become accredited training providers,
                register as TVET colleges, and achieve SETA registration.
              </p>
              <Link
                href="/accreditation-services"
                className="mt-5 inline-flex items-center gap-2 bg-brand-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-[#6ea032]"
              >
                Explore Accreditation Services
                <FaArrowRight className="text-sm" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-[#f9f9f9] dark:bg-[#1f2028] py-16">
        <Container>
          <SectionTitle title="What Our Clients Say" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16">
        <Container className="text-center">
          <h2 className="text-3xl font-bold text-[#333] dark:text-white">
            Ready to get started?
          </h2>
          <p className="mt-3 text-[#666] dark:text-gray-400 max-w-xl mx-auto">
            Book your training today and take the next step in your professional development journey.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 font-medium bg-brand-secondary text-white hover:bg-[#6ea032] transition-colors"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 font-medium border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

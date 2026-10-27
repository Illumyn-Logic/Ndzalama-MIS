import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { courses, courseCategories } from '@/data/courses';
import { testimonials } from '@/data/testimonials';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { CourseCard } from '@/components/common/course-card';
import { TestimonialCard } from '@/components/common/testimonial-card';
import { AwardLogoStrip } from '@/components/common/award-logo-strip';
import {
  FaArrowRight,
  FaCertificate,
  FaCheckCircle,
  FaFirstAid,
  FaLaptop,
  FaGraduationCap,
  FaChalkboardTeacher,
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
      {/* Hero: Canopy & Growth Rings */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-[#102e14] via-[#163f1b] to-[#0c2210] text-white dark:from-[#061408] dark:via-[#091f0c] dark:to-[#040e05]">
        {/* Subtle Ambient Radial Backlight */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(123,198,45,0.14),transparent_65%)] dark:bg-[radial-gradient(circle_at_75%_50%,rgba(123,198,45,0.08),transparent_65%)]" aria-hidden="true" />

        {/* Concentric Growth Rings & Human-Tree Motif (from Growth Circles & Canopy Covers) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden aspect-square h-full overflow-hidden lg:block" aria-hidden="true">
          <svg className="absolute -right-[15%] top-1/2 h-[150%] w-[150%] -translate-y-1/2" viewBox="0 0 800 800" fill="none">
            {/* Outermost ring 1 */}
            <circle cx="400" cy="400" r="370" stroke="#BEEB92" strokeWidth="2" strokeDasharray="6 6" opacity="0.08" />
            {/* Ring 2 */}
            <circle cx="400" cy="400" r="310" stroke="#D9F5A7" strokeWidth="3" opacity="0.09" />
            {/* Ring 3 */}
            <circle cx="400" cy="400" r="250" stroke="#A3E635" strokeWidth="18" opacity="0.10" />
            {/* Ring 4 */}
            <circle cx="400" cy="400" r="190" stroke="#7BC62D" strokeWidth="24" opacity="0.12" />
            {/* Ring 5 - Inner Core */}
            <circle cx="400" cy="400" r="130" stroke="#3C7B32" strokeWidth="26" opacity="0.14" />
          </svg>
          {/* Tree scaled to fit the full section height */}
          <Image
            src="/images/brand/logo-tree-only.png"
            alt=""
            width={550}
            height={700}
            className="absolute right-[6%] top-1/4 h-[96%] w-auto max-w-none -translate-y-1/5 object-contain brightness-0 invert opacity-90 drop-shadow-2xl"
            priority
            aria-hidden="true"
          />
        </div>

        <Container className="relative z-10 flex min-h-136 items-center py-16 md:min-h-156">
          <div className="max-w-3xl">
            {/* Micro Eyebrow with Ochre accent bead */}
            {/* <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 bg-black/25 backdrop-blur-xs border border-white/20 text-xs font-semibold uppercase tracking-[0.22em] text-white/95">
              <span className="h-2 w-2 rounded-full bg-[#efa936] shadow-xs shadow-amber-400" aria-hidden="true" />
              <span>SAQA &amp; QCTO Accredited Training</span>
              <span className="text-white/30">|</span>
              <span className="text-white/80">Est. 2002</span>
            </div> */}

            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.04] sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
              Building Skills.
              <span className="block text-brand-secondary-light">Transforming Futures.</span>
            </h1>

            {/* Poetic Editorial Tagline from Cover Page 5 */}
            <div className="mt-5 flex items-center gap-3">
              <span className="h-0.5 w-7 bg-[#efa936]" aria-hidden="true" />
              <p className="text-base sm:text-lg font-medium italic tracking-wide text-emerald-100">
                “Every ring is a season of growth.”
              </p>
            </div>

            <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-white/90">
              Professional, accredited programmes helping people and organisations cultivate real capability through practical learning across South Africa.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-white/90">
              {[
                'NQF-aligned qualifications',
                'ETDP SETA accredited',
                'Nationwide delivery',
              ].map((item) => (
                <span key={item} className="flex items-center gap-2 font-medium">
                  <FaCheckCircle className="text-brand-secondary" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>

            {/* CTAs: High-Contrast Crisp White Explore Courses & Grey Block Book Training */}
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
              <Link
                href="/courses"
                className="group inline-flex min-h-12 items-center justify-center gap-2 border border-white/40 bg-white/10 px-7 py-3 font-bold text-white shadow-[0_12px_30px_rgba(6,18,8,0.16)] backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/15"
              >
                <span>Explore Courses</span>
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/register"
                className="group inline-flex min-h-12 items-center justify-center gap-2 border border-[#f3c768] bg-[#efa936] px-7 py-3 font-semibold text-[#132b13] shadow-[0_12px_30px_rgba(239,169,54,0.25)] transition-all hover:bg-[#f4ba4c]"
              >
                <span>Book Training</span>
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>

            {/* Stat Counters with crisp dividing rule */}
            <dl className="mt-12 grid max-w-xl grid-cols-3 border-t border-white/25 pt-6">
              {[
                { value: '5 000+', label: 'Learners trained' },
                { value: '20+', label: 'Accredited programmes' },
                { value: '24+', label: 'Years of growth' },
              ].map(({ value, label }) => (
                <div key={label} className="pr-3 group">
                  <dt className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-brand-secondary-light transition-colors">{value}</dt>
                  <dd className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/75">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* The 4-Block Signature Strip (Flush, zero gap, contiguous color stack) */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-0 text-white shadow-lg" aria-label="Core faculties">
        <Link
          href="/courses?provider=ETDP+SETA"
          className="group flex items-center justify-between gap-3 px-5 py-4 bg-[#efa936] hover:bg-[#df9926] transition-all border-b-2 border-transparent hover:border-white"
        >
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-amber-950/75">Faculty 01</span>
            <span className="text-sm sm:text-base font-bold text-white">ETDP SETA</span>
            <span className="block text-xs text-white/85 font-normal">Facilitation &amp; Assessment</span>
          </div>
          <FaArrowRight className="text-xs opacity-75 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" aria-hidden="true" />
        </Link>

        <Link
          href="/courses?provider=Services+SETA"
          className="group flex items-center justify-between gap-3 px-5 py-4 bg-[#249c9b] hover:bg-[#1e8887] transition-all border-b-2 border-transparent hover:border-white"
        >
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-teal-950/75">Faculty 02</span>
            <span className="text-sm sm:text-base font-bold text-white">Services SETA</span>
            <span className="block text-xs text-white/85 font-normal">Management &amp; Admin</span>
          </div>
          <FaArrowRight className="text-xs opacity-75 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" aria-hidden="true" />
        </Link>

        <Link
          href="/courses?provider=HWSETA"
          className="group flex items-center justify-between gap-3 px-5 py-4 bg-[#ed704c] hover:bg-[#d85e3a] transition-all border-b-2 border-transparent hover:border-white"
        >
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-orange-950/75">Faculty 03</span>
            <span className="text-sm sm:text-base font-bold text-white">HWSETA</span>
            <span className="block text-xs text-white/85 font-normal">Health &amp; First Aid</span>
          </div>
          <FaArrowRight className="text-xs opacity-75 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" aria-hidden="true" />
        </Link>

        <Link
          href="/accreditation-services"
          className="group flex items-center justify-between gap-3 px-5 py-4 bg-[#6b6570] hover:bg-[#58535d] transition-all border-b-2 border-transparent hover:border-white"
        >
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Pillar 04</span>
            <span className="text-sm sm:text-base font-bold text-white">Accreditation</span>
            <span className="block text-xs text-white/85 font-normal">Provider &amp; TVET Registration</span>
          </div>
          <FaArrowRight className="text-xs opacity-75 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" aria-hidden="true" />
        </Link>
      </div>

      {/* Partner and accreditation logos */}
      <section className="border-b border-[#e5e4e7] bg-brand-neutral py-10 dark:border-brand-primary-light/40 dark:bg-[#122612]">
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

      {/* Course categories */}
      <section className="bg-[#f7f8f5] py-16 dark:bg-[#0b1a0b]">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#65853d] dark:text-[#a9d66f]">
              Find your next step
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#263327] dark:text-white sm:text-4xl">
              Explore our training
            </h2>
            <p className="mt-3 text-base leading-7 text-[#5d685d] dark:text-white/70">
              From nationally recognised qualifications to practical skills programmes and flexible self-paced learning, find training that fits your goals.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {courseCategories.map((category) => {
              const categoryDetails = {
                'Occupational Certificates': {
                  description: 'Build recognised occupational knowledge and workplace capability.',
                  icon: FaCertificate,
                  accent: 'text-[#94702b] bg-[#f8f0df]',
                },
                'Skills Programmes': {
                  description: 'Develop practical skills for learning, work, and career progression.',
                  icon: FaChalkboardTeacher,
                  accent: 'text-[#277c74] bg-[#e7f4f1]',
                },
                'First Aid Programmes': {
                  description: 'Gain emergency response skills for safer workplaces and communities.',
                  icon: FaFirstAid,
                  accent: 'text-[#bb5544] bg-[#faeeeb]',
                },
                'Skill Builder Courses': {
                  description: 'Learn useful digital and career skills at your own pace.',
                  icon: FaLaptop,
                  accent: 'text-[#5e6caa] bg-[#eef0fa]',
                },
                'Legacy Qualifications': {
                  description: 'Explore established unit-standard training in ETD practice.',
                  icon: FaGraduationCap,
                  accent: 'text-[#715a88] bg-[#f2edf6]',
                },
              }[category];
              const CategoryIcon = categoryDetails.icon;
              const courseCount = courses.filter((course) => course.category === category).length;

              return (
                <Link
                  key={category}
                  href={`/courses?category=${encodeURIComponent(category)}`}
                  className="group flex min-h-56 flex-col border border-[#e4e8df] bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#bdd29f] hover:shadow-lg dark:border-white/10 dark:bg-[#132214] dark:hover:border-[#72964d]"
                >
                  <span className={`mb-5 inline-flex h-11 w-11 items-center justify-center ${categoryDetails.accent} dark:bg-white/10`}>
                    <CategoryIcon className="text-lg" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold leading-snug text-[#263327] transition-colors group-hover:text-[#527d31] dark:text-white dark:group-hover:text-[#b5df81]">
                    {category}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[#667064] dark:text-white/65">
                    {categoryDetails.description}
                  </p>
                  <span className="mt-5 flex items-center justify-between border-t border-[#edf0e9] pt-3 text-xs font-semibold text-[#5e6b5a] dark:border-white/10 dark:text-white/65">
                    <span>{courseCount} {courseCount === 1 ? 'course' : 'courses'}</span>
                    <span className="inline-flex items-center gap-2 text-[#547b36] transition-transform group-hover:translate-x-1 dark:text-[#b5df81]">
                      Explore <FaArrowRight aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Featured Courses */}
      <section className="bg-[#f4efe7] py-16 dark:bg-[#0b1a0b]">
        <Container>
          <SectionTitle
            title="Featured Courses"
            subtitle="A few learner favourites to get you started"
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-7 py-3 font-semibold border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white dark:border-white/60 dark:text-white dark:hover:bg-white dark:hover:text-brand-primary transition-all"
            >
              View All Courses
            </Link>
          </div>
        </Container>
      </section>

      {/* About Ndzalama summary */}
      <section className="bg-[#edf5eb] py-16 dark:bg-[#102310]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <div>
              <SectionTitle
                title="About Ndzalama"
                subtitle="A training partner rooted in purpose, excellence and community impact"
              />
              <p className="mt-5 text-lg leading-8 text-[#39563f] dark:text-gray-300">
                Ndzalama Training was established in 2002 to help individuals and organisations
                grow through accessible, high-quality education and development. We work across
                workplaces, community structures and learning environments to strengthen skills,
                confidence and professional progression.
              </p>
              <p className="mt-4 text-lg leading-8 text-[#39563f] dark:text-gray-300">
                Our work is guided by a compassionate leadership style, a people-first culture and
                a strong commitment to the National Qualifications Framework, ETDP SETA alignment
                and meaningful outcomes.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary-light"
                >
                  Read our story
                </Link>
                <Link
                  href="/why-choose-us"
                  className="inline-flex items-center justify-center border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white dark:border-white/50 dark:text-white dark:hover:bg-white dark:hover:text-brand-primary"
                >
                  Why choose us
                </Link>
              </div>
            </div>

            <div className="relative border border-[#d4e8d1] bg-[#f6faf4] p-8 text-[#1d331d] shadow-xl transition-all hover:border-[#bfdcb8] dark:border-white/20 dark:bg-[#152e15] dark:text-white dark:hover:border-white/40">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#356a3d] dark:text-emerald-200">
                  Leadership
                </p>
                <span className="h-1 w-8 bg-[#efa936]" aria-hidden="true" />
              </div>
              <div className="mt-5 flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden border-2 border-[#bfd6be] shadow-md dark:border-white/30">
                  <Image
                    src="/images/team/sanette-wevell.jpg"
                    alt="Sanette Wevell"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#18311a] dark:text-white">Sanette Wevell</h3>
                  <p className="mt-1 text-sm font-medium text-[#3e6c4a] dark:text-emerald-100/90">Managing Director</p>
                </div>
              </div>
              <p className="mt-5 text-base leading-7 text-[#355642] dark:text-white/90">
                Under her leadership, Ndzalama continues to create opportunities for learning,
                service excellence and professional growth with heart, wisdom and accountability.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Ndzalama */}
      <section className="bg-[#edf5eb] py-16 text-[#1d331d] dark:bg-[#142b14] dark:text-white">
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
              <div key={heading} className="flex flex-col items-center gap-3 rounded-2xl border border-[#dfeedd] bg-[#f7faf6] p-6 shadow-sm dark:border-transparent dark:bg-transparent dark:shadow-none">
                <span className="text-4xl" aria-hidden="true">{icon}</span>
                <h3 className="text-xl font-semibold text-[#1a311a] dark:text-white">{heading}</h3>
                <p className="text-sm leading-relaxed text-[#496350] dark:text-white/80">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Accreditation Services teaser */}
      <section className="bg-[#f3f8f2] py-16 dark:bg-[#0b1a0b]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center border border-[#dfeedd] bg-[#edf6ee] p-8 md:p-12 dark:border-white/10 dark:bg-[#183018]">
            <div>
              <span className="inline-block mb-3 px-4 py-1.5 bg-[#dff0d7] text-brand-primary dark:bg-brand-secondary/20 dark:text-brand-secondary text-sm font-semibold tracking-wide uppercase">
                Beyond Training
              </span>
              <h2 className="text-3xl font-bold text-[#223a27] dark:text-white">
                Accreditation Services
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-[#3d5645] dark:text-gray-300">
                We also help other organisations become accredited training providers,
                register as TVET colleges, and achieve SETA registration.
              </p>
              <Link
                href="/accreditation-services"
                className="mt-5 inline-flex items-center gap-2 bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary-light"
              >
                Explore Accreditation Services
                <FaArrowRight className="text-sm" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-[#f5f8f2] py-16 dark:bg-[#102310]">
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
      <section className="bg-[#f3efe8] py-16 dark:bg-[#0b1a0b]">
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
              className="group inline-flex items-center justify-center gap-2 border border-[#e8ba58] bg-[#efa936] px-7 py-3 font-bold text-[#163118] shadow-[0_12px_30px_rgba(239,169,54,0.22)] transition-all hover:bg-[#f4ba4c]"
            >
              <span>Book Training</span>
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/courses"
              className="group inline-flex items-center justify-center gap-2 border border-brand-primary/20 bg-white px-7 py-3 font-semibold text-brand-primary shadow-sm transition-all hover:border-brand-primary hover:bg-brand-neutral dark:border-white/30 dark:bg-transparent dark:text-white dark:hover:bg-white/5"
            >
              <span>Explore Courses</span>
              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

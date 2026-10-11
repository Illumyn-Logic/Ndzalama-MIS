import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { dynamicPosts } from '@/lib/offline_data';
import { FaTag, FaUserEdit, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'News & Regulatory Updates',
  description:
    'Latest updates on ETDP SETA accreditation, QCTO occupational certificate transitions, upcoming workshop intakes, and skills development news from Ndzalama Training.',
};

const categoryBadges: Record<string, string> = {
  'SETA Update': 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
  'QCTO Transition': 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  'Intake Announcement': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  'Training Tip': 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
};

export default function PostsPage() {
  const featuredPost = dynamicPosts.find((p) => p.isFeatured) || dynamicPosts[0];
  const regularPosts = dynamicPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <>
      {/* Hero: Canopy Header */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#102e14] via-[#163f1b] to-[#0c2210] text-white dark:from-[#061408] dark:via-[#091f0c] dark:to-[#040e05] py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(123,198,45,0.15),transparent_60%)]" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 bg-black/25 backdrop-blur-xs border border-white/20 text-xs font-semibold uppercase tracking-[0.22em] text-white/95">
              <span className="h-2 w-2 rounded-full bg-[#efa936] shadow-xs shadow-amber-400" aria-hidden="true" />
              <span>Institutional Bulletin</span>
              <span className="text-white/30">|</span>
              <span className="text-white/80">News &amp; Regulatory Insights</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              News &amp; Regulatory Updates
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
              Stay informed with ETDP SETA compliance bulletins, QCTO curriculum transitions, upcoming workshop intakes, and skills development insights.
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
            title="Latest Articles"
            subtitle="Updates on occupational certifications, SETA compliance, and learning interventions"
          />

          {/* Featured Post Hero */}
          {featuredPost && (
            <div className="mb-12 rounded-3xl overflow-hidden bg-white dark:bg-[#122415] border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="relative h-64 lg:h-auto lg:col-span-6 min-h-[300px]">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-brand-primary text-white shadow-md border border-white/20">
                      Featured Update
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          categoryBadges[featuredPost.category] || 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {featuredPost.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <FaCalendarAlt aria-hidden="true" />
                        {featuredPost.publishedAt}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                      <Link
                        href={`/posts/${featuredPost.slug}`}
                        className="hover:text-brand-secondary transition-colors"
                      >
                        {featuredPost.title}
                      </Link>
                    </h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm lg:text-base">
                      {featuredPost.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {featuredPost.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md flex items-center gap-1"
                        >
                          <FaTag className="text-[9px] text-brand-secondary" aria-hidden="true" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                      <FaUserEdit className="text-brand-secondary" aria-hidden="true" />
                      By {featuredPost.author}
                    </span>
                    <Link
                      href={`/posts/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary dark:text-brand-secondary hover:underline transition-colors"
                    >
                      Read full article
                      <FaArrowRight className="text-xs" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl overflow-hidden bg-white dark:bg-[#122415] border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          categoryBadges[post.category] || 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {post.category}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <FaCalendarAlt aria-hidden="true" />
                        {post.publishedAt}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="hover:text-brand-secondary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">By {post.author}</span>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary dark:text-brand-secondary hover:underline"
                    >
                      Read more
                      <FaArrowRight className="text-[10px]" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

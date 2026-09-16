import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/section-title';
import { dynamicPosts } from '@/lib/offline-data';
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
    <section className="py-16 bg-slate-50 dark:bg-[#0e0f14] min-h-screen">
      <Container>
        <SectionTitle
          title="News & Updates"
          subtitle="Stay informed with ETDP SETA compliance bulletins, QCTO curriculum guides, and upcoming cohort schedules"
        />

        {/* Featured Post Hero */}
        {featuredPost && (
          <div className="mb-12 rounded-3xl overflow-hidden bg-white dark:bg-[#16171d] border border-slate-200 dark:border-[#2e303a] shadow-lg hover:shadow-xl transition-all">
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
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[#84ba3f] text-white shadow">
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
                      className="hover:text-[#84ba3f] transition-colors"
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
                        <FaTag className="text-[9px] text-[#84ba3f]" aria-hidden="true" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <FaUserEdit className="text-[#84ba3f]" aria-hidden="true" />
                    By {featuredPost.author}
                  </span>
                  <Link
                    href={`/posts/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#84ba3f] hover:text-[#6ea032] transition-colors"
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
              className="rounded-2xl overflow-hidden bg-white dark:bg-[#16171d] border border-slate-200 dark:border-[#2e303a] shadow-sm hover:shadow-md transition-all flex flex-col"
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
                      className="hover:text-[#84ba3f] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">By {post.author}</span>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#84ba3f] hover:underline"
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
  );
}

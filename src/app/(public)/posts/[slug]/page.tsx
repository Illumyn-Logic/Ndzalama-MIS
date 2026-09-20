import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { dynamicPosts } from '@/lib/offline_data';
import { FaTag, FaUserEdit, FaCalendarAlt, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

export async function generateStaticParams() {
  return dynamicPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<'/posts/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = dynamicPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Ndzalama Updates`,
    description: post.summary,
  };
}

export default async function PostDetailPage(
  props: PageProps<'/posts/[slug]'>,
) {
  const { slug } = await props.params;
  const post = dynamicPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="py-16 bg-slate-50 dark:bg-[#0e0f14] min-h-screen">
      <Container className="max-w-4xl">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#84ba3f] hover:underline mb-8"
        >
          <FaArrowLeft className="text-xs" aria-hidden="true" />
          Back to all updates
        </Link>

        <div className="bg-white dark:bg-[#16171d] rounded-3xl border border-slate-200 dark:border-[#2e303a] shadow-lg p-8 sm:p-12">
          {/* Header metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#84ba3f]/15 text-[#84ba3f]">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <FaCalendarAlt aria-hidden="true" />
              {post.publishedAt}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <FaUserEdit aria-hidden="true" />
              By {post.author}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-0.5 rounded-full flex items-center gap-1"
              >
                <FaTag className="text-[9px] text-[#84ba3f]" aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>

          {/* Cover Image */}
          <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden my-8 shadow">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
              priority
            />
          </div>

          {/* Post Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
            <p className="text-lg font-medium text-slate-800 dark:text-slate-200 border-l-4 border-[#84ba3f] pl-4 italic">
              {post.summary}
            </p>
            <div className="whitespace-pre-line text-sm sm:text-base">{post.content}</div>
          </div>

          {/* Accreditation CTA Box */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#006600]/10 to-[#03367A]/10 border border-[#84ba3f]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-2xl text-[#84ba3f] shrink-0" aria-hidden="true" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  ETDP SETA Accredited Provider — ETDP0204
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Ready to enroll in our next cohort? Book your training online today.
                </p>
              </div>
            </div>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#84ba3f] text-white hover:bg-[#6ea032] transition-colors shrink-0"
            >
              Book Training Now
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}

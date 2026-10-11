import { Container } from '@/components/ui/container';

type PublicPageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PublicPageHero({
  eyebrow,
  title,
  description,
}: PublicPageHeroProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-[#102e14] via-[#163f1b] to-[#0c2210] text-white dark:from-[#061408] dark:via-[#091f0c] dark:to-[#040e05]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_30%,rgba(36,156,155,0.16),transparent_45%),radial-gradient(circle_at_12%_100%,rgba(239,169,54,0.12),transparent_38%)]"
          aria-hidden="true"
        />
        <Container className="relative z-10 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 border border-white/20 bg-black/25 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/95 backdrop-blur-xs">
              <span className="h-2 w-2 rounded-full bg-[#efa936]" aria-hidden="true" />
              {eyebrow}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                {description}
              </p>
            )}
          </div>
        </Container>
      </section>
      <div className="grid h-2.5 grid-cols-4" aria-hidden="true">
        <span className="bg-[#efa936]" />
        <span className="bg-[#249c9b]" />
        <span className="bg-[#ed704c]" />
        <span className="bg-[#6b6570]" />
      </div>
    </>
  );
}
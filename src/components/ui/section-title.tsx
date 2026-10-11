interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-[#333] dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-lg text-[#666] dark:text-gray-300">{subtitle}</p>
      )}
      <div className="flex items-center justify-center gap-2 mt-4" aria-hidden="true">
        <span className="w-12 h-0.5 bg-brand-secondary" />
        <span className="w-1.5 h-1.5 bg-[#efa936] rotate-45" />
        <span className="w-12 h-0.5 bg-slate-300 dark:bg-white/20" />
      </div>
    </div>
  );
}

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
      <div className="w-24 h-1 bg-[#84ba3f] mx-auto mt-4 rounded-full" />
    </div>
  );
}

import Image from 'next/image';
import { awardingBodies } from '@/data/accreditationServices';

interface AwardLogoStripProps {
  compact?: boolean;
}

export function AwardLogoStrip({ compact = false }: AwardLogoStripProps) {
  return (
    <div
      className="overflow-x-auto pb-3 [scrollbar-color:#84ba3f_transparent]"
      aria-label="Partner and accreditation logos"
    >
      <div className={`flex min-w-max items-center ${compact ? 'gap-4' : 'gap-6'}`}>
        {awardingBodies.map((body) => (
          <div
            key={body.id}
            className={`flex shrink-0 flex-col items-center justify-center border border-[#e5e4e7] bg-white shadow-sm dark:border-[#2e303a] dark:bg-[#171b22] ${
              compact ? 'h-24 w-40 rounded-lg p-3' : 'h-32 w-52 rounded-xl p-5'
            }`}
          >
            <Image
              src={body.logo}
              alt={body.name}
              width={220}
              height={96}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
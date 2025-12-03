//- utils/comp.tsx

import { Badge } from "@/components/ui/badge";

export const NumberStickerCircle = ({ number }: { number: string }) => {
  return (
    <div className="
      flex items-center justify-center
      h-12 w-12 rounded-full
      text-sm font-bold
      bg-quran-border-primary
      border border-quran-border-primary group-hover:border-quran-border-secondary"
    >
      {number}
    </div>
  );
};

export const NumberStickerRounded = ({ number }: { number: string }) => {
  return (
    <div className="
      flex items-start align-top justify-center
      pt-0.5 pb-0.5 pr-2 pl-2
      rounded-full
      text-sm font-bold
      bg-quran-border-primary
      border border-quran-border-primary group-hover:border-quran-border-secondary"
    >
      {number}
    </div>
  );
};

interface BadgeSurahAyahProps {
  surah: number,
  ayah: number,
}

export const BadgeSurahAyah = ({ surah, ayah }: BadgeSurahAyahProps) => {
  return (
    <Badge variant="outline" className="bg-neutral-100 text-sm font-mono font-semibold">
      {surah}:{ayah}
    </Badge>
  )
}

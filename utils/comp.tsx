//- utils/comp.tsx

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
      pt-0.5 pb-0.5 pr-1.5 pl-1.5
      rounded-lg
      text-sm font-bold
      bg-quran-border-primary
      border border-quran-border-primary group-hover:border-quran-border-secondary"
    >
      {number}
    </div>
  );
};

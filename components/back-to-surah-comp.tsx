//- components/back-to-surah-comp.tsx

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const BackToSurahComp = () => {
  return (
    <Link href="/" className="inline-flex items-center mb-4 transition-colors text-quran-info hover:text-quran-title">
      <ChevronLeft size={18} />
      <p className='ml-1 items-center text-sm'>
        kembali ke list surat
      </p>
    </Link>
  );
};

export default BackToSurahComp;

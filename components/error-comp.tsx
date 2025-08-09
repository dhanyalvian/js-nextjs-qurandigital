//- components/error-comp.tsx

import { ChevronLeft, CircleAlert } from "lucide-react";
import Link from "next/link";

const ErrorComp = () => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-background bg-opacity-80">
      <div className="flex flex-col items-center gap-4">
        <CircleAlert className="h-12 w-12 animate-bounce text-quran-subtitle" />
        <p className="mt-4 text-xl font-semibold text-quran-title">Terjadi kesalahan saat memuat data!</p>
        <p className="text-md font-semibold text-quran-subtitle">Silahkan coba lagi nanti.</p>
        <Link
          href="/"
          className="
            bg-quran-border-primary
            border border-quran-border-primary
            hover:border-quran-border-secondary
            text-sm
            text-quran-subtitle
            font-semibold
            py-1
            px-2
            rounded-2xl
            inline-flex
            items-center
            cursor-pointer
          ">
          kembali ke list surat
        </Link>
      </div>
    </div>
  );
}

export default ErrorComp;

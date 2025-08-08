//- components/loader-comp.tsx

import { RefreshCw as LoaderIcon } from "lucide-react";

const LoaderComp = () => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-background bg-opacity-80">
      <div className="flex flex-col items-center gap-4">
        <LoaderIcon className="h-12 w-12 animate-spin text-quran-subtitle" />
        <p className="mt-2 font-semibold text-quran-subtitle">memuat data...</p>
      </div>
    </div>
  );
}

export default LoaderComp;

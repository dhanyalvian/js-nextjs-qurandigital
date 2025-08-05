//- components/header-comp.tsx

import { QuranConfig } from "@/utils/config";

const Header = () => {
  return (
    <header className="overflow-y-scroll">
      <nav className="
        fixed top-0
        px-5 py-3 z-50
        w-full flex
        justify-between
        bg-quran-nav border-b border-b-quran-border-primary"
      >
        <div className=" mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex flex-1 text-xl font-bold text-quran-title">
            {QuranConfig.metadataTitle}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

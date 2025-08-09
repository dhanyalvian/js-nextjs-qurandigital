//- components/header-comp.tsx

import Link from "next/link";
import { QuranConfig } from "@/utils/config";
import { Icon } from "./icon";

const Header = () => {
  return (
    <header className="overflow-y-scroll">
      <nav className="
        fixed top-0 left-0
        px-5 py-3 z-50
        w-full shadow-xs
        bg-quran-nav border-b border-b-quran-border-primary"
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-quran-title">
            {QuranConfig.metadataTitle}
          </Link>

          <ul className="flex items-center space-x-4 gap-2">
            <li>
              <Icon type="search" size={24} />
            </li>
            <li>
              <Link href="/bookmarks" className="text-quran-title align-right" title="Bookmark">
                <Icon type="bookmark" size={24} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

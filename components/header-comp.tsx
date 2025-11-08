//- components/header-comp.tsx

import Link from "next/link";
import { QuranConfig } from "@/utils/config";
import { Icon } from "./icon";
import { BookOpenText } from "lucide-react";

const Header = () => {
  return (
    <header className="overflow-y-scroll">
      <nav className="
        fixed top-0 left-0
        z-50
        w-full shadow-xs
        bg-quran-nav border-b border-b-quran-border-primary"
      >
        <div className="layout-width py-3 flex items-center justify-between">
          <div className="flex flex-1">
            <Link href="/" className="flex justify-start items-end gap-2">
              <BookOpenText size={26} />
              <div className="text-2xl font-bold text-gray-900">{QuranConfig.metadataTitle}</div>
            </Link>
          </div>

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

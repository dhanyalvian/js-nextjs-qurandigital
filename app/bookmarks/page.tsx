//- app/bookmarks/page.tsx

'use client';

import Link from "next/link";
import BackToSurahComp from "@/components/back-to-surah-comp";
import { useBookmarks } from "@/hooks/bookmark";
import { Bookmark } from "@/types/quran";
import { NumberStickerRounded } from "@/utils/comp";
import { Icon } from "@/components/icon";
import { BookmarkIcon } from "lucide-react";

const BookmarkPage = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const bookmarkCount = bookmarks.length;
  let result;
  let lastNoSurat = 0;

  const handleRemove = (e: React.MouseEvent, item: Bookmark) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(item);
  };

  const resultData = bookmarks.map((row: Bookmark) => {
    let headerTag = null;
    let contentTag = null;

    if (row.noSurat !== lastNoSurat) {
      lastNoSurat = row.noSurat;

      headerTag = (
        <ul className="flex justify-start font-bold text-quran-title divider-x-dot mb-2">
          <li className="text-xl">{row.namaSuratLatin}</li>
          <li className="text-2xl font-arabic" dir="rtl">
            {row.namaSurat}
          </li>
        </ul>
      );
    }

    contentTag = (
      <div className="flex items-center justify-between mb-4">
        <NumberStickerRounded number={`${row.noSurat}:${row.noAyat}`} />
        <ul className="flex items-center gap-5">
          <li>
            <button className="transition-colors cursor-pointer" title="Copy text">
              <Icon type="remove" />
            </button>
          </li>
        </ul>
        <div className="text-right mb-4">
          <p className="font-arabic text-3xl leading-loose text-quran-title" dir="rtl">
            {row.teksArab}
          </p>
        </div>
      </div>
    );

    return (
      <div key={`${row.noSurat}:${row.noAyat}`}
        className="group p-4 rounded-xl bg-quran-panel hover:scale-[1.02] transition-all duration-200 border border-quran-border-primary hover:border-quran-border-secondary shadow-sm hover:shadow-md">
        {headerTag}
        {contentTag}
      </div>
    );
  });
  
  return resultData;
};

export default BookmarkPage;

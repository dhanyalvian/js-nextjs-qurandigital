//- app/bookmarks/page.tsx

'use client';

import BackToSurahComp from "@/components/back-to-surah-comp";
import { useBookmarks } from "@/hooks/bookmark";
import { Bookmark } from "@/types/quran";
import { NumberStickerRounded } from "@/utils/comp";
import { Icon } from "@/components/icon";
import Link from "next/link";
import NoDataComp from "@/components/no-data-comp";

const BookmarkPage = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const bookmarkCount = bookmarks.length;
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
      headerTag = (
        <div className={`block mb-4 ${lastNoSurat == 0 ? '' : 'border-t border-t-quran-border-primary border-dashed pt-4'}`}>
          <ul className="flex justify-start font-bold text-quran-title divider-x-dot mb-2">
            <li className="text-xl">{row.namaSuratLatin}</li>
            <li className="text-2xl font-arabic" dir="rtl">
              {row.namaSurat}
            </li>
          </ul>
        </div>
      );
      lastNoSurat = row.noSurat;
    }

    contentTag = (
      <>
        <div className="flex items-center justify-between mb-4">
          <Link href={`/surat/${row.noSurat}#${row.noAyat}`}>
            <NumberStickerRounded number={`${row.noSurat}:${row.noAyat}`} />
          </Link>

          <ul className="flex items-center gap-5">
            <li>
              <button className="transition-colors cursor-pointer" title="Hapus penanda" onClick={(e) => handleRemove(e, row)}>
                <Icon type="remove" />
              </button>
            </li>
          </ul>
        </div >

        <div className="text-right mb-4">
          <Link href={`/surat/${row.noSurat}#${row.noAyat}`} className="font-arabic text-3xl leading-loose text-quran-title hover:text-quran-subtitle" dir="rtl">
            {row.teksArab}
          </Link>
        </div>
      </>
    );

    return (
      <div key={`${row.noSurat}:${row.noAyat}`} className="group p-4">
        {headerTag}
        {contentTag}
      </div>
    );
  });

  return (
    <>
      <div className="mb-4">
        <BackToSurahComp />

        <div className="text-center bg-quran-nav rounded-2xl p-4 border border-quran-border-primary shadow-xs">
          <ul className="flex justify-center font-bold text-quran-title divider-x-dot">
            <li className='text-3xl'>Ayat yang ditandai</li>
          </ul>
          <ul className="flex justify-center text-sm divider-x-dot text-quran-subtitle mt-2">
            <li>{bookmarkCount} ayat</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-quran-nav rounded-2xl border border-quran-border-primary shadow-xs">
          {resultData.length > 0 ? (
            <>
              {resultData}
            </>
          ) : (
            <NoDataComp />
          )}
        </div>
      </div>
    </>
  );
};

export default BookmarkPage;

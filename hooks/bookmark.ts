//- hooks/bookmark.ts

"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "@/types/quran";

const storageKey = "bookmarks";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    try {
      const items = window.localStorage.getItem(storageKey);
      if (items) {
        setBookmarks(JSON.parse(items));
      }
    } catch (error) {
      console.error("Error", error);
    }
  }, []);

  const saveBookmarks = (newBookmarks: Bookmark[]) => {
    try {
      setBookmarks(newBookmarks);
      window.localStorage.setItem(storageKey, JSON.stringify(newBookmarks));
    } catch (error) {
      console.error("Error", error);
    }
  };

  const toggleBookmark = (item: Bookmark) => {
    const existingIndex = bookmarks.findIndex(
      (idx) => (idx.noSurat === item.noSurat) && (idx.noAyat === item.noAyat)
    );

    if (existingIndex > -1) {
      const newBookmarks = bookmarks.filter(
        (_, index) => (index !== existingIndex)
      );
      saveBookmarks(newBookmarks);
    } else {
      const newBookmarks = [...bookmarks, item];
      newBookmarks.sort((a, b) => {
        if (a.noSurat !== b.noSurat) {
          return (a.noSurat - b.noSurat);
        }

        return (a.noAyat - b.noAyat);
      });
      saveBookmarks(newBookmarks);
    }
  };

  const isBookmark = (noSurat: number, noAyat: number) => {
    return bookmarks.some(
      (b) => (b.noSurat === noSurat) && (b.noAyat === noAyat)
    );
  };

  return { bookmarks, toggleBookmark, isBookmark };
};

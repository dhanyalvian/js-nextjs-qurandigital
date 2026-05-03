//- app/surat/[no_surat]/page.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import LoaderComp from "@/components/loader-comp";
import { BadgeSurahAyah } from "@/utils/comp";
import { Icon } from "@/components/icon";
import { Play, Square } from "lucide-react";
import { Ayat, Surat, SuratDetail } from "@/types/quran";
import ErrorComp from "@/components/error-comp";
import { useBookmarks } from "@/hooks/bookmark";
import { GetApiUrl } from "@/utils/api";
import { Capitalize } from "@/utils/util";
import { Button } from "@/components/ui/button";
import OtherSurah from "@/components/other-surah";

export default function SuratDetailPage() {
  const params = useParams();
  const noSurat = params.no_surat as string;
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const { toggleBookmark, isBookmark } = useBookmarks();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isCopied, setIsCopied] = useState<boolean[]>([]);
  const copyToClipboard = (surat: Surat, ayat: Ayat) => {
    const copyIndex = ayat.nomorAyat;
    let copyText = `${surat.namaLatin} (${surat.nomor}:${ayat.nomorAyat}) | ${surat.nama}\n\n`;
    copyText += `${ayat.teksArab}\n\n`;
    copyText += `${ayat.teksIndonesia}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText);
      } else {
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = copyText;
        tempTextArea.style.position = "fixed";
        tempTextArea.style.left = "-9999px";
        tempTextArea.style.top = "0";
        document.body.appendChild(tempTextArea);
        tempTextArea.focus();
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
      }

      setIsCopied(prevIsCopied => {
        const newIsCopied = [...prevIsCopied];
        newIsCopied[copyIndex] = true;
        return newIsCopied;
      });

      setTimeout(() => setIsCopied(prevIsCopied => {
        const newIsCopied = [...prevIsCopied];
        newIsCopied[copyIndex] = false;
        return newIsCopied;
      }), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setIsCopied(prevIsCopied => {
        const newIsCopied = [...prevIsCopied];
        newIsCopied[copyIndex] = false;
        return newIsCopied;
      });
    }
  };

  const { data, isLoading, isError } = useQuery<SuratDetail>({
    queryKey: ["surat-detail", noSurat],
    queryFn: async () => {
      const url = GetApiUrl(`/surat/${noSurat}`)
      const response = await axios.get(url);
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading && data) {
      const hash = window.location.hash;

      if (hash) {
        const element = document.querySelector('[id="' + hash.replace('#', '') + '"]');

        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  }, [isLoading, data]);

  const playAudio = (audioUrl: string, noAyat: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (currentlyPlaying === noAyat) {
      setCurrentlyPlaying(null);
      return;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setCurrentlyPlaying(noAyat);

    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
      setCurrentlyPlaying(null);
    });

    audio.onended = () => {
      setCurrentlyPlaying(null);
      audioRef.current = null;
    };

    audio.onerror = () => {
      setCurrentlyPlaying(null);
      audioRef.current = null;
    };
  };

  if (isLoading) {
    return <LoaderComp />;
  }

  if (isError || !data) {
    return <ErrorComp />;
  }

  const numAudioFull = 999;

  return (
    <div className="grid grid-cols-1 gap-4 mx-auto">
      <div className="">
        <div className="text-center bg-olive-50 rounded-2xl p-4 border border-gray-300 shadow-xs">
          <ul className="flex justify-center font-bold text-quran-title divider-x-dot">
            <li className="text-2xl">{data.namaLatin}</li>
            <li className="text-3xl font-arabic" dir="rtl">{data.nama}</li>
          </ul>

          <ul className="flex justify-center text-sm divider-x-dot text-quran-subtitle">
            <li>{data.arti}</li>
            <li>{Capitalize(data.tempatTurun ?? "")}</li>
            <li>{data.jumlahAyat} ayat</li>
          </ul>

          <div className="mt-2">
            <Button
              variant={currentlyPlaying === numAudioFull ? "secondary" : "outline"}
              size="sm"
              className="border border-border rounded-full shadow-xs cursor-pointer"
              onClick={() => playAudio(data.audioFull?.["05"] || "", numAudioFull)}
              title={currentlyPlaying === numAudioFull ? "Berhenti" : "Putar Surat"}
            >
              {currentlyPlaying === numAudioFull ? (
                <>
                  <Square className="icon-wrapper-fill-active" />
                  Berhenti
                </>
              ) : (
                <>
                  <Play className="icon-wrapper-fill-active" />
                  Putar Surat
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <OtherSurah
        suratSebelumnya={data.suratSebelumnya}
        suratSelanjutnya={data.suratSelanjutnya}
        ayat={[]}
        nomor={0}
        nama={""}
        namaLatin={""}
        jumlahAyat={0}
        tempatTurun={""}
        arti={""}
        deskripsi={""}
      />

      <div className="space-y-4">
        {data.ayat.map((ayat) => (
          <div
            id={`${ayat.nomorAyat}`}
            key={ayat.nomorAyat}
            className="group p-4 rounded-2xl bg-quran-panel hover:scale-[1.02] transition-all duration-200 border border-quran-border-primary shadow-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <BadgeSurahAyah surah={data.nomor} ayah={ayat.nomorAyat} />

              <ul className="flex items-center gap-5">
                <li>
                  <button
                    className="transition-colors cursor-pointer"
                    title="Copy text"
                    onClick={() => copyToClipboard(data, ayat)}
                    disabled={isCopied[ayat.nomorAyat]}
                  >
                    {isCopied[ayat.nomorAyat] ? (
                      <Icon type="check" isActive={true} />
                    ) : (
                      <Icon type="copy" />
                    )}
                  </button>
                </li>
                <li>
                  <button className="transition-colors cursor-pointer" title="Share">
                    <Icon type="share" />
                  </button>
                </li>
                <li>
                  <button className="transition-colors cursor-pointer" title="Tafsir">
                    <Icon type="tafsir" />
                  </button>
                </li>
                <li>
                  <button
                    className="transition-colors cursor-pointer"
                    title={isBookmark(data.nomor, ayat.nomorAyat) ? "Hapus penanda" : "Tandai"}
                    onClick={() => toggleBookmark({
                      noSurat: data.nomor,
                      namaSurat: data.nama,
                      namaSuratLatin: data.namaLatin,
                      noAyat: ayat.nomorAyat,
                      teksArab: ayat.teksArab,
                    })}
                  >
                    {isBookmark(data.nomor, ayat.nomorAyat) ? (
                      <Icon type="bookmark" isFill={true} isActive={true} />
                    ) : (
                      <Icon type="bookmark" />
                    )}
                  </button>
                </li>
              </ul>
            </div>

            <div className="text-right mb-4">
              <p className="font-arabic text-3xl leading-loose text-quran-title" dir="rtl">
                {ayat.teksArab}
              </p>
            </div>

            <div className="mb-4">
              <p
                className="text-md text-quran-subtitle italic leading-relaxed"
                dangerouslySetInnerHTML={{ __html: ayat.teksLatin }}
              />
            </div>

            <div className="">
              <p className="text-md text-quran-title leading-relaxed">
                {ayat.teksIndonesia}
              </p>
            </div>
          </div>
        ))}
      </div>

      <OtherSurah
        suratSebelumnya={data.suratSebelumnya}
        suratSelanjutnya={data.suratSelanjutnya}
        ayat={[]}
        nomor={0}
        nama={""}
        namaLatin={""}
        jumlahAyat={0}
        tempatTurun={""}
        arti={""}
        deskripsi={""}
      />
    </div>
  );
}

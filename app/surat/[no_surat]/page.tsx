//- app/surat/[no_surat]/page.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useRef } from 'react';
import LoaderComp from '@/components/loader-comp';
import { NumberStickerRounded } from '@/utils/comp';
import { Icon } from '@/components/icon';
import { ChevronLeft } from 'lucide-react';

// Define the shape of Ayat data
interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    '01': string;
    '02': string;
    '03': string;
    '04': string;
    '05': string;
  };
}

// Define the shape of Surah detail data
interface SurahDetail {
  nomor: number;
  nama: string;
  namaLatin: string;
  arti: string;
  jumlahAyat: number;
  tempatTurun: string;
  audioFull: {
    '01': string;
    '02': string;
    '03': string;
    '04': string;
    '05': string;
  };
  ayat: Ayat[];
}

export default function SurahDetailPage() {
  const params = useParams();
  const nomorSurah = params.no_surat as string;
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data, isLoading, isError } = useQuery<SurahDetail>({
    queryKey: ['surat-detail', nomorSurah],
    queryFn: async () => {
      const response = await axios.get(`https://equran.id/api/v2/surat/${nomorSurah}`);
      return response.data.data;
    },
  });

  const playAudio = (audioUrl: string, ayatNumber: number) => {
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // If clicking the same ayat that's currently playing, stop it
    if (currentlyPlaying === ayatNumber) {
      setCurrentlyPlaying(null);
      return;
    }

    // Create new audio element and play
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setCurrentlyPlaying(ayatNumber);

    audio.play().catch((error) => {
      console.error('Error playing audio:', error);
      setCurrentlyPlaying(null);
    });

    // Reset state when audio ends
    audio.onended = () => {
      setCurrentlyPlaying(null);
      audioRef.current = null;
    };

    // Handle audio errors
    audio.onerror = () => {
      setCurrentlyPlaying(null);
      audioRef.current = null;
    };
  };

  if (isLoading) {
    return <LoaderComp />;
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">Terjadi kesalahan saat memuat surah!</p>
          <p className="text-slate-400 mt-2">Silakan coba lagi nanti.</p>
          <Link href="/" className="inline-block mt-4 px-4 py-2 bg-slate-700 rounded hover:bg-slate-600 transition-colors">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const numAudioFull = 999;

  return (
    <>
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center mb-4 transition-colors text-quran-info hover:text-quran-title">
          <ChevronLeft size={18} />
          <p className='ml-1 items-center text-sm'>
            kembali ke list surat
          </p>
        </Link>

        <div className="sticky top-0 text-center bg-quran-nav rounded-lg p-6 border border-quran-border-primary shadow-xs">
          <ul className="flex justify-center font-bold text-quran-title divider-x-dot">
            <li className='text-3xl'>{data.namaLatin}</li>
            <li className="text-4xl font-arabic" dir="rtl">{data.nama}</li>
          </ul>

          {/* <p className="font-arabic text-4xl mb-2 text-quran-title">{data.nama}</p> */}
          {/* <p className="text-quran-subtitle mb-2">{data.arti}</p> */}
          <ul className="flex justify-center text-sm divider-x-dot text-quran-subtitle">
            <li>{data.arti}</li>
            <li>{data.tempatTurun}</li>
            <li>{data.jumlahAyat} ayat</li>
          </ul>

          <div className='mt-3'>
            <button className={`
              group
              bg-quran-border-primary
              border
              ${currentlyPlaying === numAudioFull
                ? 'border-quran-border-secondary'
                : 'border-quran-border-primary'}
              hover:border-quran-border-secondary
              text-sm
              text-quran-subtitle
              font-semibold
              py-1
              px-2
              rounded-2xl
              inline-flex
              items-center
              cursor-pointer`}
              onClick={() => playAudio(data.audioFull['05'], numAudioFull)}
              title={currentlyPlaying === numAudioFull ? 'Berhenti' : 'Putar Surat'}
            >
              {currentlyPlaying === numAudioFull ? (
                <>
                  <Icon type='stop' size={16} isFill={true} isActive={true} />
                  <span className='ml-2 mr-1'>Stop Surat</span>
                </>
              ) : (
                <>
                  <Icon type='play' size={16} isFill={true} isActive={true} />
                  <span className='ml-2 mr-1'>Putar Surat</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Ayat List */}
      <div className="space-y-6">
        {data.ayat.map((ayat) => (
          <div
            key={ayat.nomorAyat}
            className="group p-4 rounded-xl bg-quran-panel hover:scale-[1.02] transition-all duration-200 border border-quran-border-primary hover:border-quran-border-secondary shadow-sm hover:shadow-md">
            {/* Ayat Number and Play Button */}
            <div className="flex items-center justify-between mb-4">
              <NumberStickerRounded number={data.nomor + ':' + ayat.nomorAyat} />

              <ul className='flex items-center gap-5'>
                <li>
                  <button className='transition-colors cursor-pointer' title='Copy text'>
                    <Icon type='copy' />
                  </button>
                </li>
                <li>
                  <button className='transition-colors cursor-pointer' title='Tafsir'>
                    <Icon type='tafsir' />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => playAudio(ayat.audio['05'], ayat.nomorAyat)}
                    className='transition-colors cursor-pointer'
                    title={currentlyPlaying === ayat.nomorAyat ? 'Stop' : 'Putar ayat ' + ayat.nomorAyat}
                  >
                    {currentlyPlaying === ayat.nomorAyat ? (
                      <Icon type='stop' isFill={true} isActive={true} />
                    ) : (
                      <Icon type='play' isFill={true} />
                    )}
                  </button>
                </li>
                <li>
                  <button className='transition-colors cursor-pointer' title='Tandai'>
                    <Icon type='bookmark-active' />
                  </button>
                </li>
                <li>
                  <button className='transition-colors cursor-pointer' title='Share'>
                    <Icon type='share' />
                  </button>
                </li>
              </ul>
            </div>

            {/* Arabic Text */}
            <div className="text-right mb-4">
              <p className="font-arabic text-3xl leading-loose text-quran-title" dir="rtl">
                {ayat.teksArab}
              </p>
            </div>

            {/* Latin Text */}
            <div className="mb-4">
              <p className="text-md text-quran-subtitle italic leading-relaxed">
                {ayat.teksLatin}
              </p>
            </div>

            {/* Indonesian Translation */}
            <div className="mb-4">
              <p className="text-md text-quran-subtitle leading-relaxed">
                {ayat.teksIndonesia}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

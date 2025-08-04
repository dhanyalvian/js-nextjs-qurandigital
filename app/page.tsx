//- app/page.tsx

'use client';

import { Surat } from "@/types/quran";
import { getApiUrl } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

const HomePage = () => {
  const { data, isLoading, isError } = useQuery<Surat[]>({
    queryKey: ['list-surat'],
    queryFn: async () => {
      const url = getApiUrl('/surat');
      const response = await axios.get(url);

      return response.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">Terjadi kesalahan saat memuat data!</p>
          <p className="text-slate-400 mt-2">Silakan coba lagi nanti.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <main className="container mx-auto p-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">{"Al-Qur'an"}</h1>
          <p className="text-slate-400">Daftar Surat {"Al-Qur'an"} dengan Terjemahan Indonesia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data?.map((surat: Surat) => (
            <Link
              key={surat.nomor}
              href={`/surah/${surat.nomor}`}
              className="block p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200 border border-slate-700 hover:border-slate-600"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center h-12 w-12 bg-slate-700 rounded-full text-sm font-bold">
                    {surat.nomor}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">{surat.namaLatin}</h2>
                    <p className="text-sm text-slate-400">{surat.arti}</p>
                    <p className="text-xs text-slate-500 mt-1">{surat.jumlahAyat} ayat</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xl text-slate-300">{surat.nama}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;

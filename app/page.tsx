//- app/page.tsx

'use client';

import { Surat } from "@/types/quran";
import { getApiUrl } from "@/utils/api";
import { QuranConfig } from "@/utils/config";
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
    <div className="min-h-screen">
      <main className="container mx-auto p-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-quran-title">{QuranConfig.metadataTitle}</h1>
          <p className="text-xl text-quran-subtitle">{QuranConfig.metadataDescription}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data?.map((surat: Surat) => (
            <Link
              key={surat.nomor}
              href={`/surat/${surat.nomor}`}
              className="group block p-4 rounded-xl bg-quran-panel hover:scale-[1.02] transition-all duration-200 border border-quran-border-primary hover:border-quran-border-secondary shadow-sm hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full text-sm font-bold bg-quran-border-primary border border-quran-border-primary group-hover:border-quran-border-secondary">
                    {surat.nomor}
                  </div>
                  <div className="items-start">
                    <h2 className="font-semibold text-lg text-quran-title">{surat.namaLatin}</h2>
                    <p className="text-xs text-quran-subtitle font-medium">{surat.arti}</p>
                    <p className="text-xs text-quran-info mt-0.5">{surat.jumlahAyat} ayat</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-arabic font-mono text-3xl text-quran-title">{surat.nama}</p>
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

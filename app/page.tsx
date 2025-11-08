//- app/page.tsx

'use client'

import { Surat } from "@/types/quran"
import { getApiUrl } from "@/utils/api"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import LoaderComp from "@/components/loader-comp"
import { NumberStickerCircle } from "@/utils/comp"


const HomePage = () => {
  const { data, isLoading, isError } = useQuery<Surat[]>({
    queryKey: ['surat-list'],
    queryFn: async () => {
      const url = getApiUrl('/surat')
      const response = await axios.get(url)

      return response.data.data
    },
  })

  if (isLoading) {
    return (<LoaderComp />)
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">Terjadi kesalahan saat memuat data!</p>
          <p className="text-slate-400 mt-2">Silakan coba lagi nanti.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-quran-title">{QuranConfig.metadataTitle}</h1>
        <p className="text-xl text-quran-subtitle">{QuranConfig.metadataDescription}</p>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
        {data?.map((surat: Surat) => (
          <Link
            key={surat.nomor}
            href={`/surat/${surat.nomor}`}
            className="group p-4 rounded-2xl bg-quran-panel hover:scale-[1.02] transition-all duration-200 border border-quran-border-primary shadow-xs"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <NumberStickerCircle number={surat.nomor.toString()} />
                
                <div className="items-start">
                  <h2 className="font-semibold text-lg text-quran-title">{surat.namaLatin}</h2>
                  <p className="text-xs text-quran-subtitle font-medium">{surat.arti}</p>
                  <p className="text-xs text-quran-info mt-0.5">{surat.jumlahAyat} ayat</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-arabic text-3xl text-quran-title" dir="rtl">{surat.nama}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default HomePage

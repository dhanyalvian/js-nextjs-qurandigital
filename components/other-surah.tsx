//- components/other-surah.tsx

import { SuratDetail } from "@/types/quran"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const OtherSurah = ({ surat_sebelumnya, surat_selanjutnya }: SuratDetail) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mx-auto">
        {surat_sebelumnya && surat_sebelumnya.nomor ? (
          <Link href={`/surat/${surat_sebelumnya.nomor}`} className="group p-4 rounded-2xl bg-quran-panel hover:scale-[1.02] transition-all duration-200 border border-quran-border-primary shadow-xs">
            <div className="flex justify-start items-center">
              <ChevronLeft className="mr-3" size={24} />
              <div>
                <div className="font-arabic text-2xl">{surat_sebelumnya.nama}</div>
                <div className="text-sm">{surat_sebelumnya.nama_latin}</div>
              </div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        {surat_selanjutnya && surat_selanjutnya.nomor ? (
          <Link href={`/surat/${surat_selanjutnya.nomor}`} className="group p-4 rounded-2xl bg-quran-panel hover:scale-[1.02] transition-all duration-200 border border-quran-border-primary shadow-xs text-right items-end">
            <div className="flex justify-end items-center">
              <div>
                <div className="font-arabic text-2xl">{surat_selanjutnya.nama}</div>
                <div className="text-sm">{surat_selanjutnya.nama_latin}</div>
              </div>
              <ChevronRight className="ml-3" size={24} />
            </div>

          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default OtherSurah

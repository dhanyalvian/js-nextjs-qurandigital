//- components/other-surah.tsx

import { SuratDetail } from "@/types/quran"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const OtherSurah = ({ suratSebelumnya, suratSelanjutnya }: SuratDetail) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mx-auto">
        {suratSebelumnya && suratSebelumnya.nomor ? (
          <Link href={`/surat/${suratSebelumnya.nomor}`} className="group p-4 rounded-2xl bg-quran-panel hover:scale-[1.02] transition-all duration-200 border border-quran-border-primary shadow-xs">
            <div className="flex justify-start items-center">
              <ChevronLeft className="mr-3" size={24} />
              <div>
                <div className="font-arabic text-2xl">{suratSebelumnya.nama}</div>
                <div className="text-sm">{suratSebelumnya.namaLatin}</div>
              </div>
            </div>
          </Link>
        ) : (
          <div></div>
        )}

        {suratSelanjutnya && suratSelanjutnya.nomor ? (
          <Link href={`/surat/${suratSelanjutnya.nomor}`} className="group p-4 rounded-2xl bg-quran-panel hover:scale-[1.02] transition-all duration-200 border border-quran-border-primary shadow-xs text-right items-end">
            <div className="flex justify-end items-center">
              <div>
                <div className="font-arabic text-2xl">{suratSelanjutnya.nama}</div>
                <div className="text-sm">{suratSelanjutnya.namaLatin}</div>
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

//- components/dropdown-surah.tsx

"use client"

import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import QuranData from "@/data/quran.json"

const rawData: Record<string, string> = QuranData

const DropdownSurah = () => {
  const router = useRouter()
  
  const [selectedSurat, setSelectedSurat] = useState<string>("")
  const [selectedAyat, setSelectedAyat] = useState<string>("")

  // Handler saat Combobox #1 berubah
  const handleKeyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value
    setSelectedSurat(key)
    setSelectedAyat("") // Reset pilihan ke-2 setiap kali pilihan ke-1 ganti
  }
  
  const handleRedirect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedAyat(value)
    
    if (value) {
      router.push(`/surat/${selectedSurat}#${value}`)
    }
  }

  // Menghasilkan array angka dari 1 sampai N (N = value dari rawData)
  const generateRange = (limit: string) => {
    const n = parseInt(limit, 10)
    if (isNaN(n)) return []
    // Membuat array [1, 2, 3, ..., n]
    return Array.from({ length: n }, (_, i) => i + 1)
  }

  const rangeOptions = selectedSurat ? generateRange(rawData[selectedSurat]) : []

  return (
    <div className="flex">
      <select
        value={selectedSurat}
        onChange={handleKeyChange}
        className="border rounded-l-xl px-1.5 text-sm"
      >
        <option value="">Surat</option>
        {Object.keys(rawData).map((surat) => (
          <option key={surat} value={surat.toString()}>
            {surat}
          </option>
        ))}
      </select>

      <select
        value={selectedAyat}
        onChange={handleRedirect}
        disabled={!selectedSurat}
        className="border border-l-0 rounded-r-xl px-1.5 text-sm"
      >
        <option value="">Ayat</option>
        {rangeOptions.map((ayat) => (
          <option key={ayat.toString()} value={ayat}>
            {ayat}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DropdownSurah

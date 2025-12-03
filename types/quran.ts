//- types/quran.ts

interface Surat {
  id?: number,
  nomor: number,
  nama: string,
  nama_latin: string,
  jumlah_ayat: number,
  tempat_turun: string,
  arti: string,
  deskripsi: string,
  audio: string,
}

interface SuratDetail extends Surat {
  ayat: Ayat[],
  surat_sebelumnya: Surat,
  surat_selanjutnya: Surat,
}

interface Ayat {
  id: number,
  surah: number,
  nomor: number,
  ar: string,
  tr: string,
  idn: string,
}

interface Bookmark {
  noSurat: number,
  namaSurat: string,
  namaSuratLatin: string,
  noAyat: number,
  teksArab: string,
}

export type {
  Surat,
  SuratDetail,
  Ayat,
  Bookmark,
}

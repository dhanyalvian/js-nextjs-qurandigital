//- types/quran.ts

interface Surat {
  nomor: number,
  nama: string,
  namaLatin: string,
  jumlahAyat: number,
  tempatTurun?: string,
  arti?: string,
  deskripsi?: string,
  audioFull?: Audio,
}

interface SuratDetail extends Surat {
  ayat: Ayat[],
  suratSebelumnya: Surat,
  suratSelanjutnya: Surat,
}

interface Ayat {
  nomorAyat: number,
  teksArab: string,
  teksLatin: string,
  teksIndonesia: string,
  audio: Audio,
}

interface Audio {
  "01": string,
  "02": string,
  "03": string,
  "04": string,
  "05": string,
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

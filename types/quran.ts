//- types/quran.ts

export interface Surat {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: { [key: string]: string };
};

export interface SuratDetail extends Surat {
  ayat: Ayat[];
  suratSebelumnya?: {
    nomor: number;
    nama: string;
    namaLatin: string;
  };
  suratSelanjutnya?: {
    nomor: number;
    nama: string;
    namaLatin: string;
  };
}

export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: { [key: string]: string };
};

export interface Tafsir {
  ayat: number;
  teks: string;
};

export interface Bookmark {
  noSurat: number;
  namaSurat: string;
  namaSuratLatin: string;
  noAyat: number;
  teksArab: string;
}

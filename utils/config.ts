//- utils/config.ts

export const QuranConfig = {
  metadataTitle: process.env.NEXT_PUBLIC_METADATA_TITLE || "Qur'an Digital",
  metadataDescription: process.env.NEXT_PUBLIC_METADATA_DESCRIPTION || "Al-Qur'an digital dengan terjemahan dan tafsir Indonesia.",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://equran.id/api',
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION || 'v2',
  defaultAudioKey: process.env.NEXT_PUBLIC_DEFAULT_AUDIO_KEY || '05',
};

export const ApiUrl = `${QuranConfig.apiUrl}/${QuranConfig.apiVersion}`;

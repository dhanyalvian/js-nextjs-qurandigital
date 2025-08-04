import type { Metadata } from "next";
import { Roboto, Roboto_Mono, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { QuranConfig } from "@/utils/config";

const fontRoboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});
const fontRobotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});
const fontNotoNaskhArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh-arabic",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: QuranConfig.metadataTitle,
  description: QuranConfig.metadataDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontRoboto.variable} ${fontRobotoMono.variable} ${fontNotoNaskhArabic.variable} antialiased`}>
        <div className="mt-15 pt-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Roboto, Roboto_Mono, Noto_Naskh_Arabic, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { QuranConfig } from "@/utils/config";
import Header from "@/components/header-comp";
import Footer from "@/components/footer-comp";

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
  display: "swap",
  weight: "500",
  style: "normal",
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
        <Header />
        
        <div className="mt-4 pt-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <Providers>
            <div className="">
              <main className="container mx-auto p-4 py-8">
                {children}
              </main>
            </div>
          </Providers>
        </div>
        
        <Footer />
      </body>
    </html>
  );
}

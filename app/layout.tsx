//- app/layout.tsx

import type { Metadata } from "next"
import { Roboto_Flex, Roboto_Mono, Noto_Naskh_Arabic } from "next/font/google";
// import { Roboto, Roboto_Mono, Noto_Naskh_Arabic } from "next/font/google"
import "./globals.css"
import Providers from "@/providers"
import { QuranConfig } from "@/utils/config"
import Header from "@/components/header-comp"
import Footer from "@/components/footer-comp"
import BackToTopButton from "@/components/back-to-top-comp"

const fontSans = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
})
const fontMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
})
const fontArabic = Noto_Naskh_Arabic({
  variable: "--font-noto-naskh-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: "500",
  style: "normal",
})

export const metadata: Metadata = {
  title: QuranConfig.metadataTitle,
  description: QuranConfig.metadataDescription,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} ${fontArabic.variable} antialiased`}>
        <Header />

        <div className="layout-width mt-14 pt-4">
          <Providers>
            <div className="">
              <main className="">
                {children}
              </main>
            </div>
          </Providers>
        </div>

        <BackToTopButton />
        
        <Footer />
      </body>
    </html>
  )
}

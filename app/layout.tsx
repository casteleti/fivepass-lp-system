import type { Metadata } from "next"
import { Geist, Geist_Mono, Saira_Condensed } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const sairaCondensed = Saira_Condensed({ variable: "--font-condensed", subsets: ["latin"], weight: ["600", "700"] })

export const metadata: Metadata = {
  title: "Fivepass — A bilheteria que mais dá margem pro seu evento",
  description:
    "Bilheteria white-label com a menor taxa do mercado (3% a 5%), sua marca, seus dados e o dinheiro caindo direto na sua conta, na hora. Mais eventos. Menos taxas.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} ${sairaCondensed.variable}`}>
      <body>{children}</body>
    </html>
  )
}

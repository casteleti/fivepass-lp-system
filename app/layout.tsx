import type { Metadata } from "next"
import { Geist, Geist_Mono, Saira_Condensed } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const sairaCondensed = Saira_Condensed({ variable: "--font-condensed", subsets: ["latin"], weight: ["600", "700"] })

// IDs do Google (públicos). Env permite sobrescrever por ambiente; fallback = IDs reais.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MTSFXTQ5"
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-VGGKMRYFRG"

export const metadata: Metadata = {
  title: "Fivepass — A bilheteria que mais dá margem pro seu evento",
  description:
    "Bilheteria white-label com a menor taxa do mercado (3% a 5%), sua marca, seus dados e o dinheiro caindo direto na sua conta, na hora. Mais eventos. Menos taxas.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} ${sairaCondensed.variable}`}>
      <body>
        {/* Google Tag Manager (noscript) — imediatamente após <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}

        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        {/* Google Analytics 4 (gtag.js) */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`}
        </Script>
      </body>
    </html>
  )
}

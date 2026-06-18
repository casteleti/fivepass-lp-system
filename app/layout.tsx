import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Saira_Condensed } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Analytics } from "@/components/ui/Analytics"
import { Clarity } from "@/components/Analytics/Clarity"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const sairaCondensed = Saira_Condensed({ variable: "--font-condensed", subsets: ["latin"], weight: ["600", "700"] })

// IDs do Google (públicos). Env permite sobrescrever por ambiente; fallback = IDs reais.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MTSFXTQ5"
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-VGGKMRYFRG"
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ""

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fivepass.daksa.ia.br"
const TITLE = "Fivepass — A bilheteria que mais dá margem pro seu evento"
const DESCRIPTION =
  "Bilheteria white-label com a menor taxa do mercado (3% a 5%), sua marca, seus dados e o dinheiro caindo direto na sua conta, na hora. Mais eventos. Menos taxas."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Fivepass",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Fivepass",
    title: TITLE,
    description: DESCRIPTION,
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: "#07090e",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Fivepass",
      url: SITE_URL,
      logo: `${SITE_URL}/fivepass-site-01.png`,
      description: DESCRIPTION,
      sameAs: ["https://www.instagram.com/five.pass/"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Fivepass",
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
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

        {/* Dados estruturados (JSON-LD) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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

        {/* Meta Pixel — carrega só se o ID estiver no env. if(f.fbq)return evita duplicar se o GTM já carregar o Pixel. */}
        {META_PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
            </Script>
            <noscript>
              <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} />
            </noscript>
          </>
        )}

        {/* Tracking de seções / CTAs / scroll / tempo (GA4 + Meta Pixel via GTM) */}
        <Analytics />
        {/* Microsoft Clarity — Client Component dedicado, init só em produção */}
        <Clarity />
      </body>
    </html>
  )
}

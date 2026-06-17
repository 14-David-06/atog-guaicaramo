import type { Metadata } from "next";
import "./globals.css";
import HatoHeaderWrapper from "@/components/hato/HatoHeaderWrapper";
import HatoFooter from "@/components/hato/HatoFooter";
import { JsonLd } from "@/components/JsonLd";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { FOOTER_QUERY, type SanityFooter } from "@/sanity/queries/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://hato.guaicaramo.com"),
  title: "Hato Guaicaramo · Genética de talla mundial para el trópico",
  description:
    "Empresa ganadera especializada en genética de talla mundial y sistemas eficientes de producción animal para el trópico. Maní, Casanare.",
  keywords: [
    "genética bovina Colombia",
    "hato ganadero",
    "Guaicaramo",
    "hacienda ganadera Casanare",
    "Nelore CIA ciclo corto",
    "búfalos Colombia",
    "nutrición animal trópico",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://hato.guaicaramo.com",
    siteName: "Hato Guaicaramo",
    title: "Hato Guaicaramo · Genética de talla mundial para el trópico",
    description:
      "Empresa ganadera especializada en genética de talla mundial y sistemas eficientes de producción animal para el trópico. Maní, Casanare.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hato Guaicaramo — Genética de talla mundial para el trópico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hato Guaicaramo · Genética de talla mundial para el trópico",
    description:
      "Empresa ganadera especializada en genética de talla mundial y sistemas eficientes de producción animal para el trópico.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // Reemplazar con el código real de Google Search Console al verificar la propiedad
  verification: {
    google: "",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { data } = await sanityFetch({ query: FOOTER_QUERY });
  const footerData = data as SanityFooter | null;

  return (
    <html lang="es-CO">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Hato Guaicaramo",
            url: "https://hato.guaicaramo.com",
            logo: "https://hato.guaicaramo.com/assets/logo/logo-hato.png",
            description:
              "Hacienda ganadera colombiana especializada en genética de talla mundial y sistemas eficientes de producción animal para el trópico.",
            address: {
              "@type": "PostalAddress",
              addressCountry: "CO",
              addressRegion: "Casanare",
              addressLocality: "Maní",
            },
            sameAs: [],
          }}
        />
        <HatoHeaderWrapper />
        {children}
        <HatoFooter sanityData={footerData} />
        <SanityLive />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import QuienesSomos from "@/components/hato/QuienesSomos";
import { sanityFetch } from "@/sanity/lib/live";
import { QUIENES_SOMOS_QUERY, type SanityQuienesSomos } from "@/sanity/queries/quienesSomos";

export const metadata: Metadata = {
  title: "Quiénes Somos · Hato Guaicaramo",
  description:
    "Conoce la historia, el equipo y la filosofía detrás del Hato Guaicaramo: una empresa ganadera familiar comprometida con la genética y la producción sostenible en los Llanos Orientales de Colombia.",
};

export default async function QuienesSomosPage() {
  const { data } = await sanityFetch({ query: QUIENES_SOMOS_QUERY });
  const sanityData = data as SanityQuienesSomos | null;

  return (
    <div data-screen-label="Quiénes Somos · Hato Guaicaramo">
      <main style={{ paddingTop: 0 }}>
        <QuienesSomos sanityData={sanityData} />
      </main>
    </div>
  );
}

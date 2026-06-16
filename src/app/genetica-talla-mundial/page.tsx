import type { Metadata } from "next";
import GeneticaTalla from "@/components/hato/GeneticaTalla";
import { sanityFetch } from "@/sanity/lib/live";
import { GENETICA_TALLA_PAGE_QUERY } from "@/sanity/queries/geneticaTallaPage";
import type { SanityGeneticaTallaPage } from "@/sanity/queries/geneticaTallaPage";

export const metadata: Metadata = {
  title: "Genética de Talla Mundial · Hato Guaicaramo",
  description: "Invertimos en genética que reduce los ciclos de producción y acelera los resultados. Programa Nelore CIA Ciclo Corto.",
};

export default async function GeneticaTallaMundialPage() {
  const { data } = await sanityFetch({ query: GENETICA_TALLA_PAGE_QUERY });
  const sanityData = data as SanityGeneticaTallaPage | null;
  return (
    <div data-screen-label="Genética de Talla Mundial · Hato Guaicaramo">
      <main style={{ paddingTop: 0 }}>
        <GeneticaTalla sanityData={sanityData} />
      </main>
    </div>
  );
}

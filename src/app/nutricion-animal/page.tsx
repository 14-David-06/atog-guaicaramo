import type { Metadata } from "next";
import NutricionAnimal from "@/components/hato/NutricionAnimal";
import { sanityFetch } from "@/sanity/lib/live";
import { NUTRICION_ANIMAL_PAGE_QUERY } from "@/sanity/queries/nutricionAnimalPage";
import type { SanityNutricionAnimalPage } from "@/sanity/queries/nutricionAnimalPage";

export const metadata: Metadata = {
  title: "Nutrición Animal · Hato Guaicaramo",
  description: "Nuestra fábrica de nutrición animal: sal proteinada y pastos Brachiaria humidicola. Aquí no formulamos productos — diseñamos resultados.",
};

export default async function NutricionAnimalPage() {
  const { data } = await sanityFetch({ query: NUTRICION_ANIMAL_PAGE_QUERY });
  const sanityData = data as SanityNutricionAnimalPage | null;
  return (
    <div data-screen-label="Nutrición Animal · Hato Guaicaramo">
      <main style={{ paddingTop: 0 }}>
        <NutricionAnimal sanityData={sanityData} />
      </main>
    </div>
  );
}

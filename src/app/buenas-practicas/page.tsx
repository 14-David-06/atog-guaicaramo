import type { Metadata } from "next";
import BuenasPracticasPage from "@/components/hato/BuenasPracticasPage";
import { sanityFetch } from "@/sanity/lib/live";
import { BUENAS_PRACTICAS_PAGE_QUERY, type SanityBuenasPracticasPage } from "@/sanity/queries/buenasPracticasPage";

export const metadata: Metadata = {
  title: "Nuestras Buenas Prácticas · Hato Guaicaramo",
  description: "Cuatro prácticas que sostienen la productividad, la salud y la sostenibilidad del hato: pastoreo rotacional, riegos, vacunación e inseminación.",
};

export default async function BuenasPracticasRoute() {
  const { data } = await sanityFetch({ query: BUENAS_PRACTICAS_PAGE_QUERY });
  const sanityData = data as SanityBuenasPracticasPage | null;

  return (
    <div data-screen-label="Buenas Prácticas · Hato Guaicaramo">
      <main style={{ paddingTop: 0 }}>
        <BuenasPracticasPage sanityData={sanityData} />
      </main>
    </div>
  );
}

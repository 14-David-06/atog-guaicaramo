import type { Metadata } from "next";
import NuestrosBufalos from "@/components/hato/NuestrosBufalos";
import { sanityFetch } from "@/sanity/lib/live";
import { NUESTROS_BUFALOS_PAGE_QUERY } from "@/sanity/queries/nuestrosBufalosPage";
import type { SanityNuestrosBufalosPage } from "@/sanity/queries/nuestrosBufalosPage";

export const metadata: Metadata = {
  title: "Nuestros Búfalos · Hato Guaicaramo",
  description: "No trabajamos el búfalo como una especie más. Lo integramos como un sistema productivo real: carne, leche y trabajo.",
};

export default async function NuestrosBufalosPage() {
  const { data } = await sanityFetch({ query: NUESTROS_BUFALOS_PAGE_QUERY });
  const sanityData = data as SanityNuestrosBufalosPage | null;
  return (
    <div data-screen-label="Nuestros Búfalos · Hato Guaicaramo">
      <main style={{ paddingTop: 0 }}>
        <NuestrosBufalos sanityData={sanityData} />
      </main>
    </div>
  );
}

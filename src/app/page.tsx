import HatoHero from "@/components/hato/HatoHero";
import BuenasPracticas from "@/components/hato/BuenasPracticas";
import Genetica from "@/components/hato/Genetica";
import Bufalos from "@/components/hato/Bufalos";
import Sellos from "@/components/hato/Sellos";
import Testimoniales from "@/components/hato/Testimoniales";
import { sanityFetch } from "@/sanity/lib/live";
import { TESTIMONIALS_QUERY, type SanityTestimonial } from "@/sanity/queries/testimonials";

export default async function HomePage() {
  const { data } = await sanityFetch({ query: TESTIMONIALS_QUERY });
  const testimoniales = data as SanityTestimonial[] | null;

  return (
    <div data-screen-label="Hato Guaicaramo · Web">
      <HatoHero />
      <BuenasPracticas />
      <Genetica />
      <Bufalos />
      <Sellos />
      <Testimoniales sanityItems={testimoniales ?? []} />
    </div>
  );
}

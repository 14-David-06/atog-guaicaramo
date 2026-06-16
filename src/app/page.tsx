import HatoHero from "@/components/hato/HatoHero";
import BuenasPracticas from "@/components/hato/BuenasPracticas";
import Genetica from "@/components/hato/Genetica";
import Bufalos from "@/components/hato/Bufalos";
import Sellos from "@/components/hato/Sellos";
import Testimoniales from "@/components/hato/Testimoniales";
import { sanityFetch } from "@/sanity/lib/live";
import { TESTIMONIALS_QUERY, type SanityTestimonial } from "@/sanity/queries/testimonials";
import { HERO_SLIDES_QUERY, type SanityHeroSlide } from "@/sanity/queries/heroSlides";
import { SELLOS_QUERY, type SanitySello } from "@/sanity/queries/sellos";
import { BUENAS_PRACTICAS_QUERY, type SanityBuenaPractica } from "@/sanity/queries/buenasPracticas";
import { SECCIONES_DESTACADAS_QUERY, type SanitySeccionDestacada } from "@/sanity/queries/seccionesDestacadas";

export default async function HomePage() {
  const [testimonialesRes, heroRes, sellosRes, practicasRes, seccionesRes] = await Promise.all([
    sanityFetch({ query: TESTIMONIALS_QUERY }),
    sanityFetch({ query: HERO_SLIDES_QUERY }),
    sanityFetch({ query: SELLOS_QUERY }),
    sanityFetch({ query: BUENAS_PRACTICAS_QUERY }),
    sanityFetch({ query: SECCIONES_DESTACADAS_QUERY }),
  ]);

  const testimoniales = testimonialesRes.data as SanityTestimonial[] | null;
  const heroSlides    = heroRes.data as SanityHeroSlide[] | null;
  const sellos        = sellosRes.data as SanitySello[] | null;
  const practicas     = practicasRes.data as SanityBuenaPractica[] | null;
  const secciones     = (seccionesRes.data as SanitySeccionDestacada[] | null) ?? [];

  const secGenetica = secciones.find(s => s.slug === "genetica");
  const secBufalos  = secciones.find(s => s.slug === "bufalos");

  return (
    <div data-screen-label="Hato Guaicaramo · Web">
      <HatoHero sanitySlides={heroSlides ?? []} />
      <BuenasPracticas sanityPractices={practicas ?? []} />
      <Genetica sanityData={secGenetica} />
      <Bufalos sanityData={secBufalos} />
      <Sellos sanitySellos={sellos ?? []} />
      <Testimoniales sanityItems={testimoniales ?? []} />
    </div>
  );
}

export const GENETICA_TALLA_PAGE_QUERY = `
  *[_type == "geneticaTallaPage" && _id == "genetica-talla-page"][0] {
    "heroImageUrl": heroImage.asset->url,
    heroEyebrow,
    heroTitle1,
    heroTitle2,
    heroDescription,
    enfoqueLabel,
    enfoqueHeading1,
    enfoqueHeading2,
    enfoqueBody,
    enfoquePillars[] { title, description, icon },
    "toro01PhotoUrl": toro01Photo.asset->url,
    toro01Badge,
    toro01Subtitle,
    toro01Heading,
    toro01Body,
    cesugBody,
    "toro02PhotoUrl": toro02Photo.asset->url,
    toro02Badge,
    toro02Heading,
    toro02Body,
    portafolioLabel,
    portafolioHeading,
    portafolioBody,
    portafolioItems[] { title, description, icon },
    biotecHeading1,
    biotecHeading2,
    biotecBody,
    biotecLogicaNote,
    biotecLogica,
    biotecIciagenNote,
    "biotecLabPhotoUrl": biotecLabPhoto.asset->url,
    manifestIntro,
    manifestLine1,
    manifestLine2,
    manifestLine3,
    ctaHeading,
  }
`

export type SanityPillar = { title: string; description: string; icon: string }
export type SanityPortItem = { title: string; description: string; icon: string }

export type SanityGeneticaTallaPage = {
  heroImageUrl: string | null
  heroEyebrow: string
  heroTitle1: string
  heroTitle2: string
  heroDescription: string
  enfoqueLabel: string
  enfoqueHeading1: string
  enfoqueHeading2: string
  enfoqueBody: string
  enfoquePillars: SanityPillar[] | null
  toro01PhotoUrl: string | null
  toro01Badge: string
  toro01Subtitle: string
  toro01Heading: string
  toro01Body: string
  cesugBody: string
  toro02PhotoUrl: string | null
  toro02Badge: string
  toro02Heading: string
  toro02Body: string
  portafolioLabel: string
  portafolioHeading: string
  portafolioBody: string
  portafolioItems: SanityPortItem[] | null
  biotecHeading1: string
  biotecHeading2: string
  biotecBody: string
  biotecLogicaNote: string
  biotecLogica: string[] | null
  biotecIciagenNote: string
  biotecLabPhotoUrl: string | null
  manifestIntro: string
  manifestLine1: string
  manifestLine2: string
  manifestLine3: string
  ctaHeading: string
}

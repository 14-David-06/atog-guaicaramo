export const NUTRICION_ANIMAL_PAGE_QUERY = `
  *[_type == "nutricionAnimalPage" && _id == "nutricion-animal-page"][0] {
    heroTitle,
    heroTitleEm,
    heroSubtitle,
    fabricaLabel,
    fabricaLine1,
    fabricaLine2,
    fabricaLine3,
    fabricaBody,
    "fabricaPhotoUrl": fabricaPhoto.asset->url,
    fabricaVideoUrl,
    fabricaStats[] { label, value },
    manifestoLine1,
    manifestoLine2,
    manifestoBody,
    salBody1,
    salBody2,
    salIngredients[] { key, desc, icon },
    "salPdfUrl": salPdf.asset->url,
    pastosBody,
    pastosRegimes[] { kind, grazing, rest },
    pastosStats[] { label, value },
  }
`

export type SanityNAStat     = { label: string; value: string }
export type SanityNAIngredient = { key: string; desc: string; icon: string }
export type SanityNARegime   = { kind: string; grazing: string; rest: string }

export type SanityNutricionAnimalPage = {
  heroTitle: string
  heroTitleEm: string
  heroSubtitle: string
  fabricaLabel: string
  fabricaLine1: string
  fabricaLine2: string
  fabricaLine3: string
  fabricaBody: string
  fabricaPhotoUrl: string | null
  fabricaVideoUrl: string | null
  fabricaStats: SanityNAStat[] | null
  manifestoLine1: string
  manifestoLine2: string
  manifestoBody: string
  salBody1: string
  salBody2: string
  salIngredients: SanityNAIngredient[] | null
  salPdfUrl: string | null
  pastosBody: string
  pastosRegimes: SanityNARegime[] | null
  pastosStats: SanityNAStat[] | null
}

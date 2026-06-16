export const NUESTROS_BUFALOS_PAGE_QUERY = `
  *[_type == "nuestrosBufalosPage" && _id == "nuestros-bufalos-page"][0] {
    "heroImageUrl": heroImage.asset->url,
    heroEyebrow,
    heroTitle1,
    heroTitle2,
    heroDescription,
    sistemaLabel,
    sistemaHeading1,
    sistemaHeading2,
    sistemaPillars[] { title, description, icon },
    sistemaBody,
    pilaresIndex[] { num, title, desc },
    "trabajoPhotoUrl": trabajoPhoto.asset->url,
    trabajoSubtitle,
    trabajoHeading,
    trabajoBody,
    trabajoTraits[] { key, desc, pct },
    "lechePhotoUrl": lechePhoto.asset->url,
    lecheHeading,
    lecheDescription,
    lecheStats[] { numValue, numSuffix, numSep, label, sublabel },
    "carnePhotoUrl": carnePhoto.asset->url,
    carneHeading,
    carneBody,
    carneChips,
    carneLinea[] { key, desc, pct },
    ctaHeading,
  }
`

export type SanityNBPillar  = { title: string; description: string; icon: string }
export type SanityNBIndex   = { num: string; title: string; desc: string }
export type SanityNBTrait   = { key: string; desc: string; pct: number }
export type SanityNBStat    = { numValue: number; numSuffix: string | null; numSep: boolean | null; label: string; sublabel: string }
export type SanityNBLinea   = { key: string; desc: string; pct: number }

export type SanityNuestrosBufalosPage = {
  heroImageUrl: string | null
  heroEyebrow: string
  heroTitle1: string
  heroTitle2: string
  heroDescription: string
  sistemaLabel: string
  sistemaHeading1: string
  sistemaHeading2: string
  sistemaPillars: SanityNBPillar[] | null
  sistemaBody: string
  pilaresIndex: SanityNBIndex[] | null
  trabajoPhotoUrl: string | null
  trabajoSubtitle: string
  trabajoHeading: string
  trabajoBody: string
  trabajoTraits: SanityNBTrait[] | null
  lechePhotoUrl: string | null
  lecheHeading: string
  lecheDescription: string
  lecheStats: SanityNBStat[] | null
  carnePhotoUrl: string | null
  carneHeading: string
  carneBody: string
  carneChips: string[] | null
  carneLinea: SanityNBLinea[] | null
  ctaHeading: string
}

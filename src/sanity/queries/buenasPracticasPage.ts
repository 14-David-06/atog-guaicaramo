export const BUENAS_PRACTICAS_PAGE_QUERY = `
  *[_type == "buenasPracticasPage" && _id == "buenas-practicas-page"][0] {
    "heroVideoUrl": heroVideo.asset->url,
    heroEyebrow,
    heroTitle1,
    heroTitle2,
    heroDescription,
    introLabel,
    introHeading1,
    introHeading2,
    introBody,
    practices[] {
      num,
      tag,
      title,
      lead,
      chips,
      note,
      "photoUrl": photo.asset->url,
    },
    ctaHeading,
  }
`

export type SanityBPPractice = {
  num: string
  tag: string
  title: string
  lead: string
  chips: string[]
  note: string
  photoUrl: string | null
}

export type SanityBuenasPracticasPage = {
  heroVideoUrl: string | null
  heroEyebrow: string
  heroTitle1: string
  heroTitle2: string
  heroDescription: string
  introLabel: string
  introHeading1: string
  introHeading2: string
  introBody: string
  practices: SanityBPPractice[] | null
  ctaHeading: string
}

import type { PortableTextBlock } from '@portabletext/react'

export const SECCIONES_DESTACADAS_QUERY = `
  *[_type == "seccionDestacada" && slug in ["genetica", "bufalos"]] {
    slug,
    title,
    titleItalic,
    "photoUrl": photo.asset->url,
    body,
    stats,
    ctaLabel,
    ctaHref
  }
`

export type SanityStat = {
  val: string
  label: string
  icon: string
}

export type SanitySeccionDestacada = {
  slug: string
  title: string
  titleItalic: string
  photoUrl: string
  body: PortableTextBlock[]
  stats: SanityStat[]
  ctaLabel: string
  ctaHref: string
}

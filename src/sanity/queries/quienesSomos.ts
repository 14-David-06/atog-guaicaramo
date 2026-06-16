import type { PortableTextBlock } from '@portabletext/react'

export const QUIENES_SOMOS_QUERY = `
  *[_type == "quienesSomos" && _id == "quienes-somos"][0] {
    introTitle,
    introTitleItalic,
    introSubtitle,
    "introImageUrl": introImage.asset->url,
    introVideoUrl,
    qsHeading,
    qsHeadingItalic,
    qsBody,
    misionText,
    visionText,
    valores[] { num, title, desc },
    quote,
    quoteHighlight,
  }
`

export type SanityValor = {
  num: string
  title: string
  desc: string
}

export type SanityQuienesSomos = {
  introTitle: string
  introTitleItalic: string
  introSubtitle: string
  introImageUrl: string | null
  introVideoUrl: string | null
  qsHeading: string
  qsHeadingItalic: string
  qsBody: PortableTextBlock[] | null
  misionText: string
  visionText: string
  valores: SanityValor[] | null
  quote: string
  quoteHighlight: string | null
}

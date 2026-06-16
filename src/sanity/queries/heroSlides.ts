import type { PortableTextBlock } from '@portabletext/react'

export const HERO_SLIDES_QUERY = `
  *[_type == "heroSlide"] | order(order asc) {
    _id,
    label,
    "photoUrl": photo.asset->url,
    copy,
    order
  }
`

export type SanityHeroSlide = {
  _id: string
  label: string
  photoUrl: string
  copy: PortableTextBlock[]
  order: number
}

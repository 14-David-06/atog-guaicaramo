import type { PortableTextBlock } from '@portabletext/react'

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(date desc) {
    _id,
    name,
    date,
    body,
    "photoUrl": photo.asset->url,
    grad,
    instagramUrl
  }
`

export type SanityTestimonial = {
  _id: string
  name: string
  date: string
  body: PortableTextBlock[]
  photoUrl: string | null
  grad: string | null
  instagramUrl: string
}

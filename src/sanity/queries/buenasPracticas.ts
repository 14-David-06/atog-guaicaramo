export const BUENAS_PRACTICAS_QUERY = `
  *[_type == "buenaPractica"] | order(order asc) {
    _id,
    title,
    "photoUrl": photo.asset->url,
    anchor,
    order
  }
`

export type SanityBuenaPractica = {
  _id: string
  title: string
  photoUrl: string
  anchor: string
  order: number
}

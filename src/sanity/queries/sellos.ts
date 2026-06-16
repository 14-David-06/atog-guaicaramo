export const SELLOS_QUERY = `
  *[_type == "sello"] | order(order asc) {
    _id,
    name,
    "logoUrl": logo.asset->url,
    order
  }
`

export type SanitySello = {
  _id: string
  name: string
  logoUrl: string
  order: number
}

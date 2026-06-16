export const FOOTER_QUERY = `
  *[_type == "footer" && _id == "footer"][0] {
    heading,
    description,
    address,
    phone,
    email,
    instagramUrl,
    tiktokUrl,
    facebookUrl,
    "footerImageUrl": footerImage.asset->url,
    privacyPolicyUrl,
    "dataProtectionFileUrl": dataProtectionFile.asset->url
  }
`

export type SanityFooter = {
  heading: string
  description: string
  address: string
  phone: string
  email: string
  instagramUrl: string | null
  tiktokUrl: string | null
  facebookUrl: string | null
  footerImageUrl: string | null
  privacyPolicyUrl: string | null
  dataProtectionFileUrl: string | null
}

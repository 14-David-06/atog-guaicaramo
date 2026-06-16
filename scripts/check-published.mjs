import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-11',
  token: process.env.SANITY_API_DEV_TOKEN,
  useCdn: false,
})

const docs = await client.fetch(
  '*[_type in ["seccionDestacada","heroSlide","sello","buenaPractica","testimonial"]] | order(_type asc) { _id, _type }'
)
console.log(`\nDocumentos publicados: ${docs.length}\n`)
docs.forEach(d => console.log(`  ${d._type.padEnd(20)} ${d._id}`))

const drafts = await client.fetch(
  '*[_id in path("drafts.**") && _type in ["seccionDestacada","heroSlide","sello","buenaPractica","testimonial"]] { _id, _type }'
)
console.log(`\nBorradores: ${drafts.length}`)
drafts.forEach(d => console.log(`  ${d._type.padEnd(20)} ${d._id}`))

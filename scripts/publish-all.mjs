/**
 * Publica todos los borradores de los tipos migrados a Sanity.
 * Ejecutar:
 *   node --env-file=.env.local scripts/publish-all.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-11',
  token: process.env.SANITY_API_DEV_TOKEN,
  useCdn: false,
})

const TYPES = ['heroSlide', 'sello', 'buenaPractica', 'seccionDestacada', 'testimonial']

async function run() {
  // Obtener todos los borradores de los tipos migrados
  const drafts = await client.fetch(
    `*[_id in path("drafts.**") && _type in $types]{ _id, _type }`,
    { types: TYPES }
  )

  if (drafts.length === 0) {
    console.log('✅  No hay borradores pendientes — todos los documentos ya están publicados.')
    return
  }

  console.log(`\n📄  Publicando ${drafts.length} borrador(es)…\n`)

  for (const draft of drafts) {
    const publishedId = draft._id.replace(/^drafts\./, '')
    process.stdout.write(`  ${draft._type} · ${publishedId}… `)

    // Obtener el contenido completo del borrador
    const draftDoc = await client.getDocument(draft._id)
    if (!draftDoc) { console.log('⚠️  vacío, omitido'); continue }

    // Publicar: guardar como documento sin prefijo "drafts."
    const { _id, _rev, _updatedAt, _createdAt, ...content } = draftDoc
    await client.transaction()
      .createOrReplace({ _id: publishedId, ...content })
      .delete(draft._id)
      .commit()

    console.log('✓')
  }

  console.log('\n✅  Todo publicado.\n')
}

run().catch(err => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})

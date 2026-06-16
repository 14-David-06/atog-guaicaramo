/**
 * Sube el video de fondo del hero de Buenas Prácticas a Sanity
 * y parchea el documento existente.
 *   node --env-file=.env.local scripts/upload-bp-video.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC = path.resolve(__dirname, '..', 'public')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-11',
  token: process.env.SANITY_API_DEV_TOKEN,
  useCdn: false,
})

async function run() {
  if (!process.env.SANITY_API_DEV_TOKEN) {
    console.error('❌  Falta SANITY_API_DEV_TOKEN en .env.local')
    process.exit(1)
  }

  const videoPath = path.resolve(PUBLIC, 'assets/videos/IMG_2292.MOV')
  if (!fs.existsSync(videoPath)) {
    console.error('❌  No se encontró el archivo:', videoPath)
    process.exit(1)
  }

  const sizeMB = (fs.statSync(videoPath).size / 1024 / 1024).toFixed(1)
  console.log(`\n🎬  Subiendo video (${sizeMB} MB)… esto puede tardar unos segundos.\n`)

  const stream = fs.createReadStream(videoPath)
  const asset = await client.assets.upload('file', stream, {
    filename: 'IMG_2292.MOV',
    contentType: 'video/mp4',
  })
  console.log(`  Asset creado: ${asset._id}`)

  process.stdout.write('  Parcheando documento buenas-practicas-page… ')
  await client
    .patch('buenas-practicas-page')
    .set({
      heroVideo: { _type: 'file', asset: { _type: 'reference', _ref: asset._id } },
    })
    .commit()
  console.log('✓')

  console.log('\n✅  Video subido y vinculado al documento.\n')
}

run().catch(err => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})

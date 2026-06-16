/**
 * Migración one-shot: crea el footer singleton en Sanity con fotos y PDF.
 * Ejecutar UNA sola vez:
 *   node --env-file=.env.local scripts/migrate-footer.mjs
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

async function uploadAsset(relativePath, type = 'image') {
  const fullPath = path.resolve(PUBLIC, relativePath)
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠️  No existe: ${fullPath}`)
    return null
  }
  const filename = path.basename(fullPath)
  const ext = path.extname(filename).slice(1).toLowerCase()
  const contentType =
    type === 'file'
      ? 'application/pdf'
      : ['jpg', 'jpeg'].includes(ext) ? 'image/jpeg' : 'image/png'
  const stream = fs.createReadStream(fullPath)
  const asset = await client.assets.upload(type, stream, { filename, contentType })
  return { _type: type === 'file' ? 'file' : 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function run() {
  if (!process.env.SANITY_API_DEV_TOKEN) {
    console.error('❌  Falta SANITY_API_DEV_TOKEN en .env.local')
    process.exit(1)
  }

  console.log('\n🦶  Footer / Contacto\n')

  process.stdout.write('  Subiendo foto manada… ')
  const footerImage = await uploadAsset('assets/photography/manada-footer.jpg')
  console.log(footerImage ? '✓' : 'omitida')

  process.stdout.write('  Subiendo PDF política de datos… ')
  const dataProtectionFile = await uploadAsset(
    'assets/pdf/POLITICA_DE_TRATAMIENTO_DE_DATOS_PERSONALES.pdf',
    'file'
  )
  console.log(dataProtectionFile ? '✓' : 'omitido')

  const doc = {
    _id: 'footer',
    _type: 'footer',
    heading: 'Tu éxito comienza aquí',
    description:
      'Si quieres conocer más sobre nuestros sistemas, animales o proyectos, estamos listos para responder y acompañarte.\nHablemos y construyamos juntos.',
    address: 'Kilómetro 7 Vía Barranca de Upía – Cabuyaro\nManí, Casanare',
    phone: '+57 312 401 25 10',
    email: 'comunicaciones@guaicaramo.com',
    instagramUrl: 'https://www.instagram.com/hatoguaicaramo',
    tiktokUrl: 'https://www.tiktok.com/@hato.guaicaramo',
    facebookUrl: 'https://www.facebook.com/share/18KDMautQH/',
    privacyPolicyUrl: '#aviso-privacidad',
    ...(footerImage        && { footerImage }),
    ...(dataProtectionFile && { dataProtectionFile }),
  }

  process.stdout.write('  Creando documento footer… ')
  const result = await client.createOrReplace(doc)
  console.log(`✓  ${result._id}`)

  console.log('\n✅  Footer migrado y publicado.\n')
}

run().catch(err => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})

/**
 * Migración one-shot: sube las secciones Genética y Búfalos a Sanity.
 * Ejecutar UNA sola vez:
 *   node --env-file=.env.local scripts/migrate-secciones-destacadas.mjs
 *
 * Usa IDs fijos (seccion-genetica / seccion-bufalos) para que el Studio
 * los trate como singletons editables.
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

const key = () => Math.random().toString(36).slice(2, 9)

function block(segments) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: segments.map(([text, mark = null]) => ({
      _type: 'span',
      _key: key(),
      text,
      marks: mark ? [mark] : [],
    })),
  }
}

async function uploadImage(relativePath) {
  const fullPath = path.resolve(PUBLIC, relativePath)
  if (!fs.existsSync(fullPath)) {
    console.warn(`\n  ⚠️  No existe: ${fullPath}`)
    return null
  }
  const filename = path.basename(fullPath)
  const ext = path.extname(filename).slice(1).toLowerCase()
  const contentType = ['jpg', 'jpeg'].includes(ext) ? 'image/jpeg' : 'image/png'
  const stream = fs.createReadStream(fullPath)
  const asset = await client.assets.upload('image', stream, { filename, contentType })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

const secciones = [
  {
    _id: 'seccion-genetica',
    _type: 'seccionDestacada',
    slug: 'genetica',
    title: 'Nelore CIA',
    titleItalic: 'Ciclo Corto',
    photoPath: 'assets/photography/nelore-novo.jpg',
    body: [
      block([
        ['Invertimos en '],
        ['genética de talla mundial', 'strong'],
        [' que '],
        ['reduce los ciclos de producción', 'strong'],
        [' y acelera los resultados. Trabajamos bajo el '],
        ['programa CIA', 'strong'],
        [', el estándar más exigente de la ganadería tropical.'],
      ]),
    ],
    stats: [
      { _key: key(), val: '18m',  label: 'Ciclo de producción',    icon: 'trending-down' },
      { _key: key(), val: '+30%', label: 'Ganancia de peso diaria', icon: 'trending-up'   },
      { _key: key(), val: 'CIA',  label: 'Programa certificado',    icon: 'award'         },
    ],
    ctaLabel: 'Ver más',
    ctaHref: '/genetica-talla-mundial',
  },
  {
    _id: 'seccion-bufalos',
    _type: 'seccionDestacada',
    slug: 'bufalos',
    title: 'Nuestros',
    titleItalic: 'Búfalos',
    photoPath: 'assets/photography/bufalos-hato-pastura.jpg',
    body: [
      block([
        ['Producimos '],
        ['carne y leche', 'strong'],
        [' con una lógica clara: genética que funciona, nutrición que sostiene el sistema y manejo que mantiene la '],
        ['producción estable todo el año', 'strong'],
        ['.'],
      ]),
    ],
    stats: [
      { _key: key(), val: '950+', label: 'Búfalas ordeñadas', icon: 'droplets'   },
      { _key: key(), val: '4.5k', label: 'Litros diarios',    icon: 'trending-up' },
      { _key: key(), val: '2×',   label: 'Ordeño por día',    icon: 'repeat'      },
    ],
    ctaLabel: 'Ver más',
    ctaHref: '/nuestros-bufalos',
  },
]

async function run() {
  if (!process.env.SANITY_API_DEV_TOKEN) {
    console.error('❌  Falta SANITY_API_DEV_TOKEN en .env.local')
    process.exit(1)
  }

  console.log('\n📋  Secciones destacadas (2)\n')

  for (const sec of secciones) {
    process.stdout.write(`  ${sec.title} ${sec.titleItalic}… `)
    const photo = await uploadImage(sec.photoPath)
    const { photoPath: _, ...rest } = sec

    // createOrReplace para respetar el _id fijo (singleton)
    const result = await client.createOrReplace(photo ? { ...rest, photo } : rest)
    console.log(`✓  ${result._id}`)
  }

  console.log('\n✅  Listo.')
  console.log('   → Ve a /studio → "Genética" y "Búfalos" → publica cada uno.\n')
}

run().catch(err => {
  if (err.statusCode === 403) {
    console.error('\n❌  Token sin permisos de escritura.')
    console.error('   Genera un token "Editor" en: sanity.io/manage → API → Tokens\n')
  } else {
    console.error('\n❌  Error:', err.message)
  }
  process.exit(1)
})

/**
 * Migración one-shot: sube Hero Slides, Sellos y Buenas Prácticas a Sanity.
 * Ejecutar UNA sola vez:
 *   node --env-file=.env.local scripts/migrate-home-content.mjs
 *
 * Requiere token con permisos de escritura (Editor).
 * Si el token actual es de solo lectura, genera uno nuevo en:
 *   sanity.io/manage → proyecto → API → Tokens → Add API token → Editor
 * y reemplaza SANITY_API_DEV_TOKEN en .env.local.
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

/** Key aleatoria para nodos de Portable Text */
const key = () => Math.random().toString(36).slice(2, 9)

/**
 * Bloque de Portable Text a partir de segmentos.
 * Cada segmento: [texto, mark?]  — mark puede ser 'em' | 'strong' | null
 */
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

/** Sube una imagen local a Sanity y devuelve el campo image listo para usar */
async function uploadImage(relativePath) {
  const fullPath = path.resolve(PUBLIC, relativePath)
  if (!fs.existsSync(fullPath)) {
    console.warn(`\n  ⚠️  No existe: ${fullPath} — campo photo/logo quedará vacío`)
    return null
  }
  const filename = path.basename(fullPath)
  const ext = path.extname(filename).slice(1).toLowerCase()
  const contentType = ['jpg', 'jpeg'].includes(ext)
    ? 'image/jpeg'
    : ext === 'png'
    ? 'image/png'
    : 'application/octet-stream'
  const stream = fs.createReadStream(fullPath)
  const asset = await client.assets.upload('image', stream, { filename, contentType })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

// ─── Datos ───────────────────────────────────────────────────────────────────

const heroSlides = [
  {
    _type: 'heroSlide',
    label: 'Nelore CIA · ganado para el trópico',
    order: 0,
    photoPath: 'assets/photography/hero-nelore-grupo.jpg',
    copy: [
      block([
        ['Somos una empresa ganadera especializada en '],
        ['genética de talla mundial', 'em'],
        [' y en la creación de sistemas de producción bovina para el trópico.'],
      ]),
    ],
  },
  {
    _type: 'heroSlide',
    label: 'El campo y la ciencia unidos',
    order: 1,
    photoPath: 'assets/photography/hero-nelore-llanero.jpg',
    copy: [
      block([['En Hato Guaicaramo no trabajamos los vacunos y búfalos como unas especies más.']]),
      block([['Lo integramos como un sistema productivo real.', 'em']]),
    ],
  },
  {
    _type: 'heroSlide',
    label: 'Búfalos Mediterráneos',
    order: 2,
    photoPath: 'assets/photography/hero-bufalos-caras.jpg',
    copy: [
      block([['Aquí no formulamos productos.']]),
      block([['Diseñamos resultados.', 'em']]),
    ],
  },
  {
    _type: 'heroSlide',
    label: 'Hato bufalino Guaicaramo',
    order: 3,
    photoPath: 'assets/photography/hero-bufalos-manada.jpg',
    copy: [
      block([['Aquí la producción no se deja al azar.']]),
      block([['Se controla. Se sostiene. Se construye.', 'em']]),
    ],
  },
]

const sellos = [
  { name: 'CIA Melhoramento', order: 0, logoPath: 'assets/certificados/cia-melhoramento.png' },
  { name: '100% Precoce',     order: 1, logoPath: 'assets/certificados/100-precoce.png' },
  { name: '100% Genômica',    order: 2, logoPath: 'assets/certificados/100-genomica.png' },
  { name: 'CESUG',            order: 3, logoPath: 'assets/certificados/cesug.png' },
  { name: 'USDA Organic',     order: 4, logoPath: 'assets/certificados/usda-organic.png' },
]

const practicas = [
  { title: 'Pastoreo rotacional',          anchor: 'bp-01', order: 0, photoPath: 'assets/photography/pastoreo-vaquero.png' },
  { title: 'Riegos',                       anchor: 'bp-02', order: 1, photoPath: 'assets/photography/riego-carrete.png' },
  { title: 'Vacunación y desparasitación', anchor: 'bp-03', order: 2, photoPath: 'assets/photography/vacunacion.PNG' },
  { title: 'Inseminación artificial',      anchor: 'bp-04', order: 3, photoPath: 'assets/illustrations/inseminacion-embriones.png' },
]

// ─── Ejecución ────────────────────────────────────────────────────────────────

async function run() {
  if (!process.env.SANITY_API_DEV_TOKEN) {
    console.error('❌  Falta SANITY_API_DEV_TOKEN en .env.local')
    process.exit(1)
  }

  // Verificar que el token puede escribir con una llamada mínima
  try {
    await client.fetch('*[false][0]')
  } catch {
    console.error('❌  No se puede conectar con el token actual. Verifica permisos.')
    process.exit(1)
  }

  // ── Hero Slides ──
  console.log('\n🖼️   Hero Slides (4)')
  for (const slide of heroSlides) {
    process.stdout.write(`  ${slide.label}… `)
    const photo = await uploadImage(slide.photoPath)
    const { photoPath: _p, ...rest } = slide
    const result = await client.create(photo ? { ...rest, photo } : rest)
    console.log(`✓  ${result._id}`)
  }

  // ── Sellos ──
  console.log('\n🏅  Sellos (5)')
  for (const s of sellos) {
    process.stdout.write(`  ${s.name}… `)
    const logo = await uploadImage(s.logoPath)
    const { logoPath: _l, ...rest } = s
    const result = await client.create(logo ? { _type: 'sello', ...rest, logo } : { _type: 'sello', ...rest })
    console.log(`✓  ${result._id}`)
  }

  // ── Buenas Prácticas ──
  console.log('\n🌿  Buenas Prácticas (4)')
  for (const p of practicas) {
    process.stdout.write(`  ${p.title}… `)
    const photo = await uploadImage(p.photoPath)
    const { photoPath: _pp, ...rest } = p
    const result = await client.create(photo ? { _type: 'buenaPractica', ...rest, photo } : { _type: 'buenaPractica', ...rest })
    console.log(`✓  ${result._id}`)
  }

  console.log('\n✅  Migración completa.')
  console.log('   → Ve a /studio y publica los documentos para que aparezcan en la web.\n')
}

run().catch(err => {
  if (err.statusCode === 403) {
    console.error('\n❌  Token sin permisos de escritura.')
    console.error('   Genera un token "Editor" en: sanity.io/manage → API → Tokens')
    console.error('   y actualiza SANITY_API_DEV_TOKEN en .env.local\n')
  } else {
    console.error('\n❌  Error:', err.message)
  }
  process.exit(1)
})

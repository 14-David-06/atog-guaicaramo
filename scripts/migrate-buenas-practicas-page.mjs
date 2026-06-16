/**
 * Migración one-shot: crea el documento singleton "buenas-practicas-page" en Sanity.
 * Ejecutar UNA sola vez:
 *   node --env-file=.env.local scripts/migrate-buenas-practicas-page.mjs
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

let keyCounter = 0
const uid = () => `k${++keyCounter}`

async function uploadPhoto(relativePath) {
  const fullPath = path.resolve(PUBLIC, relativePath)
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠️  No existe: ${fullPath}`)
    return null
  }
  const filename = path.basename(fullPath)
  const ext = path.extname(filename).slice(1).toLowerCase()
  const contentType = ['jpg', 'jpeg'].includes(ext) ? 'image/jpeg' : ext === 'png' ? 'image/png' : 'image/webp'
  const stream = fs.createReadStream(fullPath)
  const asset = await client.assets.upload('image', stream, { filename, contentType })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function run() {
  if (!process.env.SANITY_API_DEV_TOKEN) {
    console.error('❌  Falta SANITY_API_DEV_TOKEN en .env.local')
    process.exit(1)
  }

  console.log('\n📋  Buenas Prácticas — Página\n')

  // Subir fotos de cada práctica
  process.stdout.write('  Subiendo foto pastoreo… ')
  const photoPastoreo = await uploadPhoto('assets/photography/pastoreo-vaquero.png')
  console.log(photoPastoreo ? '✓' : 'omitida')

  process.stdout.write('  Subiendo foto riegos… ')
  const photoRiegos = await uploadPhoto('assets/photography/riego-carrete.png')
  console.log(photoRiegos ? '✓' : 'omitida')

  process.stdout.write('  Subiendo foto vacunación… ')
  const photoVacuna = await uploadPhoto('assets/photography/vacunacion.PNG')
  console.log(photoVacuna ? '✓' : 'omitida')

  process.stdout.write('  Subiendo foto inseminación… ')
  const photoInsem = await uploadPhoto('assets/photography/inseminacion-embriones.png')
  console.log(photoInsem ? '✓' : 'omitida')

  const doc = {
    _id: 'buenas-practicas-page',
    _type: 'buenasPracticasPage',

    // Hero
    heroEyebrow: 'Hato Guaicaramo · Manejo responsable',
    heroTitle1: 'Nuestras',
    heroTitle2: 'buenas prácticas.',
    heroDescription: 'Producir bien empieza por hacer las cosas bien. Cuatro prácticas que sostienen la productividad, la salud y la sostenibilidad del hato.',

    // Intro
    introLabel: 'El método',
    introHeading1: 'Cuatro frentes,',
    introHeading2: 'un mismo estándar.',
    introBody: 'Cada práctica se planifica, se mide y se ajusta. No son rutinas sueltas: forman un sistema que se sostiene entre sí.',

    // Prácticas
    practices: [
      {
        _type: 'object', _key: uid(),
        num: '01',
        tag: 'Manejo del forraje',
        title: 'Pastoreo rotacional',
        lead: 'El pastoreo es un instrumento estratégico: rotamos las praderas para mantener la calidad del forraje, mejorar la nutrición y optimizar la ganancia de peso.',
        chips: ['Praderas en rotación', 'Forraje de calidad', 'Más ganancia de peso'],
        note: 'Cada rotación está planificada, medida y ajustada según las necesidades de búfalos y Nelore — productividad y sostenibilidad.',
        ...(photoPastoreo && { photo: photoPastoreo }),
      },
      {
        _type: 'object', _key: uid(),
        num: '02',
        tag: 'Infraestructura productiva',
        title: 'Nuestros riegos',
        lead: 'El agua es infraestructura productiva. Nuestro sistema de riego mantiene la carga animal por hectárea estable durante todo el año.',
        chips: ['Carga animal estable', 'Producción todo el año', 'Leche confiable'],
        note: 'Una base hídrica que asegura producción de leche confiable y de alta calidad, sin importar la temporada.',
        ...(photoRiegos && { photo: photoRiegos }),
      },
      {
        _type: 'object', _key: uid(),
        num: '03',
        tag: 'Salud del hato',
        title: 'Vacunación y desparasitación',
        lead: 'Animales sanos producen más y viven mejor. Vacunamos, desparasitamos y controlamos la salud de búfalos y Nelore de manera constante.',
        chips: ['Vacunación constante', 'Control sanitario', 'Prevención'],
        note: 'Prevención que da resultados visibles en todo el sistema productivo.',
        ...(photoVacuna && { photo: photoVacuna }),
      },
      {
        _type: 'object', _key: uid(),
        num: '04',
        tag: 'Biotecnología reproductiva',
        title: 'Inseminación artificial',
        lead: 'La genética importa. Aplicamos biotecnología reproductiva para acelerar la mejora genética, garantizar tasas de preñez óptimas y estandarizar la calidad del hato.',
        chips: ['Mejora genética', 'Preñez óptima', 'Calidad estándar'],
        note: 'Cada inseminación se mide y se ajusta para maximizar eficiencia y resultados reproductivos.',
        ...(photoInsem && { photo: photoInsem }),
      },
    ],

    // CTA
    ctaHeading: 'Hacer las cosas bien, todos los días.',
  }

  process.stdout.write('  Creando documento buenas-practicas-page… ')
  const result = await client.createOrReplace(doc)
  console.log(`✓  ${result._id}`)

  console.log('\n✅  Buenas Prácticas — Página migrada y publicada.\n')
}

run().catch(err => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})

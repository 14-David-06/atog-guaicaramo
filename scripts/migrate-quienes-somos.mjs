/**
 * Migración one-shot: crea el documento singleton "quienes-somos" en Sanity.
 * Ejecutar UNA sola vez:
 *   node --env-file=.env.local scripts/migrate-quienes-somos.mjs
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

function block(children) {
  return { _type: 'block', _key: uid(), style: 'normal', children, markDefs: [] }
}

function span(text, marks = []) {
  return { _type: 'span', _key: uid(), text, marks }
}

async function uploadPhoto(relativePath) {
  const fullPath = path.resolve(PUBLIC, relativePath)
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠️  No existe: ${fullPath}`)
    return null
  }
  const filename = path.basename(fullPath)
  const ext = path.extname(filename).slice(1).toLowerCase()
  const contentType = ['jpg', 'jpeg'].includes(ext) ? 'image/jpeg' : 'image/png'
  const stream = fs.createReadStream(fullPath)
  const asset = await client.assets.upload('image', stream, { filename, contentType })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function run() {
  if (!process.env.SANITY_API_DEV_TOKEN) {
    console.error('❌  Falta SANITY_API_DEV_TOKEN en .env.local')
    process.exit(1)
  }

  console.log('\n📄  Quiénes Somos\n')

  process.stdout.write('  Subiendo foto hero (hero-nelore-hato.jpg)… ')
  const introImage = await uploadPhoto('assets/photography/hero-nelore-hato.jpg')
  console.log(introImage ? '✓' : 'omitida')

  const doc = {
    _id: 'quienes-somos',
    _type: 'quienesSomos',

    // Intro
    introTitle: 'Hato',
    introTitleItalic: 'Guaicaramo.',
    introSubtitle: 'Empresa ganadera especializada en genética de talla mundial y sistemas eficientes de producción bovina para el trópico colombiano.',
    introVideoUrl: 'https://www.instagram.com/reel/C2R6YzYOxnb/?igsh=MXU1N2VhYXU4Z25pcA==',
    ...(introImage && { introImage }),

    // Quiénes somos
    qsHeading: 'Genética, nutrición y manejo.',
    qsHeadingItalic: 'El sistema completo.',
    qsBody: [
      block([
        span('Somos una empresa ganadera especializada en '),
        span('genética de talla mundial', ['strong']),
        span(' y en la creación de sistemas eficientes de producción bovina para el trópico.'),
      ]),
      block([
        span('Nuestro propósito: Desarrollar el potencial del trópico mediante una ganadería sostenible y productiva.'),
      ]),
      block([
        span('Invertimos en genética, nutrición y manejo porque entendemos que la '),
        span('rentabilidad está en los ciclos productivos', ['strong']),
        span(', no en la improvisación.'),
      ]),
    ],

    // Misión y Visión
    misionText: 'Guaicaramo es una empresa dedicada al desarrollo de la agroindustria, con énfasis en la palma de aceite y sus derivados, comprometida con la sostenibilidad, la comunidad, sus empleados, socios y clientes, siguiendo principios de calidad y eficiencia.',
    visionText: 'Ser una empresa líder reconocida en Colombia en el sector de la palma de aceite, biocombustibles, ganadería, derivados lácteos y agricultura, satisfaciendo mercados nacionales e internacionales en beneficio de los clientes, la comunidad y sus socios.',

    // Valores
    valores: [
      { _type: 'object', _key: uid(), num: '01', title: 'Pasión',         desc: 'Caminamos hacia la excelencia en cada acción.' },
      { _type: 'object', _key: uid(), num: '02', title: 'Transparencia',  desc: 'Promovemos la confianza en todas las partes interesadas.' },
      { _type: 'object', _key: uid(), num: '03', title: 'Emprendimiento', desc: 'Retamos al statu quo en toda la organización.' },
      { _type: 'object', _key: uid(), num: '04', title: 'Liderazgo',      desc: 'Motivamos, inspiramos y empoderamos para encontrar soluciones.' },
    ],

    // Cita
    quote: 'La rentabilidad está en los ciclos productivos, no en la improvisación.',
    quoteHighlight: 'ciclos productivos',
  }

  process.stdout.write('  Creando documento quienes-somos… ')
  const result = await client.createOrReplace(doc)
  console.log(`✓  ${result._id}`)

  console.log('\n✅  Quiénes Somos migrado y publicado.\n')
}

run().catch(err => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})

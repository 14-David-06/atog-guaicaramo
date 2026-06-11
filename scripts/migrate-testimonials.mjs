/**
 * Migración one-shot: sube los 6 testimoniales hardcodeados a Sanity.
 * Ejecutar UNA sola vez:
 *   node --env-file=.env.local scripts/migrate-testimonials.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'sd1lk8vz',
  dataset: 'production',
  apiVersion: '2026-06-11',
  token: process.env.SANITY_API_DEV_TOKEN,
  useCdn: false,
})

/** Genera un key aleatorio para nodos de Portable Text */
const key = () => Math.random().toString(36).slice(2, 9)

/**
 * Crea un bloque de Portable Text a partir de segmentos.
 * Cada segmento es [texto, negrita?]
 * @param {Array<[string, boolean?]>} segments
 */
function block(segments) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: segments.map(([text, bold = false]) => ({
      _type: 'span',
      _key: key(),
      text,
      marks: bold ? ['strong'] : [],
    })),
  }
}

const testimonials = [
  {
    _type: 'testimonial',
    name: 'Gabriel Jaramillo',
    date: '2026-05-14',
    grad: 'linear-gradient(160deg,#c8b48a,#7a5e36,#1a1410)',
    instagramUrl: 'https://www.instagram.com/reel/DY8TLcoNlS5/?igsh=MTRhczY4ZmN2ZTVnZQ==',
    body: [block([
      ['Las decisiones importantes se miden en resultados. Gabriel Jaramillo apostó por nuestros '],
      ['Nelore Ciclo Corto', true],
      [' y hoy comparte su experiencia.'],
    ])],
  },
  {
    _type: 'testimonial',
    name: 'Pedro Gómez Jaramillo',
    date: '2026-04-02',
    grad: 'linear-gradient(160deg,#e8d4a4,#9a7a4a,#3a2818)',
    instagramUrl: 'https://www.instagram.com/hatoguaicaramo/',
    body: [block([
      ['En Villanueva, un '],
      ['productor confió', true],
      [' en nuestro 75% Nelore… y hoy los números, la facilidad de parto y el vigor al nacer cuentan la historia por él.'],
    ])],
  },
  {
    _type: 'testimonial',
    name: 'Ezequiel Carvajal',
    date: '2025-09-08',
    grad: 'linear-gradient(160deg,#d6c7a8,#a08756,#2a2418)',
    instagramUrl: 'https://www.instagram.com/reel/DOZK5YNEaho/?igsh=N2t6cW1ybmRvNGho',
    body: [block([
      ['Ezequiel activó un nuevo nivel de su hato. Adquirió un '],
      ['toro Nelore Ciclo Corto', true],
      ['. Mira esas crías: pura potencia. ¿Usted qué espera para adquirir nuestra genética?'],
    ])],
  },
  {
    _type: 'testimonial',
    name: 'Carlos Mendoza',
    date: '2025-11-22',
    grad: 'linear-gradient(160deg,#b8c0a0,#5a6850,#1a2120)',
    instagramUrl: 'https://www.instagram.com/hatoguaicaramo/',
    body: [block([
      ['Tres ciclos con '],
      ['Nelore CIA', true],
      ['. La precocidad cambió el negocio. Cerramos ciclos seis meses antes y la rentabilidad subió.'],
    ])],
  },
  {
    _type: 'testimonial',
    name: 'Hernando Castro',
    date: '2025-06-30',
    grad: 'linear-gradient(160deg,#a8b298,#4a5640,#181f18)',
    instagramUrl: 'https://www.instagram.com/hatoguaicaramo/',
    body: [block([
      ['Compré preñeces '],
      ['Nelore × Brahman 75%', true],
      [' y la transición del hato fue suave. Genética seria, asesoría seria. Cero improvisación.'],
    ])],
  },
  {
    _type: 'testimonial',
    name: 'Luis Beltrán',
    date: '2025-03-12',
    grad: 'linear-gradient(160deg,#c4ad84,#704f2a,#2a1f10)',
    instagramUrl: 'https://www.instagram.com/hatoguaicaramo/',
    body: [block([
      ['La '],
      ['sal proteinada', true],
      [' de Guaicaramo no es solo alimento, es un sistema. Mis vacas paren mejor y los terneros crecen sin parar.'],
    ])],
  },
]

async function run() {
  if (!process.env.SANITY_API_DEV_TOKEN) {
    console.error('❌  Falta SANITY_API_DEV_TOKEN en .env.local')
    process.exit(1)
  }

  console.log(`Subiendo ${testimonials.length} testimoniales a Sanity…\n`)

  for (const doc of testimonials) {
    const result = await client.create(doc)
    console.log(`✓  ${doc.name}  →  ${result._id}`)
  }

  console.log('\n✅  Migración completa. Publica los documentos en el Studio para que aparezcan en la web.')
}

run().catch(err => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})

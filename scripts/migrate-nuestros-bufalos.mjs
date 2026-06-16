/**
 * Migración one-shot: crea el documento singleton "nuestros-bufalos-page" en Sanity.
 * Ejecutar UNA sola vez:
 *   node --env-file=.env.local scripts/migrate-nuestros-bufalos.mjs
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

let kc = 0
const uid = () => `k${++kc}`

async function upload(relPath) {
  const fullPath = path.resolve(PUBLIC, relPath)
  if (!fs.existsSync(fullPath)) { console.warn(`  ⚠️  No existe: ${fullPath}`); return null }
  const filename = path.basename(fullPath)
  const ext = path.extname(filename).slice(1).toLowerCase()
  const ct = ['jpg','jpeg'].includes(ext) ? 'image/jpeg' : ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg'
  const asset = await client.assets.upload('image', fs.createReadStream(fullPath), { filename, contentType: ct })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function run() {
  if (!process.env.SANITY_API_DEV_TOKEN) { console.error('❌  Falta SANITY_API_DEV_TOKEN'); process.exit(1) }

  console.log('\n🦬  Nuestros Búfalos — Página\n')

  process.stdout.write('  Hero (bufalos-pastura-cordillera.jpg)… ')
  const heroImage = await upload('assets/photography/bufalos-pastura-cordillera.jpg')
  console.log(heroImage ? '✓' : 'omitida')

  process.stdout.write('  Trabajo (bufalo-trabajo-palma.jpg)… ')
  const trabajoPhoto = await upload('assets/photography/bufalo-trabajo-palma.jpg')
  console.log(trabajoPhoto ? '✓' : 'omitida')

  process.stdout.write('  Leche (lecheria.webp)… ')
  const lechePhoto = await upload('assets/illustrations/lecheria.webp')
  console.log(lechePhoto ? '✓' : 'omitida')

  process.stdout.write('  Carne (bufalas-grupo-pastura.jpg)… ')
  const carnePhoto = await upload('assets/photography/bufalas-grupo-pastura.jpg')
  console.log(carnePhoto ? '✓' : 'omitida')

  const doc = {
    _id: 'nuestros-bufalos-page',
    _type: 'nuestrosBufalosPage',

    // Hero
    ...(heroImage && { heroImage }),
    heroEyebrow: 'Hato Guaicaramo · Sistema bufalino',
    heroTitle1: 'Nuestros',
    heroTitle2: 'Búfalos',
    heroDescription: 'No trabajamos el búfalo como una especie más. Lo integramos como un sistema productivo real.',

    // Sistema / Enfoque
    sistemaLabel: 'El enfoque',
    sistemaHeading1: 'Producimos carne y leche',
    sistemaHeading2: 'con una lógica clara.',
    sistemaPillars: [
      { _type: 'object', _key: uid(), icon: 'dna',        title: 'Genética',  description: 'que funciona' },
      { _type: 'object', _key: uid(), icon: 'leaf',       title: 'Nutrición', description: 'que sostiene el sistema' },
      { _type: 'object', _key: uid(), icon: 'settings-2', title: 'Manejo',    description: 'que estabiliza la producción' },
    ],
    sistemaBody: 'Manejo que mantiene la producción estable todo el año — y tres frentes que se sostienen entre sí dentro de un mismo modelo.',

    // Índice
    pilaresIndex: [
      { _type: 'object', _key: uid(), num: '01', title: 'Búfalos de trabajo', desc: 'Fuerza · resistencia · docilidad' },
      { _type: 'object', _key: uid(), num: '02', title: 'Búfalas para leche', desc: 'Tecnología · registro · gestión' },
      { _type: 'object', _key: uid(), num: '03', title: 'Búfalos para carne', desc: 'Nutrición · genética · manejo' },
    ],

    // 01 · Trabajo
    ...(trabajoPhoto && { trabajoPhoto }),
    trabajoSubtitle: 'Línea de trabajo',
    trabajoHeading: 'Fuerza, resistencia y adaptabilidad.',
    trabajoBody: 'Desarrollamos una línea específica de búfalos de trabajo, adaptados a sistemas productivos rurales que requieren tracción, capacidad operativa y docilidad.',
    trabajoTraits: [
      { _type: 'object', _key: uid(), key: 'Fuerza',      desc: 'Tracción y capacidad operativa',         pct: 92 },
      { _type: 'object', _key: uid(), key: 'Resistencia', desc: 'Adaptados a sistemas rurales exigentes', pct: 78 },
      { _type: 'object', _key: uid(), key: 'Docilidad',   desc: 'Manejo seguro y predecible',             pct: 64 },
    ],

    // 02 · Leche
    ...(lechePhoto && { lechePhoto }),
    lecheHeading: 'La producción no se deja al azar.',
    lecheDescription: 'Cada búfala está identificada. Sabemos cuánto produce, cómo responde al manejo y cómo se comporta dentro del sistema.',
    lecheStats: [
      { _type: 'object', _key: uid(), numValue: 2,    numSuffix: '',   numSep: false, label: 'salas de ordeño',    sublabel: 'Tecnología de punta' },
      { _type: 'object', _key: uid(), numValue: 950,  numSuffix: '+',  numSep: false, label: 'búfalas ordeñadas',  sublabel: '2 veces al día' },
      { _type: 'object', _key: uid(), numValue: 4500, numSuffix: '',   numSep: true,  label: 'litros diarios',     sublabel: 'Producción medida y cercana' },
      { _type: 'object', _key: uid(), numValue: 5,    numSuffix: ' L', numSep: false, label: 'promedio por animal', sublabel: 'Medido y registrado' },
    ],

    // 03 · Carne
    ...(carnePhoto && { carnePhoto }),
    carneHeading: 'Una especie altamente eficiente.',
    carneBody: 'Lo desarrollamos bajo un sistema basado en nutrición estratégica, genética funcional y manejo planificado.',
    carneChips: ['Sal proteinada propia', 'Pasto Brachiaria Humidicola'],
    carneLinea: [
      { _type: 'object', _key: uid(), key: 'Machos de levante',   desc: 'Crecimiento eficiente bajo manejo planificado.',           pct: 88 },
      { _type: 'object', _key: uid(), key: 'Toros reproductores', desc: '75% mediterráneos, de búfalas élite de nuestros ordeños.', pct: 75 },
      { _type: 'object', _key: uid(), key: 'Bubillas preñadas',   desc: 'Hembras de reposición listas para el sistema.',            pct: 62 },
    ],

    // CTA
    ctaHeading: 'Aquí la producción se construye.',
  }

  process.stdout.write('  Creando documento nuestros-bufalos-page… ')
  const result = await client.createOrReplace(doc)
  console.log(`✓  ${result._id}`)

  console.log('\n✅  Nuestros Búfalos migrado y publicado.\n')
}

run().catch(err => { console.error('❌  Error:', err.message); process.exit(1) })

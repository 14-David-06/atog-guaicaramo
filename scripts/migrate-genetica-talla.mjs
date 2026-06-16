/**
 * Migración one-shot: crea el documento singleton "genetica-talla-page" en Sanity.
 * Ejecutar UNA sola vez:
 *   node --env-file=.env.local scripts/migrate-genetica-talla.mjs
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
  const ct = ['jpg','jpeg'].includes(ext) ? 'image/jpeg' : ext === 'png' ? 'image/png' : 'image/webp'
  const asset = await client.assets.upload('image', fs.createReadStream(fullPath), { filename, contentType: ct })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function run() {
  if (!process.env.SANITY_API_DEV_TOKEN) { console.error('❌  Falta SANITY_API_DEV_TOKEN'); process.exit(1) }

  console.log('\n🧬  Genética de Talla Mundial — Página\n')

  process.stdout.write('  Hero background (nelore-grupo-campo.jpg)… ')
  const heroImage = await upload('assets/photography/nelore-grupo-campo.jpg')
  console.log(heroImage ? '✓' : 'omitida')

  process.stdout.write('  Toro 01 (DSC_5196-2.jpg)… ')
  const toro01Photo = await upload('assets/photography/DSC_5196-2.jpg')
  console.log(toro01Photo ? '✓' : 'omitida')

  process.stdout.write('  Toro 02 (DSCN113112.jpg)… ')
  const toro02Photo = await upload('assets/photography/DSCN113112.jpg')
  console.log(toro02Photo ? '✓' : 'omitida')

  process.stdout.write('  Lab foto (laboratorio.png)… ')
  const biotecLabPhoto = await upload('assets/certificados/laboratorio.png')
  console.log(biotecLabPhoto ? '✓' : 'omitida')

  const doc = {
    _id: 'genetica-talla-page',
    _type: 'geneticaTallaPage',

    // Hero
    ...(heroImage && { heroImage }),
    heroEyebrow: 'Hato Guaicaramo · Programa de mejoramiento genético',
    heroTitle1: 'Genética de',
    heroTitle2: 'talla mundial.',
    heroDescription: 'Invertimos en genética que reduce los ciclos de producción y acelera los resultados. Animales eficientes, más kilos de carne en menos tiempo.',

    // Enfoque
    enfoqueLabel: 'El enfoque',
    enfoqueHeading1: 'Producir animales eficientes:',
    enfoqueHeading2: 'más kilos, menos tiempo.',
    enfoqueBody: 'Invertimos en genética de talla mundial y trabajamos bajo el programa de Mejoramiento Genético CIA. Nuestro enfoque es claro: producir animales que rinden dentro del sistema.',
    enfoquePillars: [
      { _type: 'object', _key: uid(), icon: 'timer-reset', title: 'Ciclos más cortos',     description: 'Reducimos el tiempo de producción en cada etapa.' },
      { _type: 'object', _key: uid(), icon: 'trending-up', title: 'Resultados acelerados', description: 'Más kilos de carne, más rápido, con eficiencia real.' },
      { _type: 'object', _key: uid(), icon: 'target',      title: 'Animales eficientes',   description: 'Selección orientada al rendimiento del sistema.' },
    ],

    // Toro 01
    ...(toro01Photo && { toro01Photo }),
    toro01Badge: 'Nelore 100%',
    toro01Subtitle: 'Línea 100 % del programa de mejoramiento genético CIA',
    toro01Heading: 'Nelore 100%, líderes en precocidad.',
    toro01Body: 'Animales que lideran en precocidad sexual, precocidad de crecimiento y precocidad de terminación — los tres aspectos fundamentales para rentabilizar el negocio ganadero.',
    cesugBody: 'El Certificado de Superioridad Genética CESUG le garantiza que los ejemplares corresponden al 24.5 % superior de todos los animales nacidos y evaluados en una misma safra de Brasil, Colombia y Paraguay.',

    // Toro 02
    ...(toro02Photo && { toro02Photo }),
    toro02Badge: 'Nelore × Brahman',
    toro02Heading: 'Nelore con Brahman, una transición a su ritmo.',
    toro02Body: 'Una excelente alternativa para ir haciendo la transición de sus vientres de acuerdo con la disponibilidad de tiempo y capital.',

    // Portafolio
    portafolioLabel: 'Nuestro portafolio',
    portafolioHeading: 'Lo que ofrecemos',
    portafolioBody: 'Genética disponible en cada etapa del sistema — de la hembra de reposición al embrión clasificado por su potencial.',
    portafolioItems: [
      { _type: 'object', _key: uid(), icon: 'venus',     title: 'Hembras Nelore CIA y CESUG',            description: 'Reposición de línea pura, lista para el sistema.' },
      { _type: 'object', _key: uid(), icon: 'git-merge', title: 'Hembras preñadas Nelore CIA × Brahman', description: 'Grados 50%, 75% y 87% CIA según su transición.' },
      { _type: 'object', _key: uid(), icon: 'beef',      title: 'Machos de ceba y levante',              description: 'Nelore CIA × Brahman 50%, 75% y 87% CIA.' },
      { _type: 'object', _key: uid(), icon: 'dna',       title: 'Embriones y preñeces',                  description: 'Genética de alto valor, directo al hato.' },
      { _type: 'object', _key: uid(), icon: 'award',     title: 'Toros Nelore CIA y CESUG',              description: 'Líderes en precocidad sexual, de crecimiento y de terminación — aspectos fundamentales para rentabilizar los negocios ganaderos.' },
    ],

    // Biotecnología
    biotecHeading1: 'Genética de alto valor,',
    biotecHeading2: 'directo al sistema.',
    biotecBody: 'La biotecnología es una herramienta estratégica del modelo productivo de Hato Guaicaramo. Aplicamos transferencia embrionaria e inseminación para acelerar el mejoramiento del hato y proyectar la reposición con precisión.',
    biotecLogicaNote: 'Cada embrión y cada preñez responden a una lógica clara:',
    biotecLogica: ['Reducir ciclos', 'Mejorar rendimiento', 'Aumentar productividad', 'Sostener el crecimiento'],
    biotecIciagenNote: 'Los embriones y preñeces se clasifican por su iCIAGEN proyectado.',
    ...(biotecLabPhoto && { biotecLabPhoto }),

    // Manifiesto
    manifestIntro: 'Aquí la genética no se compra.',
    manifestLine1: 'Se diseña.',
    manifestLine2: 'Se integra.',
    manifestLine3: 'Se proyecta.',

    // CTA
    ctaHeading: 'Genética que mueve el sistema.',
  }

  process.stdout.write('  Creando documento genetica-talla-page… ')
  const result = await client.createOrReplace(doc)
  console.log(`✓  ${result._id}`)

  console.log('\n✅  Genética de Talla Mundial migrada y publicada.\n')
}

run().catch(err => { console.error('❌  Error:', err.message); process.exit(1) })

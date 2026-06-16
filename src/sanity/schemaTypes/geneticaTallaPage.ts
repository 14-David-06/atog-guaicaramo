import { defineArrayMember, defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const geneticaTallaPage = defineType({
  name: 'geneticaTallaPage',
  title: 'Genética de Talla Mundial — Página',
  type: 'document',
  icon: StarIcon,
  fields: [
    // ── Hero ───────────────────────────────────────────────────────
    defineField({ name: 'heroImage',       title: 'Hero — imagen de fondo',       type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroEyebrow',     title: 'Hero — etiqueta superior',     type: 'string', validation: r => r.required() }),
    defineField({ name: 'heroTitle1',      title: 'Hero — título línea 1',        type: 'string', validation: r => r.required() }),
    defineField({ name: 'heroTitle2',      title: 'Hero — título línea 2',        type: 'string', validation: r => r.required() }),
    defineField({ name: 'heroDescription', title: 'Hero — descripción',           type: 'text', rows: 2, validation: r => r.required() }),

    // ── Enfoque ────────────────────────────────────────────────────
    defineField({ name: 'enfoqueLabel',    title: 'Enfoque — etiqueta',           type: 'string', validation: r => r.required() }),
    defineField({ name: 'enfoqueHeading1', title: 'Enfoque — título línea 1',     type: 'string', validation: r => r.required() }),
    defineField({ name: 'enfoqueHeading2', title: 'Enfoque — título línea 2 (itálica)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'enfoqueBody',     title: 'Enfoque — descripción',        type: 'text', rows: 3, validation: r => r.required() }),
    defineField({
      name: 'enfoquePillars',
      title: 'Enfoque — pilares (máx. 3)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'title',       title: 'Título',       type: 'string', validation: r => r.required() }),
          defineField({ name: 'description', title: 'Descripción',  type: 'string', validation: r => r.required() }),
          defineField({ name: 'icon',        title: 'Ícono (no cambiar)', type: 'string', readOnly: true }),
        ],
        preview: { select: { title: 'title', subtitle: 'description' } },
      })],
      validation: r => r.max(3),
    }),

    // ── Toros — 01 Nelore 100% ─────────────────────────────────────
    defineField({ name: 'toro01Photo',    title: 'Toro 01 — fotografía',         type: 'image', options: { hotspot: true } }),
    defineField({ name: 'toro01Badge',    title: 'Toro 01 — badge de la foto',   type: 'string', validation: r => r.required() }),
    defineField({ name: 'toro01Subtitle', title: 'Toro 01 — etiqueta de línea',  type: 'string', validation: r => r.required() }),
    defineField({ name: 'toro01Heading',  title: 'Toro 01 — título',             type: 'string', validation: r => r.required() }),
    defineField({ name: 'toro01Body',     title: 'Toro 01 — descripción',        type: 'text', rows: 3, validation: r => r.required() }),
    defineField({ name: 'cesugBody',      title: 'CESUG — descripción del certificado', type: 'text', rows: 3, validation: r => r.required() }),

    // ── Toros — 02 Cruzamiento ─────────────────────────────────────
    defineField({ name: 'toro02Photo',   title: 'Toro 02 — fotografía',          type: 'image', options: { hotspot: true } }),
    defineField({ name: 'toro02Badge',   title: 'Toro 02 — badge de la foto',    type: 'string', validation: r => r.required() }),
    defineField({ name: 'toro02Heading', title: 'Toro 02 — título',              type: 'string', validation: r => r.required() }),
    defineField({ name: 'toro02Body',    title: 'Toro 02 — descripción',         type: 'text', rows: 3, validation: r => r.required() }),

    // ── Portafolio ─────────────────────────────────────────────────
    defineField({ name: 'portafolioLabel',   title: 'Portafolio — etiqueta',      type: 'string', validation: r => r.required() }),
    defineField({ name: 'portafolioHeading', title: 'Portafolio — título',        type: 'string', validation: r => r.required() }),
    defineField({ name: 'portafolioBody',    title: 'Portafolio — subtítulo',     type: 'string', validation: r => r.required() }),
    defineField({
      name: 'portafolioItems',
      title: 'Portafolio — ítems (máx. 5)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'title',       title: 'Título',       type: 'string', validation: r => r.required() }),
          defineField({ name: 'description', title: 'Descripción',  type: 'text', rows: 2, validation: r => r.required() }),
          defineField({ name: 'icon',        title: 'Ícono (no cambiar)', type: 'string', readOnly: true }),
        ],
        preview: { select: { title: 'title', subtitle: 'description' } },
      })],
      validation: r => r.max(5),
    }),

    // ── Biotecnología ──────────────────────────────────────────────
    defineField({ name: 'biotecHeading1',   title: 'Biotec — título línea 1',          type: 'string', validation: r => r.required() }),
    defineField({ name: 'biotecHeading2',   title: 'Biotec — título línea 2 (itálica)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'biotecBody',       title: 'Biotec — descripción',             type: 'text', rows: 3, validation: r => r.required() }),
    defineField({ name: 'biotecLogicaNote', title: 'Biotec — nota introductoria a la lógica', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'biotecLogica',
      title: 'Biotec — puntos de lógica (máx. 4)',
      type: 'array',
      of: [{ type: 'string' }],
      validation: r => r.max(4),
    }),
    defineField({ name: 'biotecIciagenNote', title: 'Biotec — nota iCIAGEN',           type: 'string', validation: r => r.required() }),
    defineField({ name: 'biotecLabPhoto',    title: 'Biotec — foto del laboratorio',   type: 'image', options: { hotspot: true } }),

    // ── Manifiesto ─────────────────────────────────────────────────
    defineField({ name: 'manifestIntro', title: 'Manifiesto — frase introductoria',  type: 'string', validation: r => r.required() }),
    defineField({ name: 'manifestLine1', title: 'Manifiesto — línea 1',              type: 'string', validation: r => r.required() }),
    defineField({ name: 'manifestLine2', title: 'Manifiesto — línea 2',              type: 'string', validation: r => r.required() }),
    defineField({ name: 'manifestLine3', title: 'Manifiesto — línea 3 (itálica)',    type: 'string', validation: r => r.required() }),

    // ── CTA ────────────────────────────────────────────────────────
    defineField({ name: 'ctaHeading', title: 'CTA — frase de cierre', type: 'string', validation: r => r.required() }),
  ],
  preview: { prepare: () => ({ title: 'Genética de Talla Mundial — Página' }) },
})

import { defineArrayMember, defineField, defineType } from 'sanity'
import { CircleIcon } from '@sanity/icons'

export const nuestrosBufalosPage = defineType({
  name: 'nuestrosBufalosPage',
  title: 'Nuestros Búfalos — Página',
  type: 'document',
  icon: CircleIcon,
  fields: [
    // ── Hero ───────────────────────────────────────────────────────
    defineField({ name: 'heroImage',       title: 'Hero — imagen de fondo',       type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroEyebrow',     title: 'Hero — etiqueta superior',     type: 'string', validation: r => r.required() }),
    defineField({ name: 'heroTitle1',      title: 'Hero — título línea 1',        type: 'string', validation: r => r.required() }),
    defineField({ name: 'heroTitle2',      title: 'Hero — título línea 2',        type: 'string', validation: r => r.required() }),
    defineField({ name: 'heroDescription', title: 'Hero — descripción',           type: 'text', rows: 2, validation: r => r.required() }),

    // ── Sistema / Enfoque ──────────────────────────────────────────
    defineField({ name: 'sistemaLabel',    title: 'Enfoque — etiqueta',           type: 'string', validation: r => r.required() }),
    defineField({ name: 'sistemaHeading1', title: 'Enfoque — título línea 1',     type: 'string', validation: r => r.required() }),
    defineField({ name: 'sistemaHeading2', title: 'Enfoque — título línea 2 (itálica)', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'sistemaPillars',
      title: 'Enfoque — pilares (máx. 3)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'title',       title: 'Título',              type: 'string', validation: r => r.required() }),
          defineField({ name: 'description', title: 'Descripción corta',   type: 'string', validation: r => r.required() }),
          defineField({ name: 'icon',        title: 'Ícono (no cambiar)',  type: 'string', readOnly: true }),
        ],
        preview: { select: { title: 'title', subtitle: 'description' } },
      })],
      validation: r => r.max(3),
    }),
    defineField({ name: 'sistemaBody',     title: 'Enfoque — párrafo final',      type: 'text', rows: 2, validation: r => r.required() }),

    // ── Índice de pilares (barra oscura) ───────────────────────────
    defineField({
      name: 'pilaresIndex',
      title: 'Barra índice — 3 líneas (máx. 3)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'num',   title: 'Número', type: 'string', validation: r => r.required() }),
          defineField({ name: 'title', title: 'Título', type: 'string', validation: r => r.required() }),
          defineField({ name: 'desc',  title: 'Descripción corta', type: 'string', validation: r => r.required() }),
        ],
        preview: { select: { title: 'title', subtitle: 'num' } },
      })],
      validation: r => r.max(3),
    }),

    // ── 01 · Búfalos de trabajo ────────────────────────────────────
    defineField({ name: 'trabajoPhoto',    title: 'Trabajo — fotografía',         type: 'image', options: { hotspot: true } }),
    defineField({ name: 'trabajoSubtitle', title: 'Trabajo — etiqueta de línea',  type: 'string', validation: r => r.required() }),
    defineField({ name: 'trabajoHeading',  title: 'Trabajo — título',             type: 'string', validation: r => r.required() }),
    defineField({ name: 'trabajoBody',     title: 'Trabajo — descripción',        type: 'text', rows: 3, validation: r => r.required() }),
    defineField({
      name: 'trabajoTraits',
      title: 'Trabajo — rasgos con barra (máx. 3)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'key',  title: 'Rasgo',       type: 'string', validation: r => r.required() }),
          defineField({ name: 'desc', title: 'Descripción', type: 'string', validation: r => r.required() }),
          defineField({ name: 'pct',  title: 'Porcentaje de barra (0-100)', type: 'number', validation: r => r.required().min(0).max(100) }),
        ],
        preview: { select: { title: 'key', subtitle: 'desc' } },
      })],
      validation: r => r.max(3),
    }),

    // ── 02 · Búfalas para leche ────────────────────────────────────
    defineField({ name: 'lechePhoto',       title: 'Leche — ilustración / foto',  type: 'image', options: { hotspot: true } }),
    defineField({ name: 'lecheHeading',     title: 'Leche — título',              type: 'string', validation: r => r.required() }),
    defineField({ name: 'lecheDescription', title: 'Leche — descripción',         type: 'text', rows: 2, validation: r => r.required() }),
    defineField({
      name: 'lecheStats',
      title: 'Leche — estadísticas animadas (máx. 4)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'numValue',  title: 'Valor numérico',    type: 'number',  validation: r => r.required().min(0) }),
          defineField({ name: 'numSuffix', title: 'Sufijo (ej. "+", " L")', type: 'string' }),
          defineField({ name: 'numSep',    title: 'Separador de miles', type: 'boolean' }),
          defineField({ name: 'label',     title: 'Etiqueta principal', type: 'string', validation: r => r.required() }),
          defineField({ name: 'sublabel',  title: 'Etiqueta secundaria', type: 'string', validation: r => r.required() }),
        ],
        preview: { select: { title: 'label', subtitle: 'numValue' } },
      })],
      validation: r => r.max(4),
    }),

    // ── 03 · Búfalos para carne ────────────────────────────────────
    defineField({ name: 'carnePhoto',   title: 'Carne — fotografía',             type: 'image', options: { hotspot: true } }),
    defineField({ name: 'carneHeading', title: 'Carne — título',                 type: 'string', validation: r => r.required() }),
    defineField({ name: 'carneBody',    title: 'Carne — descripción',            type: 'text', rows: 3, validation: r => r.required() }),
    defineField({
      name: 'carneChips',
      title: 'Carne — chips de características (máx. 4)',
      type: 'array',
      of: [{ type: 'string' }],
      validation: r => r.max(4),
    }),
    defineField({
      name: 'carneLinea',
      title: 'Carne — línea productiva con barra (máx. 3)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'key',  title: 'Nombre', type: 'string', validation: r => r.required() }),
          defineField({ name: 'desc', title: 'Descripción', type: 'string', validation: r => r.required() }),
          defineField({ name: 'pct',  title: 'Porcentaje de barra (0-100)', type: 'number', validation: r => r.required().min(0).max(100) }),
        ],
        preview: { select: { title: 'key', subtitle: 'desc' } },
      })],
      validation: r => r.max(3),
    }),

    // ── CTA ────────────────────────────────────────────────────────
    defineField({ name: 'ctaHeading', title: 'CTA — frase de cierre', type: 'string', validation: r => r.required() }),
  ],
  preview: { prepare: () => ({ title: 'Nuestros Búfalos — Página' }) },
})

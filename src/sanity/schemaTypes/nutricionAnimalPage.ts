import { defineArrayMember, defineField, defineType } from 'sanity'
import { LeaveIcon } from '@sanity/icons'

export const nutricionAnimalPage = defineType({
  name: 'nutricionAnimalPage',
  title: 'Nutrición Animal — Página',
  type: 'document',
  icon: LeaveIcon,
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────
    defineField({ name: 'heroTitle',    title: 'Hero — título (sin la palabra em)',     type: 'string', validation: r => r.required() }),
    defineField({ name: 'heroTitleEm',  title: 'Hero — palabra en itálica (ej. "transforma")', type: 'string', validation: r => r.required() }),
    defineField({ name: 'heroSubtitle', title: 'Hero — subtítulo',                     type: 'text', rows: 2, validation: r => r.required() }),

    // ── Nuestra Fábrica ───────────────────────────────────────────────
    defineField({ name: 'fabricaLabel',   title: 'Fábrica — etiqueta superior',         type: 'string', validation: r => r.required() }),
    defineField({ name: 'fabricaLine1',   title: 'Fábrica — título línea 1',            type: 'string', validation: r => r.required() }),
    defineField({ name: 'fabricaLine2',   title: 'Fábrica — título línea 2',            type: 'string', validation: r => r.required() }),
    defineField({ name: 'fabricaLine3',   title: 'Fábrica — título línea 3 (itálica)',  type: 'string', validation: r => r.required() }),
    defineField({ name: 'fabricaBody',    title: 'Fábrica — párrafo',                  type: 'text', rows: 3, validation: r => r.required() }),
    defineField({ name: 'fabricaPhoto',   title: 'Fábrica — fotografía',               type: 'image', options: { hotspot: true } }),
    defineField({ name: 'fabricaVideoUrl', title: 'Fábrica — URL del vídeo (Instagram/YouTube)', type: 'url' }),
    defineField({
      name: 'fabricaStats',
      title: 'Fábrica — estadísticas (máx. 3)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Etiqueta (ej. "Reproducción")', type: 'string', validation: r => r.required() }),
          defineField({ name: 'value', title: 'Valor (ej. "+ Índices")',        type: 'string', validation: r => r.required() }),
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      })],
      validation: r => r.max(3),
    }),

    // ── Manifesto ─────────────────────────────────────────────────────
    defineField({ name: 'manifestoLine1', title: 'Manifesto — primera frase (tachada)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'manifestoLine2', title: 'Manifesto — segunda frase (acento)',  type: 'string', validation: r => r.required() }),
    defineField({ name: 'manifestoBody',  title: 'Manifesto — párrafo',                type: 'text', rows: 2, validation: r => r.required() }),

    // ── Sal Proteinada ────────────────────────────────────────────────
    defineField({ name: 'salBody1', title: 'Sal — párrafo 1', type: 'text', rows: 2, validation: r => r.required() }),
    defineField({ name: 'salBody2', title: 'Sal — párrafo 2', type: 'text', rows: 2, validation: r => r.required() }),
    defineField({
      name: 'salIngredients',
      title: 'Sal — ingredientes (máx. 8)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'key',  title: 'Nombre',       type: 'string', validation: r => r.required() }),
          defineField({ name: 'desc', title: 'Descripción',  type: 'string', validation: r => r.required() }),
          defineField({ name: 'icon', title: 'Ícono (no cambiar)', type: 'string', readOnly: true }),
        ],
        preview: { select: { title: 'key', subtitle: 'desc' } },
      })],
      validation: r => r.max(8),
    }),
    defineField({ name: 'salPdf', title: 'Sal — ficha técnica (PDF)', type: 'file', options: { accept: 'application/pdf' } }),

    // ── Pastos ────────────────────────────────────────────────────────
    defineField({ name: 'pastosBody', title: 'Pastos — párrafo', type: 'text', rows: 3, validation: r => r.required() }),
    defineField({
      name: 'pastosRegimes',
      title: 'Pastos — regímenes de pastoreo (máx. 2)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'kind',    title: 'Tipo (ej. "Con fertiriego")',    type: 'string', validation: r => r.required() }),
          defineField({ name: 'grazing', title: 'Días de pastoreo (ej. "1 día")', type: 'string', validation: r => r.required() }),
          defineField({ name: 'rest',    title: 'Días de descanso (ej. "20 días")', type: 'string', validation: r => r.required() }),
        ],
        preview: { select: { title: 'kind', subtitle: 'grazing' } },
      })],
      validation: r => r.max(2),
    }),
    defineField({
      name: 'pastosStats',
      title: 'Pastos — estadísticas (máx. 4)',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Etiqueta (ej. "Rotación")',         type: 'string', validation: r => r.required() }),
          defineField({ name: 'value', title: 'Valor (ej. "Planificada")',          type: 'string', validation: r => r.required() }),
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      })],
      validation: r => r.max(4),
    }),
  ],
  preview: { prepare: () => ({ title: 'Nutrición Animal — Página' }) },
})

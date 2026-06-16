import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const buenasPracticasPage = defineType({
  name: 'buenasPracticasPage',
  title: 'Buenas Prácticas — Página',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    // ── Hero ───────────────────────────────────────────────────────
    defineField({
      name: 'heroVideo',
      title: 'Hero — video de fondo',
      description: 'Archivo de video (MP4, MOV). Se reproduce en loop automáticamente.',
      type: 'file',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero — etiqueta superior',
      description: 'Ej: "Hato Guaicaramo · Manejo responsable"',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'heroTitle1',
      title: 'Hero — título línea 1',
      description: 'Ej: "Nuestras" (tamaño pequeño)',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'heroTitle2',
      title: 'Hero — título línea 2',
      description: 'Ej: "buenas prácticas." (tamaño grande)',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero — descripción',
      type: 'text',
      rows: 3,
      validation: r => r.required(),
    }),

    // ── Intro ──────────────────────────────────────────────────────
    defineField({
      name: 'introLabel',
      title: 'Intro — etiqueta (ej: "El método")',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'introHeading1',
      title: 'Intro — título línea 1',
      description: 'Ej: "Cuatro frentes,"',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'introHeading2',
      title: 'Intro — título línea 2 (itálica)',
      description: 'Ej: "un mismo estándar."',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'introBody',
      title: 'Intro — descripción',
      type: 'text',
      rows: 3,
      validation: r => r.required(),
    }),

    // ── Prácticas ──────────────────────────────────────────────────
    defineField({
      name: 'practices',
      title: 'Prácticas (máx. 4, en orden)',
      description: 'Los colores, íconos e ilustraciones son fijos por diseño según la posición.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'num',   title: 'Número (ej: "01")',       type: 'string', readOnly: true }),
            defineField({ name: 'tag',   title: 'Categoría',               type: 'string', validation: r => r.required() }),
            defineField({ name: 'title', title: 'Título de la práctica',   type: 'string', validation: r => r.required() }),
            defineField({ name: 'lead',  title: 'Descripción principal',   type: 'text', rows: 3, validation: r => r.required() }),
            defineField({
              name: 'chips',
              title: 'Etiquetas destacadas (máx. 3)',
              type: 'array',
              of: [{ type: 'string' }],
              validation: r => r.max(3).required(),
            }),
            defineField({ name: 'note',  title: 'Nota al pie (itálica)',   type: 'text', rows: 2, validation: r => r.required() }),
            defineField({
              name: 'photo',
              title: 'Fotografía (opcional — reemplaza ilustración animada)',
              type: 'image',
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'num', media: 'photo' } },
        }),
      ],
      validation: r => r.max(4),
    }),

    // ── CTA ────────────────────────────────────────────────────────
    defineField({
      name: 'ctaHeading',
      title: 'CTA — frase de cierre',
      description: 'Ej: "Hacer las cosas bien, todos los días."',
      type: 'string',
      validation: r => r.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Buenas Prácticas — Página' }),
  },
})

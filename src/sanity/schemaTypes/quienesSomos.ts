import { defineArrayMember, defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const quienesSomos = defineType({
  name: 'quienesSomos',
  title: 'Quiénes Somos',
  type: 'document',
  icon: UserIcon,
  fields: [
    // ── Sección intro ──────────────────────────────────────────────
    defineField({
      name: 'introTitle',
      title: 'Título — parte principal',
      description: 'Ej: "Hato"',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'introTitleItalic',
      title: 'Título — parte itálica',
      description: 'Ej: "Guaicaramo."',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'introSubtitle',
      title: 'Descripción de introducción',
      type: 'text',
      rows: 3,
      validation: r => r.required(),
    }),
    defineField({
      name: 'introImage',
      title: 'Fotografía del hero (lado izquierdo)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'introVideoUrl',
      title: 'URL del video "Ver video"',
      type: 'url',
    }),

    // ── Sección "Quiénes somos" ─────────────────────────────────────
    defineField({
      name: 'qsHeading',
      title: '"Quiénes somos" — título principal',
      description: 'Ej: "Genética, nutrición y manejo."',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'qsHeadingItalic',
      title: '"Quiénes somos" — subtítulo itálico',
      description: 'Ej: "El sistema completo."',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'qsBody',
      title: '"Quiénes somos" — párrafos de descripción',
      description: 'Cada párrafo es un bloque. Usa Negrita para destacar frases clave.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [{ title: 'Negrita', value: 'strong' }],
            annotations: [],
          },
        }),
      ],
    }),

    // ── Misión y Visión ────────────────────────────────────────────
    defineField({
      name: 'misionText',
      title: 'Misión',
      type: 'text',
      rows: 4,
      validation: r => r.required(),
    }),
    defineField({
      name: 'visionText',
      title: 'Visión',
      type: 'text',
      rows: 4,
      validation: r => r.required(),
    }),

    // ── Valores corporativos ───────────────────────────────────────
    defineField({
      name: 'valores',
      title: 'Valores corporativos',
      description: 'Máximo 4. Los colores y estilos son fijos en el diseño.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'num',   title: 'Número (ej: "01")', type: 'string', validation: r => r.required() }),
            defineField({ name: 'title', title: 'Nombre del valor',  type: 'string', validation: r => r.required() }),
            defineField({ name: 'desc',  title: 'Descripción',       type: 'text', rows: 2, validation: r => r.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'num' } },
        }),
      ],
      validation: r => r.max(4),
    }),

    // ── Cita editorial ────────────────────────────────────────────
    defineField({
      name: 'quote',
      title: 'Cita editorial',
      type: 'text',
      rows: 2,
      validation: r => r.required(),
    }),
    defineField({
      name: 'quoteHighlight',
      title: 'Cita — palabra(s) destacada(s)',
      description: 'Esta parte se muestra en color café dentro de la cita. Debe coincidir exactamente con el texto de la cita.',
      type: 'string',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Quiénes Somos' }),
  },
})

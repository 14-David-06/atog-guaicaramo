import { defineArrayMember, defineField, defineType } from 'sanity'
import { BarChartIcon } from '@sanity/icons'

export const seccionDestacada = defineType({
  name: 'seccionDestacada',
  title: 'Sección destacada',
  type: 'document',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'slug',
      title: 'Identificador',
      description: 'No cambiar. Vincula esta sección con el componente correcto.',
      type: 'string',
      readOnly: true,
      validation: r => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título (línea 1)',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'titleItalic',
      title: 'Título (línea 2, cursiva)',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Fotografía',
      type: 'image',
      options: { hotspot: true },
      validation: r => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Descripción',
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
      validation: r => r.required(),
    }),
    defineField({
      name: 'stats',
      title: 'Estadísticas (máx. 3)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'val',   title: 'Valor',       type: 'string', validation: r => r.required() }),
            defineField({ name: 'label', title: 'Descripción', type: 'string', validation: r => r.required() }),
            defineField({
              name: 'icon',
              title: 'Icono',
              type: 'string',
              description: 'Opciones: trending-up · trending-down · award · droplets · repeat',
            }),
          ],
          preview: { select: { title: 'val', subtitle: 'label' } },
        }),
      ],
      validation: r => r.max(3),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texto del botón',
      type: 'string',
      initialValue: 'Ver más',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Enlace del botón',
      type: 'string',
      validation: r => r.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'titleItalic', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return { title: `${title} ${subtitle}`, media }
    },
  },
})

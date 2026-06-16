import { defineField, defineType } from 'sanity'
import { LeaveIcon } from '@sanity/icons'

export const buenaPractica = defineType({
  name: 'buenaPractica',
  title: 'Buena Práctica (card)',
  type: 'document',
  icon: LeaveIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Fotografía circular',
      type: 'image',
      options: { hotspot: true },
      validation: r => r.required(),
    }),
    defineField({
      name: 'anchor',
      title: 'Ancla en la página interna',
      description: 'ID del anchor en /buenas-practicas (ej: bp-01, bp-02…)',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      media: 'photo',
    },
    prepare({ title, order, media }) {
      return { title: `${order ?? 0} — ${title}`, media }
    },
  },
  orderings: [
    {
      title: 'Orden de aparición',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})

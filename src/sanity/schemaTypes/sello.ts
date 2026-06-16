import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const sello = defineType({
  name: 'sello',
  title: 'Sello de certificación',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo / Imagen del sello',
      type: 'image',
      options: { hotspot: false },
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
      title: 'name',
      order: 'order',
      media: 'logo',
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

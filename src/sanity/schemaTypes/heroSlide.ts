import { defineArrayMember, defineField, defineType } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Etiqueta / alt text',
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
      name: 'copy',
      title: 'Texto del slide',
      description: 'Usa cursiva para destacar frases con el color acento.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Cursiva / Acento', value: 'em' },
              { title: 'Negrita', value: 'strong' },
            ],
            annotations: [],
          },
        }),
      ],
      validation: r => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'label',
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

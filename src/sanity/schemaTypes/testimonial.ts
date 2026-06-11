import { defineArrayMember, defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Testimonio',
      description: 'Texto del testimonial. Puedes poner palabras en negrita.',
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
      name: 'photo',
      title: 'Foto del ganadero',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'grad',
      title: 'Gradiente de fondo',
      description: 'Gradiente CSS para cuando no hay foto. Ej: linear-gradient(160deg,#c8b48a,#7a5e36,#1a1410)',
      type: 'string',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'URL de Instagram',
      type: 'url',
      validation: r => r.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'date',
      media: 'photo',
    },
  },
  orderings: [
    {
      title: 'Más reciente primero',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
})

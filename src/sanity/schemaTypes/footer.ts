import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const footer = defineType({
  name: 'footer',
  title: 'Footer / Contacto',
  type: 'document',
  icon: HomeIcon,
  fields: [
    /* ── Columna izquierda ── */
    defineField({
      name: 'heading',
      title: 'Encabezado',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      description: 'Usa salto de línea (Enter) para separar las dos frases.',
      type: 'text',
      rows: 3,
      validation: r => r.required(),
    }),

    /* ── Información de contacto ── */
    defineField({
      name: 'address',
      title: 'Dirección',
      description: 'Primera línea: vía. Segunda línea: municipio y departamento.',
      type: 'text',
      rows: 2,
      validation: r => r.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'email',
      title: 'Correo electrónico',
      type: 'string',
      validation: r => r.required(),
    }),

    /* ── Redes sociales ── */
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'tiktokUrl',    title: 'TikTok URL',    type: 'url' }),
    defineField({ name: 'facebookUrl',  title: 'Facebook URL',  type: 'url' }),

    /* ── Imagen de fondo ── */
    defineField({
      name: 'footerImage',
      title: 'Foto de fondo (manada)',
      type: 'image',
      options: { hotspot: true },
    }),

    /* ── Legal ── */
    defineField({
      name: 'privacyPolicyUrl',
      title: 'URL del Aviso de privacidad',
      type: 'string',
    }),
    defineField({
      name: 'dataProtectionFile',
      title: 'PDF Política de tratamiento de datos',
      description: 'Sube el PDF directamente aquí para reemplazarlo sin tocar código.',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Footer / Contacto' }
    },
  },
})

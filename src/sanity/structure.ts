import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Hato Guaicaramo')
    .items([
      S.listItem()
        .title('Hero — Slides del inicio')
        .schemaType('heroSlide')
        .child(S.documentTypeList('heroSlide').title('Hero Slides')),

      S.listItem()
        .title('Buenas Prácticas — Cards')
        .schemaType('buenaPractica')
        .child(S.documentTypeList('buenaPractica').title('Buenas Prácticas')),

      S.listItem()
        .title('Genética — Nelore CIA')
        .schemaType('seccionDestacada')
        .child(
          S.document()
            .schemaType('seccionDestacada')
            .documentId('seccion-genetica')
            .title('Genética — Nelore CIA')
        ),

      S.listItem()
        .title('Búfalos — Sección')
        .schemaType('seccionDestacada')
        .child(
          S.document()
            .schemaType('seccionDestacada')
            .documentId('seccion-bufalos')
            .title('Búfalos — Sección')
        ),

      S.listItem()
        .title('Sellos de certificación')
        .schemaType('sello')
        .child(S.documentTypeList('sello').title('Sellos')),

      S.listItem()
        .title('Testimoniales')
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('Testimoniales')),
    ])

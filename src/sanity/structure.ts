import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Hato Guaicaramo')
    .items([

      // ─── Página de Inicio ──────────────────────────────────────────
      S.listItem()
        .title('Página de Inicio')
        .child(
          S.list()
            .title('Página de Inicio')
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
        ),

      S.divider(),

      // ─── Páginas internas ──────────────────────────────────────────
      S.listItem()
        .title('Quiénes Somos')
        .schemaType('quienesSomos')
        .child(
          S.document()
            .schemaType('quienesSomos')
            .documentId('quienes-somos')
            .title('Quiénes Somos')
        ),

      S.listItem()
        .title('Buenas Prácticas — Página')
        .schemaType('buenasPracticasPage')
        .child(
          S.document()
            .schemaType('buenasPracticasPage')
            .documentId('buenas-practicas-page')
            .title('Buenas Prácticas — Página')
        ),

      S.listItem()
        .title('Genética de Talla Mundial — Página')
        .schemaType('geneticaTallaPage')
        .child(
          S.document()
            .schemaType('geneticaTallaPage')
            .documentId('genetica-talla-page')
            .title('Genética de Talla Mundial — Página')
        ),

      S.listItem()
        .title('Nuestros Búfalos — Página')
        .schemaType('nuestrosBufalosPage')
        .child(
          S.document()
            .schemaType('nuestrosBufalosPage')
            .documentId('nuestros-bufalos-page')
            .title('Nuestros Búfalos — Página')
        ),

      S.listItem()
        .title('Nutrición Animal — Página')
        .schemaType('nutricionAnimalPage')
        .child(
          S.document()
            .schemaType('nutricionAnimalPage')
            .documentId('nutricion-animal-page')
            .title('Nutrición Animal — Página')
        ),

      S.divider(),

      // ─── Sitio global ──────────────────────────────────────────────
      S.listItem()
        .title('Footer / Contacto')
        .schemaType('footer')
        .child(
          S.document()
            .schemaType('footer')
            .documentId('footer')
            .title('Footer / Contacto')
        ),
    ])

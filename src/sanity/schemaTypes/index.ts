import { type SchemaTypeDefinition } from 'sanity'
import { testimonial } from './testimonial'
import { heroSlide } from './heroSlide'
import { sello } from './sello'
import { buenaPractica } from './buenaPractica'
import { seccionDestacada } from './seccionDestacada'
import { footer } from './footer'
import { quienesSomos } from './quienesSomos'
import { buenasPracticasPage } from './buenasPracticasPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testimonial, heroSlide, sello, buenaPractica, seccionDestacada, footer, quienesSomos, buenasPracticasPage],
}

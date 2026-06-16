import { type SchemaTypeDefinition } from 'sanity'
import { testimonial } from './testimonial'
import { heroSlide } from './heroSlide'
import { sello } from './sello'
import { buenaPractica } from './buenaPractica'
import { seccionDestacada } from './seccionDestacada'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testimonial, heroSlide, sello, buenaPractica, seccionDestacada],
}

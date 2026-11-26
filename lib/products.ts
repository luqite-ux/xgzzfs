import { IMAGES } from '@/lib/site'

export type CategoryId = 'womens-knit-sweaters' | 'womens-knit-base-layers'

export interface Category {
  id: CategoryId
  name: string
  blurb: string
  image: string
  imageAlt: string
}

export interface Product {
  slug: string
  name: string
  category: CategoryId
  tagline: string
  colorways: string[]
  size: string
  summary: string
  details: string[]
  specs: { label: string; value: string }[]
  images: { src: string; alt: string; label: string }[]
  tags: string[]
}

export const CATEGORIES: Category[] = [
  {
    id: 'womens-knit-sweaters',
    name: 'Women\u2019s Knit Sweaters & Cardigans',
    blurb:
      'Embroidered, eyelet and rib-structured cardigans and pullovers knitted on 7G flat machines and hand finished.',
    image: IMAGES.cardiganRaspberry,
    imageAlt:
      'Raspberry knit cardigan with hand-applied floral embroidery and knit-covered buttons',
  },
  {
    id: 'womens-knit-base-layers',
    name: 'Women\u2019s Knit Base Layers',
    blurb:
      'Openwork and embossed base layers with lettuce-edge trims, built for layering and non-sheer wear.',
    image: IMAGES.butterfly,
    imageAlt: 'Off-white openwork knit base layer with embossed butterfly motifs',
  },
]

export const PRODUCTS: Product[] = [
  {
    slug: 'yunjian-huaxu-cardigan',
    name: 'Yunjian Huaxu Hand-Embroidered Wool Cardigan',
    category: 'womens-knit-sweaters',
    tagline: 'Ruffled neckline & knit-covered buttons',
    colorways: ['Raspberry', 'Off-White'],
    size: 'One Size',
    summary:
      'A soft, brushed-hand cardigan with hand-applied floral embroidery clusters, a scalloped placket and knit-covered buttons.',
    details: [
      'Hand-embroidered floral clusters applied after knitting',
      'Ruffled neckline with scalloped front placket',
      'Knit-covered buttons matched to the body colour',
      'Ribbed cuffs and hem for a fitted finish',
    ],
    specs: [
      { label: 'Category', value: 'Women\u2019s Knit Sweaters & Cardigans' },
      { label: 'Colourways shown', value: 'Raspberry, Off-White' },
      { label: 'Size', value: 'One Size' },
      { label: 'Neckline', value: 'Ruffled V-neckline' },
      { label: 'Closure', value: 'Knit-covered buttons' },
      { label: 'Gauge', value: 'HP2-52S 7G flat knitting' },
      { label: 'MOQ', value: '5 pcs per style' },
      { label: 'Sampling', value: '4\u201315 days, charged' },
    ],
    images: [
      {
        src: IMAGES.cardiganRaspberry,
        alt: 'Raspberry knit cardigan with hand-applied floral embroidery and knit-covered buttons',
        label: 'Raspberry',
      },
      {
        src: IMAGES.cardiganOffWhite,
        alt: 'Off-white knit cardigan with hand-applied floral embroidery and scalloped placket',
        label: 'Off-White',
      },
    ],
    tags: ['Hand-embroidered', 'Ruffled neckline', 'Knit-covered buttons'],
  },
  {
    slug: 'butterfly-knit-base-layer',
    name: '3D Butterfly Hollow-Out Knit Base Layer',
    category: 'womens-knit-base-layers',
    tagline: 'Non-sheer hollow-out with 3D embossed butterfly craft',
    colorways: ['Off-White'],
    size: 'To your size chart',
    summary:
      'An openwork base layer where embossed butterfly motifs are knitted in relief over a hollow-out ground, balanced to stay non-sheer.',
    details: [
      '3D embossed butterfly motifs knitted in relief',
      'Hollow-out ground engineered to remain non-sheer',
      'Lettuce-edge neckline and hem',
      'Lightweight hand for layering under cardigans',
    ],
    specs: [
      { label: 'Category', value: 'Women\u2019s Knit Base Layers' },
      { label: 'Colourway shown', value: 'Off-White' },
      { label: 'Structure', value: 'Hollow-out ground with embossed motif' },
      { label: 'Edge', value: 'Lettuce-edge trim' },
      { label: 'Gauge', value: 'HP2-52S 7G flat knitting' },
      { label: 'MOQ', value: '5 pcs per style' },
      { label: 'Sampling', value: '4\u201315 days, charged' },
    ],
    images: [
      {
        src: IMAGES.butterfly,
        alt: 'Off-white openwork knit base layer with embossed butterfly motifs',
        label: 'Off-White',
      },
    ],
    tags: ['3D embossed', 'Hollow-out', 'Non-sheer'],
  },
  {
    slug: 'baicha-knit-sweater',
    name: 'White Tea Openwork Ribbed Knit Sweater',
    category: 'womens-knit-sweaters',
    tagline: 'Vertical eyelet ribbed knit with lettuce-edge trim',
    colorways: ['Off-White'],
    size: 'To your size chart',
    summary:
      'A mock-neck pullover where vertical eyelet columns alternate with raised ribs, finished with a lettuce-edge neck, hem and cuffs.',
    details: [
      'Vertical eyelet columns between raised knit ribs',
      'Lettuce-edge trim on neck, hem and cuffs',
      'Relaxed straight body with flared cuffs',
      'Fine-gauge 7G hand for year-round layering',
    ],
    specs: [
      { label: 'Category', value: 'Women\u2019s Knit Sweaters & Cardigans' },
      { label: 'Colourway shown', value: 'Off-White' },
      { label: 'Structure', value: 'Vertical eyelet rib' },
      { label: 'Edge', value: 'Lettuce-edge trim' },
      { label: 'Gauge', value: 'HP2-52S 7G flat knitting' },
      { label: 'MOQ', value: '5 pcs per style' },
      { label: 'Sampling', value: '4\u201315 days, charged' },
    ],
    images: [
      {
        src: IMAGES.baicha,
        alt: 'Off-white mock-neck sweater with vertical eyelet ribbing and lettuce-edge trim',
        label: 'Off-White',
      },
    ],
    tags: ['Eyelet rib', 'Lettuce-edge', 'Mock neck'],
  },
]

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id)
}

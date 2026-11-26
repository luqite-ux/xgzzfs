import { IMAGES } from '@/lib/site'

export interface NewsPost {
  slug: string
  title: string
  date: string
  tag: string
  excerpt: string
  image: string
  imageAlt: string
  body: string[]
}

export const NEWS: NewsPost[] = [
  {
    slug: 'brief-a-knitwear-tech-pack',
    title: 'How to brief a knitwear tech pack for faster 7G sampling',
    date: '2026-11-12',
    tag: 'Sampling',
    excerpt:
      'The five details that shorten a first sample round: gauge, yarn, measurements, stitch references and trim callouts.',
    image: IMAGES.inspection,
    imageAlt: 'Quality inspector checking sweater measurements on a finishing rack',
    body: [
      'A clear tech pack is the quickest route to a correct first sample. For knitwear, the file should state the target gauge, the yarn composition and count, and a full measurement chart with tolerances.',
      'Add close-up references for every stitch structure. A photo of a similar swatch, or a hand sketch of the rib, eyelet or embossed repeat, removes most of the guesswork on the knitting programme.',
      'List trims and finishing together: button type, neckline edge (for example lettuce-edge or scalloped), label placement and any hand-applied embroidery. These are the details that most often change between sample rounds.',
      'Send the pack with your target colourways and quantities per style. Samples are charged, and our sampling window is 4\u201315 days depending on structure complexity.',
    ],
  },
  {
    slug: 'choosing-a-knit-structure',
    title: 'Choosing a knit structure: stockinette, rib, eyelet and openwork',
    date: '2026-10-22',
    tag: 'Knit Guide',
    excerpt:
      'A buyer-friendly guide to how structure changes drape, opacity and cost on a 7G flat knitting machine.',
    image: IMAGES.baicha,
    imageAlt: 'Off-white knit sweater with vertical eyelet ribbing',
    body: [
      'Stockinette is the smooth jersey face most buyers picture first. It is the most stable ground for hand-applied embroidery, as on our raspberry and off-white cardigan.',
      'Rib structures add vertical stretch and shape. Alternating raised knit columns with recessed purl grooves gives a sweater body that holds its line without extra seams.',
      'Eyelet and openwork structures introduce intentional holes. The key decision is opacity: a hollow-out ground can be balanced with a denser embossed motif so a base layer stays non-sheer.',
      'Use the 7G Knit Studio on our home page to orbit each structure before you brief a sample.',
    ],
  },
  {
    slug: 'from-signed-sample-to-export-carton',
    title: 'From signed sample to export carton: our five-stage workflow',
    date: '2026-09-18',
    tag: 'Production',
    excerpt:
      'How a style moves from tech pack and sampling through knitting, finishing, inspection and export packing.',
    image: IMAGES.workshop,
    imageAlt: 'Computerized flat knitting machines running in the Suzhou workshop',
    body: [
      'Every order starts with a tech pack and a charged sample. Bulk production begins only after you sign the sample approval, so both sides work from the same physical reference.',
      'Knitting runs on HP2-52S 7G computerized flat machines. Panels are then linked, hand finished and checked piece by piece.',
      'Milestone photo updates are shared during knitting, finishing and packing. You can appoint a third-party inspector before export packing.',
      'If an issue is found within 7 days of arrival, send photos and the order reference and we will agree a resolution with you.',
    ],
  },
]

export function getPost(slug: string) {
  return NEWS.find((p) => p.slug === slug)
}

export function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

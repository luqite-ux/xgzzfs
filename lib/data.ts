import { createClient } from '@supabase/supabase-js'
import { R2_BASE, TENANT_ID } from '@/lib/site'

export type CategoryId = 'womens-knit-sweaters' | 'womens-knit-base-layers'

export interface StoreCategory {
  id: string
  slug: CategoryId | string
  name: string
  blurb: string
  image: string
  imageAlt: string
}

export interface StoreProduct {
  id: string
  slug: string
  model: string
  name: string
  category: string
  categoryName: string
  tagline: string
  colorways: string[]
  size: string
  summary: string
  description: string
  details: string[]
  applications: string[]
  advantages: string[]
  specs: { label: string; value: string }[]
  images: { src: string; alt: string; label: string }[]
  tags: string[]
  updatedAt?: string
}

export interface StoreArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string | null
  publishedAt: string
}

const FALLBACK_CATEGORIES: StoreCategory[] = [
  {
    id: 'cat-sweaters',
    slug: 'womens-knit-sweaters',
    name: "Women's Knit Sweaters & Cardigans",
    blurb:
      'Hand-embroidered wool cardigans and custom 7G flat-knit women sweaters built for private-label collections.',
    image: `${R2_BASE}/products/yunjian-huaxu/yh-01.jpg`,
    imageAlt: 'Raspberry wool knit cardigan with pure hand floral embroidery and knit-covered buttons',
  },
  {
    id: 'cat-base-layers',
    slug: 'womens-knit-base-layers',
    name: "Women's Knit Base Layers",
    blurb:
      'Openwork vertical eyelet ribbed sweaters and 3D embossed butterfly hollow-out base layers with lettuce-edge trims.',
    image: `${R2_BASE}/products/butterfly-base/bf-00-front.jpg`,
    imageAlt: 'Off-white hollow-out knit base layer with 3D embossed butterfly motifs',
  },
]

const YH_GALLERY = [
  { src: `${R2_BASE}/products/yunjian-huaxu/yh-01.jpg`, label: 'Raspberry — Front View', alt: 'Yunjian Huaxu raspberry wool cardigan front view with hand floral embroidery' },
  { src: `${R2_BASE}/products/yunjian-huaxu/yh-02.jpg`, label: 'Raspberry — Placket Detail', alt: 'Close-up of scalloped neckline and fabric-covered knit buttons in raspberry' },
  { src: `${R2_BASE}/products/yunjian-huaxu/yh-03.jpg`, label: 'Raspberry — Embroidery Close-Up', alt: 'Hand-crafted 3D floral wool embroidery cluster detail' },
  { src: `${R2_BASE}/products/yunjian-huaxu/yh-04.jpg`, label: 'Raspberry — Back Silhouette', alt: 'Back view of loose-fitting raspberry wool knit cardigan' },
  { src: `${R2_BASE}/products/yunjian-huaxu/yh-05.jpg`, label: 'Raspberry — Ribbed Cuff', alt: 'Ribbed sleeve cuff and brushed wool yarn texture in raspberry' },
  { src: `${R2_BASE}/products/yunjian-huaxu/yh-06.jpg`, label: 'Raspberry — Hem & Drape', alt: 'Folded drape and knit density of raspberry wool cardigan' },
  { src: `${R2_BASE}/products/yunjian-huaxu/yh-07.jpg`, label: 'Off-White — Front View', alt: 'Yunjian Huaxu off-white wool cardigan front view with floral embroidery' },
  { src: `${R2_BASE}/products/yunjian-huaxu/yh-08.jpg`, label: 'Off-White — Embroidery Detail', alt: 'Off-white 3D hand floral embroidery and ruffled collar' },
  { src: `${R2_BASE}/products/yunjian-huaxu/yh-09.jpg`, label: 'Off-White — Button Placket', alt: 'Color-matched knit-covered buttons on off-white cardigan' },
  { src: `${R2_BASE}/products/yunjian-huaxu/yh-10.jpg`, label: 'Off-White — Back View', alt: 'Back view of off-white brushed wool cardigan' },
  { src: `${R2_BASE}/products/yunjian-huaxu/yh-11.jpg`, label: 'Off-White — Sleeve & Cuff', alt: 'Ribbed sleeve finish on off-white wool cardigan' },
  { src: `${R2_BASE}/products/yunjian-huaxu/yh-12.jpg`, label: 'Off-White — Fabric Texture', alt: 'Soft brushed wool texture close-up in off-white' },
  { src: `${R2_BASE}/products/yunjian-huaxu/yh-excel-embed.jpg`, label: 'Studio Master View', alt: 'High-resolution studio master view of Yunjian Huaxu embroidered cardigan' },
]

const BF_GALLERY = [
  { src: `${R2_BASE}/products/butterfly-base/bf-00-front.jpg`, label: 'Off-White — Draped Front', alt: '3D embossed butterfly hollow-out knit base layer draped front view' },
  { src: `${R2_BASE}/products/butterfly-base/bf-01.jpg`, label: 'Off-White — Flat Lay Front', alt: 'Flat-lay front view of off-white 3D butterfly knit base layer' },
  { src: `${R2_BASE}/products/butterfly-base/bf-02.jpg`, label: 'Off-White — Back View', alt: 'Back view of non-sheer hollow-out butterfly knit base layer' },
  { src: `${R2_BASE}/products/butterfly-base/bf-03.jpg`, label: 'Off-White — Neckline Trim', alt: 'Lettuce-edge ruffled crew neckline detail' },
  { src: `${R2_BASE}/products/butterfly-base/bf-04.jpg`, label: 'Off-White — Sleeve Motif', alt: '3D embossed butterfly jacquard along sleeve and ruffled cuff' },
  { src: `${R2_BASE}/products/butterfly-base/bf-05.jpg`, label: 'Off-White — Relief Texture', alt: 'Close-up of raised butterfly embroidery over openwork knit ground' },
  { src: `${R2_BASE}/products/butterfly-base/bf-06.jpg`, label: 'Off-White — Hem Detail', alt: 'Scalloped lettuce-edge hem construction' },
  { src: `${R2_BASE}/products/butterfly-base/bf-07.jpg`, label: 'Off-White — Shoulder Seam', alt: 'Clean shoulder linking seam on off-white knit base layer' },
  { src: `${R2_BASE}/products/butterfly-base/bf-08.jpg`, label: 'Off-White — Folded Layering', alt: 'Folded knit base layer showing soft skin-friendly drape' },
  { src: `${R2_BASE}/products/butterfly-base/bf-09.jpg`, label: 'Off-White — Openwork Macro', alt: 'Macro inspection of breathable non-sheer hollow-out mesh' },
  { src: `${R2_BASE}/products/butterfly-base/bf-excel-embed.jpg`, label: 'Studio Master View', alt: 'High-resolution studio master view of 3D butterfly knit base layer' },
]

const BC_GALLERY = [
  { src: `${R2_BASE}/products/baicha/bc-01-front-a.jpg`, label: 'Off-White — Front View', alt: 'White Tea off-white vertical eyelet ribbed knit sweater front view' },
  { src: `${R2_BASE}/products/baicha/bc-02-front-b.jpg`, label: 'Off-White — Alternate Front', alt: 'White Tea knit sweater full silhouette showing lettuce-edge mock neck' },
  { src: `${R2_BASE}/products/baicha/bc-03-back.jpg`, label: 'Off-White — Back View', alt: 'Back view of White Tea vertical eyelet ribbed knit sweater' },
  { src: `${R2_BASE}/products/baicha/bc-detail-01.jpg`, label: 'Eyelet Rib Texture', alt: 'Macro view of vertical eyelet openwork columns and raised ribs' },
  { src: `${R2_BASE}/products/baicha/bc-detail-02.jpg`, label: 'Mock Neck Ruffle', alt: 'Lettuce-edge ruffled mock neck finish' },
  { src: `${R2_BASE}/products/baicha/bc-detail-03.jpg`, label: 'Sleeve & Cuff Trim', alt: 'Flared cuff with lettuce-edge trim on White Tea knit sweater' },
  { src: `${R2_BASE}/products/baicha/bc-detail-04.jpg`, label: 'Hem Detail', alt: 'Wavy lettuce-edge bottom hem construction' },
  { src: `${R2_BASE}/products/baicha/bc-detail-05.jpg`, label: 'Yarn Handfeel', alt: 'Close-up of soft off-white fine knit drape' },
  { src: `${R2_BASE}/products/baicha/bc-detail-06.jpg`, label: 'Shoulder Linking', alt: 'Precision shoulder linking seam on White Tea knit sweater' },
  { src: `${R2_BASE}/products/baicha/bc-excel-embed.jpg`, label: 'Studio Master View', alt: 'High-resolution studio master view of White Tea ribbed knit sweater' },
]

const FALLBACK_PRODUCTS: StoreProduct[] = [
  {
    id: '5d8f9125-a3c9-4778-a244-c1227980efea',
    slug: 'yunjian-huaxu-cardigan',
    model: 'XG-YJHX-01',
    name: 'Yunjian Huaxu Hand-Embroidered Wool Knit Cardigan',
    category: 'womens-knit-sweaters',
    categoryName: "Women's Knit Sweaters & Cardigans",
    tagline: 'Pure hand floral embroidery, ruffled neckline & knit-covered buttons',
    colorways: ['Raspberry', 'Off-White'],
    size: 'One Size (Custom OEM grading available)',
    summary:
      'Lightweight, soft, and warm loose-fitting wool knit cardigan featuring pure hand-crafted 3D floral embroidery, scalloped ruffled neckline, and fabric-covered knit buttons in Raspberry and Off-White.',
    description:
      'Heavy-duty pure hand embroidery crafted onto a lightweight, soft, and warm brushed wool knit body. Designed with a relaxed loose-fitting cardigan silhouette, functional knit-covered buttons, and a delicate scalloped ruffled neckline. The regular shoulder construction flatters sloping and rounded shoulders, offered in brightening Raspberry and timeless Off-White.',
    details: [
      'Pure hand-crafted 3D floral embroidery across the upper bodice',
      'Delicate scalloped ruffled neckline and front placket trim',
      'Color-matched fabric-covered functional knit buttons',
      'Regular shoulder tailoring suited for sloping or rounded shoulders',
      'Available in Raspberry and Off-White with custom dyeing for OEM orders',
    ],
    applications: [
      "Women's contemporary fashion brands & seasonal knitwear capsules",
      'Cross-border apparel e-commerce boutiques',
      'Wholesale knitwear distributors & private-label ODM programs',
    ],
    advantages: [
      'Low 5-piece MOQ per style for agile market testing',
      '4\u201315 days sampling and bulk delivery on HP2-52S 7G flat knitting lines',
      '6-stage quality control from incoming yarn check to 100% final piece inspection',
    ],
    specs: [
      { label: 'Model', value: 'XG-YJHX-01' },
      { label: 'Category', value: "Women's Knit Sweaters & Cardigans" },
      { label: 'Colors', value: 'Raspberry, Off-White (Custom colors supported)' },
      { label: 'Size', value: 'One Size (Custom grading S\u2013XL available)' },
      { label: 'Craftsmanship', value: 'Pure Hand 3D Floral Embroidery, Scalloped Trim, Knit-Covered Buttons' },
      { label: 'Gauge', value: '7G Computerized Flat Knit (HP2-52S)' },
      { label: 'MOQ', value: '5 pcs per style' },
      { label: 'Lead Time', value: '4\u201315 days (Sampling & Bulk)' },
    ],
    images: YH_GALLERY,
    tags: ['Hand-Embroidered', 'Wool Cardigan', '2 Colorways'],
  },
  {
    id: 'fb9a2b6e-5aa5-4468-81e8-146391126acf',
    slug: 'butterfly-knit-base-layer',
    model: 'XG-HDDS-02',
    name: '3D Embossed Butterfly Hollow-Out Knit Base Layer',
    category: 'womens-knit-base-layers',
    categoryName: "Women's Knit Base Layers",
    tagline: 'Non-sheer hollow-out knit with all-over 3D embossed butterfly craft',
    colorways: ['Off-White'],
    size: 'One Size (Custom OEM grading available)',
    summary:
      'Soft, skin-friendly, non-sheer hollow-out knit base layer featuring heavy-duty 3D embossed butterfly motifs and lettuce-edge trims for versatile multi-season layering.',
    description:
      'Engineered with a refined hollow-out mesh knit that remains non-sheer for confident everyday wear with subtle textured depth. Heavy-duty 3D embossed butterfly motifs are knitted directly across the bodice and sleeves, delivering a tactile luxury finish. Finished with delicate lettuce-edge ruffled neckline, cuffs, and hem, this gentle, itch-free base layer pairs effortlessly under coats, down jackets, and cardigans.',
    details: [
      'Intricate hollow-out openwork knit that stays non-sheer',
      'All-over 3D embossed butterfly motif knitted into body and sleeves',
      'Soft, skin-friendly, itch-free yarn finish for next-to-skin comfort',
      'Delicate ruffled lettuce-edge crew neckline, sleeve cuffs, and hem',
      'Versatile layering silhouette under wool coats, down jackets, and cardigans',
    ],
    applications: [
      'Autumn/winter layering collections for fashion retailers',
      'Cross-border boutique e-commerce & contemporary knitwear lines',
      'Private-label OEM/ODM base-layer programs',
    ],
    advantages: [
      'Low 5-piece MOQ per style with custom color & size grading support',
      '4\u201315 days sampling and bulk delivery with milestone progress photos',
      '100% final piece inspection and third-party pre-shipment inspection supported',
    ],
    specs: [
      { label: 'Model', value: 'XG-HDDS-02' },
      { label: 'Category', value: "Women's Knit Base Layers" },
      { label: 'Color', value: 'Off-White (Custom colors supported)' },
      { label: 'Size', value: 'One Size (Custom grading supported)' },
      { label: 'Craftsmanship', value: '3D Embossed Butterfly Jacquard & Non-Sheer Hollow-Out Knit' },
      { label: 'Trim', value: 'Lettuce-Edge Ruffled Neckline, Cuffs & Hem' },
      { label: 'MOQ', value: '5 pcs per style' },
      { label: 'Lead Time', value: '4\u201315 days (Sampling & Bulk)' },
    ],
    images: BF_GALLERY,
    tags: ['3D Butterfly', 'Non-Sheer Openwork', 'Lettuce Trim'],
  },
  {
    id: '20c8c6cc-de4c-433f-b2ce-462c33589ddf',
    slug: 'baicha-knit-sweater',
    model: 'XG-BC-03',
    name: 'White Tea Openwork Ribbed Knit Sweater',
    category: 'womens-knit-base-layers',
    categoryName: "Women's Knit Base Layers",
    tagline: 'Vertical eyelet ribbed knit with lettuce-edge mock neck & cuffs',
    colorways: ['Off-White'],
    size: 'One Size (Custom OEM grading available)',
    summary:
      'Clean off-white vertical eyelet ribbed knit long-sleeve sweater finished with a refined lettuce-edge mock neck, cuffs, and hem for versatile standalone or layered styling.',
    description:
      'Crafted in a luminous off-white knit featuring crisp vertical eyelet openwork ribbing that elongates the silhouette while maintaining breathable comfort. Detailed with subtle lettuce-edge ruffled trims along the mock neck collar, long sleeve cuffs, and bottom hem, this refined essential adapts seamlessly to daily office wear, seasonal layering, and private-label capsule collections.',
    details: [
      'Crisp vertical eyelet openwork ribbed knit texture across body and sleeves',
      'Delicate lettuce-edge ruffled mock neckline, sleeve cuffs, and hem',
      'Soft off-white shade suited for standalone wear or under outer layers',
      'Full OEM/ODM customization of yarn weight, color palette, and private labels',
    ],
    applications: [
      'Everyday office, commuter, and minimalist women knitwear lines',
      'Cross-border apparel sellers & boutique knitwear brands',
      'Private-label OEM/ODM seasonal layering essentials',
    ],
    advantages: [
      'Low 5-piece MOQ per style for flexible trial runs',
      '4\u201315 days sampling and bulk delivery with signed pre-production sample approval',
      '6-stage in-house quality control and third-party inspection support',
    ],
    specs: [
      { label: 'Model', value: 'XG-BC-03' },
      { label: 'Category', value: "Women's Knit Base Layers" },
      { label: 'Color', value: 'Off-White (Custom colors supported)' },
      { label: 'Size', value: 'One Size (Custom grading supported)' },
      { label: 'Knit Structure', value: 'Vertical Eyelet Openwork Ribbed Knit' },
      { label: 'Trim', value: 'Lettuce-Edge Mock Neck, Cuffs & Hem' },
      { label: 'MOQ', value: '5 pcs per style' },
      { label: 'Lead Time', value: '4\u201315 days (Sampling & Bulk)' },
    ],
    images: BC_GALLERY,
    tags: ['Eyelet Rib', 'Mock Neck', 'Lettuce Trim'],
  },
]

// Server-side TTL cache + in-flight deduplication (SUPABASE-PUBLIC-READ-BUDGET)
const CACHE_TTL_MS = 5 * 60 * 1000
interface Snapshot {
  categories: StoreCategory[]
  products: StoreProduct[]
  articles: StoreArticle[]
  fetchedAt: number
  source: 'supabase' | 'fallback'
}
let cachedSnapshot: Snapshot | null = null
let inflightPromise: Promise<Snapshot> | null = null

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

async function fetchLiveSnapshot(): Promise<Snapshot> {
  const client = getSupabase()
  if (!client) {
    return {
      categories: FALLBACK_CATEGORIES,
      products: FALLBACK_PRODUCTS,
      articles: [],
      fetchedAt: Date.now(),
      source: 'fallback',
    }
  }

  try {
    const [catRes, prodRes, artRes] = await Promise.all([
      client
        .from('product_categories')
        .select('id, slug, name, name_en, name_i18n, sort_order, is_active')
        .eq('tenant_id', TENANT_ID)
        .eq('is_active', true)
        .order('sort_order', { ascending: true }),
      client
        .from('products')
        .select('id, slug, model, name, name_en, name_i18n, category, category_slug, overview, overview_en, description, description_en, image_url, features, applications, advantages, specs, extra_data, sort_order, is_active, updated_at')
        .eq('tenant_id', TENANT_ID)
        .eq('is_active', true)
        .order('sort_order', { ascending: true }),
      client
        .from('articles')
        .select('id, slug, title, excerpt, content, featured_image, published_at, status')
        .eq('tenant_id', TENANT_ID)
        .eq('status', 'published')
        .order('published_at', { ascending: false }),
    ])

    const categories: StoreCategory[] =
      catRes.data && catRes.data.length > 0
        ? catRes.data.map((row: Record<string, unknown>) => {
            const fb = FALLBACK_CATEGORIES.find((c) => c.slug === row.slug)
            return {
              id: String(row.id),
              slug: String(row.slug),
              name: String(row.name_en || row.name || fb?.name || ''),
              blurb: fb?.blurb || 'OEM/ODM women knitwear manufactured on HP2-52S 7G flat knitting lines.',
              image: fb?.image || `${R2_BASE}/products/yunjian-huaxu/yh-01.jpg`,
              imageAlt: fb?.imageAlt || String(row.name_en || row.name || ''),
            }
          })
        : FALLBACK_CATEGORIES

    const products: StoreProduct[] =
      prodRes.data && prodRes.data.length > 0
        ? prodRes.data.map((row: Record<string, unknown>) => {
            const slug = String(row.slug || '')
            const fb = FALLBACK_PRODUCTS.find((p) => p.slug === slug)
            const extra = (row.extra_data as Record<string, unknown>) || {}
            const galleryUrls = Array.isArray(extra.gallery) ? (extra.gallery as string[]) : []
            const images =
              galleryUrls.length > 0
                ? galleryUrls.map((src, idx) => ({
                    src,
                    label: fb?.images[idx]?.label || `View ${idx + 1}`,
                    alt: fb?.images[idx]?.alt || `${String(row.name_en || row.name)} view ${idx + 1}`,
                  }))
                : fb?.images || [{ src: String(row.image_url || ''), label: 'Primary', alt: String(row.name_en || row.name) }]
            const rawSpecs = (row.specs as Record<string, string>) || {}
            const specs =
              Object.keys(rawSpecs).length > 0
                ? Object.entries(rawSpecs).map(([label, value]) => ({ label, value: String(value) }))
                : fb?.specs || []

            return {
              id: String(row.id),
              slug,
              model: String(row.model || fb?.model || ''),
              name: String(row.name_en || row.name || fb?.name || ''),
              category: String(row.category_slug || fb?.category || 'womens-knit-sweaters'),
              categoryName: String(row.category || fb?.categoryName || ''),
              tagline: fb?.tagline || String(row.overview_en || row.overview || '').slice(0, 88),
              colorways: fb?.colorways || ['Custom'],
              size: fb?.size || 'One Size',
              summary: String(row.overview_en || row.overview || fb?.summary || ''),
              description: String(row.description_en || row.description || fb?.description || ''),
              details: Array.isArray(row.features) && row.features.length ? (row.features as string[]) : fb?.details || [],
              applications: Array.isArray(row.applications) && row.applications.length ? (row.applications as string[]) : fb?.applications || [],
              advantages: Array.isArray(row.advantages) && row.advantages.length ? (row.advantages as string[]) : fb?.advantages || [],
              specs,
              images,
              tags: fb?.tags || ['OEM / ODM', '7G Knit'],
              updatedAt: row.updated_at ? String(row.updated_at) : undefined,
            }
          })
        : FALLBACK_PRODUCTS

    const articles: StoreArticle[] = (artRes.data || []).map((row: Record<string, unknown>) => ({
      id: String(row.id),
      slug: String(row.slug),
      title: String(row.title || ''),
      excerpt: String(row.excerpt || ''),
      content: String(row.content || ''),
      coverImage: row.featured_image ? String(row.featured_image) : null,
      publishedAt: String(row.published_at || new Date().toISOString()),
    }))

    return { categories, products, articles, fetchedAt: Date.now(), source: 'supabase' }
  } catch {
    return {
      categories: FALLBACK_CATEGORIES,
      products: FALLBACK_PRODUCTS,
      articles: [],
      fetchedAt: Date.now(),
      source: 'fallback',
    }
  }
}

export async function getStoreSnapshot(): Promise<Snapshot> {
  if (cachedSnapshot && Date.now() - cachedSnapshot.fetchedAt < CACHE_TTL_MS) {
    return cachedSnapshot
  }
  if (!inflightPromise) {
    inflightPromise = fetchLiveSnapshot().finally(() => {
      inflightPromise = null
    })
  }
  cachedSnapshot = await inflightPromise
  return cachedSnapshot
}

export async function getStoreCategories() {
  return (await getStoreSnapshot()).categories
}

export async function getStoreProducts() {
  return (await getStoreSnapshot()).products
}

export async function getStoreProduct(slug: string) {
  const products = await getStoreProducts()
  return products.find((p) => p.slug === slug) ?? null
}

export async function getStoreArticles() {
  return (await getStoreSnapshot()).articles
}

export async function getStoreArticle(slug: string) {
  const articles = await getStoreArticles()
  return articles.find((a) => a.slug === slug) ?? null
}

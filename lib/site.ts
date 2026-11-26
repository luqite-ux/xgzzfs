export const TENANT_ID =
  process.env.NEXT_PUBLIC_TENANT_ID || '3730d1b9-f198-4ca8-a78e-3565d338d1b5'

export const R2_BASE =
  'https://pub-c7a22068052144a5805830c30d280128.r2.dev/site-assets/xgzzfs'

export const SITE = {
  name: 'Suzhou Xigong Knitting Apparel Co., Ltd.',
  shortName: 'Suzhou Xigong Knitting Apparel',
  url: 'https://xgzzfs.com',
  email: 'info@xgzzfs.com',
  phone: '+86 132 9516 0880',
  phoneHref: 'tel:+8613295160880',
  address:
    'Shop 109, Building 2, No. 676 Nanju Road, Hengshan, Songling Town, Wujiang District, Suzhou, Jiangsu, China',
  addressLines: [
    'Shop 109, Building 2, No. 676 Nanju Road',
    'Hengshan, Songling Town, Wujiang District',
    'Suzhou, Jiangsu, China',
  ],
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
] as const

export const IMAGES = {
  banners: [
    `${R2_BASE}/banners/banner-1.jpg`,
    `${R2_BASE}/banners/banner-2.jpg`,
    `${R2_BASE}/banners/banner-3.jpg`,
  ],
  cardiganRaspberry: `${R2_BASE}/products/yunjian-huaxu/yh-01.jpg`,
  cardiganOffWhite: `${R2_BASE}/products/yunjian-huaxu/yh-07.jpg`,
  baicha: `${R2_BASE}/products/baicha/bc-01-front-a.jpg`,
  butterfly: `${R2_BASE}/products/butterfly-base/bf-00-front.jpg`,
  workshop: `${R2_BASE}/factory/factory-07.jpg`,
  inspection: `${R2_BASE}/factory/factory-05.jpg`,
} as const

export const FACTORY_GALLERY = [
  {
    src: `${R2_BASE}/factory/factory-07.jpg`,
    title: 'Computerized Flat Knitting Aisle',
    caption: 'Dual rows of HP2-52S 7G computerized flat knitting machines running coordinated yarn feeds.',
    group: 'Knitting Floor',
  },
  {
    src: `${R2_BASE}/factory/factory-08.jpg`,
    title: 'Live Tension & Gauge Calibration',
    caption: 'Experienced knitting technicians monitoring stitch density and yarn tension during panel production.',
    group: 'Knitting Floor',
  },
  {
    src: `${R2_BASE}/factory/factory-03.jpg`,
    title: '7G Needle Bed Precision',
    caption: 'Close-up of uniform rib structure forming directly off the 7-gauge computerized needle bed.',
    group: 'Knitting Floor',
  },
  {
    src: `${R2_BASE}/factory/factory-04.jpg`,
    title: 'Hand Finishing & Button Assembly',
    caption: 'Dedicated finishing tables for seam trimming, knit-covered button attachment, and placket alignment.',
    group: 'Finishing Line',
  },
  {
    src: `${R2_BASE}/factory/factory-05.jpg`,
    title: '100% Piece-by-Piece Quality Inspection',
    caption: 'Hanging garment inspection line checking measurements, stitch integrity, and finish against signed samples.',
    group: 'Quality Control',
  },
  {
    src: `${R2_BASE}/factory/factory-02.jpg`,
    title: 'Finished Garment & Yarn Warehouse',
    caption: 'High-bay storage racks organizing bulk knitwear lots, poly-bagged styles, and export-ready cartons.',
    group: 'Warehousing',
  },
  {
    src: `${R2_BASE}/factory/factory-01.jpg`,
    title: 'Wujiang Production Facility & Loading Bay',
    caption: 'Direct factory dispatch bays in Suzhou Wujiang supporting scheduled regional and export freight.',
    group: 'Logistics',
  },
] as const

export const KPIS = [
  {
    eyebrow: 'Est.',
    value: '2014',
    label: '20+ Years Knitwear Craft',
  },
  {
    eyebrow: 'Facility',
    value: '1,000 m\u00B2',
    label: 'Facility & HP2-52S 7G Flat Knitting',
  },
  {
    eyebrow: 'Capacity',
    value: '100K\u2013300K pcs',
    label: 'Monthly Capacity',
  },
  {
    eyebrow: 'MOQ',
    value: '5 pcs',
    label: 'MOQ \u00B7 4\u201315 Days Sampling & Bulk Lead Time',
  },
] as const

export const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Tech Pack & Yarn Brief',
    detail: 'Share drawings, reference garments, or target specs. We match gauge, yarn weight, colorways, and trims.',
    meta: 'OEM & ODM',
  },
  {
    step: '02',
    title: 'Sampling & Signed Approval',
    detail: 'Prototypes knitted and finished in 4\u201315 days. Bulk starts only after your signed sample confirmation.',
    meta: '4\u201315 Days',
  },
  {
    step: '03',
    title: 'HP2-52S 7G Knitting',
    detail: 'Computerized flat knitting runs with milestone progress updates and workshop photos at key stages.',
    meta: '100K\u2013300K / mo',
  },
  {
    step: '04',
    title: 'Finishing & 100% Piece QC',
    detail: 'Hand embroidery, trimming, steam shaping, and full-piece inspection following our 6-stage QC workflow.',
    meta: '6-Stage QC',
  },
  {
    step: '05',
    title: 'Third-Party Check & Export',
    detail: 'Pre-shipment third-party inspection welcomed. Export cartons packed and dispatched on contracted schedule.',
    meta: 'On-Schedule',
  },
] as const

export const QC_CHECKPOINTS = [
  'Incoming yarn & fabric check',
  'Cutting & panel calibration',
  'Linking & sewing check',
  'Finishing, embroidery & trim review',
  '100% final piece inspection',
  'Export packing & third-party inspection',
] as const

export const FAQ_ITEMS = [
  {
    id: 'faq-moq',
    group: 'MOQ & Pricing',
    question: 'What is the minimum order quantity (MOQ)?',
    answer:
      'Standard MOQ is 5 pieces per style. Trial orders for new buyers or complex custom knitwear styles are negotiable. Long-term partners may establish annual pricing, and bulk volume orders qualify for dedicated discounts.',
  },
  {
    id: 'faq-custom',
    group: 'OEM / ODM Customization',
    question: 'Do you support customized size, material, color, or craft?',
    answer:
      'Yes. We customize sizing, yarn/fabric composition, colors, printing, and hand or machine embroidery based on your drawings, physical samples, or technical packs. ODM buyers can also private-label our existing styles.',
  },
  {
    id: 'faq-sample',
    group: 'Sampling & Approval',
    question: 'How do sampling fees, shipping, and lead times work?',
    answer:
      'Samples are charged (non-refundable) with freight covered by the buyer, and are typically completed in 4\u201315 days depending on style complexity. Bulk production begins only after you sign off on the confirmed sample.',
  },
  {
    id: 'faq-leadtime',
    group: 'Production & Delivery',
    question: 'What is the bulk production lead time and can you expedite?',
    answer:
      'Bulk orders take approximately 4\u201315 days depending on style and quantity, with stable contracted schedules even during regular peak periods. Expedited production lines can be coordinated based on live capacity, with photo updates at pattern, cutting, sewing, finishing, and dispatch milestones.',
  },
  {
    id: 'faq-qc',
    group: 'Quality & Inspection',
    question: 'What quality control steps do you follow and is third-party inspection available?',
    answer:
      'Every order passes through incoming fabric inspection, cutting, sewing, finishing, 100% final piece inspection, and packing. Pre-shipment third-party inspection is supported. Any quality issue reported within 7 days of arrival is resolved through repair, remake, or return according to actual findings.',
  },
  {
    id: 'faq-pricing-terms',
    group: 'Commercial Terms',
    question: 'What is included in your quotation and which buyers do you serve?',
    answer:
      'Standard quotations cover packaging, shipping, and applicable taxes as agreed per order, without unexpected mid-order raw-material or currency surcharges. We serve women\u2019s fashion brands, cross-border e-commerce sellers, wholesale traders, and private-label buyers.',
  },
] as const

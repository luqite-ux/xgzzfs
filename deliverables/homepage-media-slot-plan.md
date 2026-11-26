# Homepage Media Slot Plan & Full-Site B2B Procurement Path

## 1. Buyer Decision Coverage Table (VIS-HOMEPAGE-DECISION-COVERAGE)
| Buyer Question | Status | Verified Source | Homepage Section | Next CTA / Inner Route |
|---|---|---|---|---|
| 卖什么 / 如何选 (What we make & how to select) | COVERED | `企业资料!C8`, `产品信息!A5:H7`, `产品图片/*` | `hero-carousel`, `product-categories`, `featured-products` | `/products`, `/products/[slug]` |
| 适合谁或什么应用 (Target buyers & scenarios) | COVERED | `企业资料!C15`, `FAQ!D8` | `hero-carousel`, `threejs-knit-studio`, `oem-odm-workflow` | `/about`, `/products` |
| 为什么可信 (Why trust this factory) | COVERED | `企业资料!C15:C18`, `工厂实拍图片/*`, `FAQ!D26:D27` | `factory-metrics`, `manufacturing-gallery` | `/manufacturing`, `/about` |
| 如何合作 / 交付 (OEM/ODM process, MOQ, lead time) | COVERED | `FAQ!D4:D29` | `oem-odm-workflow`, `buyer-faq` | `/manufacturing`, `/contact` |
| 如何发起询盘 (How to inquire) | COVERED | `域名+邮箱.txt`, `企业资料!C4,C6` | `contact-rfq` + Header/Product CTAs | `/contact` + RFQ form with CAPTCHA |

## 2. Section Logic & Media Slot Table (B2B-SECTION-LOGIC)
- `hero-carousel`: 3 customer 3840x1600 banners (`1.jpg`, `2.jpg`, `3.jpg`), per-slide adaptive contrast on left negative space.
- `factory-metrics`: 4 verified KPIs (2014, 1,000 m² / HP2-52S 7G, 100K–300K pcs/mo, 5 pcs MOQ / 4–15d).
- `product-categories`: 2 clickable category cards (`/products?category=womens-knit-sweaters`, `/products?category=womens-knit-base-layers`) using real studio covers.
- `threejs-knit-studio`: Interactive Three.js 7G Knit Structure & Yarn Topology Lab on light porcelain stage (3 real knit constructions + colorway toggle).
- `featured-products`: 3 equal-height product cards (no public prices) linking to detail pages.
- `oem-odm-workflow`: 5-stage OEM/ODM & 6-stage QC workflow.
- `manufacturing-gallery`: 4 curated real factory photos on homepage, all 7 unique factory photos on `/manufacturing`.
- `buyer-faq`: Grouped FAQ accordion covering MOQ, sampling, production, and QC (no warranty language).
- `contact-rfq`: Balanced 2-column contact & 4-digit CAPTCHA RFQ section with verified phone, email, and Suzhou address.

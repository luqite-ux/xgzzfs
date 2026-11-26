# Motion & Interactive Choreography Plan (苏州西宫针织服饰有限公司)

- **Industry**: Women's Knitwear & Sweater OEM/ODM Manufacturing
- **Aesthetic Direction**: Light porcelain editorial precision inspired by OpenAI / Antigravity light mode (NO dark/black theme) + interactive Three.js knitwear craft visualization.
- **Dedup Check vs Recent 3 Clients**: Distinct from recent Ningbo Yibo (rubber yoga mats 3D layer lab), Hangzhou Hengda (dark industrial worm gear 3D), and Hangzhou Tianlai (copper HVAC fittings 3D). Uses warm porcelain `#FAF9F7` canvas, rose-raspberry `#B83B5E` + cobalt `#1D4ED8` accents, and a procedural Three.js 7G knitted yarn/stitch wave topology studio.

## External Candidates Evaluated (3 candidates >= 2 required)
1. **EXT-XG-01 — Three.js Procedural 7G Knit Stitch & Yarn Wave Topology Studio (Light Porcelain Stage)** — **ADOPTED**: Directly fulfills the owner's explicit Three.js requirement while visualizing Suzhou Xigong's HP2-52S 7G flat-knitting, hand embroidery, and 3D butterfly openwork craftsmanship in an airy light aesthetic.
2. **EXT-XG-02 — Native IntersectionObserver Progressive Viewport Reveal (Zero Global Timeout)** — **ADOPTED**: Guarantees `VIS-MOTION-NO-PREMATURE-COMPLETION` and `VIS-MOTION-FAIL-SAFE-CONTENT-VISIBILITY` across all routes on desktop and 390px mobile.
3. **EXT-XG-03 — Full-Screen Heavy WebGL Particle Fog / Scroll-Jacking** — **REJECTED**: Interferes with garment photography clarity and degrades 390px mobile scroll responsiveness.

## Selected Motion Scenes (4 scenes)
1. **MOT-XG-01 (Narrative)**: Adaptive 3-slide Hero Banner Carousel with per-slide contrast typography transition, prev/next arrows, pagination dots, play/pause toggle, and `prefers-reduced-motion` auto-pause.
2. **MOT-XG-02 (Industry Feature — Three.js)**: Interactive Three.js 7G Knit Structure & Yarn Topology Lab (`/#threejs-knit-studio`) with 3 real garment stitch presets, colorway toggle, gentle cloth wave motion, pointer orbit, DPR <= 2 cap, IntersectionObserver off-screen pause, and `prefers-reduced-motion` static frame fallback.
3. **MOT-XG-03 (Content)**: Staggered `IntersectionObserver` viewport reveals (`20-28px` translateY, `550ms` cubic-bezier, `once: true` only after real viewport entry, zero global timeout) across all 9 homepage sections, product cards, factory gallery cards, and inner pages.
4. **MOT-XG-04 (Interactive)**: Controlled Header navigation dismiss, product category filter transitions, product detail multi-photo gallery switcher + lightbox, grouped FAQ accordion smooth height transition, and RFQ form + 4-digit CAPTCHA refresh feedback.

## Readiness Verification Plan
- **Desktop (1440x900 / 1920x1080)**: PASS (planned & verified in template/content/production Playwright audits)
- **Mobile (390x844)**: PASS (reduced displacement, zero horizontal overflow, DPR-capped Three.js canvas)
- **Reduced Motion (`prefers-reduced-motion: reduce`)**: PASS (disables auto-carousel, pauses Three.js wave loop to static high-clarity frame, renders all sections immediately visible)
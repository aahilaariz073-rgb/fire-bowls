# On-page keyword map — `index.html`

Which page element carries which target term. Keep this in sync when the copy changes,
and use it as the template for the next landing page.

| Target term | Where it lives on the page |
|---|---|
| pool fire bowls | `<title>`, meta description, H1, split H2 "Pool Fire Bowls: Fire on the Water's Edge", category card, area copy, footer |
| fire bowls | H1, nav, category cards, spec table, FAQ, area copy |
| fire and water bowls / fire and water features | meta description, H2 "Fire and Water Bowls: Two Elements, One Feature", category card, FAQ #1, footer |
| outdoor fire features | meta description, H2 "Every Kind of Outdoor Fire Feature & Fire Bowl System", area copy |
| pool fire features | hero subhead, category card, area copy |
| decorative fire features | category grid intro |
| modern fire bowls | H3 "Modern Freestanding Fire Bowls", hero subhead |
| outdoor fire bowl systems | H2 "…& Fire Bowl System", burners & ignition card |
| copper / GFRC / stainless fire bowls | trust strip, spec table row 1, FAQ #5, coastal area copy |
| scuppers / spillways / water features | category card, split section 2, footer |
| fire tables / fire pits | category card, footer |
| how many fire bowls does a pool need | FAQ #2 (also in FAQPage schema) |
| fire bowls for pool builders / trade pricing | audience band (pro card), trust strip, FAQ #6 |
| 20 city names | "Where We Work" section (list + regional copy) and `areaServed` schema |
| Orange County / coastal OC | title, meta, hero eyebrow, H2 "…Across Orange County", area note |

## Structural SEO in place

- `HomeAndConstructionBusiness` JSON-LD — NAP, `makesOffer` for six product lines,
  `areaServed` for all 20 cities
- `FAQPage` JSON-LD on six real questions
- Canonical, OG and Twitter card tags with the hero image
- Descriptive `aria-label`/`title` on both looping videos (they carry no alt text otherwise)
- `robots.txt` + `sitemap.xml`

## Density check (run after copy edits)

Visible body copy is ~2,150 words with "fire bowl" at ~1.7% density — deliberate. Push
the primary term much past ~2% and the page starts reading like it was written for a
crawler rather than a buyer, which costs conversions on a page whose whole job is
handing traffic to the main site.

# BellaFina Outdoors — Fire Bowls & Fire/Water Features Landing Page

Four-page landing site for BellaFina Outdoors' outdoor-living categories, each one
speaking to both homeowners and trade professionals:

- **Pool fire bowls & fire/water features** — the pool application
- **Outdoor fire pits & fire tables** — standalone gathering features on a patio
- **Outdoor kitchens & built-in BBQs** — complete kitchens down to single components
- **Outdoor pizza ovens** — built-in and freestanding, gas and wood-fired

The pages are deliberately kept distinct so they don't compete: the fire bowl page
owns the pool-adjacent terms, the fire pit page owns the standalone patio terms.

Static site (plain HTML/CSS/JS), deployed on Vercel. Production deploys from `main`.

## Structure

```
index.html                  Pool fire bowls & fire/water features   ->  /
fire-pits-fire-tables.html  Outdoor fire pits & fire tables         ->  /fire-pits-fire-tables
outdoor-kitchens-bbq.html   Outdoor kitchens & built-in BBQs        ->  /outdoor-kitchens-bbq
outdoor-pizza-ovens.html    Outdoor pizza ovens                     ->  /outdoor-pizza-ovens
assets/site.css             all shared styles for every page
assets/site.js              shared behaviour: lazy video, UTM passthrough, lead form, quote popup
assets/                     logo, hero image, two looping split-section videos
vercel.json                 cleanUrls + no trailing slash
robots.txt                  allow-all + sitemap reference
sitemap.xml                 all four pages
```

One repo, one Vercel project, one domain. `cleanUrls` in `vercel.json` maps each
`<name>.html` to `/<name>`, so adding a page means adding a file and a
`<url>` entry in `sitemap.xml` — no new project or repo required.

## Adding another page

1. Copy the closest existing page and change the `<head>` block: `<title>`,
   `<meta name="description">`, `<link rel="canonical">`, the OG/Twitter tags,
   and `data-lead-source` on `<body>` (that string is what shows up on the CRM
   lead record).
2. Add the page to the header `nav.links` and the footer "Our Pages" list on
   **all** pages, with `aria-current="page"` on its own link.
3. Add it to the sibling-page cards (`.siblings`) on the other pages.
4. Add a `<url>` block to `sitemap.xml`.
5. Give it its own JSON-LD `Service` + `FAQPage` block.

The three category pages were generated from a small builder script kept out of
the repo; the committed HTML is the source of truth, so edit the HTML directly.

## Shared CSS and JS

All four pages link `assets/site.css` and `assets/site.js` — edit the design or
the behaviour once and every page picks it up. Each JS block no-ops when its
markup is absent, so a page without the split-section videos or without the hero
form still works.

Category pages have no photography of their own yet, so their heroes use brand
gradients (`.hero-fire`, `.hero-kitchen`, `.hero-oven` in `site.css`) and their
split sections use gradient panels with an SVG (`.visual-fire`, `.visual-water`).
Drop real photos into `assets/` and swap those classes for background rules to
switch a page over.

## Design

Reuses the BellaFina Outdoors landing design system: navy / gold / orange tokens,
Georgia headings, sticky header, hero with lead card, trust strip, split sections
with looping video, category grid, process steps, testimonials, FAQ, showroom
band, final CTA and footer.

## Traffic handoff

Every outbound link points to **bellafinaoutdoors.com** and is deep-linked to the
matching page (fire features, water features, stone & tile, /shop, /contact,
/about, and the Cazo Fire Bowl product page) rather than the homepage.

All outbound links carry UTM tags so analytics can attribute the traffic:

- `utm_source=fire-bowls-lp`
- `utm_medium=landing_page`
- `utm_campaign=fire_bowls` / `fire_pits` / `outdoor_kitchens` / `pizza_ovens` (per page)
- `utm_content=<placement>` — e.g. `hero_shop_fire_bowls`, `card_fire_water_bowls`,
  `showroom_directions`, `footer_stone_tile`

The lead form does not post anywhere; on submit it opens the main site's contact
page with the same tags plus `interest=<selected option>`.

## Before launch

- Replace the sample testimonials (flagged on-page with a dashed note) with real
  client reviews.
- Update the canonical and OG URLs in all four HTML files, plus `robots.txt` and
  `sitemap.xml`, if this deploys to a domain other than `fire-bowls.vercel.app`.
- Add real photography for the three category pages (see **Shared CSS and JS**).

## Geographic coverage

Rather than one thin page per city, each page carries the whole Southern
California footprint in a single service-area section, grouped into clusters by
county (Orange, Los Angeles, San Diego) with page-specific copy explaining what
actually differs by area — coastal exposure and finish choice, view-oriented lots
and feature height, covered patios and ventilation, tight lots and smoke routing.
The same city list feeds each page's `Service` schema as `areaServed`.

The city clusters live in one place per page (the `.areas` section) so the
footprint can be extended by editing that list rather than spawning new URLs.

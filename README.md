# BellaFina Outdoors — Fire Bowls & Fire/Water Features Landing Page

Standalone landing page for **Outdoor Fire Bowls & Fire/Water Features**, leaning
into the pool and outdoor-living application and speaking to both homeowners and
pool professionals.

Static site (plain HTML/CSS/JS), deployed on Vercel. Production deploys from `main`.

## Structure

```
index.html    the landing page (all CSS and JS inline)
assets/       logo, hero image, two looping split-section videos
vercel.json   cleanUrls + no trailing slash
robots.txt    allow-all + sitemap reference
sitemap.xml   single-page sitemap
```

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
- `utm_campaign=fire_bowls`
- `utm_content=<placement>` — e.g. `hero_shop_fire_bowls`, `card_fire_water_bowls`,
  `showroom_directions`, `footer_stone_tile`

The lead form does not post anywhere; on submit it opens the main site's contact
page with the same tags plus `interest=<selected option>`.

## Before launch

- Replace the sample testimonials (flagged on-page with a dashed note) with real
  client reviews.
- Update the canonical URL in `index.html`, plus `robots.txt` and `sitemap.xml`,
  if this deploys to a domain other than `fire-bowls.vercel.app`.

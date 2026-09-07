# BellaFina Outdoors — Fire Bowls & Fire/Water Features

Single-page static landing site for **Outdoor Fire Bowls & Fire/Water Features**,
leaning into the pool and outdoor-living application and speaking to both
homeowners and pool professionals.

Deployed on Vercel at **firebowls.bellafinaoutdoors.com**. Production deploys
from `main`.

## The other landing sites

Each category has its own repository and its own Vercel project, so they can be
edited and deployed independently:

| Category | Repository | Subdomain |
|---|---|---|
| Fire bowls & fire/water features | this repo | `firebowls.bellafinaoutdoors.com` |
| Fire pits & fire tables | `aahilaariz073-rgb/bellafina-fire-pits` | `firepits.bellafinaoutdoors.com` |
| Outdoor kitchens & built-in BBQs | `aahilaariz073-rgb/bellafina-outdoor-kitchens` | `outdoorkitchens.bellafinaoutdoors.com` |
| Outdoor pizza ovens | `aahilaariz073-rgb/bellafina-pizza-ovens` | `pizzaovens.bellafinaoutdoors.com` |

The sites are **fully independent**. None links to any other: each header nav is
on-page anchors only, and every outbound link goes to bellafinaoutdoors.com. They
started from this page's design, so a change worth making everywhere has to be
copied into each repo by hand.

## Structure

```
sites/fire-bowls/       the deployable site — this is the Vercel Root Directory
  index.html            the page
  assets/               synced copy of shared/, plus this site's photography
  vercel.json           cleanUrls + no trailing slash
  robots.txt            allow-all + sitemap reference
  sitemap.xml           the single URL
shared/                 source of truth for the shared files
  site.css              all styles
  site.js               lazy video, UTM passthrough, hero lead form, quote popup
  brand/                logo and favicons
scripts/sync-shared.sh  copies shared/ into sites/fire-bowls/assets
docs/                   Google Ads keyword plan, ad copy, lead-capture notes
```

**The Vercel project's Root Directory is `sites/fire-bowls`.** The repo root has
no `index.html`; if that setting is ever cleared, the site 404s.

## Editing styles or scripts

`shared/` is the source of truth; `sites/fire-bowls/assets/` is a synced copy and
the copy is what actually deploys:

```sh
vim shared/site.css
./scripts/sync-shared.sh
git commit -am "..."
```

`./scripts/sync-shared.sh --check` fails if the copy is stale.

**Never edit `sites/fire-bowls/assets/site.css` or `site.js` directly** — the next
sync overwrites them.

## Design

Navy / gold / orange tokens, Georgia headings, sticky header, hero with lead card,
trust strip, split sections with looping video, category grid, homeowner/trade
split, spec table, three-step process, testimonials (commented out), FAQ, service
area, showroom band, final CTA and footer.

The header nav is on-page anchors only: `#top` Fire Bowls · `#types` Types ·
`#pool` Pool Features · `#who` Homeowners & Pros · `#areas` Service Area · `#faq`
FAQ. Adding a nav item means adding an `id` to the section it points at.

This is the only site with photography — a hero image and two looping split-section
videos in `sites/fire-bowls/assets/`. The hero opts in with
`class="hero hero-photo"` and `style="--hero-image:url('/assets/…')"`; use a
root-relative path there, because a relative `url()` inside a custom property
resolves against `site.css`, not the page.

## Traffic handoff

Every outbound link points to **bellafinaoutdoors.com**, deep-linked to the matching
page (fire features, water features, stone & tile, `/shop`, `/contact`, `/about`,
and the Cazo Fire Bowl product page) rather than the homepage, with UTM tags:

- `utm_source=fire-bowls-lp`
- `utm_medium=landing_page`
- `utm_campaign=fire_bowls`
- `utm_content=<placement>` — e.g. `hero_shop_fire_bowls`, `card_fire_water_bowls`,
  `showroom_directions`, `footer_stone_tile`

## Leads

The hero form and the quote popup both use the GoHighLevel form
`iD7GLxxCdv51i6umUCJF`. `<body data-lead-source="Fire bowls landing page">` marks
the CRM record as coming from this site.

Until `LEAD_WEBHOOK_URL` in `shared/site.js` is set, the hero form opens the hosted
version of that form in a new tab with the fields prefilled rather than posting
directly. See `docs/lead-capture.md`.

The popup opens by itself 5 seconds after load, once per session, and on desktop
exit intent.

## Geographic coverage

Rather than a thin page per city, the service-area section carries the whole
Southern California footprint at once, grouped into clusters by county (Orange,
Los Angeles, San Diego), with copy on what actually differs by area. The same city
list feeds `areaServed` in the page's JSON-LD. Extend the footprint by editing the
`.areas` section, not by adding URLs.

## Before launch

- Point `firebowls.bellafinaoutdoors.com` at the Vercel project and confirm HTTPS
- Replace the sample testimonials (commented out, flagged on-page) with real client
  reviews, then uncomment the section
- Add each subdomain as its own property in Search Console and submit its sitemap

### A note on subdomains

Subdomains generally don't consolidate ranking authority with the main domain the
way subfolders (`bellafinaoutdoors.com/fire-bowls`) do; search engines treat them
as more separate. That's the accepted trade-off for hosting these independently of
the main site's platform. If the main site can ever host these paths directly,
moving them into subfolders and 301-redirecting the subdomains is the stronger
long-term setup.

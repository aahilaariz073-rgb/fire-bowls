# BellaFina Outdoors — Category Landing Sites

Four standalone static landing sites, one per outdoor-living category, each
deployed as **its own Vercel project** on **its own subdomain** of
bellafinaoutdoors.com.

| Directory | Subdomain | Focus |
|---|---|---|
| `sites/fire-bowls` | `firebowls.bellafinaoutdoors.com` | Pool fire bowls & fire/water features |
| `sites/fire-pits` | `firepits.bellafinaoutdoors.com` | Outdoor fire pits & fire tables |
| `sites/outdoor-kitchens` | `outdoorkitchens.bellafinaoutdoors.com` | Outdoor kitchens & built-in BBQs |
| `sites/pizza-ovens` | `pizzaovens.bellafinaoutdoors.com` | Outdoor pizza ovens |

The sites are **fully independent of one another**. None of them links to any of
the others: each header nav is on-page anchors only, and every outbound link goes
to bellafinaoutdoors.com. A visitor who lands on one stays on it or moves to the
main site — which keeps each one a clean, single-purpose landing page for its own
ad campaign.

They are also kept distinct in content so they don't compete in search: the fire
bowl site owns the pool-adjacent terms and the fire pit site owns the standalone
patio terms.

## One repo, four Vercel projects

Separate Vercel projects do **not** need separate repos. Create four projects
from this one repository and give each a different **Root Directory** — four
repos would just mean four places to fix the same CSS bug.

For each site, in the Vercel dashboard:

1. **Add New → Project**, import this repository.
2. **Root Directory** → `sites/<directory>` from the table above.
3. Framework Preset → **Other**. No build command, no output directory; these
   are plain static files.
4. **Settings → Domains** → add the subdomain from the table above.
5. In your DNS provider, add a `CNAME` for that subdomain pointing at
   `cname.vercel-dns.com` (Vercel shows the exact value it wants once the domain
   is added).

Production deploys from `main`. A push that only touches one site still triggers
all four projects unless you set each project's **Ignored Build Step** to skip
when its directory is unchanged, e.g.:

```
git diff --quiet HEAD^ HEAD -- .
```

### The existing fire bowls project

`fire-bowls.vercel.app` was deploying from the repository root, and the page has
moved to `sites/fire-bowls/`. **Change that project's Root Directory to
`sites/fire-bowls` before the next deploy**, or it will publish an empty site.

## Layout

```
shared/                  source of truth for everything the sites share
  site.css               all styles
  site.js                lazy video, UTM passthrough, hero lead form, quote popup
  brand/                 logo and favicons
sites/<name>/            one self-contained, deployable static site each
  index.html             the page
  assets/                synced copy of shared/ + any photography of its own
  vercel.json            cleanUrls + no trailing slash
  robots.txt             allow-all + its own sitemap reference
  sitemap.xml            its own single URL
scripts/sync-shared.sh   copies shared/ into every site
docs/                    Google Ads keyword plan, ad copy, lead-capture notes
```

## Editing shared CSS or JS

Each Vercel project only sees its own Root Directory, so every site needs a
physical copy of the shared files. `shared/` is the source of truth:

```sh
vim shared/site.css          # edit here
./scripts/sync-shared.sh     # copy into all four sites
git commit -am "..."         # commit shared/ and the synced copies together
```

`./scripts/sync-shared.sh --check` fails if any copy is stale — useful in CI.

**Never edit `sites/*/assets/site.css` or `site.js` directly.** The next sync
overwrites them.

## Per-site content

Anything unique to a site lives in its `index.html`:

- `<title>`, `<meta name="description">`, `<link rel="canonical">` and the
  OG/Twitter tags, all pointing at that site's own subdomain
- JSON-LD: a `Service` block plus a `FAQPage` block (the fire bowls site carries
  a `HomeAndConstructionBusiness` block instead of `Service`)
- `data-lead-source` on `<body>` — this string lands on the CRM record, so leads
  can be attributed to the site that produced them
- a `utm_campaign` value: `fire_bowls`, `fire_pits`, `outdoor_kitchens` or
  `pizza_ovens`

The header nav is on-page anchors only, pointing at that site's own sections
(`#top`, `#types`, one signature split section, `#who`, `#areas`, `#faq`). Adding
a nav item means adding an `id` to the section it targets.

**Do not add links between the sites.** They are deliberately isolated; adding
one back means editing every page and re-checking that each site's outbound links
still all go to bellafinaoutdoors.com.

## Photography

Only the fire bowls site has photography: a hero image and two looping split
section videos in `sites/fire-bowls/assets/`. Its hero opts in with
`class="hero hero-photo"` and `style="--hero-image:url('/assets/…')"` — use a
root-relative path there, because a relative `url()` inside a custom property
resolves against `site.css`, not the page.

The other three use brand gradients (`.hero-fire`, `.hero-kitchen`, `.hero-oven`)
and gradient split-section panels with an SVG mark (`.visual-fire`,
`.visual-water`). To switch one over: drop the photo into that site's `assets/`,
swap the gradient class for `hero-photo`, and set `--hero-image`.

## Traffic handoff

Every outbound link points to **bellafinaoutdoors.com**, deep-linked to the
matching page (fire features, water features, stone & tile, `/shop`, `/contact`,
`/about`, and the Cazo Fire Bowl product page) rather than the homepage.

All outbound links carry UTM tags so analytics can attribute the traffic:

- `utm_source=fire-bowls-lp`
- `utm_medium=landing_page`
- `utm_campaign=<per site, see above>`
- `utm_content=<placement>` — e.g. `hero_shop_fire_bowls`, `card_fire_water_bowls`,
  `showroom_directions`, `footer_stone_tile`

Each site's hero form and quote popup use the same GoHighLevel form
(`iD7GLxxCdv51i6umUCJF`), distinguished by `data-lead-source`. See
`docs/lead-capture.md`. To split them into separate forms per category, change
the form ID in each `index.html` — it appears in the modal iframe's `data-src`
and `data-form-id`, and in `HOSTED_FORM_URL` in `shared/site.js`.

## Geographic coverage

Rather than one thin page per city, each site carries the whole Southern
California footprint in a single service-area section, grouped into clusters by
county (Orange, Los Angeles, San Diego) with page-specific copy on what actually
differs by area — coastal exposure and finish choice, view-oriented lots and
feature height, covered patios and ventilation, tight lots and smoke routing.
The same city list feeds each page's schema as `areaServed`.

The clusters live in one place per page (the `.areas` section), so the footprint
is extended by editing that list rather than spawning new URLs.

## Before launch

- Point the four subdomains at their Vercel projects and confirm each resolves
  over HTTPS.
- Change the existing fire bowls project's Root Directory (see above).
- Replace the sample testimonials in `sites/fire-bowls/index.html` (commented
  out, flagged on-page) with real client reviews before uncommenting.
- Add real photography for the three gradient sites.
- Submit each `sitemap.xml` in Search Console — each subdomain is a separate
  property.

### A note on subdomains

Subdomains generally don't consolidate ranking authority with the main domain the
way subfolders (`bellafinaoutdoors.com/fire-pits`) do; search engines treat them
as more separate. That's the accepted trade-off for hosting these independently
of the main site's platform. If the main site can ever host these paths directly,
moving them into subfolders and 301-redirecting the subdomains is the stronger
long-term setup.

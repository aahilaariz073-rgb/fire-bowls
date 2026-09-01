# Fire Bowls & Fire/Water Features — Keyword & Paid Search Plan
**BellaFina Outdoors · Orange County, CA · landing page: `https://fire-bowls.vercel.app/`**

---

## 1. How to read this

| File | What it is |
|---|---|
| `docs/google-ads-keywords.csv` | 247 keyword rows: campaign, ad group, keyword, match type, final URL |
| `docs/negative-keywords.txt` | Shared negative list — apply to all four campaigns before launch |
| `docs/rsa-ad-copy.md` | RSA headlines/descriptions per ad group, sitelinks, callouts |

**On search volumes:** this plan is built from search-intent structure and competitor
language, not from a Keyword Planner export. Volumes are not stated because they cannot
be verified from here. Before launch, drop the CSV into Google Keyword Planner to attach
real volume and CPC, then prune anything with no impressions. The structure below is
designed so that pruning is a delete operation, not a rebuild.

---

## 2. The core insight for this market

Fire bowls have **two very different buyers**, and they search differently:

| | Homeowner | Pool professional |
|---|---|---|
| Searches | "pool fire bowls", "fire and water bowls", "fire bowls for pool" | "fire bowl supplier", brand + model names, "wholesale fire bowls" |
| Volume | Higher | Much lower |
| Value | One project | Repeat projects, many bowls |
| Needs from the page | Reassurance, sizing help, seeing it lit | Trade pricing, spec sheets, stock, delivery dates |

They cannot share ad copy — the trade buyer bounces off "free design consultation," and
the homeowner bounces off "trade pricing." Hence separate campaigns, and the landing
page's homeowner/pro split section.

**Second insight:** the money terms are *pool*-qualified. "Fire pits" is a huge,
expensive, retail-dominated term. "Pool fire bowls" and "fire and water bowls" are
smaller, far less contested, and describe exactly what BellaFina sells. Weight the budget
toward the pool-qualified terms and treat generic fire pit traffic as spend to be capped.

---

## 3. Campaign structure

### Campaign 1 — `OC | Fire Features — Core` (60% of budget)
County-level location targeting, **no city in the keyword**. This is where the real
volume lives; the geography is handled by the targeting radius, not the query.

Ad groups: Pool Fire Bowls · Fire & Water Bowls · Fire Bowls (Generic) · Outdoor Fire
Features · Fire Pits & Fire Tables · Water Features & Scuppers · Buy Intent

Location targeting: Orange County, plus a 15-mile radius around Huntington Beach.
Set to **"Presence: people in or regularly in"** — not "interest" — or you will pay for
out-of-state browsers.

### Campaign 2 — `OC | Fire Features — Geo` (15%)
City-in-the-query searches for all 20 target cities. Individually these are low volume —
some cities will show near-zero impressions and that is expected. They convert well
because the searcher has already decided they want someone local.

Run one ad group per city so the ad can name the city. Use phrase match, low bids, and
`{LOCATION(City)}` insertion in the ads. **Do not judge these on volume — judge on cost
per lead.** Consolidate any city with fewer than ~10 impressions/month into a single
"South OC" / "Coastal OC" ad group.

Priority cities by pool density and household income — start here if budget is tight:
**Newport Coast, Corona del Mar, Newport Beach, Coto de Caza, Laguna Beach, Yorba Linda,
Villa Park, North Tustin, Ladera Ranch, Rancho Mission Viejo.**
Second tier: Irvine, Laguna Niguel, Dana Point, San Juan Capistrano, San Clemente,
Mission Viejo, Rancho Santa Margarita, Lake Forest, Huntington Beach, Costa Mesa.

### Campaign 3 — `OC | Fire Features — Trade & Local` (15%)
Supplier, wholesale, trade-pricing and "near me" / showroom searches. Small volume, high
value. Point these at the landing page and let the pool-pro card carry the message.

### Campaign 4 — `OC | Fire Features — Brand & Product` (10%)
Brands BellaFina actually stocks and that pool builders spec by name — The Outdoor Plus
(Cazo), Grand Effects (formerly Bobé), HPC Fire, American Fyre Designs, Slick Rock.
Cheap clicks, very high intent, and it defends the brand searches that competitors bid on.
Only bid on brands you can actually supply.

---

## 4. Services × areas matrix

The CSV is the full cross of the two axes below. Not every combination deserves a
keyword — city terms are only crossed with the five themes that people actually
geo-qualify.

**Services (ad group themes)**
1. Pool fire bowls
2. Fire and water bowls / fire and water features
3. Fire bowls (generic, material-qualified: copper, GFRC, stainless, concrete)
4. Outdoor / decorative fire features
5. Fire pits and fire tables
6. Water features, scuppers, spillway bowls
7. Trade supply
8. Brand + model

**Areas (20 cities + county/region terms)**
Coastal — Huntington Beach, Newport Beach, Newport Coast, Corona del Mar, Costa Mesa
Laguna & south coast — Laguna Beach, Laguna Niguel, Dana Point, San Juan Capistrano, San Clemente
South county — Mission Viejo, Lake Forest, Rancho Santa Margarita, Coto de Caza, Ladera Ranch, Rancho Mission Viejo
Central & north — Irvine, North Tustin, Yorba Linda, Villa Park
Region catch-alls — Orange County, OC, Southern California

Geo templates crossed with each city:
`pool fire bowls {city}` · `fire bowls {city}` · `fire and water bowls {city}` ·
`outdoor fire features {city}` · `fire pits {city} ca`

---

## 5. Match type and bidding

- Start **phrase + exact only.** Broad match on "fire bowls" will pull in fire pit tables,
  fire bowl games and poke bowls. Revisit broad once conversion data exists and you can
  run it on Target CPA.
- Bid ladder: Pool Fire Bowls and Fire & Water Bowls highest; Fire Pits & Fire Tables
  lowest (most retail competition, least differentiated).
- Start on **Maximize Clicks with a CPC cap** until ~15–20 conversions, then move to
  Target CPA. Smart Bidding without conversion data will burn budget on this vocabulary.
- Conversion actions to define first: lead-form handoff to the contact page, phone-number
  clicks, direction clicks, and 60-second engaged sessions.

---

## 6. Tracking (already wired into the page)

Every outbound link on the landing page carries:
`utm_source=fire-bowls-lp` · `utm_medium=landing_page` · `utm_campaign=fire_bowls` ·
`utm_content=<placement>`

So you can see not just that the page sent traffic to bellafinaoutdoors.com, but which
section did it — hero, pool-fire-bowls split, category card, showroom band, footer.

For paid traffic, set the account-level final URL suffix in `docs/rsa-ad-copy.md` so ad
clicks are attributable alongside the on-page handoff.

---

## 7. SEO / organic notes (same research, different channel)

The page already carries: `HomeAndConstructionBusiness` schema with `areaServed` for all
20 cities, `FAQPage` schema on six real questions, and a "Where We Work" section listing
the cities in crawlable text.

To extend organically, in priority order:

1. **A dedicated page per top-tier city** (Newport Coast, Corona del Mar, Coto de Caza,
   Laguna Beach, Yorba Linda) — but only with genuinely local content: a real project in
   that city, the coastal-corrosion angle for beach cities, canyon-community wind
   considerations inland. Twenty thin doorway pages that differ only by city name will be
   ignored at best and penalized at worst.
2. **A "how many fire bowls does my pool need" guide** — the single highest-intent
   informational query in this category, and the FAQ already answers it.
3. **A materials comparison** — copper vs. GFRC vs. stainless near saltwater. This is the
   question every coastal OC buyer asks and it maps to a real differentiator.
4. **Google Business Profile** — the showroom listing should carry "fire bowls" and
   "fire and water features" as services, with photos of lit bowls.

---

## 8. Launch checklist

- [ ] Run the CSV through Keyword Planner; attach volume/CPC; prune zero-volume rows
- [ ] Apply the shared negative list to all four campaigns
- [ ] Set location targeting to "presence" and exclude out-of-state
- [ ] Define conversion actions before the first click
- [ ] Set the final URL suffix at account level
- [ ] Replace the sample testimonials on the landing page with real reviews
- [ ] Confirm the landing page's canonical/robots/sitemap URLs match the live domain

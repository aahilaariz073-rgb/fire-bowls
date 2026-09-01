# Lead capture — how the two forms reach GoHighLevel

The page has **two independent lead paths**. Neither depends on the other.

| | Hero form | Popup |
|---|---|---|
| What it is | The designed card in the hero | Your LeadConnector form, embedded in a modal |
| Opens | Always visible | Three CTAs, plus once per visit automatically (25s or exit intent) |
| Reaches GHL via | Inbound webhook (JSON POST) | The form embed itself |
| Form ID | n/a | `iD7GLxxCdv51i6umUCJF` |

---

## Switching the hero form on

1. In GoHighLevel: **Automation → Workflows → Create Workflow → Start from scratch**.
2. Add trigger: **Inbound Webhook**. Copy the webhook URL it gives you.
3. In `index.html`, find:

   ```js
   var LEAD_WEBHOOK_URL = '';
   ```

   and paste the URL between the quotes.

4. In the workflow, add a **Create/Update Contact** action and map the incoming
   fields (GHL will show them once a test payload has been received).
5. Publish the workflow.

**Until that URL is filled in**, the hero form falls back to opening the popup, so
no lead is lost in the meantime. Once it is set, the two forms are fully separate.

## What the hero form sends

```json
{
  "first_name": "Jane",
  "last_name": "Marie Smith",
  "full_name": "Jane Marie Smith",
  "phone": "(714) 555-0000",
  "email": "jane@example.com",
  "interest": "Trade / Pool Professional Pricing",
  "source": "Fire bowls landing page — hero form",
  "page_url": "https://fire-bowls.vercel.app/?utm_source=google&...",
  "utm_source": "google",
  "utm_campaign": "fire_bowls",
  "gclid": "XYZ99"
}
```

`first_name`/`last_name` are split from the single Full Name field. Campaign keys
(`utm_*`, `gclid`, `fbclid`, `msclkid`) are only included when present on the page
URL, so paid leads carry their source into the CRM.

To capture a test payload before mapping, point `LEAD_WEBHOOK_URL` at the GHL
webhook and submit the form once — the workflow will then list the fields.

## Behaviour on submit

- Success: the card swaps to a "Thanks — we've got it" confirmation.
- If the browser blocks the CORS preflight, it retries the POST opaquely
  (`mode: 'no-cors'`) so the lead still lands, then shows the same confirmation.
- If both attempts fail: an inline error with the phone number and email address,
  and the button is re-enabled.

## The popup

The popup embeds the LeadConnector form directly, so its submissions go to GHL
natively — nothing to configure. The interest dropdown on the hero form maps to
the popup form's "Tell us about your project ?" field, whose query key is
`single_line_11kyi` (read from the form's own `data-q` attribute).

Popup timing lives in `AUTO_DELAY_MS` (25000). Set it higher, lower, or remove the
`setTimeout`/`mouseout` block to make the popup CTA-only again.

### If the popup seems not to appear

The automatic popup fires **once per browser session**, recorded as
`bf_quote_seen` in `sessionStorage`. Once it has fired in a tab it will not fire
again there, which looks exactly like it has stopped working. To test it again,
open the page in a new tab or a private window, or run
`sessionStorage.removeItem('bf_quote_seen')` in the console and reload.

The CTA buttons and the hero form are **not** subject to that limit — they open
the popup every time.

If the popup opens but the form area is blank, the embed is being blocked
(privacy extension, strict tracking protection, or a network that blocks
`leadconnectorhq.com`). The modal shows an "Open it in a new tab" link for
exactly that case.

# Cedar & Clay — cedarclaylife.com

Marketing site for **Cedar & Clay**: faith-based holistic wellness, handmade farmer's market products, creative studio classes, and 21 acres of trails in Redgranite, Wisconsin.

Deployed to **Cloudflare Pages** (static export).

## Stack

- Next.js 14 (App Router, `output: "export"`)
- Tailwind CSS
- TypeScript

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
```

Static files output to `out/`.

## Deploy to Cloudflare Pages

### Option A — Same GitHub repo, separate folder (monorepo)

If this folder lives inside an existing repo (e.g. next to `oristrade-landing-live`):

| Setting | Value |
|--------|--------|
| **Root directory** | `cedarclaylife` (or your folder name) |
| **Build command** | `npm ci && npm run build` |
| **Build output** | `out` |
| **Node version** | 20 |

### Option B — Dedicated repo

Push this folder as its own repository and connect it to a new Cloudflare Pages project with the same build settings (no root directory override).

### Custom domain

1. Cloudflare Dashboard → **Workers & Pages** → your project → **Custom domains**
2. Add `cedarclaylife.com` and `www.cedarclaylife.com`
3. DNS should auto-configure if the domain is already on Cloudflare

## Product catalog

Market products and booth prices are defined in `lib/products.ts`. Packaging sizes may vary; listed prices still apply.

## Customize

Edit `lib/site.ts` for contact info and social links.  
Edit `lib/products.ts` for the farmer's market catalog.  
Edit `lib/content.ts` for studio, trails, and FAQ copy.

## Product labels

**Avery sticker/direction sheets** (preserve label layout):

```bash
python3 scripts/generate-labels.py
```

Outputs `*-print.docx` files for laundry, elderberry, bath salt, and directions labels.

**Price sheets** (logo header, styled table, blank prices):

```bash
python3 scripts/generate-price-sheets.py
```

Updates `Prices.docx`, `FMPlants$.docx`, and `Directions for Elder berries.docx` with Cedar & Clay branding, logo, contact info, and **cedarclaylife.com**. Price fields stay blank for market day.

Original `.doc` files remain as backups. Open the `.docx` versions to print.

## Contact form (Resend)

The contact page posts to `/api/contact` (Cloudflare Pages Function). In your Pages project → **Settings → Environment variables**, add:

| Variable | Value |
|----------|--------|
| `RESEND_API_KEY` | Your Resend API key (`oristrade.com` must be verified in that account) |
| `CONTACT_TO` | Optional — defaults to `hello@oristrade.com` |

Emails send **from** `hello@oristrade.com` **to** `hello@oristrade.com`, with the visitor&apos;s address as reply-to. The form does not run during local static `npm run dev` unless you use Wrangler; it works on the deployed Cloudflare Pages site.

## Pre-orders (OrisTrade Supabase + offline payment)

Pre-orders are stored in the **existing OrisTrade Supabase** project (not a separate Cedarclaylife DB).

| Surface | Who | Purpose |
|---------|-----|---------|
| cedarclaylife.com `/shop` | Anyone | Submit a pre-order |
| cedarclaylife.com `/orders` | Customer | Magic-link sign-in → **their** pre-orders |
| **journal.oristrade.com `/admin/cedarclay-orders`** | OrisTrade admin | **All** pre-orders + status updates |

### Setup

1. In **OrisTrade** Supabase → SQL Editor, run:
   `OrisTrade-Journal/supabase/CEDARCLAY_PREORDERS.sql`
2. Supabase → **Authentication → URL configuration** → add redirect:
   - `https://cedarclaylife.com/auth/callback`
   - `http://localhost:3000/auth/callback` (local)
3. In **Cloudflare Pages** (Cedarclaylife project), set the **same** OrisTrade Supabase keys:

| Variable | Where used |
|----------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Build + browser (My Orders) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Build + browser |
| `SUPABASE_URL` | Pages Function `/api/preorder` |
| `SUPABASE_SERVICE_ROLE_KEY` | Pages Function (never expose to browser) |
| `RESEND_API_KEY` | Optional email notify |
| `CONTACT_TO` | Optional inbox override |

4. Redeploy Cedarclaylife so `NEXT_PUBLIC_*` values are in the static build.
5. Admin: sign into **journal.oristrade.com** with your OrisTrade admin account → **Admin → Cedar & Clay orders**.

Keep `functions/api/preorder.js` catalog in sync with `lib/products.ts`.

## Block AI training crawlers

`app/robots.ts` disallows common AI training bots (GPTBot, Google-Extended, ClaudeBot, CCBot, etc.) — see `lib/ai-bots.ts`. This is a polite opt-out; some bots ignore `robots.txt`.

**Stronger blocking (Cloudflare):** In the dashboard for **cedarclaylife.com** → **Security** → **Bots** (or **WAF**), enable rules that block **AI Scrapers and Crawlers** / known AI bot user-agents. On many plans this stops requests at the edge before they reach your site.

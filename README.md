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

Market products are defined in `lib/products.ts` (sourced from product label & pricing sheets). Prices are intentionally blank (`—`) until set at the farmer's market booth. Update prices there when ready.

## Customize

Edit `lib/site.ts` for contact info and social links.  
Edit `lib/products.ts` for the farmer's market catalog.  
Edit `lib/content.ts` for studio, trails, and FAQ copy.

## Label docs (separate step)

Product label `.doc` / `.docx` files in the project root will be beautified in a follow-up pass — adding Cedar & Clay branding and cedarclaylife.com to printed labels.

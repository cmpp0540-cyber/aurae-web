# Aurae — Next.js storefront

Premium cellular beauty supplements. Next.js 15 (App Router) + React 19 + TypeScript +
Tailwind CSS, with the catalog driven by Shopify.

```bash
npm install
npm run dev     # http://localhost:3000
```

It works immediately, with no credentials — see **How Shopify data is loaded** below.

---

## What's here

| Route | What it is |
| --- | --- |
| `/` | Landing page — hero, 5 products, 3 bundles, "what's inside", science, reviews, FAQ, newsletter |
| `/product/[productId]` | Product detail page — gallery, benefits, ritual, ingredients, reviews, science, FAQ, values, cross-sell, final CTA |
| `/bundle/[bundleId]` | Bundle page — single image, what's included, synergy, timed ritual, reviews, CTA |
| `/api/checkout` | Turns the cart into a Shopify checkout URL |

`[productId]` and `[bundleId]` accept either the Shopify **handle** or the **numeric product id**,
so both of these resolve to GLOW:

```
/product/grass-fed-hydrolyzed-collagen-peptides
/product/10121267970334
```

A bundle requested on `/product/...` redirects to `/bundle/...` and vice versa.

---

## How Shopify data is loaded

There are two layers, and the app picks whichever is available:

1. **Shopify Storefront API** — used whenever `SHOPIFY_STOREFRONT_ACCESS_TOKEN` is set.
   Products, images, prices, descriptions and metafields are fetched server-side and
   revalidated every 30 minutes.
2. **`data/shopify-snapshot.json`** — a real snapshot of the live Aurae store (the same
   product IDs, `cdn.shopify.com` image URLs, prices, descriptions and metafields).
   Used when there is no token or the API is unreachable.

> **Why a snapshot at all?** The Shopify *Admin* connector used to build this project runs
> inside Claude, not inside your app — a running website cannot call it. A web storefront
> needs the **Storefront API**, which is a separate credential. Until that token exists the
> snapshot keeps the site fully populated with genuine store data, and the moment you add
> the token every page switches to live data with no code change.

In development the landing page prints which source it used at the very bottom of the page.

### Getting a Storefront API token

1. Shopify admin → **Settings → Apps and sales channels → Develop apps**
2. Open (or create) your app → **Configuration → Storefront API** → enable
   `unauthenticated_read_product_listings` and `unauthenticated_write_checkouts`
3. **API credentials** → copy the **Storefront API access token**
4. Put it in `.env.local`:

```ini
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=auraevital.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SHOPIFY_API_VERSION=2025-07
NEXT_PUBLIC_SUBSCRIBE_DISCOUNT=0.10
```

If `auraevital.com` is not yet serving the storefront (the store is on the *Pause and Build*
plan), use the `*.myshopify.com` domain instead.

### Metafields must be readable by storefronts

The product pages use four `custom` metafields that already exist on your products:

| Metafield | Used for |
| --- | --- |
| `custom.card_ingredient` | The bold ingredient headline (e.g. *GRASS-FED COLLAGEN TYPES 1 & 3*) |
| `custom.card_detail` | The one-line descriptor under it |
| `custom.how_to_use` | "Directions from the label" in the Ritual section |
| `custom.what_s_inside` | The Ingredients table (name · dose · what it does) |

For the Storefront API to return them, each definition needs storefront access:
**Settings → Custom data → Products →** the definition **→ Access → Storefronts: read**.
Until that is enabled the API returns `null` for them and the snapshot values are used.

### Refreshing the snapshot

```bash
npm run sync:shopify
```

Rewrites `data/shopify-snapshot.json` from the live Storefront API and prints what it found
(image counts, prices, any missing metafields). Run it whenever products change in Shopify.

---

## Image loading

Product photography in the store is 1254x1254 PNG, around 1.5 MB per file. Served through
Next's built-in optimizer that meant the Node process downloading ~11.5 MB to paint one
landing page, then re-encoding all of it before the browser saw a pixel. That was the whole
reason images took seconds to appear.

**Resizing is delegated to Shopify's CDN.** `lib/shopify-image-loader.ts` is registered as
`images.loaderFile`, so every `<Image>` emits a URL the CDN can answer by itself:

```
…/photo.png?v=1785736923&width=560&format=webp&quality=74
```

`format=webp` is honoured by content negotiation — Shopify returns WebP to browsers that
send `Accept: image/webp` and the original format to anything that does not, so there is no
support sniffing. Measured against the live store:

| | before | after |
| --- | --- | --- |
| Landing (hero + 5 products + 3 bundles) | 11.44 MB | **174 KB** |
| Product page carousel (8 frames + 8 thumbnails) | 11.58 MB | **473 KB** |

Two useful side effects: the server never touches image bytes, and TLS-intercepting
antivirus can no longer break image loading (see Troubleshooting).

### What the visitor sees while it loads

`components/ui/SmartImage.tsx` wraps `next/image` and layers three things:

1. `placeholder="blur"` paints the product's accent gradient from an inline SVG data URI —
   no request, so the box is never empty, not even for one frame.
2. `components/ui/ImageSkeleton.tsx` sweeps a shimmer across it while the photo is in
   flight.
3. The photo fades in over 500ms once decoded.

The wrapper owns the dimensions, so the placeholder occupies exactly the space the final
image will — nothing shifts on arrival. An image that was already cached can finish
decoding before React attaches `onLoad`, so `SmartImage` also checks `img.complete` at ref
time; without that the skeleton would sit there forever on a repeat visit.

### Local assets

The CDN loader only has variants to offer for Shopify URLs; anything under `public/` passes
through untouched, and `SmartImage` marks those `unoptimized` so Next does not advertise a
srcset of width variants that do not exist. Local imagery is therefore pre-optimised on disk.

The hero photograph (`public/images/aurae-hero-products.webp`, 1920x1080) went from a
635 KB 2560x1440 JPEG to **127 KB** of WebP. The source JPEG stays alongside it for anywhere
WebP is awkward — Open Graph tags, email. Its blur placeholder is an 86-byte WebP thumbnail
of the photo itself, inlined in `lib/hero-blur.ts` together with `HERO_CORAL`, the exact
background coral sampled from the shot so the mobile section blends into the image.

`public/images/aurae-hero-image.*` is the previous hero (the portrait with GLOW). Nothing
references it any more — delete it whenever you are sure you will not want it back.

To swap the photograph: resize the new source to 1920px wide as WebP at quality ~82, write
it into `public/images/`, regenerate `lib/hero-blur.ts` (blur seed + sampled coral), and
re-measure the label positions in `HERO_PILLARS` — they are percentages of the specific
shot, not of the viewport.

### Priorities

| Image | Loading |
| --- | --- |
| Landing hero, first two product cards | `priority` — preloaded, `fetchPriority: high` |
| Everything else below the fold | `loading="lazy"` |
| Carousel frames 2..n | `eager` + `fetchPriority: low` |

Carousel frames are deliberately **not** lazy. They are stacked behind the active frame, so
they count as "in viewport" and lazy loading is unreliable for them — which is what made the
carousel feel like it never finished loading. Once frame 1 lands, the rest are fetched
outright at low priority, which is why arrow and thumbnail clicks are instant. Mounting them
*is* the preload: at ~20 KB of WebP each, warming them through a separate `new Image()` pass
would risk requesting a width the browser's srcset never picks and downloading everything
twice.

`deviceSizes` in `next.config.mjs` stops at 1280 because the source images are 1254px —
every larger candidate is the CDN upscaling. And any fixed-size thumbnail uses one width at
every breakpoint: a `sizes` that disagrees with the rendered box makes the preload scanner
pick one candidate and layout pick another, downloading each thumbnail twice.

---

## Cart & checkout

The cart is client-side (React context + `localStorage`, key `aurae.cart.v1`) and opens as a
drawer from anywhere on the site. **Checkout** posts the lines to `/api/checkout`, which:

1. calls the Storefront `cartCreate` mutation and returns `cart.checkoutUrl` — the proper
   Shopify checkout, keeping discounts and analytics intact; or
2. falls back to a cart permalink, `https://<domain>/cart/<variantId>:<qty>,…`, which works
   on any Shopify store **with no credentials at all**.

So checkout is functional today and gets better once the token is in place.

**Subscribe & Save** currently shows the discounted price (10%, configurable via
`NEXT_PUBLIC_SUBSCRIBE_DISCOUNT`) and tags the cart line. To make it a real subscription,
install a Shopify subscriptions app, then read `sellingPlanGroups` in
`lib/shopify.ts` and pass `sellingPlanId` on the cart line in `app/api/checkout/route.ts`.

---

## Newsletter → Klaviyo

The footer signup posts to `app/api/subscribe/route.ts`, which subscribes the address to a
Klaviyo list with email marketing consent and `custom_source: "website_popup"`.

The route exists so the credentials stay on the server. `KLAVIYO_PRIVATE_API_KEY` is a
private key with write scopes — **never** give it the `NEXT_PUBLIC_` prefix, and never put
it in the code. `lib/klaviyo.ts` imports `server-only`, so an accidental client import
fails the build rather than shipping the key to a browser.

### Setup

```ini
# .env.local — already covered by .gitignore
KLAVIYO_PRIVATE_API_KEY=pk_...
KLAVIYO_LIST_ID=XyZ123
```

- **API key**: Klaviyo → Settings → API keys → Create private key, with scopes
  `lists:write`, `profiles:write`, `subscriptions:write`.
- **List ID**: Klaviyo → Audience → Lists & Segments → your list → Settings → List ID.

Restart the dev server after editing `.env.local` — Next reads env files at boot.

### On Vercel

Project → Settings → Environment Variables, both for Production, Preview and Development:

| Name | Value | Notes |
| --- | --- | --- |
| `KLAVIYO_PRIVATE_API_KEY` | your `pk_...` key | Mark as **Sensitive** so it cannot be read back |
| `KLAVIYO_LIST_ID` | your list id | |

Redeploy after adding them; env vars are baked in at build/boot, not read live.

### Behaviour

| Situation | Route | What the visitor sees |
| --- | --- | --- |
| Subscribed | 200 `{ok:true}` | "You're on the list ✦" |
| Malformed email | 400 | "Please enter a valid email address." |
| Env vars missing | 503 | "Signups are temporarily unavailable." |
| Klaviyo rate limit | 429 | "Too many signups right now." |
| Klaviyo error / unreachable | 502 | "Something went wrong. Please try again." |

The success message renders only on `{ok: true}` — never merely because a response came
back. Failures are logged server-side with the status and Klaviyo's body; the key is never
logged and the visitor never sees integration details.

Worth knowing: this endpoint, like any newsletter form, lets anyone submit any address.
Turning on double opt-in in Klaviyo (List → Settings → Opt-in process) is the real
protection — only confirmed addresses become subscribers.

## Project structure

```
app/
  layout.tsx                 fonts, CartProvider, header/footer/drawer
  page.tsx                   landing page
  product/[productId]/       product detail route
  bundle/[bundleId]/         bundle route
  api/checkout/route.ts      cart → Shopify checkout URL
  api/subscribe/route.ts     newsletter signup → Klaviyo
  not-found.tsx
  globals.css                design tokens + component classes

lib/
  config.ts                  env, product/bundle order, featured bundle
  types.ts                   the normalised domain model
  shopify.ts                 Storefront API client, queries, cartCreate, permalink
  products.ts                getCatalog / getProduct / cross-sell  ← pages use this
  classify.ts                product vs bundle
  rich-text.ts               Shopify rich_text_field parser + ingredient-row extractor
  accents.ts                 per-product colour palettes + blur stops
  klaviyo.ts                 newsletter subscription (server-only)
  blur.ts                    inline SVG blur placeholders
  shopify-image-loader.ts    next/image loader -> Shopify CDN resizing
  format.ts                  prices, savings, subscribe price, short descriptions

content/                     ← all copy lives here, no strings in components
  site.ts                    nav, hero, trust bar, science grid, landing FAQs, card benefits
  products.ts                per-product benefits, ritual, science, FAQs, testimonials
  bundles.ts                 bundle contents, synergy, timed ritual, testimonials

components/
  layout/                    AnnouncementBar, Header, TrustBar, Footer
  cart/                      CartProvider, CartDrawer, AddToCart
  landing/                   Hero, ProductsSection, ProductCard, BundlesSection, BundleCard,
                             InsideSection, ScienceSection, TestimonialsSection, FaqSection,
                             Newsletter
  product/                   ProductHero, ProductGallery, PurchasePanel, BenefitsSection,
                             RitualSection, IngredientsSection, ReviewsSection,
                             EvidenceSection, ProductFaqs, SustainabilitySection,
                             CrossSellSection, FinalCta
  bundle/                    BundleHero, BundleIncludes, SynergySection, RitualTimeline
  ui/                        SectionHeading, Reveal, Accordion, Stars, RichText, Glyph,
                             SmartImage, ImageSkeleton

data/shopify-snapshot.json   real store snapshot (fallback / offline dev)
scripts/sync-shopify.mjs     refresh the snapshot
```

### Where the copy comes from

| Source | What it controls |
| --- | --- |
| **Shopify** | Titles, prices, compare-at prices, all images, descriptions, ingredient panel, dosage |
| **`content/*.ts`** | Benefit cards, ritual steps, science write-ups, FAQs, testimonials, values, bundle synergy — the things Shopify has no field for |

To edit marketing copy you never need to touch a component: open the matching `content` file
and change the entry keyed by the Shopify handle. Leave a handle out entirely and that page
still renders from Shopify data alone.

---

## Design system

Tokens live in `tailwind.config.ts` and `app/globals.css`:

| Token | Value |
| --- | --- |
| `coral` | `#FF6F91` |
| `coral-soft` | `#FFA9A3` |
| `sun` | `#FFD66B` |
| `blush` | `#FFE5D9` |
| `ivory` | `#FFF8F0` |
| `espresso` | `#3A2E2A` |
| `cream` | `#FFFCF8` |

Headings use **Fraunces**, body copy uses **Inter**. The display face is a single CSS
variable, so switching the whole site back to the prototype's Playfair Display is one line
in `app/globals.css`:

```css
--font-display: 'Playfair Display', Georgia, serif;
```

Each product also has an accent palette in `lib/accents.ts` (glow/coral, calm/violet,
sleep/blue, radiance/amber, renewal/green) used for image gradients, chips and glyph strokes.

Layout is mobile-first: the product grid goes 1 → 2 → 3 → 5 columns, the trust bar scrolls
horizontally on phones, the gallery supports swipe, and the header collapses to a drawer
menu. Motion is limited to fade-ups and hovers, and everything is disabled under
`prefers-reduced-motion`.

---

## Scripts

```bash
npm run dev            # dev server
npm run build          # production build (prerenders all 8 detail pages)
npm run start          # serve the production build
npm run typecheck      # tsc --noEmit
npm run lint           # next lint
npm run sync:shopify   # refresh data/shopify-snapshot.json from Shopify
```

---

## Notes and known gaps

- **Reviews are curated copy, not live Shopify reviews.** Your store has no reviews app
  installed, so there is no review data in the Admin API to read. The testimonials in
  `content/products.ts` and `content/bundles.ts` are illustrative — replace them with real
  ones before launch, or wire up Judge.me / Loox / Shopify Product Reviews and read the
  `reviews` metafields in `lib/shopify.ts`.
- **Bundle contents are declared, not derived.** Shopify's bundle products carry no
  component references, so each bundle lists its products by handle in
  `content/bundles.ts` (`contains`). If you convert them to real Shopify bundles, read
  `bundleComponents` in the Storefront query and drop that list.
- **Product inventory:** four of the five products currently report `inventoryQuantity: 0`
  in Shopify but are still purchasable — the Storefront API reports `availableForSale: true`
  for them, so Add to Cart stays enabled. If you turn off "continue selling when out of
  stock", those buttons will correctly show *Sold out*.
- **"FDA-registered" was removed** from all site copy, per the brief. The science section
  says *GMP-certified* instead, and a standard supplement disclaimer sits in the footer.
- **Newsletter** is wired to Klaviyo (see above) but needs the two env vars before it can
  subscribe anyone; until then the form reports that signups are unavailable rather than
  claiming success.

---

## Troubleshooting

**Images look wrong, or a size never updates.**

Shopify's CDN caches aggressively (`cache-control: max-age=31557600`) and the image URL
carries `?v=<timestamp>`. Replacing a photo in Shopify changes that `v`, so the new file
gets a fresh URL — but only after you re-read the product. Run `npm run sync:shopify` (or
set the Storefront token so pages fetch live) and the new `v` flows through.

**`UNABLE_TO_VERIFY_LEAF_SIGNATURE` in the terminal.**

TLS-intercepting antivirus (Avast, Kaspersky, Zscaler) substitutes its own certificate and
Node rejects it. This no longer breaks images — the browser fetches those straight from the
CDN — but it still breaks anything Node fetches itself: the Storefront API and
`npm run sync:shopify`. Point Node at the interceptor's root certificate:

```bash
# Avast, for example — the path differs per product
export NODE_EXTRA_CA_CERTS="C:\ProgramData\Avast Software\Avast\wscert.pem"
npm run dev
```

On Node 22.15+ / 24 you can trust the OS store directly instead:

```bash
NODE_OPTIONS=--use-system-ca npm run dev
```

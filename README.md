# Family Footwear — Loni, Ghaziabad

Landing page for **Family Footwear and Sportswear**, a multi-brand footwear and
sportswear showroom in Loni, Ghaziabad.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and
Framer Motion. It is a store-discovery site, not an e-commerce site — there is
no cart or checkout, and every call to action points at visiting, calling or
messaging the shop.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

---

## ⚠️ Two things to do before this goes live

### 1. Add the phone number

No phone number was supplied, and inventing one risks publishing a stranger's
real number — so it is a placeholder. Open **`src/lib/site.ts`** and replace:

```ts
const phone = PHONE_PLACEHOLDER;      // "91XXXXXXXXXX"
```

with the store's real number — digits only, including the country code:

```ts
const phone = "919876543210";
```

That single edit switches on every **Call** and **WhatsApp** link across the
header, mobile menu, sticky mobile bar, Visit Store section and footer, and adds
`telephone` to the LocalBusiness structured data. While it is unset, `npm run
dev` shows a reminder in the Visit Store section (development only — it never
renders in production).

### 2. Drop in the two real photographs

`public/images/storefront.jpg` and `public/images/founder.png` are currently
labelled placeholder graphics. Replace them with the real photos:

```bash
python scripts/prepare-images.py --storefront path/to/shop.jpg --founder path/to/nikhil.jpg
```

The script resizes the storefront photo and **removes the background from the
founder photo**, saving a transparent PNG so the figure overlaps the section
artwork the way the layout intends. It needs:

```bash
pip install rembg onnxruntime pillow scipy
```

The first run downloads the ~176 MB u2net model; later runs are fast.

You can also just overwrite the two files by hand, keeping the same names —
`storefront.jpg` (landscape, 1600px+ wide) and `founder.png` (background already
removed, portrait). The founder slot uses `object-contain`, so any portrait crop
sits correctly without touching the layout.

---

## Replacing the product photography

Everything in `public/images/` other than the two files above is **temporary,
openly-licensed stock imagery from Unsplash**, used so the design could be built
and reviewed. Swap it for photographs of the store's own stock when you can —
that is what will make the site feel genuinely local.

Images are wired up in one place, `src/lib/images.ts`. Keep the filenames and
the whole site picks up the change:

| File | Where it appears |
| --- | --- |
| `shoe-hero.webp` | Floating shoe in the hero |
| `scene-track.webp` | Hero background |
| `reveal-{run,train,everyday,relax,play}.webp` | The five scroll chapters |
| `cat-{men,women,kids,active}.webp` | Category card backgrounds |
| `shoe-{white,pink,skate,boot}.webp` | Floating shoes on category cards |
| `scene-runners.webp`, `sport-{class,lift,tee}.webp` | Sportswear section |
| `scene-active.webp` | "Fresh stock" section |

The cut-out shoes (`shoe-*`, `reveal-*`) have transparent backgrounds so they
float inside the cards. If you replace them with ordinary photos, cut the
background out first — the same `rembg` tool used by the script above works well
on studio product shots.

**A note on brand logos in the stock photos:** a few of the placeholder shoes
carry a manufacturer's mark. The store does not stock those brands, so replacing
them with real inventory photos also removes that mismatch. The footer already
carries the trademark notice.

---

## Editing content

Almost everything is data, not markup:

- **`src/lib/site.ts`** — name, address, phone, Google Maps links, navigation,
  brand list, optional Instagram URL.
- **`src/lib/content.ts`** — the four categories and their sub-lists, the five
  scroll chapters, the "why us" cards, sportswear categories.
- **`src/lib/images.ts`** — every image import.

### Brands

The brand list lives in `site.ts`. It currently holds the six brands supplied by
the store: Sparx, Asian, Campus, Paragon, Relaxo and Jockey. `Campus` is
additionally marked `confirmedOnBoard: true` because it is legible on the shop
signage in the storefront photograph.

Only add a brand here once the store confirms it is stocked — the marquee is
presented as a factual claim to customers.

### Adding the Instagram link

Set `instagram` in `site.ts` to a profile URL and the icon appears in the
footer automatically. Leave it `null` to keep it hidden.

---

## What was deliberately left out

The brief ruled these out and the code contains none of them: prices,
discounts, reviews, ratings, stock counts, a founding year, awards, years of
experience, customer numbers or outlet counts. Opening hours are also absent —
none were supplied, so `hours.schema` in `site.ts` is `null`. Fill it in and add
it to the structured data if the store confirms its timings.

Stock wording is deliberately non-committal ("Fresh stock arriving regularly",
"Visit the store for today's available styles and sizes") because inventory
changes daily.

---

## Accessibility & SEO

- Semantic landmarks, a skip link, visible focus rings, and labelled
  interactive controls.
- The decorative brand marquee has a screen-reader-only list equivalent.
- `MotionConfig reducedMotion="user"` in `src/components/Providers.tsx` means
  the whole site respects the visitor's "reduce motion" OS setting.
- Scroll reveals are one-shot (`once: true`) so text can never be left at zero
  opacity.
- Metadata, Open Graph, `robots.txt`, `sitemap.xml`, and `ShoeStore`
  LocalBusiness JSON-LD are generated. The JSON-LD emits only verified facts —
  no invented phone, coordinates, hours or price range.

Set the real domain in `site.url` (`src/lib/site.ts`) before deploying; it feeds
canonical URLs, Open Graph and the sitemap.

### Development-only helper

Adding `?nomotion` to the URL in development snaps animations to their end
state, which is handy for inspecting layout or taking screenshots. It is gated
behind `NODE_ENV === "development"` and cannot fire in production.

---

## Deploying

Any Next.js host works; Vercel needs no configuration. The build is fully
static (`○ Static` for all routes) apart from Next's on-demand image
optimisation, so a Node runtime is expected — do not use `output: "export"`
without also switching the image loader.

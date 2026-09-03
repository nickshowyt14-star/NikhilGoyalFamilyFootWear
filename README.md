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

## Store assets

Both store photographs and the phone number are in place.

| What | Where | Source |
| --- | --- | --- |
| Phone | `src/lib/site.ts` → `phone` | +91 99718 44701 |
| Shopfront | `public/images/storefront.jpg` | `source-photos/shop.png` |
| Founder cut-out | `public/images/founder.png` | `source-photos/nikhil.png` |

Original photographs are kept in `source-photos/` so the derived images can be
regenerated at any time.

### Regenerating them

The shopfront just needs resizing and compressing:

```bash
python scripts/prepare-images.py --storefront source-photos/shop.png
```

The founder photo needs its own script — **do not** use `prepare-images.py` for it:

```bash
python scripts/founder-cutout.py
```

Why: he is holding a board at a race, in front of a sponsor wall. Plain
background removal either keeps the board along with strips of the wall beneath
it, or drops the board entirely. `founder-cutout.py` composes the mask instead —
`person ∪ board` — isolating the board by colour (it sits at R-G ≈ 94, G-B ≈ 0,
well clear of skin at R-G 32-50, G-B 9-27) and rebuilding it with a row-wise
convex fill so its lettering and artwork survive. Anything that is neither
person nor board is sponsor wall and is discarded.

If the founder photo is ever replaced, that colour rule and the row-fill
assumption (the sign being a convex quadrilateral) will need revisiting.

Both scripts need:

```bash
pip install rembg onnxruntime pillow scipy
```

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

The brand list lives in `site.ts`: Abros, Sparx, Asian, Campus, Relaxo, Paragon
and Jockey. Every one is legible on the shop's own signage in
`source-photos/shop.png` — six run along the brand strip beneath the main board,
and Abros is on the top fascia — so all are marked `confirmedOnBoard: true`.

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

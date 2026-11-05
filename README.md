# Glasgow Tigers: UI redesign concept

A full-site UI redesign of [glasgowtigers.co.uk](https://glasgowtigers.co.uk), the official site of Glasgow Tigers Speedway. It is a static, dependency-free build (HTML, CSS, vanilla JS) that uses the club's real 2026 content: results, riders, news, officials, honours, hospitality and travel information.

> Concept work. Images and logos are hot-linked from the live site and belong to Glasgow Tigers and their partners. Forms are front-end demos and send nothing. The shop bag is a front-end demo saved in the visitor's browser; checkout is switched off.

## Pages

| Page | File | Replaces on the live site |
|---|---|---|
| Home | `docs/index.html` | Home |
| Match Centre | `docs/matches.html` | Fixtures, 2026 Results, League Table |
| News | `docs/news.html` | Latest News |
| Team | `docs/team.html` | Riders, Club Officials, History & Honours |
| Matchday | `docs/matchday.html` | Getting Here, Parking |
| Hospitality & Partners | `docs/hospitality.html` | Hospitality, Our Partners, Sponsorship |
| Fans | `docs/fans.html` | Supporters Group, Newsletter, Get Involved |
| Contact | `docs/contact.html` | Contact |
| Shop | `docs/shop.html` | Tigers Shop (Kids, Adults, Accessories, Clearance) |

## Run it

```bash
python3 build.py                                   # assemble src/pages + src/partials into docs/
python3 -m http.server 4173 --directory docs       # open http://localhost:4173
```

`docs/` is the deployable output (ready for GitHub Pages: Settings → Pages → `main` / `docs`). Edit page bodies in `src/pages/`, the shared header, footer and `<head>` in `src/partials/`, and styles and scripts directly in `docs/assets/`. Season data lives in `docs/assets/js/data.js`; the season record, form guide and results list are all computed from it.

## Audit of the live site

### Critique (design-critique skill)

**Overall impression:** strong brand assets (the 4-star crest, red, Bebas Neue, great race photography), but the site behaves like a blog. The things fans come for (last result, next fixture, how to get there) are buried or missing.

| Finding | Severity | Fix in this redesign |
|---|---|---|
| Fixtures page says "check back in 2026" during the 2026 season, and the League Table page is empty | 🔴 Critical | Single Match Centre with Results / Fixtures / Stats tabs and an honest off-season empty state with a sign-up CTA |
| Homepage has no result, fixture, or form information at all | 🔴 Critical | Hero "Final result" card plus a season strip (26 meetings, W-D-L, last-5 form) |
| Navigation wraps onto two rows at common laptop widths ("Contact" drops to line 2); 8 top-level items, 4 of them `#` dead links that only open dropdowns | 🟡 Moderate | 6 top-level items, real buttons with `aria-expanded` for menus, and a full-screen drawer on mobile |
| "Featured Products" renders an empty white block (lazy image never loads) | 🟡 Moderate | Product tile with an explicit image, sale price and strike-through |
| Results list repeats "Results -" on every row, has no draw/defeat state, and the "Tigers Win" badge is inconsistent (it shows on the 25 April KO Cup defeat at Plymouth) | 🟡 Moderate | Date-grouped rows with a centred score chip, W/D/L pill, Home/Away badge and aggregate note |
| Riders page is names only, with no context | 🟢 Minor | Portrait cards with captain badge; horizontal rail on the homepage |
| Large empty gaps between homepage sections | 🟢 Minor | Consistent 8px-based spacing scale and alternating section backgrounds |

### Accessibility (accessibility-review skill, WCAG 2.1 AA)

| Check | Live site (homepage) | Redesign (all 8 pages) |
|---|---|---|
| `<h1>` present | ❌ none | ✅ exactly one per page |
| Links/buttons with no accessible name | ❌ 66 | ✅ 0 (icon links get `aria-label`) |
| Skip link | ❌ | ✅ "Skip to content" |
| Tap targets under 44px | ❌ 34 | ✅ 0 in main content |
| Form fields | (not audited on live site) | ✅ every field labelled, inline errors tied with `aria-describedby`, focus moves to the first error |
| Heading order | Starts at H2 (no H1) | ✅ no skipped levels |
| Text on photos | Relies on the photo being dark | ✅ gradient scrims under all text on imagery |
| Focus visible | (not audited on live site) | ✅ 3px gold focus ring |
| Motion | n/a | ✅ `prefers-reduced-motion` disables reveal, marquee and smooth scroll |
| Keyboard | (not audited on live site) | ✅ dropdowns, tabs (arrow keys) and drawer (focus trap, Esc) all keyboard operable |

## Mobbin references

Mobbin's web catalogue has few sports-club sites, so the strongest references came from sports apps on iOS, translated to responsive web:

| Pattern | Reference | Used for |
|---|---|---|
| Date-grouped results with a centred score chip | [Premier League: Results](https://mobbin.com/screens/6e48547c-1aa9-4dcb-9498-08443d085b68) | Match Centre result rows |
| Yesterday / Today / Upcoming segmented control and compact table | [Apple Sports](https://mobbin.com/screens/9d8c3240-c803-44f7-9989-837a4cc74ba2) | Results / Fixtures / Stats tabs |
| Match cards with competition, time and venue; filter chips | [MLS: Matches](https://mobbin.com/screens/68952c5e-13d6-474f-8628-2eeeb5761e99), [DAZN](https://mobbin.com/screens/b312587d-28c7-4248-befb-4753096f1603) | Competition filter chips, hero result card |
| Game cards with team records | [NBA: Games](https://mobbin.com/screens/fc9aeace-83d3-479b-84d1-1362d05937b7) | Season strip and form guide |
| Oversized condensed hero type with a logo band below | [The Performance Lab: hero](https://mobbin.com/sites/sections/abf8940e-4964-4058-8cc8-4ab89f147c70) | Homepage hero and partner marquee |
| Featured story card over imagery | [Glide: featured story](https://mobbin.com/sites/sections/ff98095f-0934-45a5-93ce-a4c634c18784) | News feature card |
| Lead story plus stacked secondary stories | [The New York Times](https://mobbin.com/screens/77726ae0-a813-4887-ae3c-12ae8f20b432) | Homepage news grid |

## Shop

`docs/shop.html` puts the shop inside the site instead of handing fans off to a separate WooCommerce theme. All 24 products, prices, sale prices, sizes and stock levels are mirrored from the club's live store (`docs/assets/js/products.js`).

- Category filters with counts (All, Adults, Kids, Accessories, Sale) and sorting by price or biggest saving
- Product cards with sale badge, second photo on hover, and a sold-out state
- Product view in a native `<dialog>` (bottom sheet on phones): photo gallery, size or gift-card amount buttons, quantity stepper, and an inline "Please choose a size" error
- Bag drawer on every page with a live count in the header, quantity controls, remove, subtotal and an "Added to bag" toast that pauses while hovered or focused
- Deep links: `shop.html#p-31766` opens a product directly (used by the homepage shirt tile)

In production the bag would hand off to the club's existing WooCommerce checkout (via the Store API cart endpoints), so payments, stock and orders stay where they are today.

| Pattern | Reference |
|---|---|
| Product page: gallery left, size pills, quantity stepper and Add to cart | [Dollar Shave Club: product](https://mobbin.com/screens/d8041b4c-f60e-476c-a013-092cc71dff58) |
| Cart drawer with quantity controls, subtotal and an added-to-cart toast | [Dollar Shave Club: cart](https://mobbin.com/screens/41117564-268d-4be4-8a68-67f1203b05e6) |
| Category headline with sub-category tabs and product count | [H&M: category](https://mobbin.com/screens/b501ce82-b239-4e20-a7f7-a6f24354f197) |

## Design system

- **Colour:** Tigers red `#C31115` (white text 5.9:1), gold `#F5B82E` for stars and focus, ink `#0E0F12` for dark sections, warm paper `#F6F4F0` for reading areas. Result colours: win `#1D8A4E`, draw `#8A6D10`, defeat uses ink so red stays the brand colour.
- **Type:** Bebas Neue (kept from the live brand) for display, Barlow Condensed for labels, scores and buttons, Barlow for body copy.
- **Components:** buttons (primary, ghost, gold, small), chips, segmented tabs, score box, result row, W/D/L pills, story card (feature, row, grid), rider card, tile, info card, travel item, package card, form fields with error states, notice, empty state, CTA band, partner marquee.

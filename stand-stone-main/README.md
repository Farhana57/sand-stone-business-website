# Sand & Stone Supply — bilingual (বাংলা / English) construction-materials website

A production-ready React website for a sand, stone and construction-material supply
business in Bangladesh. Customers can browse materials, request a quotation, order on
WhatsApp or by phone, and read the whole site in **Bangla or English** — switching
instantly, on every page, without a reload.

> **Before you publish:** the business name, phone numbers, e-mail and address in
> `src/data/company.js` are **placeholders**. Nothing on the site shows a made-up price
> or claims an order was saved unless a real backend is connected (see
> [Order handling](#order-handling)).

---

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [Project structure](#project-structure)
- [1. Edit your business details](#1-edit-your-business-details)
- [2. Materials and prices](#2-materials-and-prices)
- [3. Bi-lingual system](#3-bi-lingual-system)
- [4. Order handling](#order-handling)
- [5. Optional backend (Express + MongoDB)](#5-optional-backend-express--mongodb)
- [Testing](#testing)
- [Images](#images)
- [Deployment](#deployment)
- [Accessibility and performance](#accessibility-and-performance)

---

## Features

**Pages (React Router DOM)**

| Route       | Page                                                |
| ----------- | --------------------------------------------------- |
| `/`         | Home — hero, guarantees, featured materials, process |
| `/products` | Products — filterable catalogue, quote buttons       |
| `/delivery` | Delivery & Services — services, fleet, areas, FAQ    |
| `/about`    | About Us — story, values, coverage                   |
| `/contact`  | Contact & Order — contact cards, order form, map     |
| `/order`    | Alias for the order form on the contact page         |
| `*`         | 404 page                                             |

**Language**

- `বাংলা | English` switcher in the header (desktop utility strip + mobile drawer).
- All copy — navigation, headings, product descriptions, buttons, form labels,
  validation messages and the footer — lives in one file: `src/i18n/translations.js`.
- Instant switching through React Context; the choice is remembered in
  `localStorage` and kept while navigating.
- Fonts switch with the language: **Hind Siliguri** for Bangla, **Inter** for English
  (self-hosted, no external font requests).

**Design**

- Premium black / gold / white palette, defined as Tailwind v4 design tokens.
- Responsive navbar with a mobile hamburger drawer, hairline gold accents, glass
  panels and an image-led hero.
- Scroll-reveal animations, hover lifts and image zoom — all disabled automatically
  for visitors who prefer reduced motion.
- Always-available **WhatsApp** and **click-to-call** buttons (floating, plus inline
  buttons on every page).

**Ordering**

- "Request a Quote" on any product opens a modal with that material preselected.
- Full order form: name, phone, product, quantity, unit, delivery address, message —
  with inline and summary validation messages in both languages.
- Two honest submission modes; see [Order handling](#order-handling).

## Tech stack

Runtime dependencies:

| Package               | Version | Used for                              |
| --------------------- | ------- | ------------------------------------- |
| `react`, `react-dom`  | ^19.3   | UI                                    |
| `react-router-dom`    | ^7.18   | Routing (all five pages)              |
| `lucide-react`        | ^1.57   | Icons                                 |
| `tailwindcss` + `@tailwindcss/vite` | ^4.3 | Styling (CSS-first config)  |
| `@fontsource/inter`, `@fontsource/hind-siliguri` | ^5.3 | Self-hosted fonts |

Dev tooling: `vite` ^8, `@vitejs/plugin-react` ^6, `eslint` ^10 with
`@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` and
`globals`, `vitest` ^5 with `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`,
`@testing-library/user-event`.

The **optional** backend (only needed if you want orders stored in a database) uses
`express`, `mongoose`, `cors`, `dotenv`.

## Quick start

Requirements: **Node.js 20.19+** (tested on Node 24) and npm.

```bash
npm install      # install frontend dependencies
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build into dist/
npm run preview  # serve the production build on port 3000
npm run lint     # ESLint
npm test         # Vitest (unit + component + routing tests)
```

The site is fully functional at this point — the order form validates and sends the
request through WhatsApp. To also **save** orders, follow
[section 5](#5-optional-backend-express--mongodb).

## Project structure

```
.
├── index.html                 # Vite entry, SEO meta
├── public/
│   ├── favicon.svg
│   └── images/                # product, hero and fleet photographs
├── src/
│   ├── main.jsx               # providers, fonts, router
│   ├── App.jsx                # route table
│   ├── index.css              # Tailwind v4 theme tokens + component classes
│   ├── i18n/
│   │   ├── translations.js    # ALL UI copy, bn + en
│   │   ├── languageContext.js # context object
│   │   ├── LanguageProvider.jsx
│   │   ├── translate.js       # path lookup + {{placeholder}} helpers
│   │   └── useLanguage.js     # t(), pick(), lang, setLang
│   ├── context/               # quote-modal context (openQuote/closeQuote)
│   ├── data/
│   │   ├── company.js         # ← business details, guarantees, delivery areas
│   │   ├── products.js        # ← materials, units, specs, prices
│   │   └── navigation.js      # nav items
│   ├── lib/
│   │   ├── validation.js      # order rules (returns translation keys)
│   │   ├── api.js             # order API client (optional backend)
│   │   ├── contact.js         # tel / WhatsApp / maps / mailto builders
│   │   ├── format.js          # price + Bangla numeral formatting
│   │   └── formStyles.js
│   ├── hooks/useDocumentTitle.js
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, Layout, LanguageSwitcher, …
│   │   ├── ui/                # Button, Modal, Reveal, SectionHeading, Icon
│   │   ├── sections/          # PageHero, ProcessSection, CoverageSection, CTA, FAQ
│   │   ├── home/              # Hero, AboutStrip
│   │   ├── products/          # ProductCard, ProductGrid
│   │   ├── delivery/          # ServicesGrid
│   │   └── order/             # OrderForm, FormField, OrderSummary, QuoteModal
│   └── pages/                 # Home, Products, DeliveryServices, About, ContactOrder, NotFound
└── server/                    # OPTIONAL Express + MongoDB order API
```

## 1. Edit your business details

Open `src/data/company.js` and replace the placeholders:

- `name`, `tagline` (both have `bn` and `en` versions)
- `phone`, `phoneDisplay`, `whatsapp` — `whatsapp` must be digits only with the country
  code (`8801712345678`) so `wa.me` links work
- `email`, `address`, `mapQuery`, `hours`
- `social.facebook` (or set it to `''` to hide the icon)
- `guarantees` — the "why choose us" cards. Edit the wording to match what you actually
  offer; they are policy statements, not statistics.
- `deliveryAreas` — the areas you really deliver to.

## 2. Materials and prices

Everything about the catalogue is in `src/data/products.js`:

```js
{
  id: 'coarse-sand',
  category: 'sand',                      // sand | stone | other (see `categories`)
  featured: true,                         // shows on the home page
  name:        { bn: 'মোটা নদীর বালু', en: 'Coarse River Sand' },
  tagline:     { bn: '…', en: '…' },
  description: { bn: '…', en: '…' },
  image: '/images/sand-coarse.jpg',
  units: ['cft', 'truck'],                // orderable units, first is the default
  minQuantity: 100,
  minUnit: 'cft',                         // minimum order is checked in this unit
  price: null,                            // ← null shows "Price on request"
  priceUnit: 'cft',
  specs: [ { label: { bn, en }, value: { bn, en } } ],
}
```

- **Prices:** every product ships with `price: null`, so the site never shows an invented
  figure. Set `price: 3200` (BDT, per `priceUnit`) when you are ready to publish a rate.
  Bangla mode renders prices and quantities with Bangla numerals automatically.
- **Units:** `cft`, `truck`, `ton`, `bag`, `piece` are defined in the `units` array; add
  your own or change the labels there.

## 3. Bi-lingual system

- All UI copy lives in `src/i18n/translations.js` under `bn` and `en`. Both trees must
  keep the same shape — a test (`src/i18n/translations.test.js`) fails the build if they
  drift apart.
- Components read text with the `t()` helper:

  ```jsx
  const { t, pick } = useLanguage()
  t('nav.products')                       // 'পণ্যসমূহ' or 'Products'
  t('productsPage.resultCount', { count: '৮' })   // {{count}} placeholders
  pick(product.name)                      // resolves { bn, en } data
  ```

- The switcher calls `setLang('bn' | 'en')`. `LanguageProvider` then updates every
  consumer, sets `<html lang>`, and stores the choice under `sandstone.language`.
- `src/index.css` uses `html[lang='bn']` to switch the document font to Hind Siliguri.
- Adding a third language means adding one more key tree, adding it to
  `supportedLanguages` in `translations.js`, and adding a button in
  `src/components/layout/LanguageSwitcher.jsx`.

## Order handling

The form is honest about what it does. There are two modes, and the UI tells the visitor
which one is active (a notice above the submit button, mirrored in the success panel):

**A. Default — no backend (`VITE_API_URL` unset)**

The order is validated, then handed to WhatsApp as a formatted message in the visitor's
own language. The success panel says the details are ready in WhatsApp — it **never**
claims the order was stored or "saved".

**B. Connected — backend configured**

The order is `POST`ed to the API. Success is only reported after the server responds,
and the message shows the generated order reference (`SS-20261015-7380`). If the server
is unreachable or rejects the data, the visitor sees an error message with call/WhatsApp
fallbacks — nothing is faked.

To turn mode B on, set the base URL of the API before building:

```bash
# .env   (copy from .env.example; Vite only exposes VITE_-prefixed vars)
VITE_API_URL=http://localhost:5000
```

## 5. Optional backend (Express + MongoDB)

You only need this if you want orders in a database. Skip it and mode A keeps working.

```bash
# 1. Configure
cp server/.env.example server/.env      # then edit MONGODB_URI, PORT, CORS_ORIGINS

# 2. Install and run
npm run server:install
npm run server:dev                      # needs a running MongoDB (local or Atlas)
# …or run it with a temporary in-memory MongoDB, no installation required:
npm run dev:memory --prefix server

# 3. Point the frontend at it (.env):  VITE_API_URL=http://localhost:5000
npm run dev
```

Endpoints:

| Method | Path              | Notes                                                                 |
| ------ | ----------------- | --------------------------------------------------------------------- |
| `GET`  | `/api/health`     | `{ status, database: 'connected' \| 'disconnected', time }`           |
| `POST` | `/api/orders`     | Validates, stores and returns `201 { order: { id, reference, createdAt } }`. `400` with per-field errors, `403` for a foreign origin, `503` if MongoDB is unreachable. |
| `GET`  | `/api/orders`     | Staff listing. Disabled (404) unless `ADMIN_TOKEN` is set; then requires the `x-admin-token` header. |

Request body:

```json
{
  "name": "Rakib Hasan",
  "phone": "01712345678",
  "productId": "coarse-sand",
  "productName": "Coarse River Sand",
  "quantity": 200,
  "unit": "cft",
  "address": "House 12, Road 4, West Rampura, Dhaka",
  "message": "Please deliver in the morning.",
  "language": "bn"
}
```

Validation rules are enforced on the server too (`server/src/validate.js`) — identical to
the browser rules, because the client is never trusted.

## Testing

```bash
npm test                                  # frontend: 44 tests (2 more are opt-in)
npm test --prefix server                  # backend: API tests against in-memory MongoDB
```

What the frontend suite covers:

- `src/i18n/translations.test.js` — Bangla/English key parity, no empty strings, no missing
  validation messages, Bangla script where it belongs.
- `src/lib/validation.test.js` — phone patterns, minimum order, required fields, payload shape.
- `src/lib/contact.test.js` — `wa.me`/`tel:` link building and the order message in both languages.
- `src/components/layout/LanguageSwitcher.test.jsx` — instant switching, `<html lang>`,
  `localStorage` persistence, active-button state.
- `src/components/order/OrderForm.test.jsx` — validation feedback, minimum-order rule, and
  that a valid order goes to WhatsApp **without** claiming a save.
- `src/App.test.jsx` — every route renders, navigation works, language survives navigation,
  the quote modal preselects the right material and closes on Escape, and the footer
  material links (`/products?category=…`) filter the catalogue.

There is also an opt-in integration test that uses the **real** API and database:

```bash
npm run dev:memory --prefix server        # in one terminal
VITE_API_URL=http://127.0.0.1:5000 npx vitest run src/components/order/OrderForm.integration.test.jsx
```

It saves an order through the running API and asserts that the server-generated reference
is shown, and that a rejected order surfaces an honest error. It is skipped when
`VITE_API_URL` is not set, so `npm test` stays offline-friendly.

## Images

All photographs in `public/images/` are **self-hosted**, resized and compressed (about
3 MB in total) so the site does not depend on a third-party CDN. They are Pexels photos,
free to use under the Pexels licence, and they are placeholders.

Replace them with photographs of your own sand, stone and trucks, keeping the same file
names — or update the `image` paths in `src/data/products.js` and the `src` attributes in
`src/components/home/Hero.jsx`, `Hero`-style page heroes and the delivery/about sections.

## Deployment

The site is a static bundle after `npm run build`.

1. Set `VITE_API_URL` in your host's environment **at build time** (Vite inlines it), or
   leave it unset to run in WhatsApp-only mode.
2. Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, Nginx…).
3. The site uses client-side routing, so add a SPA fallback that serves `index.html` for
   unknown paths, or deep links such as `/products` will 404.
4. If you deploy the backend, add the site's origin to `CORS_ORIGINS` on the server and
   keep `server/.env` out of version control.

## Accessibility and performance

- Semantic landmarks, a "skip to content" link, labelled form controls with
  `aria-invalid`/`aria-describedby`, `role="alert"` error summaries, `aria-expanded` menus
  and an `aria-modal` dialog with focus management and Escape-to-close.
- Visible gold focus rings, `prefers-reduced-motion` support, and `alt` text on every image.
- Self-hosted subsetted fonts, compressed images, lazy loading below the fold and a single
  CSS bundle (~68 kB, ~10 kB gzipped).
- A top-level error boundary shows a readable message instead of a blank page.

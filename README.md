# Boating.sa — Yacht & Boat Booking Platform

Luxury bilingual (Arabic RTL / English LTR) boat and yacht booking website for Jeddah, Saudi Arabia. Built with Next.js 14, Sanity CMS, and Bókun booking widgets.

## Tech Stack

- **Next.js 14** — App Router, SSR/SSG for SEO
- **TypeScript** — Strict typing
- **Tailwind CSS** + tailwindcss-rtl — Dark luxury theme with RTL support
- **next-intl** — Locale routing (`/ar/...`, `/en/...`)
- **Sanity.io** — Headless CMS for boats, FAQs, page content
- **Bókun** — Booking engine, calendar, payments (Rapyd: Mada + Apple Pay)
- **Google Maps** — Marina discovery
- **Vercel** — Deployment (KSA region: dub1)

## Getting Started

```bash
npm install
cp .env.local.example .env.local
# Fill in environment variables
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/ar`.

## Pages (12)

| Route | Description |
|-------|-------------|
| `/[locale]` | Homepage |
| `/[locale]/boats` | Fleet listings with filters |
| `/[locale]/boats/[slug]` | Boat detail + Bókun widget |
| `/[locale]/map` | Marina map discovery |
| `/[locale]/how-it-works` | 3-step booking guide |
| `/[locale]/about` | Brand story |
| `/[locale]/safety` | Safety & trust |
| `/[locale]/faq` | 15 FAQs |
| `/[locale]/contact` | Contact form + map |
| `/[locale]/list-your-boat` | Owner lead capture |
| `/[locale]/terms` | Terms & conditions |
| `/[locale]/privacy` | Privacy policy (PDPL) |

## Environment Variables

See [`.env.local.example`](.env.local.example) for all required variables.

## Deployment

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy to `dub1` region (configured in `vercel.json`)
5. Add custom domain (e.g. `boating.sa`)

## Out of Scope

- Custom booking engine (Bókun handles booking)
- Custom backend/database
- Authentication/login
- Client/owner dashboards
- Custom payment routing

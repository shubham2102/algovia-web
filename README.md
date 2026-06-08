# Algovia Web

AI-first enterprise marketing site for Algovia — homepage with embedded RAG-powered AI, six navigation pages, GSAP/Lenis motion, and production deployment.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **GSAP** — ScrollTrigger, section reveals, page transitions
- **Lenis** — smooth scrolling
- **RAG chat** — intent routing + knowledge retrieval + OpenAI/Anthropic

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Stakeholder preview (ngrok)

Share a live preview without deploying:

```bash
npm run dev
npx ngrok http 3000
```

Use the ngrok HTTPS URL for daily stakeholder reviews.

### Environment

See `.env.example` for all variables. Minimum for live AI:

```
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_WORKSHOP_URL=https://calendly.com/...
NEXT_PUBLIC_UPLOAD_URL=https://forms.gle/...
```

Without API keys, the assistant uses structured fallback answers from the knowledge corpus.

### Knowledge base

```bash
npm run ingest:knowledge
```

Exports `data/knowledge-index.json` from `src/lib/ai/knowledge-corpus.ts`.

## Site map

| Route | Description |
|-------|-------------|
| `/` | Homepage (8 sections + hero AI) |
| `/platform` | Platform architecture narrative |
| `/solutions` | Vertical, agentic, business AI |
| `/services` | Delivery services + methodology |
| `/industries` | Industry use cases |
| `/resources` | Case studies, docs, help |
| `/company` | About, careers, contact |

## Project structure

```
src/
  app/
    page.tsx                 # Homepage
    platform|solutions|...   # Nav pages
    components/              # Homepage sections
    api/chat/route.ts        # AI endpoint
  components/
    layout/                  # Header, Footer
    marketing/               # Inner page template
    ui/                      # Logo, SectionViewport, AILink
  lib/
    ai/                      # RAG pipeline (intent, retrieve, chat)
    constants.ts             # Nav, content, SITE urls
    metadata.ts              # Shared page metadata helper
    theme.ts                 # Design tokens (JS)
  providers/                 # Lenis, transitions
scripts/
  ingest-knowledge.ts        # Corpus export / future pgvector
```

## Deploy (Vercel)

1. Push to GitHub and import in Vercel
2. Set env vars from `.env.example`
3. Deploy — `npm run build` runs automatically

See **HANDOFF.md** for full client handoff documentation.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — production server
- `npm run ingest:knowledge` — export knowledge index

## Brand

Typography: **Poppins**. Dark-first design with glass surfaces.

| Token | Hex | Usage |
|-------|-----|-------|
| Dark Green | `#012A2D` | Background, base surfaces |
| Bright Green | `#02BB73` | Primary brand, CTAs, accents |
| Yellow | `#EEAD2B` | Secondary accent, gradients |
| White | `#FFFFFF` | Foreground text |

Design tokens live in `src/app/globals.css` (CSS variables) and `src/lib/theme.ts` (JS/TS).

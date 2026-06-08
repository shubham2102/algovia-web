# Algovia Web — Handoff Documentation

Production-ready marketing site with RAG-powered Algovia AI, six navigation pages, premium motion, and deployment-ready configuration.

## Production URL

Deploy to **Vercel** (recommended):

1. Import the `algovia-web` repository
2. Set environment variables (see below)
3. Deploy — preview on every PR, production on `main`

Custom domain: point DNS `A`/`CNAME` to Vercel and add domain in project settings.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Recommended | Powers live LLM responses in `/api/chat` |
| `OPENAI_MODEL` | No | Default: `gpt-4o-mini` |
| `ANTHROPIC_API_KEY` | No | Fallback LLM if OpenAI unavailable |
| `ANTHROPIC_MODEL` | No | Default: `claude-3-5-haiku-20241022` |
| `EMBEDDING_MODEL` | No | For future vector ingestion |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Canonical site URL |
| `NEXT_PUBLIC_WORKSHOP_URL` | Yes | Calendly or booking link |
| `NEXT_PUBLIC_UPLOAD_URL` | Yes | Requirements upload form |
| `DATABASE_URL` | Phase 2 | pgvector / Supabase for vector RAG |

Copy `.env.example` → `.env.local` for local development.

## Updating the knowledge base

1. Edit chunks in `src/lib/ai/knowledge-corpus.ts`
2. Run `npm run ingest:knowledge` to export `data/knowledge-index.json`
3. Redeploy — retrieval uses in-memory corpus at build/runtime

For pgvector (Phase 2): run `npm run ingest:knowledge -- --embed` with `DATABASE_URL` configured.

## Component map

### Homepage (`src/app/page.tsx`)

| Section | Path |
|---------|------|
| Hero + AI panel | `src/app/components/HeroSection/` |
| Trust bar | `src/app/components/TrustBar/` |
| Services | `src/app/components/ServicesSection/` |
| Architecture | `src/app/components/ArchitectureShowcase/` |
| Engineering | `src/app/components/EngineeringSection/` |
| Industries | `src/app/components/IndustriesSection/` |
| Case studies | `src/app/components/CaseStudiesSection/` |
| CTA | `src/app/components/CTASection/` |

### Inner pages

Shared template: `src/components/marketing/` (`PageHero`, `PageSection`, `MarketingCTA`)

| Route | File |
|-------|------|
| `/platform` | `src/app/platform/page.tsx` |
| `/solutions` | `src/app/solutions/page.tsx` |
| `/services` | `src/app/services/page.tsx` |
| `/industries` | `src/app/industries/page.tsx` |
| `/resources` | `src/app/resources/page.tsx` |
| `/company` | `src/app/company/page.tsx` |

### AI pipeline

```
/api/chat → intent.ts → retrieve.ts → prompts.ts → chat.ts
```

Fallback: `src/lib/knowledge.ts` when no API keys or rate limited.

## Motion system

- **Lenis** smooth scroll: `src/providers/ClientLayout.tsx`
- **GSAP ScrollTrigger** reveals: `src/components/animations/Reveal.tsx`
- **Page transitions**: `src/providers/TransitionProvider.tsx`

## Known limitations (Phase 2 backlog)

- Workshop/upload CTAs use env URLs (no backend form handling)
- RAG uses keyword scoring, not pgvector embeddings
- Legal pages (Privacy, Terms) are placeholder links
- No CMS — content lives in constants and corpus files
- Attach file button in AI panel is UI-only
- Analytics (GA4/PostHog) not integrated

## QA checklist (sign-off)

- [x] Homepage 8 sections at full viewport height
- [x] Hero split layout, fixed AI panel height
- [x] Six nav pages with real content
- [x] Header/footer wired to routes
- [x] RAG-backed `/api/chat` with intent routing
- [x] CTAs: Talk to AI (scroll + focus), Workshop, Upload
- [x] Dark mode, brand tokens, glassmorphism
- [x] GSAP + Lenis + page transitions
- [ ] Client logos / case study images (replace placeholders when assets arrive)
- [ ] Production domain + analytics (post-launch)

## Build verification

```bash
npm run build
npm run start
```

Target: Lighthouse LCP < 2.5s on staging with hero logo priority loading.

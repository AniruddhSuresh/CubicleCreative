@AGENTS.md

# PatientPending

SaaS app for independent healthcare provider patient intake and referral management.

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Supabase (Auth + Postgres + RLS)
- @dnd-kit for Kanban drag-and-drop
- Recharts for analytics

## Key conventions (Next.js 16)
- Route protection lives in `src/proxy.ts` (NOT middleware.ts — renamed in v16)
- All `params` and `searchParams` in page components must be awaited: `const { id } = await props.params`
- Tailwind v4: uses `@import "tailwindcss"` in globals.css, no tailwind.config.js needed
- Server Supabase client: `src/lib/supabase/server.ts` (async cookies)
- Client Supabase client: `src/lib/supabase/client.ts`

## Setup
1. Create Supabase project, run `supabase/schema.sql`
2. Copy `.env.local.example` → `.env.local`, fill in Supabase credentials
3. `npm run dev`

## Public routes (no auth required)
- `/intake/[slug]` — patient intake form
- `/referral/[slug]` — referral submission form

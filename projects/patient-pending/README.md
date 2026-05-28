# PatientPending

Modern patient intake and referral management for independent healthcare practices.

> **Not an EMR. Not billing software.** Just clean, lightweight workflow management for small practices.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Supabase** (Auth + Postgres + Row Level Security)
- **@dnd-kit** (Kanban drag-and-drop)
- **Recharts** (Analytics charts)
- **lucide-react** (Icons)

## Features

- **Provider dashboard** with pipeline metrics
- **Public intake form** at `/intake/[slug]` — patients submit requests directly
- **Public referral form** at `/referral/[slug]` — clinics submit referrals
- **Kanban pipeline board** with drag-and-drop (New → Contacted → Awaiting → Scheduled)
- **Patient & referral detail pages** with internal notes
- **Search & filter** by status, source, urgency
- **Analytics** — monthly volume charts, status breakdown, conversion rate
- **Settings page** with intake link management

## Setup

### 1. Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the Supabase SQL Editor
3. Copy your Project URL and anon key

### 2. Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/signup` | Provider registration |
| `/login` | Provider login |
| `/dashboard` | Dashboard home (metrics) |
| `/dashboard/patients` | Patient list with search/filter |
| `/dashboard/patients/[id]` | Patient detail + notes + status |
| `/dashboard/patients/new` | Manual patient entry |
| `/dashboard/referrals` | Referral list |
| `/dashboard/referrals/[id]` | Referral detail + notes + status |
| `/dashboard/pipeline` | Kanban board (drag-and-drop) |
| `/dashboard/analytics` | Charts and metrics |
| `/dashboard/settings` | Practice profile + intake link |
| `/intake/[slug]` | **Public** patient intake form |
| `/referral/[slug]` | **Public** referral submission form |

## Architecture

### Database (Supabase)

- `providers` — practice profile, intake slug
- `patients` — intake requests and manually added patients
- `referrals` — referrals from other providers
- `notes` — internal notes on patients/referrals
- `activity_log` — audit trail

Row Level Security (RLS) is enabled on all tables. Providers can only see their own data. Public `INSERT` policies allow unauthenticated form submissions.

### Auth

- Supabase Auth handles email/password authentication
- `src/proxy.ts` (Next.js 16 proxy convention) protects `/dashboard` routes
- Server-side session validation via `@supabase/ssr`

## Future Roadmap

- SMS/email reminders to patients
- Multi-user practice teams
- Scheduling integrations (Google Calendar, etc.)
- HIPAA-compliant infrastructure mode
- Provider network / referral directory
- AI-assisted intake summaries
- Stripe billing integration

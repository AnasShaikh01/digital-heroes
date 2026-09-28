# Digital Heroes

A modern, charity-first golf performance platform combining **Stableford score tracking, monthly prize draws, subscriptions, and charitable giving**.

> **Core Philosophy:** Play better. Support a cause. Get a chance to win.

The platform deliberately avoids traditional golf-site cliches, opting for a **modern premium dark aesthetic** focused on charity impact, transparency, and high performance.

---

## Quick Start (How to Run Locally)

### 1. Prerequisites & Installation

```bash
# Clone and install dependencies
git clone <repo-url>
cd digital-heroes
npm install
2. Environment Setup
Create .env.local in the project root:

Code snippet
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Application
NEXT_PUBLIC_SITE_URL=http://localhost:3000
⚠️ Security Warning: Never commit .env.local or any secret keys to source control.

3. Local Development Servers
In Terminal 1 (Next.js app):

Bash
npm run dev
App runs at: http://localhost:3000

In Terminal 2 (Stripe Webhook Listener):

Bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
(Copy the generated whsec_... key into STRIPE_WEBHOOK_SECRET in .env.local)

4. Quality Checks
Bash
npm run lint
npm run build
📍 Where You Left Off (Pickup Point)
Current Checkpoint: Phase 5 complete, E2E Testing in Progress.

Last Activity Completed
Test 6 (Stripe Subscription): Passed primary checkout and subscription creation in Supabase. Mapped initial webhook issues.

Next Immediate Action Items
Resume E2E Testing Pass:

[ ] Test 7: Subscriber Access Checks (verify non-subscribers are blocked from draw/subscriber-only features).

[ ] Test 8: Cancellation / Lapsed Subscriptions.

[ ] Test 9: Admin Dashboard Access & Authorization.

[ ] Test 10: Security & RLS Policy Audits.

[ ] Test 11: Error & Edge Case Handling.

Consolidated Cleanup Pass (Do NOT fix piecemeal before finishing E2E tests):

[ ] Email Verification Redirect Bug: User is redirected to landing page instead of dashboard after email link click.

[ ] Database Enum vs. Type Mismatch: Fix Stripe webhook status mapping (paid vs succeeded in PostgreSQL enum).

[ ] Database Type Regeneration: Fix Supabase CLI auth and regenerate src/types/database.ts from the live DB.

[ ] Role Architecture Alignment: Reconcile user/subscriber/admin distinctions across lib/auth/roles.ts, middleware.ts, and DB models. (Subscription status must be read from subscriptions.status, not from profile identity roles).

Technology Stack
Framework: Next.js (App Router, Server Actions, Route Handlers)

Frontend: React, TypeScript, Tailwind CSS, Lucide React

Backend & Database: Supabase (PostgreSQL, Row Level Security, Auth)

Payments: Stripe (Checkout, Subscriptions, Webhook Handler)

Deployment Target: Vercel + Supabase

Core Product Architecture & Flow
Key Domain Services Layer
Plaintext
UI (Pages / Components)
       │
       ▼
Server Actions / Route Handlers
       │
       ▼
Domain Services (lib/)
 ├── auth/         ➜ Supabase Auth session & role enforcement
 ├── scores/       ➜ 5-score buffer retention & range validation
 ├── charity/      ➜ Charity preference & percentage logic (10%-100%)
 ├── subscription/ ➜ Access check (subscriptions table status)
 ├── stripe/       ➜ Checkout session creation & webhook processing
 ├── draw/         ➜ Draw generation & entry snapshots (Phase 6)
 ├── winner/       ➜ Verification & proof handling (Phase 7)
 └── admin/        ➜ Admin-only operations & audit logging
       │
       ▼
Supabase PostgreSQL (Database + RLS)
Critical Rules & Business Logic
Score Management (Phase 4):

Score range: Valid between 1 and 45 (Stableford score).

Rolling buffer: Retains strictly the latest 5 scores. Adding a 6th score automatically removes the oldest entry.

Charity Contribution:

Users select an active charity and set a contribution percentage (10% minimum to 100% maximum). Validated server-side.

Subscription Access Model:

Auth role (user, admin) is strictly separated from subscription eligibility.

Subscriber access must always be calculated from subscriptions.status (active or trialing) and a valid current_period_end.

Database Schema & Entity Structure
All tables exist in PostgreSQL via Supabase with Row Level Security (RLS) active.

Plaintext
auth.users
    │
    └── profiles
          │
          ├── subscriptions ── plans
          │
          ├── scores (5-score rolling buffer)
          │
          ├── user_charity_preferences ── charities
          │
          ├── charity_contributions
          │
          ├── draw_entries ── draws
          │
          └── winners
                │
                ├── winner_proofs
                └── payouts
Crucial Rule: src/types/database.ts is generated directly from PostgreSQL. Never modify schema types directly in database.ts. Always create a migration file under supabase/migrations/ first.

Implementation Roadmap & Phase Tracker
Phase	Description	Status
Phase 1	Backend Foundation, Supabase setup, Migrations & RLS	✅ Done
Phase 2	Authentication (Supabase Auth, SSR, Route guards)	✅ Done
Phase 3	Public UI (Charity directory, Pricing, How-it-works)	✅ Done
Phase 4	Scores (1-45, 5-score buffer) & Charity Selection (10-100%)	✅ Done
Phase 5	Subscriptions & Stripe Webhooks (Checkout, Invoice handling)	✅ Done
Testing Pass	Complete E2E manual audit	🟡 In Progress
Cleanup Pass	Fix redirects, DB type sync, and role architecture	⏳ Pending
Phase 6	Draw Engine (Weighted draws, Entry snapshots, Rollover jackpots)	⏳ Next Phase
Phase 7	Winners & Payouts (Proof upload, Admin verification, Payout status)	⏳ Pending
Phase 8	Charity Contributions Tracking & Impact Dashboards	⏳ Pending
Phase 9	Comprehensive Admin Management Suite	🟡 Partial
Phase 10	Automated Unit, Integration & RLS Tests	⏳ Pending
Phase 11	UI/UX Polish, Accessibility & Motion	⏳ Pending
Phase 12	Production Deployment (Vercel & Stripe Live)	⏳ Pending
Project Directory Map
Plaintext
digital-heroes/
├── app/
│   ├── (public)/          # Landing, pricing, charity directory
│   ├── (auth)/            # Login, signup, password resets
│   ├── dashboard/         # Protected user space (scores, charity, sub, winnings)
│   ├── admin/             # Admin management (users, draws, winners, payouts)
│   └── api/stripe/        # Stripe checkout & webhook handlers
├── components/            # Visual UI components categorized by module
├── lib/                   # Domain logic services (auth, stripe, scores, etc.)
├── actions/               # Next.js Server Actions
├── types/                 # Type definitions (`database.ts` is auto-generated)
├── supabase/
│   ├── migrations/        # SQL schema history
│   └── config.toml
└── README.md
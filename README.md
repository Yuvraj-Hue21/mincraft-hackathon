# Hackathon World — Frontend (Phase 1, no backend)

Minecraft-inspired 48-hour hackathon website. Frontend-only, per spec:
no Supabase/Firebase, no real auth, no API routes — mock data + a
service-layer abstraction so a backend can be plugged in later
without touching the UI.

## Run it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Structure

- `src/components/3d` — Three.js/R3F world: terrain, trees, portal,
  character, particles (built from primitives — no external GLB
  assets required, per the spec's fallback rule).
- `src/components/hero` — Hero canvas, loading screen, WebGL fallback.
- `src/components/sections` — About / Timeline / Rules / Prizes /
  Sponsors / FAQ / Final CTA landing sections.
- `src/components/minecraft` — Reusable pixel-styled UI atoms
  (button, card, badge).
- `src/components/dashboard`, `src/components/admin` — Participant
  and admin dashboard UI.
- `src/data` — mock data (problems, participants, teams,
  announcements, timeline).
- `src/lib/services` — the service layer. Every function here is a
  `// TODO: Replace with Supabase...` seam. The dashboard/admin pages
  only ever call these functions, never the mock data directly.

## Routes

`/`, `/login`, `/dashboard` (+`/problems`, `/announcements`, `/team`),
`/admin` (+`/participants`, `/teams`, `/problems`, `/announcements`,
`/settings`). Route protection is not implemented — this is the
frontend-only phase.

## What's intentionally left light

- 3D assets are primitive-built voxel geometry, not licensed
  Minecraft models (per the brief's own instruction to avoid that).
- No sound implementation yet (`SoundProvider`/`SoundToggle` are a
  natural next addition, deliberately left out of this pass).
- No custom cursor — a nice-to-have, cut to keep the first pass real
  rather than decorative.
- Mobile-tier 3D reduction is heuristic (screen width / pointer type /
  core count), not a full GPU benchmark.

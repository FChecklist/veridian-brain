# veridian-brain

> **Status check (added 2026-09-01):** this repo has had exactly one commit
> since 2026-07-09 — 54 days of silence as of this note. Everything below
> was independently re-verified against the current `compliance-tracker`
> clone and is still factually accurate (the 5 named services and both
> `/api/v1/brain/*` routes still exist at the paths cited below), so
> nothing here is *wrong* — it's just unclear whether Phases B/C/D are
> still intended, since this repo isn't mentioned in the more recent
> R65 Part C/D/E planning. If the strangler-fig migration is still the
> plan, fold this repo's roadmap into that planning; if it's been
> superseded, mark this repo archived rather than leaving it ambiguous.


**Status: scaffold only — Phase A of a 4-phase strangler-fig migration, not yet extracted.**

This repo will eventually hold VERIDIAN AI OS's shared intelligence layer ("the Brain") — capability/asset registry, worker-agent registry, deterministic engine library, FDE, intent engine, knowledge graph, model router — with zero business logic, so every product repo (`compliance-tracker`, `projexa`, `veda-advisors`, future ones) becomes a thin app calling in over a versioned API instead of importing each other's code or duplicating capability logic.

## Current state (2026-07-09)

**Nothing has been extracted yet.** All of the real logic this repo will eventually own still lives in `compliance-tracker`:
- Capability Registry: `compliance-tracker/src/lib/services/capability-registry-service.ts`
- Worker Agent registry: `compliance-tracker/src/lib/services/worker-agent-service.ts`
- Entity graph store (Phase 3): `compliance-tracker/src/lib/services/entity-graph-service.ts`
- FDE: `compliance-tracker/src/lib/services/fde-service.ts`
- Intent Engine (Wave 149): `compliance-tracker/src/lib/intent-engine.ts`

`compliance-tracker` now exposes 2 of these over a versioned internal API namespace (`/api/v1/brain/capabilities`, `/api/v1/brain/entity-relationships`) — this is the "wrap in place" step of the migration, requiring zero code movement and zero risk to the live product. This repo's `packages/brain-sdk` is a **stub** typed client for that namespace — method signatures exist, but calls are not yet wired to a real HTTP client, since there's nothing to migrate to yet.

## The 4-phase plan (from `Study_by_Claude.md`'s architecture addendum)

- **Phase A — wrap in place** (this repo's current state): expose existing compliance-tracker services behind a versioned API namespace. No new repo needed *conceptually*, but this repo exists as the eventual home for the SDK and, later, the extracted services.
- **Phase B — cross-repo validation**: have a second real consumer (`projexa` or `veda-advisors`) call the `/api/v1/brain/*` namespace for a real feature, proving the API contract holds across repos before anything physically moves.
- **Phase C — physical extraction**: move the actual service code (capability registry, worker agent registry, entity graph, FDE, intent engine) out of `compliance-tracker` into this repo, behind the same API contract Phase B validated.
- **Phase D — net-new Brain-only components**: build things that only make sense once the Brain is its own service (cross-product intent classification, a shared knowledge graph spanning multiple product repos' data, etc.).

**Phases B, C, and D are not started.** This is genuinely multi-week work requiring its own dedicated design/rollout plan — this repo's job right now is to exist as a real placeholder with an honest README, not to pretend the extraction has happened.

## packages/brain-sdk

A stub TypeScript client. See `packages/brain-sdk/src/index.ts` for the exact method signatures. Every method currently throws `"not yet implemented — see README, this SDK targets a Brain service that doesn't exist as a separate deployment yet"` rather than silently returning fake data.

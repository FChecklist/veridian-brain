// Typed client stub for compliance-tracker's /api/v1/brain/* namespace
// (Wave 153, Phase4_Implementation_Plan.md, "Brain architecture
// groundwork" -- Phase A of the strangler-fig migration in
// Study_by_Claude.md's architecture addendum).
//
// This is deliberately NOT wired to a real HTTP client yet. There is no
// separate "Brain" deployment to call -- compliance-tracker's own
// /api/v1/brain/* routes are the only implementation that exists today.
// Every method below throws rather than returning fake/mocked data, so a
// caller can never be silently misled into thinking this SDK does
// something it doesn't. Wire this up for real once Phase B (a second
// real cross-repo consumer) is actually being built.

export type CapabilityMatch = {
  entityType: "worker_agent" | "automation_rule" | "module" | "prompt_pattern"
  entityId: string
  score: number
  content: string
}

export type EntityRelationship = {
  id: string
  orgId: string
  sourceType: string
  sourceId: string
  targetType: string
  targetId: string
  relationshipType: string
  metadata: Record<string, unknown> | null
  createdAt: string
  updatedAt: string
}

export type BrainSdkConfig = {
  baseUrl: string
  apiKey: string
}

const NOT_IMPLEMENTED =
  "@veridian/brain-sdk: not yet implemented -- see README.md at the repo root. " +
  "This SDK targets a Brain service that doesn't exist as a separate deployment yet; " +
  "the real endpoints currently live at compliance-tracker's /api/v1/brain/* namespace."

export class BrainClient {
  constructor(private readonly config: BrainSdkConfig) {}

  async searchCapabilities(_query: string, _limit?: number): Promise<CapabilityMatch[]> {
    throw new Error(NOT_IMPLEMENTED)
  }

  async getEntityRelationships(_entityType: string, _entityId: string): Promise<EntityRelationship[]> {
    throw new Error(NOT_IMPLEMENTED)
  }
}

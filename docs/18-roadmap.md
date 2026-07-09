# Roadmap

## 1. Roadmap Philosophy

NightCode's roadmap is organized around three horizons: solidifying the free-tier core experience, extending capability for power users and teams, and deepening the model/provider layer beyond the initial NVIDIA NIM catalog. Every item below is written as a capability the product doesn't yet have, evaluated against the same principle that shaped the initial architecture: it should not compromise the "free, frontier-class AI coding agent, no card required" promise for the majority of users.

## 2. Near-Term (Next 1–2 Releases)

| Item | Description | Why it matters |
|---|---|---|
| **Normalized message schema migration path** | Ship the per-message table design documented in [Database Design](./04-database-design.md) §4.1, with a backfill migration, once conversation length or analytics needs outgrow the JSON-document model. | Removes the one known scaling ceiling in the current schema before it becomes an active problem. |
| **Model fallback on provider rate-limit** | Automatically retry a request against a secondary free NVIDIA model when the primary hits a transient `429`, with a visible in-terminal notice. | Improves reliability of the free tier without any user-facing billing impact. |
| **Session search** | Full-text search across a user's own session titles and content. | A natural need once a user accumulates dozens of past sessions. |
| **Configurable daily allowance visibility** | Push allowance-remaining updates to the CLI in real time (not just on each request), so the status bar reflects consumption from *any* concurrent client the user is running. | Improves trust and transparency around the free-tier fairness model. |

## 3. Mid-Term (Team & Power-User Capability)

| Item | Description | Why it matters |
|---|---|---|
| **Team workspaces** | Shared sessions and shared Pro billing across a small team, rather than strictly per-individual accounts. | Natural expansion path for the Pro tier beyond individual power users. |
| **Custom system prompts / agent presets** | Let users define reusable persona/instruction presets layered on top of the base PLAN/BUILD system prompt. | Supports specialized workflows (code review agent, test-writing agent) without forking the product. |
| **Session export** | Export a session's full conversation (including tool calls) as a shareable Markdown or JSON artifact. | Useful for documentation, PR descriptions, and team knowledge sharing. |
| **Fine-grained BUILD-mode permissions** | Optionally scope BUILD mode to a narrower capability set (e.g. edit-only, no `bash`) for users who want write access without full shell execution. | Extends the mode system's defense-in-depth philosophy with more granular user control. |

## 4. Longer-Term (Model & Provider Layer)

| Item | Description | Why it matters |
|---|---|---|
| **Additional free model providers** | Extend the provider-agnostic model registry (see [AI Model Integration](./07-ai-model-integration.md) §7) to pool capacity across more than one free inference provider. | Reduces single-provider dependency risk and increases effective free-tier throughput. |
| **Premium hosted model tier expansion** | Add NVIDIA's paid, higher-throughput hosted endpoints as additional `premium` registry entries for Pro subscribers. | Grows Pro's value proposition without touching the free tier's model catalog. |
| **Self-hosted/local model support** | Allow advanced users to point the tool-calling pipeline at a locally-run model server for fully offline or air-gapped use. | Serves a security-conscious segment (regulated industries, classified environments) the hosted-only model can't reach today. |
| **Multi-agent BUILD workflows** | Support coordinated multi-step agent workflows (e.g. a planning agent handing off to a build agent) within a single session. | Natural extension once the concurrency considerations noted in [Session & State Management](./11-session-state-management.md) §8 are formally addressed. |

## 5. Explicit Non-Goals (For Now)

- **Per-token billing for free-tier models.** The free tier's entire purpose is to not require this; introducing it would undermine the core product thesis rather than extend it.
- **A hosted web IDE.** NightCode is deliberately terminal-first; a web-based interface is a different product with a different trust model (local tool execution changes fundamentally once the client isn't the user's own machine).
- **Bundling a proprietary closed-source model as the default.** Doing so would reintroduce exactly the cost and access barrier the product exists to remove; closed-model access, if ever added, would be an explicitly premium, opt-in addition — never the default.

## 6. How Roadmap Priorities Are Set

Each item is evaluated against three questions before being scheduled: does it strengthen the free-tier core experience for the majority of users, does it meaningfully grow Pro's value without degrading free, and does it introduce new security or trust surface area that needs its own review (per [Security Architecture](./12-security-architecture.md))? Items that fail the first two are deprioritized regardless of technical interest; items that trigger the third get an explicit security review before implementation begins, not after.

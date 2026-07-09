# Tech Stack

## 1. Guiding Principles

The stack is chosen around three constraints specific to a terminal-based AI agent product:

1. **The CLI must start instantly and feel native in a terminal.** This rules out anything that assumes a browser DOM or a heavy runtime boot.
2. **The server must stream tokens with low latency and handle long-running AI responses without timing out.** This favors a lightweight, edge-friendly web framework over a full-stack framework built for page rendering.
3. **A single team must be able to maintain client, server, database, and shared logic without duplicating types or validation.** This favors a TypeScript monorepo with shared packages over separate repositories per surface.

## 2. Stack at a Glance

| Layer | Technology | Why |
|---|---|---|
| Runtime & package manager | **Bun** | Single tool for installing dependencies, running TypeScript directly, bundling the CLI binary, and managing monorepo workspaces — no separate transpile step, fast cold starts. |
| Language | **TypeScript** (100% of the codebase) | End-to-end type safety from database schema to terminal UI props, including shared Zod validation schemas. |
| Terminal UI | **OpenTUI + React** | Lets the team build the terminal interface using familiar React component patterns (state, hooks, composition) instead of hand-rolled ANSI escape sequences. |
| In-terminal routing | **react-router** | Provides screen-to-screen navigation (home → new session → active session) with the same mental model web developers already know. |
| API framework | **Hono** | Minimal, extremely fast web framework with first-class streaming support and a typed RPC client, so the CLI can call the API with full end-to-end type inference. |
| AI orchestration | **Vercel AI SDK (`ai` package)** | Handles model-agnostic streaming, tool-calling protocol, and message state normalization, so swapping or adding model providers doesn't require rewriting the chat pipeline. |
| AI inference provider | **NVIDIA NIM** (OpenAI-compatible endpoint) | Free-tier access to a catalog of frontier-class open models, reachable through an OpenAI-compatible chat completions API. |
| ORM | **Prisma** | Type-safe database access with migrations, used identically from the server package. |
| Database | **PostgreSQL** (Neon recommended for serverless hosting) | Durable, relational, well-understood; Neon adds branching and instant provisioning for preview environments. |
| Identity / Auth | **Clerk** | Managed OAuth identity provider; NightCode uses Clerk's OAuth application support to run a PKCE-based login flow from the CLI. |
| Usage metering / billing | **Polar** | Developer-first billing platform with native usage-based metering, used to track free-tier allowance consumption and Pro subscriptions. |
| Validation | **Zod** | Shared request/response and tool-input schemas, used identically on client and server. |
| Error monitoring | **Sentry** | Captures unhandled exceptions from both the CLI and the API in production. |
| Hosting | **Railway** (API), **Neon** (database) | Simple, git-connected deployment for a small operational footprint. |

## 3. Why Not Alternatives

- **Why not Node.js instead of Bun?** Bun's native TypeScript execution, built-in bundler, and fast workspace-aware installs remove the need for a separate build toolchain (tsx/ts-node, esbuild, npm/pnpm workspace tooling) — fewer moving parts for a small team to maintain.
- **Why not Express/Fastify instead of Hono?** Hono is designed for edge and streaming-first workloads and ships a typed client (`hono/client`) that lets the CLI call server routes with full type inference, eliminating a whole category of client/server contract drift.
- **Why not a fully custom terminal renderer?** OpenTUI provides a React reconciler targeting the terminal, so the team reuses React's component model, state management, and testing patterns instead of building a bespoke UI framework.
- **Why not roll a custom OpenAI-compatible client?** The Vercel AI SDK already standardizes streaming, message parts, and tool-calling across providers; NVIDIA NIM's OpenAI-compatible API plugs directly into the SDK's OpenAI-compatible provider adapter.
- **Why not a NoSQL document store for sessions?** Session history is inherently structured, user-scoped, and benefits from relational guarantees (foreign keys, transactional writes) even though the message payload itself is stored as JSON; Postgres gives both relational integrity and flexible JSON storage in one system.

## 4. Cross-Cutting Libraries

| Concern | Library |
|---|---|
| Schema validation (server & CLI) | `zod` |
| Server-side request validation middleware | `@hono/zod-validator` |
| AI streaming & tool orchestration | `ai` (Vercel AI SDK) |
| NVIDIA NIM provider adapter | `@ai-sdk/openai-compatible` (configured against NVIDIA's endpoint) |
| Identity/auth verification | `@clerk/backend` |
| Billing/metering client | `@polar-sh/sdk` |
| Date formatting (terminal UI) | `date-fns`, `pretty-ms` |
| Opening the system browser for login | `open` |
| Environment loading | `dotenv` |

## 5. Version & Compatibility Notes

- All packages target a single shared TypeScript configuration (`tsconfig.base.json`) to guarantee consistent compiler behavior across the CLI, server, database, and shared packages.
- The AI SDK's OpenAI-compatible provider is used rather than a bespoke HTTP client specifically because NVIDIA NIM implements the OpenAI chat completions contract (including streaming via server-sent events and tool-call payloads), so no custom parsing layer is required.
- React 19 is used in the terminal client; because OpenTUI's renderer — not the DOM — is the render target, standard browser-only React libraries (anything assuming `window`, `document`, or CSS) are intentionally out of scope for the CLI package.

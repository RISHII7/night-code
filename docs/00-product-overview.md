# NightCode — Product Overview

## 1. What NightCode Is

NightCode is a terminal-native AI coding agent. A developer installs a single CLI, runs `nightcode` inside any local project directory, signs in once through a browser-based login, and then plans and builds software by chatting with an AI agent that can read, search, write, edit, and execute commands directly against their codebase — all streamed live inside a polished terminal UI.

NightCode is built around one core belief: **frontier-class AI coding assistance should not require a paid API key.** Instead of routing every request through metered OpenAI or Anthropic endpoints, NightCode integrates NVIDIA's free-to-use NIM (NVIDIA Inference Microservices) model catalog, giving every signed-in user free access to state-of-the-art open models — Llama 3.3 70B, Llama 3.1 405B, DeepSeek-R1, Qwen 2.5 Coder 32B, Mixtral 8x22B, and NVIDIA's own Nemotron models — with no credit card required to get started.

## 2. The Problem

Terminal-based AI coding agents have become one of the most effective ways for developers to work: no context-switching to a browser, no copy-pasting code in and out of a chat window, and the agent operates with full knowledge of the actual files on disk. But every popular implementation of this pattern shares the same barrier to entry — you need a paid API key from a frontier lab, and every message costs real money, metered down to the token.

That model works for funded teams. It excludes students, hobbyists, open-source maintainers, developers in regions with limited access to card payments, and anyone who wants to try an AI agent before trusting it with a monthly bill.

## 3. The NightCode Approach

NightCode keeps the exact product shape developers already expect from a terminal AI agent — plan/build modes, streaming responses, persistent sessions, local tool execution — and removes the cost barrier by defaulting to NVIDIA's free model catalog:

- **Free by default.** Every account gets a generous daily request allowance against NVIDIA's free-tier models. No card on file, no trial countdown.
- **Frontier-quality models, zero token billing.** The free catalog includes some of the strongest open-weight models available, spanning general reasoning, long chain-of-thought, and coding-specialized variants.
- **Optional Pro tier for scale.** Teams and power users who need higher throughput, priority queueing, or access to premium hosted endpoints can upgrade — but upgrading is a convenience, not a requirement to use the product.
- **Same trusted architecture as leading terminal agents.** Authenticated sessions, sandboxed local tool execution, a clear separation between read-only planning and full build execution, and persisted chat history.

## 4. Core Product Pillars

| Pillar | Description |
|---|---|
| **Terminal-first UX** | A full interactive terminal UI (not a plain text REPL) built with a React-based terminal renderer — command palettes, dialogs, themes, live streaming message rendering. |
| **Plan / Build modes** | Users explicitly choose between a read-only **PLAN** mode for research and proposals, and a **BUILD** mode that grants the agent write, edit, and shell-execution tools. |
| **Local-first tool execution** | File reads, writes, edits, directory listing, glob/grep search, and shell commands all execute on the user's own machine, sandboxed to the current project directory. |
| **Persistent sessions** | Every conversation is saved server-side and can be resumed later, across machines, once the user is signed in. |
| **Free-tier AI access** | NVIDIA NIM free models power the default experience; no per-token billing for standard usage. |
| **Usage fairness, not usage taxation** | Rate limits protect the free tier from abuse without charging honest users per message. |

## 5. Who It's For

- **Individual developers** who want an AI pair programmer in their terminal without signing up for three different paid API keys.
- **Students and self-taught engineers** who need a capable coding agent while learning, without a metered bill accumulating in the background.
- **Open-source maintainers** triaging issues, drafting PRs, and navigating unfamiliar codebases.
- **Startups and small teams** evaluating AI-assisted development workflows before committing budget to a paid seat-based tool.
- **Organizations with compliance or procurement friction** around routing code through closed frontier-model vendors, who want an open-model alternative.

## 6. Product Snapshot

| Attribute | Value |
|---|---|
| Distribution | Single CLI binary, installed via package manager, run as `nightcode` |
| Primary interface | Interactive terminal UI (not a web app) |
| Authentication | Browser-based OAuth login, one time per machine |
| AI providers | NVIDIA NIM (free + premium hosted models) |
| Default model | `meta/llama-3.3-70b-instruct` |
| Data persistence | Cloud-hosted session history (PostgreSQL) |
| Pricing | Free tier by default; optional Pro subscription |
| Target OS | macOS, Linux, Windows (via WSL or native terminal) |

## 7. Document Map

This overview is the entry point to the full technical documentation set in `docs/`. Continue to:

1. [System Architecture](./01-system-architecture.md)
2. [Tech Stack](./02-tech-stack.md)
3. [Monorepo & Project Structure](./03-monorepo-project-structure.md)
4. [Database Design](./04-database-design.md)
5. [API Reference](./05-api-reference.md)
6. [Authentication & OAuth](./06-authentication-and-oauth.md)
7. [AI Model Integration (NVIDIA NIM)](./07-ai-model-integration.md)
8. [Agent Modes & Tool System](./08-agent-modes-and-tool-system.md)
9. [Usage Limits & Billing](./09-usage-limits-and-billing.md)
10. [Terminal UI Architecture](./10-terminal-ui-architecture.md)
11. [Session & State Management](./11-session-state-management.md)
12. [Security Architecture](./12-security-architecture.md)
13. [Deployment & Infrastructure](./13-deployment-and-infrastructure.md)
14. [Environment Configuration](./14-environment-configuration.md)
15. [Observability & Error Handling](./15-observability-and-error-handling.md)
16. [Testing Strategy](./16-testing-strategy.md)
17. [CI/CD Pipeline](./17-cicd-pipeline.md)
18. [Roadmap](./18-roadmap.md)
19. [Glossary](./19-glossary.md)

For client-facing sales and onboarding material, see the sibling `client-deliverables/` folder.

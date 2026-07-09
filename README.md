<div align="center">

# NightCode

**A terminal-based AI coding agent, powered by NVIDIA's free model catalog.**

Plan, chat, and build inside your local project — with no paid API key required.

[![CI](https://github.com/RISHII7/night-code/actions/workflows/ci.yml/badge.svg)](https://github.com/RISHII7/night-code/actions/workflows/ci.yml)
[![CodeQL](https://github.com/RISHII7/night-code/actions/workflows/codeql.yml/badge.svg)](https://github.com/RISHII7/night-code/actions/workflows/codeql.yml)
[![Security](https://github.com/RISHII7/night-code/actions/workflows/security.yml/badge.svg)](https://github.com/RISHII7/night-code/actions/workflows/security.yml)
[![Release](https://img.shields.io/github/v/release/RISHII7/night-code?include_prereleases&sort=semver)](https://github.com/RISHII7/night-code/releases)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

</div>

---

## Why NightCode

Every leading terminal AI coding agent assumes you already pay for a frontier
model API key, metered per token. NightCode does not. It runs on NVIDIA's free,
hosted catalog of frontier-class open models — so a student, a solo builder, or
an open-source maintainer gets a genuinely capable agent without a credit card.

- **🖥️ Terminal-native** — a full interactive TUI, not a chatbot in a sidebar.
- **🧭 PLAN and BUILD modes** — read-only research, or full write and shell
  access. You choose, explicitly, and it is always visible.
- **🔒 Sandboxed by design** — every file operation is contained to the project
  directory you opened.
- **💾 Persistent sessions** — resume any conversation, on any machine.
- **🆓 Free by default** — a generous daily allowance, no card required.

## Quick Start

```bash
bun install
cp .env.example .env    # then populate the values
bun run dev:cli
```

Full setup instructions live in
[`docs/14-environment-configuration.md`](./docs/14-environment-configuration.md).

## Project Governance

| Document                                   | Purpose                                                    |
| ------------------------------------------ | ---------------------------------------------------------- |
| [CONTRIBUTING.md](./CONTRIBUTING.md)       | Branching model, commit convention, and the review process |
| [CHANGELOG.md](./CHANGELOG.md)             | Every notable change, per release                          |
| [SECURITY.md](./SECURITY.md)               | Vulnerability disclosure policy and response targets       |
| [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) | Community standards                                        |
| [GOVERNANCE.md](./GOVERNANCE.md)           | How decisions get made, and by whom                        |
| [MAINTAINERS.md](./MAINTAINERS.md)         | Who owns what, and how to reach them                       |
| [SUPPORT.md](./SUPPORT.md)                 | Where to get help                                          |
| [AUTHORS.md](./AUTHORS.md)                 | Everyone who has contributed                               |
| [LICENSE](./LICENSE)                       | Proprietary — all rights reserved                          |

## Development

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `bun run dev:cli`   | Run the CLI in watch mode          |
| `bun run typecheck` | Type check every workspace package |
| `bun run lint`      | ESLint, zero warnings tolerated    |
| `bun run format`    | Format with Prettier               |
| `bun test`          | Run the test suite                 |
| `bun run build:cli` | Build the CLI bundle               |

Branch from `develop`, never `main`. See
[CONTRIBUTING.md](./CONTRIBUTING.md#branching-model).

---

This repository root indexes two complete documentation sets:

## 📘 `docs/` — Technical Documentation

The full engineering reference: architecture, database design, API contracts,
authentication, AI model integration, the agent tool system, billing,
deployment, security, testing, and more. Written for engineers building,
operating, or extending NightCode.

Start at [`docs/00-product-overview.md`](./docs/00-product-overview.md).

| #   | Document                                                                        |
| --- | ------------------------------------------------------------------------------- |
| 00  | [Product Overview](./docs/00-product-overview.md)                               |
| 01  | [System Architecture](./docs/01-system-architecture.md)                         |
| 02  | [Tech Stack](./docs/02-tech-stack.md)                                           |
| 03  | [Monorepo & Project Structure](./docs/03-monorepo-project-structure.md)         |
| 04  | [Database Design](./docs/04-database-design.md)                                 |
| 05  | [API Reference](./docs/05-api-reference.md)                                     |
| 06  | [Authentication & OAuth](./docs/06-authentication-and-oauth.md)                 |
| 07  | [AI Model Integration (NVIDIA NIM)](./docs/07-ai-model-integration.md)          |
| 08  | [Agent Modes & Tool System](./docs/08-agent-modes-and-tool-system.md)           |
| 09  | [Usage Limits & Billing](./docs/09-usage-limits-and-billing.md)                 |
| 10  | [Terminal UI Architecture](./docs/10-terminal-ui-architecture.md)               |
| 11  | [Session & State Management](./docs/11-session-state-management.md)             |
| 12  | [Security Architecture](./docs/12-security-architecture.md)                     |
| 13  | [Deployment & Infrastructure](./docs/13-deployment-and-infrastructure.md)       |
| 14  | [Environment Configuration](./docs/14-environment-configuration.md)             |
| 15  | [Observability & Error Handling](./docs/15-observability-and-error-handling.md) |
| 16  | [Testing Strategy](./docs/16-testing-strategy.md)                               |
| 17  | [CI/CD Pipeline](./docs/17-cicd-pipeline.md)                                    |
| 18  | [Roadmap](./docs/18-roadmap.md)                                                 |
| 19  | [Glossary](./docs/19-glossary.md)                                               |

## 📗 `client-deliverables/` — Sales & Client-Facing Materials

Everything needed to pitch, sell, onboard, and support customers. Written for
prospects, customers, and go-to-market use — polished, non-technical where
possible, and template-ready for your own branding and figures.

| #   | Document                                                                               |
| --- | -------------------------------------------------------------------------------------- |
| 01  | [Executive Summary](./client-deliverables/01-executive-summary.md)                     |
| 02  | [Product Brochure](./client-deliverables/02-product-brochure.md)                       |
| 03  | [Feature Sheet & Comparison](./client-deliverables/03-feature-sheet-and-comparison.md) |
| 04  | [Pricing & Packages](./client-deliverables/04-pricing-and-packages.md)                 |
| 05  | [Pitch Deck Outline](./client-deliverables/05-pitch-deck-outline.md)                   |
| 06  | [Case Study Template](./client-deliverables/06-case-study-template.md)                 |
| 07  | [Client FAQ](./client-deliverables/07-client-faq.md)                                   |
| 08  | [Onboarding Guide](./client-deliverables/08-onboarding-guide.md)                       |
| 09  | [Proposal / SOW Template](./client-deliverables/09-proposal-sow-template.md)           |
| 10  | [Security & Trust Overview](./client-deliverables/10-security-and-trust-overview.md)   |
| 11  | [Demo Script](./client-deliverables/11-demo-script.md)                                 |

## Note on Placeholders

Several client-facing documents contain bracketed placeholders (`[Insert ...]`)
for figures, links, and terms that depend on your actual commercial and
operational decisions — pricing, metrics, support channels, and legal terms.
Fill these in with verified, accurate information before sending any document
externally.

# Changelog

All notable changes to NightCode are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Every entry links to the pull request that introduced it. Entries are grouped by
change type: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.

<!--
MAINTAINER NOTE
Do not write directly under a released heading. Add new entries under
`[Unreleased]` as they merge. At release time, move the accumulated entries
into a new versioned heading, add the comparison link at the bottom of this
file, and tag the release. See CONTRIBUTING.md for the full release process.
-->

## [Unreleased]

_Nothing yet._

## [0.1.0] - 2026-07-10

The first tagged milestone. Establishes the complete documentation set, the
initial terminal client scaffold, and the repository's engineering governance.

### Added

#### Documentation

- **Technical documentation** (`docs/`) — twenty documents covering the product
  overview, system architecture, tech stack, monorepo structure, database
  design, API reference, authentication and OAuth, AI model integration, the
  agent mode and tool system, usage limits and billing, terminal UI
  architecture, session and state management, security architecture, deployment
  and infrastructure, environment configuration, observability and error
  handling, testing strategy, CI/CD pipeline, roadmap, and a glossary.
- **Client-facing materials** (`client-deliverables/`) — eleven documents
  spanning the executive summary, product brochure, feature and competitive
  comparison sheet, pricing and packages, pitch deck outline, case study
  template, client FAQ, onboarding guide, proposal and statement of work
  template, security and trust overview, and a live demo script.
- **Root `README.md`** with build status badges, a quick start, and an index of
  both documentation sets.

#### Terminal client

- **Bun monorepo scaffold** — workspace `package.json`, shared
  `tsconfig.base.json`, and lockfile. ([#1])
- **`packages/cli`** — the initial OpenTUI + React terminal client, including
  the renderer bootstrap, the `NIGHTCODE` header banner, the chat input bar,
  the status bar scaffold, a shared border helper, and the `/` command palette
  subsystem (command registry, prefix filtering, keyboard-driven state hook,
  and the rendered dropdown). ([#1])
- First unit test suite, covering the command palette's filtering logic. ([#2])

#### Repository governance

- `LICENSE` (proprietary, all rights reserved), `CODE_OF_CONDUCT.md`,
  `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `GOVERNANCE.md`,
  `MAINTAINERS.md`, and `AUTHORS.md`. ([#2])
- A GitFlow branching model (`main` for released state, `develop` for
  integration), Conventional Commits, and a documented release process. ([#2])
- GitHub community templates: `CODEOWNERS`, a pull request template, and
  structured issue forms for bug reports, feature requests, documentation, and
  performance issues. ([#2])
- Thirteen GitHub Actions workflows covering continuous integration
  (typecheck, lint, format, cross-platform tests, coverage, build), pull
  request validation (Conventional Commit titles, commit linting, branch target
  policy, changelog enforcement, size labelling), static analysis (CodeQL),
  supply chain security (dependency review, secret scanning, audit, OpenSSF
  Scorecard), documentation checks (markdown lint, link check, spell check),
  release automation, and repository hygiene. ([#2])
- Automated dependency updates via Dependabot for the npm ecosystem and GitHub
  Actions. ([#2])

#### Tooling

- `.editorconfig`, `.gitattributes` (normalizing line endings across
  platforms), Prettier, an ESLint flat config, `commitlint`, markdownlint, a
  pinned Bun runtime version, and a documented `.env.example`. ([#2])
- Root workspace scripts for `typecheck`, `lint`, `format`, `test`, and
  `build`, each wired into CI as a required status check. ([#2])

### Fixed

- **Command palette executed the wrong command on mouse click.**
  `handleCommandExecute` was memoized with an empty dependency array, so it
  permanently closed over the first render's `resolveCommand` — which had
  captured the unfiltered command list. Typing `/mo` and clicking the
  highlighted "models" entry executed `/new` instead. Keyboard selection was
  unaffected, because the submit handler is reassigned on every render. The
  dependency array is now correct, and `react-hooks/exhaustive-deps` is
  enforced as an ESLint error so this class of bug fails CI rather than
  reaching a user's terminal. ([#2])

### Changed

- Root package version corrected from `1.0.0` to `0.1.0` to reflect the
  project's actual pre-release maturity under Semantic Versioning. ([#2])

### Known Issues

- The terminal UI does not reflow when the terminal window is resized after
  launch. Root cause is suspected to be a dependency drift in `@opentui/core`:
  the architecture this client is modelled on pinned `0.1.97`, while this
  repository resolved `0.1.107` under the same `^0.1.97` range. Dependabot is
  configured to ignore patch updates for `@opentui/*` so the version is chosen
  deliberately rather than drifting again. Tracked for a follow-up fix.

<!-- Release comparison links -->

[unreleased]: https://github.com/RISHII7/night-code/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/RISHII7/night-code/releases/tag/v0.1.0

<!-- Pull request links -->

[#1]: https://github.com/RISHII7/night-code/pull/1
[#2]: https://github.com/RISHII7/night-code/pull/2

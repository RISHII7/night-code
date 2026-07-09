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

## [0.1.1] - 2026-07-10

A patch release. Every change is to release tooling and CI; no product code is
affected. Each defect below was found by running the v0.1.0 release for real,
and three of them would have failed silently.

### Fixed

- Release Drafter overwrote the curated release notes. It created a draft
  release for the upcoming tag on every pull request, so publishing the tag
  landed on that draft and its auto-generated body replaced the notes
  `release.yml` had extracted from this file. It also listed a single pull
  request under two headings whenever the pull request carried two matching
  labels. The action now runs with `disable-releaser: true` and is used purely
  to label pull requests from their Conventional Commit title. `CHANGELOG.md`
  is the only source of release notes. ([#17])
- The automated back-merge from `main` into `develop` failed silently. Its
  final command was `|| echo "Nothing to back-merge, or the PR already
  exists."`, which swallowed a hard permissions error — GitHub Actions was not
  permitted to create pull requests — and exited zero. The job reported success
  while doing nothing, and `develop` fell eight commits behind `main` after
  v0.1.0. The step now runs under `set -euo pipefail`, distinguishes "already
  open" and "nothing to merge" from a genuine failure, and fails loudly
  otherwise. The required repository setting is documented in
  `CONTRIBUTING.md`. ([#19])
- The OpenSSF Scorecard job could never succeed. It was gated to pushes on
  `main`, but the action supports only a repository's default branch, which
  here is `develop`. It exited with "validating options: only default branch is
  supported". The gate now resolves the default branch dynamically. ([#19])

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
- Thirteen GitHub Actions workflows covering continuous integration (typecheck,
  lint, format, cross-platform tests, coverage, build), pull request validation
  (Conventional Commit titles, commit linting, branch target policy, changelog
  enforcement, size labelling), static analysis (CodeQL), supply chain security
  (dependency review, secret scanning, audit, OpenSSF Scorecard), documentation
  checks (markdown lint, link check, spell check), release automation, and
  repository hygiene. ([#2])
- Automated dependency updates via Dependabot for the npm ecosystem and GitHub
  Actions. ([#2])

#### Tooling

- `.editorconfig`, `.gitattributes` (normalizing line endings across
  platforms), Prettier, an ESLint flat config, `commitlint`, markdownlint, a
  pinned Bun runtime version, and a documented `.env.example`. ([#2])
- Root workspace scripts for `typecheck`, `lint`, `format`, `test`, and
  `build`, each wired into CI as a required status check. ([#2])
- VS Code workspace settings associating the published JSON schemas for
  workflows, Dependabot, and issue forms, plus matching extension
  recommendations. ([#14])

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
- Commit message linting failed in CI because `commitlint-github-action`
  rejects a `.js` config file outright, regardless of the package's module
  type. Renamed `commitlint.config.js` to `commitlint.config.mjs`. The error it
  surfaced ("You have commit messages with errors") was misleading — no commit
  message was ever at fault. ([#14])
- Dependabot produced pull request titles with a doubled scope
  (`ci(deps)(deps): ...`), which the Conventional Commit title check rejects.
  The scope was specified both in `prefix` and via `include: "scope"`. ([#14])
- Removed the deprecated `reviewers` key from `dependabot.yml`. Reviewer
  assignment comes from `CODEOWNERS`. ([#14])
- Pinned `ossf/scorecard-action` to `v2.4.3`. It was referenced as `@v2`, but
  the action publishes no floating major tag, so the Scorecard job would have
  failed to resolve the action the first time it ran on `main`. ([#14])
- Quoted the `on` key in every workflow. YAML 1.1 coerces the bare key `on` to
  the boolean `true`, so strict parsers and schema validators could not resolve
  the GitHub Actions trigger block. ([#14])
- Simplified `auto-assign.yml`: dropped the `issues` trigger, which had no
  corresponding job, and removed a guard that indexed into
  `pull_request.assignees[0]`. Adding an assignee who is already assigned is a
  no-op, so the guard was never needed. ([#14])
- Ten fenced code blocks carried no language tag, and the pitch deck outline
  skipped from an `h1` straight to `h3` for every slide, breaking the document
  outline for screen readers and table-of-contents tooling. ([#2])
- The release workflow could not publish. It uploaded the build output as
  loose files from three platform matrix jobs, but the build emits a dozen
  identically-named files (`index.js`, tree-sitter grammars, highlight
  queries) and GitHub release assets share one flat namespace per release, so
  the uploads collided. The build output is now packaged into a single
  compressed archive with a `SHA256SUMS.txt` alongside it. ([#16])
- The release published three "platform" archives that were byte-identical.
  `bun build --target bun` emits a platform-independent JavaScript bundle, not
  a native executable, so `nightcode-linux-x64` and `nightcode-darwin-arm64`
  differed in name only. One archive is now published. The matrix still builds
  on Linux, macOS, and Windows, but as a build check rather than as a source
  of distinct artifacts. ([#16])
- Commit linting rejected every acronym. `subject-case` was set to
  `["always", "lower-case"]`, which forbids any uppercase character anywhere in
  a subject — so `fix workflow YAML trigger key` and
  `establish CI/CD baseline` both failed. It now forbids the wrong casings
  (sentence, start, pascal, upper) rather than mandating one, which is what the
  Conventional Commits preset does and why. ([#15])

### Changed

- Root package version corrected from `1.0.0` to `0.1.0` to reflect the
  project's actual pre-release maturity under Semantic Versioning. ([#2])
- Pull requests into `develop` now merge with a **merge commit** rather than a
  squash. A squash collapses a branch into one commit and discards the
  reasoning recorded in each individual commit message — which is exactly what
  `git blame` surfaces years later, to a reader with no access to the pull
  request discussion. The consequence is that every commit must now stand on
  its own as a valid Conventional Commit. Dependabot bumps are still squashed.
  ([#14])
- Dependabot now ignores **minor** as well as patch updates for `@opentui/*`.
  The package is pre-1.0, where a minor bump carries no compatibility promise,
  and the previous configuration still auto-opened a `0.1.107` → `0.4.3`
  upgrade despite the config claiming that version should be chosen
  deliberately. ([#14])

### Known Issues

- The terminal UI does not reflow when the terminal window is resized after
  launch. Root cause is suspected to be a dependency drift in `@opentui/core`:
  the architecture this client is modelled on pinned `0.1.97`, while this
  repository resolved `0.1.107` under the same `^0.1.97` range. Dependabot is
  now configured to ignore patch and minor updates for `@opentui/*`, so the
  version is chosen deliberately rather than drifting again. Tracked for a
  follow-up fix.

<!-- Release comparison links -->

[unreleased]: https://github.com/RISHII7/night-code/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/RISHII7/night-code/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/RISHII7/night-code/releases/tag/v0.1.0

<!-- Pull request links -->

[#1]: https://github.com/RISHII7/night-code/pull/1
[#2]: https://github.com/RISHII7/night-code/pull/2
[#14]: https://github.com/RISHII7/night-code/pull/14
[#15]: https://github.com/RISHII7/night-code/pull/15
[#16]: https://github.com/RISHII7/night-code/pull/16
[#17]: https://github.com/RISHII7/night-code/pull/17
[#19]: https://github.com/RISHII7/night-code/pull/19

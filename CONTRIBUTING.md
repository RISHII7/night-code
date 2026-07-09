# Contributing to NightCode

Thank you for your interest in contributing. This document describes the
engineering standards, branching model, and review process this project holds
itself to. These are not suggestions — CI enforces most of them, and pull
requests that do not meet them will not merge.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Branching Model](#branching-model)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Changelog Discipline](#changelog-discipline)
- [Release Process](#release-process)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Security](#security)

## Code of Conduct

This project is governed by the [Code of Conduct](./CODE_OF_CONDUCT.md). By
participating, you agree to uphold it. Report unacceptable behavior to the
maintainers listed in [`MAINTAINERS.md`](./MAINTAINERS.md).

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) — the runtime, package manager, and bundler. The pinned
  version lives in `.bun-version`.
- Git.

### Setup

```bash
git clone https://github.com/RISHII7/night-code.git
cd night-code
bun install
cp .env.example .env   # then populate the values
```

Run the CLI in watch mode:

```bash
bun run dev:cli
```

Before opening a pull request, run the same checks CI will run:

```bash
bun run typecheck
bun run lint
bun run format:check
bun run test
bun run build
```

## Branching Model

NightCode follows a **GitFlow-derived** model with two long-lived branches.

| Branch    | Purpose                                                           | Protected | Merges from            |
| --------- | ----------------------------------------------------------------- | --------- | ---------------------- |
| `main`    | Production. Every commit is a tagged, released, deployable state. | Yes       | `develop`, `hotfix/*`  |
| `develop` | Integration branch. The current state of the next release.        | Yes       | `feat/*`, `fix/*`, etc |

All day-to-day work targets `develop`. `main` only ever receives a release merge
or an emergency hotfix.

```text
main      ────●────────────────────●──────────────●──────▶  (tagged releases)
               \                  /                \      /
                \                / release/0.2.0    \    / hotfix/1.0.1
develop   ───●───●────●────●────●───────────────●───●───●──▶
              \       \    \                   /
               \       \    └─ fix/…──────────┘
                \       └──── feat/…──────────┘
                 └──────────── feat/…─────────┘
```

### Short-lived branch prefixes

| Prefix      | Use for                                       | Target branch |
| ----------- | --------------------------------------------- | ------------- |
| `feat/`     | A new feature                                 | `develop`     |
| `fix/`      | A bug fix                                     | `develop`     |
| `docs/`     | Documentation only                            | `develop`     |
| `refactor/` | Behavior-preserving restructuring             | `develop`     |
| `perf/`     | Performance work                              | `develop`     |
| `test/`     | Adding or correcting tests                    | `develop`     |
| `chore/`    | Tooling, config, dependencies                 | `develop`     |
| `ci/`       | CI/CD pipeline changes                        | `develop`     |
| `release/`  | Release preparation (version bump, changelog) | `main`        |
| `hotfix/`   | Urgent production fix                         | `main`        |

Name branches descriptively: `feat/nvidia-model-registry`, not `feat/update`.

Never commit directly to `main` or `develop`. Both are protected.

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/).
Every commit message is linted in CI, and pull request titles must follow the
same format because the title becomes the merge commit's subject.

```text
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`,
`chore`, `revert`.

### Scopes

`cli`, `server`, `database`, `shared`, `docs`, `ci`, `deps`, `release`.

### Rules

- The description is imperative, lowercase, and has no trailing period:
  `add nvidia model resolver`, not `Added NVIDIA model resolver.`
- A breaking change is marked with `!` after the type/scope and a
  `BREAKING CHANGE:` footer explaining the migration path.
- The body explains **why**, not what. The diff already shows what changed.

### Example

```text
fix(cli): execute the command the user actually clicked

handleCommandExecute was memoized with an empty dependency array, so it
permanently closed over the first render's resolveCommand — which had
captured the unfiltered command list. Mouse-clicking a filtered command
therefore executed the wrong entry. Keyboard selection was unaffected,
because onSubmitRef is reassigned on every render.

Closes #42
```

Note what the body does: it explains the mechanism and, crucially, why the bug
only appeared on one input path. A reader hitting this code in two years learns
something from it. `fix(cli): fix command menu` would teach them nothing.

## Pull Request Process

1. Branch from `develop` (or `main` for a `hotfix/`).
2. Make your change. Keep the pull request focused — one logical change per PR.
3. Add or update tests. Add or update documentation.
4. Add a `CHANGELOG.md` entry under `## [Unreleased]`.
5. Run the full local check suite (above). CI runs the same checks.
6. Open the pull request. Fill in the template completely — the test plan is not
   optional.
7. Ensure every required status check passes.
8. Request review. At least one approving review from a code owner is required.
9. A maintainer merges. Do not merge your own pull request without review.

### Merge strategy

- Feature and fix branches into `develop`: **merge commit**. Every commit on the
  branch is preserved on the trunk.

  This is a deliberate choice against the more common squash-merge. A squash
  collapses a branch into one commit, and with it the reasoning recorded in each
  individual commit message. That reasoning is precisely what `git blame` and
  `git log` exist to surface years later, when the person reading the code has
  no access to the pull request discussion. Preserving it is worth the extra
  commits in the graph.

  The consequence is that **every commit must stand on its own**: a valid
  Conventional Commit, with a message that explains why the change was made. Do
  not push "wip", "fix typo", or "address review" commits — rebase them away
  before requesting review.

- `release/*` and `hotfix/*` into `main`: **merge commit**, to preserve the
  branch topology and keep the release lineage legible.
- Dependency bumps opened by Dependabot: **squash merge**. There is nothing to
  preserve.
- Branches are **not** deleted after merge. History is retained deliberately.

### Draft pull requests

Open a draft pull request early for visibility on in-progress work. CI runs on
drafts, so you get feedback before requesting review.

## Changelog Discipline

`CHANGELOG.md` is a first-class artifact, not an afterthought. It follows
[Keep a Changelog](https://keepachangelog.com/).

**Every user-facing pull request must add an entry under `## [Unreleased]`.** CI
checks for this.

- Write for a reader who does not have the diff in front of them.
- Group under `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, or
  `Security`.
- Link the pull request: `([#42])`, with the link definition at the bottom of
  the file.
- Purely internal changes (CI tweaks, formatting) may be omitted, but when in
  doubt, include it.

## Release Process

Releases are cut from `develop` into `main` and tagged with an annotated tag.

1. Create `release/x.y.z` from `develop`.
2. Bump the version in the root `package.json` and every workspace package.
3. In `CHANGELOG.md`, convert `## [Unreleased]` into `## [x.y.z] - YYYY-MM-DD`,
   add a fresh empty `## [Unreleased]` heading above it, and update the
   comparison links at the bottom of the file.
4. Open a pull request from `release/x.y.z` into `main`. Get it reviewed.
5. Merge with a merge commit.
6. Tag the merge commit and push the tag:

   ```bash
   git checkout main && git pull
   git tag -a v0.2.0 -m "Release v0.2.0"
   git push origin v0.2.0
   ```

7. The `release` workflow publishes the GitHub Release from the tag, extracting
   the release notes from `CHANGELOG.md`.
8. Merge `main` back into `develop` so the version bump and any release fixes
   flow forward.

### Versioning

[Semantic Versioning 2.0.0](https://semver.org/). While the project is at
`0.y.z`, the public API is not considered stable and minor versions may carry
breaking changes — these are still documented with `BREAKING CHANGE:` footers.

## Coding Standards

- **TypeScript everywhere.** `strict` is on. Do not introduce `any` without a
  comment justifying it.
- **Formatting is not a matter of opinion.** Prettier owns it. Run
  `bun run format`.
- **Linting is enforced.** ESLint runs in CI and must pass with zero warnings.
- **Match the surrounding code.** Naming, file layout, and comment density
  should be indistinguishable from the code around your change.
- **Comments explain constraints, not mechanics.** Do not narrate the code.
- **Shared contracts live in `packages/shared`.** If the CLI and server both
  need a type or schema, it belongs there — never duplicated.

## Testing Requirements

See [`docs/16-testing-strategy.md`](./docs/16-testing-strategy.md) for the full
strategy. In short:

- Unit tests are the default. They are fast and deterministic.
- The filesystem sandbox boundary, PLAN/BUILD mode gating, and the usage
  allowance gate are the highest-consequence code paths in the system and are
  held to an adversarial testing standard.
- Integration tests mock external providers. They never depend on live
  third-party services.
- A flaky test is a bug. Fix it or delete it — never retry it into passing.

## Security

Do not open a public issue for a security vulnerability. Follow the coordinated
disclosure process in [`SECURITY.md`](./SECURITY.md).

NightCode grants an AI agent write and shell access to a user's machine in BUILD
mode. Any change touching the path sandbox, mode enforcement, tool contracts, or
credential handling requires review from a maintainer and a written explanation
of the security implications in the pull request body.

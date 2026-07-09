<!--
Thank you for contributing to NightCode.

The PR title must be a valid Conventional Commit — it becomes the squash-merge
commit message on `develop`. CI enforces this.

  Examples:
    feat(cli): add model picker dialog
    fix(server): reject premium models for free-tier accounts
    docs: clarify the bash tool's threat model

See CONTRIBUTING.md for the full convention.
-->

## Summary

<!-- What does this change do, and why? Explain the motivation, not the diff.
     A reviewer should understand the problem before they read a line of code. -->

## Type of Change

<!-- Check all that apply. -->

- [ ] `feat` — new feature
- [ ] `fix` — bug fix
- [ ] `docs` — documentation only
- [ ] `refactor` — behavior-preserving restructuring
- [ ] `perf` — performance improvement
- [ ] `test` — adding or correcting tests
- [ ] `build` / `ci` / `chore` — tooling, dependencies, pipeline
- [ ] **Breaking change** — requires a `BREAKING CHANGE:` footer and a migration
      note

## Related Issues

<!-- Link the issue this closes. Use "Closes #123" so GitHub auto-closes it on merge.
     If there is no issue, say so and briefly explain why one wasn't needed. -->

Closes #

## Test Plan

<!-- REQUIRED. Describe how you verified this actually works — not just that CI
     is green. "Ran the tests" is not a test plan. Tell us what you exercised,
     how, and what you observed. -->

- [ ] `bun run typecheck` passes
- [ ] `bun run lint` passes with zero warnings
- [ ] `bun run format:check` passes
- [ ] `bun test` passes
- [ ] `bun run build` succeeds

**Manual verification:**

<!-- e.g. "Ran `bun run dev:cli`, typed `/mo`, clicked the highlighted entry with
     the mouse, and confirmed it inserted `/models` rather than `/new`." -->

## Changelog

<!-- Every user-facing change needs a CHANGELOG.md entry under `## [Unreleased]`.
     Tick the box, or explain why this change is purely internal. -->

- [ ] I added an entry to `CHANGELOG.md` under `## [Unreleased]`
- [ ] This change is internal-only and does not need a changelog entry

## Security Considerations

<!-- REQUIRED if this PR touches any of:
       - the filesystem path sandbox
       - PLAN/BUILD mode enforcement or tool contracts
       - authentication, authorization, or credential handling
       - the usage allowance gate
       - a new runtime dependency

     Explain the security implications explicitly. If none of the above apply,
     write "N/A — does not touch security-sensitive paths."
-->

## Screenshots / Terminal Output

<!-- For UI changes, include a screenshot or an asciinema recording of the
     terminal. A picture of the actual rendered output is worth a lot here. -->

## Checklist

- [ ] I have read [CONTRIBUTING.md](../CONTRIBUTING.md)
- [ ] My branch targets `develop` (or `main`, if this is a `hotfix/` or
      `release/`)
- [ ] The PR title is a valid Conventional Commit
- [ ] This PR is focused on one logical change
- [ ] I have added or updated tests covering my change
- [ ] I have added or updated documentation
- [ ] I have verified my change manually, not just via CI

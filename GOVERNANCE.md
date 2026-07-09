# Project Governance

This document describes how decisions are made in the NightCode project, who
makes them, and how that changes over time.

## Current Model: Benevolent Dictator

NightCode is presently a **single-maintainer project**. The maintainer listed in
[`MAINTAINERS.md`](./MAINTAINERS.md) holds final decision authority over
architecture, roadmap, releases, and contribution acceptance.

This is stated plainly rather than dressed up as a committee, because pretending
otherwise would be dishonest about how decisions actually get made today. As the
contributor base grows, this document will be amended to reflect a more
distributed model.

## Roles

### Users

Anyone who uses NightCode. Users contribute by filing bug reports, requesting
features, and participating in discussions. No commitment is expected.

### Contributors

Anyone who has submitted a pull request, issue, or documentation improvement.
Contributors are credited in [`AUTHORS.md`](./AUTHORS.md). No ongoing commitment
is expected.

### Maintainers

Maintainers have write access to the repository. They review and merge pull
requests, triage issues, and cut releases. Maintainers are listed in
[`MAINTAINERS.md`](./MAINTAINERS.md).

Responsibilities:

- Review pull requests within a reasonable timeframe.
- Uphold the [Code of Conduct](./CODE_OF_CONDUCT.md).
- Uphold the engineering standards in [`CONTRIBUTING.md`](./CONTRIBUTING.md).
- Never merge their own pull request without an independent review, except for
  trivial changes (typo fixes, dependency bumps already approved by CI).

### Becoming a Maintainer

There is no fixed contribution quota. A contributor is invited to become a
maintainer when they have demonstrated, over time:

- Sustained, high-quality technical contributions.
- Sound judgment in code review.
- Good-faith engagement with the community and the Code of Conduct.
- An understanding of the project's security posture, given the sensitivity of
  the agent's local write and execute capabilities.

Existing maintainers extend the invitation by consensus.

## Decision Making

### Ordinary decisions

Most decisions — bug fixes, incremental features, documentation — are made
through the normal pull request process. Approval from one code owner is
sufficient.

### Significant decisions

The following require explicit maintainer sign-off before implementation begins,
not merely at review time:

- Changes to the filesystem sandbox or PLAN/BUILD mode enforcement.
- Changes to authentication, authorization, or credential handling.
- Adding or removing an AI inference provider.
- Changes to the usage allowance or billing model.
- Changes to the database schema.
- Adding a new runtime dependency to the CLI.

Propose these as a GitHub Discussion or an issue labeled `rfc` before opening a
pull request. A written rationale is expected — including the alternatives
considered and why they were rejected.

### Disagreement

Technical disagreement is normal and healthy. Where consensus cannot be reached
through discussion, the maintainer decides. That decision, and the reasoning
behind it, is recorded in the relevant issue or pull request so the tradeoff is
legible to future contributors.

## Roadmap Authority

The roadmap lives in [`docs/18-roadmap.md`](./docs/18-roadmap.md). Items are
evaluated against three questions:

1. Does it strengthen the free-tier core experience for the majority of users?
2. Does it grow the Pro tier's value without degrading the free tier?
3. Does it introduce new security or trust surface area?

Items failing the first two are deprioritized regardless of technical interest.
Items triggering the third receive a security review before implementation.

## Changing This Document

Amendments to this document are made by pull request and require maintainer
approval. Substantive changes to the governance model will be announced in the
repository's Discussions before merging.

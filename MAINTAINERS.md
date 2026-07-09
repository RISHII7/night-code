# Maintainers

This file lists the people with commit access and review authority over
NightCode, and how to reach them.

The governance model these roles operate under is described in
[`GOVERNANCE.md`](./GOVERNANCE.md).

## Current Maintainers

| Name              | GitHub                                 | Role            | Areas of ownership |
| ----------------- | -------------------------------------- | --------------- | ------------------ |
| Rishikesh Palande | [@RISHII7](https://github.com/RISHII7) | Lead maintainer | All areas          |

## Contact

| Purpose                            | Contact                                                                                                                                            |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Security vulnerabilities           | Use [GitHub Private Vulnerability Reporting](https://github.com/RISHII7/night-code/security/advisories/new), or see [`SECURITY.md`](./SECURITY.md) |
| Code of Conduct reports            | Contact the lead maintainer directly via GitHub                                                                                                    |
| General questions                  | Open a [GitHub Discussion](https://github.com/RISHII7/night-code/discussions)                                                                      |
| Commercial and licensing inquiries | Contact the lead maintainer directly                                                                                                               |

> **Note for maintainers:** replace the contact routes above with dedicated
> addresses (for example `security@`, `conduct@`) before the project accepts
> external contributors at scale. Routing security reports and Code of Conduct
> complaints through the same personal channel does not scale and creates a
> single point of failure.

## Areas of Ownership

Ownership determines who is automatically requested for review, as encoded in
[`.github/CODEOWNERS`](./.github/CODEOWNERS).

| Area                               | Path                                         | Owner    |
| ---------------------------------- | -------------------------------------------- | -------- |
| Terminal client                    | `packages/cli/`                              | @RISHII7 |
| API server                         | `packages/server/`                           | @RISHII7 |
| Database schema                    | `packages/database/`                         | @RISHII7 |
| Shared contracts                   | `packages/shared/`                           | @RISHII7 |
| Security-sensitive paths           | sandbox, mode enforcement, auth, credentials | @RISHII7 |
| CI/CD and repository configuration | `.github/`                                   | @RISHII7 |
| Documentation                      | `docs/`, `client-deliverables/`              | @RISHII7 |

## Emeritus Maintainers

Maintainers who have stepped back from active duty are recorded here with
gratitude. None yet.

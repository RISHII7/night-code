# Security Policy

## Why This Policy Matters More Than Most

NightCode is an AI coding agent that, in BUILD mode, is deliberately granted the
ability to write files and execute shell commands on a user's machine. That
capability is the product's core value — and it makes this repository a
higher-than-average-value target for security research.

We treat that responsibility as a first-class engineering concern, not a
compliance checkbox. See
[`docs/12-security-architecture.md`](./docs/12-security-architecture.md) for the
full threat model.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| `0.1.x` | :white_check_mark: |
| `< 0.1` | :x:                |

While the project is pre-`1.0`, only the latest minor release receives security
patches.

## Reporting a Vulnerability

**Do not open a public GitHub issue for a security vulnerability.**

Report privately through one of these channels:

1. **GitHub Private Vulnerability Reporting** (preferred) — use the **Security**
   tab of this repository, then **Report a vulnerability**. This opens a private
   advisory visible only to maintainers.
2. **Email** — send to the security contact listed in
   [`MAINTAINERS.md`](./MAINTAINERS.md). Encrypt with our public key if the
   report contains exploit details.

### What to include

- A description of the vulnerability and its impact.
- The affected component (`cli`, `server`, `shared`, `database`) and version or
  commit SHA.
- Reproduction steps, ideally a minimal proof of concept.
- Any suggested mitigation, if you have one.

### What to expect

| Stage                        | Target                                           |
| ---------------------------- | ------------------------------------------------ |
| Acknowledgement of report    | Within 48 hours                                  |
| Initial triage and severity  | Within 5 business days                           |
| Status update cadence        | At least every 7 days                            |
| Fix released (critical/high) | Within 30 days of triage                         |
| Public advisory published    | After a fix ships, coordinated with the reporter |

We will keep you informed throughout, credit you in the advisory unless you
prefer to remain anonymous, and coordinate disclosure timing with you.

## Areas of Particular Interest

We are especially interested in reports concerning:

- **Filesystem sandbox escape** — any path that allows a tool call to read or
  write outside the project directory the CLI was launched in.
- **Mode enforcement bypass** — any way a PLAN-mode session can invoke a write
  or execute tool.
- **Prompt injection leading to privilege escalation** — content in a repository
  that causes the agent to exceed the capabilities its current mode grants.
- **Credential exposure** — any path by which a server-held secret (the
  inference provider API key, identity provider secret, or billing token)
  becomes reachable from a client.
- **Cross-account data access** — any way one authenticated user can read,
  modify, or enumerate another user's sessions.
- **Usage allowance bypass** — any way to consume pooled inference capacity
  beyond the enforced per-user allowance.

## Known and Accepted Risk

The `bash` tool, available only in BUILD mode, executes arbitrary shell
commands. It is pinned to the project working directory and bounded by an output
cap and a timeout, but a shell command can inherently reach beyond a simple
path-prefix check. **This is a disclosed, deliberate design tradeoff, not a
vulnerability.** We recommend running BUILD mode inside a container or virtual
machine when working with untrusted repositories.

Reports that amount to "the `bash` tool can run shell commands" will be closed
as accepted risk. Reports demonstrating that `bash` can be invoked _without_ the
user having entered BUILD mode are critical and very much in scope.

## Safe Harbor

We will not pursue legal action against researchers who:

- Make a good-faith effort to comply with this policy.
- Report promptly and do not exploit a finding beyond what is necessary to
  demonstrate it.
- Do not access, modify, or exfiltrate other users' data.
- Do not degrade service availability for other users.

## Recognition

Researchers who report a valid vulnerability are credited in the published
advisory and in [`AUTHORS.md`](./AUTHORS.md), unless they request otherwise.

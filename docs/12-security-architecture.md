# Security Architecture

## 1. Threat Model Summary

NightCode's security posture is shaped by one unusual fact for a SaaS product: **the client is deliberately granted the ability to write files and execute arbitrary shell commands on the user's own machine.** That capability is the entire value proposition of BUILD mode, so the security model is not built around preventing it — it's built around making sure that capability is (a) scoped tightly to what the user opened, (b) always visible and attributable, and (c) never exercisable by anyone other than the authenticated user who explicitly enabled BUILD mode.

| Trust boundary | What crosses it | Primary control |
|---|---|---|
| Model output → local execution | Tool-call requests from an LLM | Mode-gated tool contracts + client-side re-validation (defense in depth, see [Agent Modes & Tool System](./08-agent-modes-and-tool-system.md) §7) |
| CLI → API server | Bearer token, chat messages, session data | TLS in transit, per-request Clerk token verification |
| API server → NVIDIA NIM | Pooled provider API key, prompt content | Server-held secret, never exposed to any client |
| API server → Database | User-scoped queries | Every query filtered by `userId`, never a bare `id` lookup |
| API server → Polar | Usage/subscription checks | Server-held secret, scoped to `externalCustomerId` = NightCode `userId` |

## 2. Filesystem Sandboxing

Every local tool call resolves its target path and rejects anything that escapes the project root the CLI was launched from (see [Agent Modes & Tool System](./08-agent-modes-and-tool-system.md) §4). This is enforced independent of what the model intends — the check is purely path-arithmetic (does the resolved path still live under `cwd`?), so it cannot be bypassed by clever prompting, since it never inspects or trusts the model's stated intent, only the literal resolved path.

## 3. The `bash` Tool Is a Deliberate, Disclosed Exception

Unlike file tools, an arbitrary shell command cannot be fully contained by path-prefix checking alone — a command can itself `cd`, invoke absolute paths, reach the network, or call other binaries. NightCode does not claim `bash` is sandboxed to the same degree as the file tools; instead it:

- Only ever exposes `bash` in BUILD mode, never PLAN.
- Pins the spawned process's working directory to the project root.
- Enforces a hard output cap (20,000 characters) and a default 30-second timeout (configurable per call, so long-running commands like test suites can request more time explicitly).
- Surfaces every executed command and its full output directly in the terminal UI, so the user sees exactly what ran and what it returned, in real time, as it happens.

**Recommended mitigation for higher-security environments:** run NightCode inside a container, VM, or otherwise disposable sandboxed environment when working in BUILD mode against untrusted or unfamiliar repositories, exactly as you would for any tool that grants an automated agent shell access. This recommendation is stated explicitly in onboarding documentation rather than left implicit.

## 4. Prompt Injection Awareness

Because BUILD-mode tools can read arbitrary project files, and file *content* becomes part of what the model sees, a maliciously crafted file in a repository (e.g. a comment containing instructions aimed at the model) is a realistic threat vector — commonly called prompt injection. NightCode's mitigations:

- The layered mode enforcement described in [Agent Modes & Tool System](./08-agent-modes-and-tool-system.md) §7 means even a successfully "convinced" model cannot exceed the tool capabilities the *current mode* actually grants — a PLAN-mode session cannot be talked into writing a file, because the write tool was never offered to the model in the first place, at the request level.
- The system prompt explicitly frames the agent's role and instructs it to treat file content as data to analyze, not as instructions to follow.
- Every tool execution is visible in the terminal as it happens — a user watching BUILD mode operate will see an unexpected or unrelated tool call (e.g. an unrelated `bash` invocation) as it's requested, before its result returns.

This is disclosed as a defense-in-depth posture, not a claim of complete immunity — prompt injection is an active, evolving area of LLM security research, and no agentic coding tool (including this one) can claim to be fully immune to a sufficiently novel attack.

## 5. Secrets Management

| Secret | Held by | Never present in |
|---|---|---|
| NVIDIA NIM API key | Server only | CLI binary, client machine, logs |
| Clerk secret key | Server only | CLI binary, client machine |
| Polar access token | Server only | CLI binary, client machine |
| User's OAuth access token | Client only (`~/.nightcode/auth.json`, `0600` permissions) | Server-side persistent storage |
| Database credentials | Server only (environment variable, never checked into source) | Any client artifact |

No provider API key of any kind is ever distributed to or reachable from the CLI — this is the structural reason a compromised or maliciously modified CLI build could not be used to drain the pooled NVIDIA allowance or exfiltrate provider credentials; the CLI simply never possesses them.

## 6. Authorization Model

Every session read, update, or delete is scoped by a compound filter of `id` **and** `userId` at the database query level — not merely checked after the fact in application code. A request for a session ID belonging to another user returns an identical `404 Not Found` to a request for a session ID that doesn't exist at all, deliberately avoiding an information leak that would let one user enumerate or confirm the existence of another user's session IDs.

## 7. Transport Security

All CLI-to-API traffic is expected to run over TLS in any deployed environment (Railway terminates TLS at the edge). Local development against `http://localhost:3000` is the one explicit exception, scoped to loopback traffic on the developer's own machine.

## 8. Rate Limiting as a Security Control, Not Just a Billing Control

The free-tier allowance system (see [Usage Limits & Billing](./09-usage-limits-and-billing.md)) doubles as a coarse defensive control against automated abuse of the pooled NVIDIA key — a compromised or scripted account cannot exceed its daily allowance regardless of intent, which bounds the blast radius of any single compromised account's ability to consume shared inference capacity.

## 9. Dependency & Supply Chain Hygiene

- A single lockfile (`bun.lock`) pins exact dependency versions across the entire monorepo.
- Automated code review tooling runs on every pull request to catch common classes of bugs and risky patterns before merge.
- Error monitoring (Sentry) is wired into both the CLI and the server so unexpected exceptions in production — including ones with security implications — surface quickly rather than silently.

## 10. Responsible Disclosure

Any organization deploying NightCode should publish a clear security contact and disclosure process; this is called out explicitly here because agentic tools with local write/execute capability are a higher-than-average-value target for responsible disclosure researchers, and a fast, well-publicized reporting channel is a meaningful part of the overall security posture, not an afterthought.

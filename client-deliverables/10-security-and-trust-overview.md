# Security & Trust Overview

_A client-facing summary of how NightCode is designed to be trusted with local
file and shell access. For the full internal technical detail, see
[Security Architecture](../docs/12-security-architecture.md) in the technical
documentation set._

## 1. The Core Trust Question

NightCode is unusual among SaaS products in one specific way: when you enable
BUILD mode, you're granting an AI agent the ability to write files and run shell
commands on your own machine. We think the right response to that is not to hide
or minimize it, but to design around it explicitly and be transparent about
exactly how it's contained.

## 2. What's Contained, and How

**Every file operation is sandboxed to your project directory.** Reading,
writing, editing, listing, and searching files are all strictly limited to the
folder you launched NightCode in. This isn't a policy we ask the AI to follow
politely — it's enforced in the software itself, checked on every single file
operation before it's allowed to proceed. An attempt to reach outside the
project directory is rejected automatically, regardless of what was requested.

**You choose when write/execute access exists at all.** NightCode operates in
one of two modes:

- **PLAN** — research and analysis only. The agent has no ability to change
  anything.
- **BUILD** — full capability, including file writes, edits, and shell commands.

You explicitly switch into BUILD mode; it's never silently active. This means
the vast majority of "just help me understand this" interactions carry zero risk
of unintended change.

**Every action is visible as it happens.** There is no background or silent
execution. Every file the agent reads, every edit it makes, every command it
runs appears in your terminal in real time, as it occurs — you are watching the
agent work, not receiving a summary after the fact.

**Enforcement happens at more than one layer.** Even the set of actions the AI
model is offered changes based on your current mode — a PLAN-mode conversation
never gives the underlying model the option to request a file write in the first
place. And independently of that, the local execution layer re-checks and would
refuse a disallowed action even if somehow requested. This layered approach
means there's no single point of failure protecting your files.

## 3. What We Recommend for Sensitive Work

We're direct about the one tool that can't be fully contained by simple
boundary-checking: shell command execution (`bash`), available only in BUILD
mode. A shell command can, in principle, do more than a scoped file operation.
For work on especially sensitive or unfamiliar repositories, we recommend
running BUILD-mode sessions inside an isolated container or virtual machine —
the same standard practice we'd recommend for any tool granted genuine local
shell access, AI-powered or not.

## 4. How Your Credentials Are Protected

Your login uses a modern, secure browser-based sign-in flow. There's no
NightCode-specific password to create, remember, or have stolen in a breach
elsewhere. Your session token is stored locally with owner-only file
permissions, and it's the only credential your machine ever holds — no AI
provider API key or infrastructure credential is ever present on your local
device, which means there's nothing sensitive to extract even from a fully
compromised local installation.

## 5. Data Handling

Your conversations — including relevant excerpts from files the agent read
during that conversation — are stored so you can resume sessions later, scoped
strictly to your own authenticated account. No other user can see or access your
sessions. [Confirm and expand this section against your finalized data-retention
and processing policy before distributing externally, especially for
enterprise/compliance-sensitive prospects.]

## 6. Questions Security Reviewers Commonly Ask

**"Can the AI model itself be tricked into doing something harmful by malicious
content in a file it reads?"** This class of risk — often called prompt
injection — is a known, actively studied area across the AI industry, and no
agentic coding tool can claim complete immunity to it. NightCode's layered mode
enforcement means that even a "convinced" model cannot exceed what the current
mode actually permits at the tool level — a PLAN-mode session simply has no
write capability to be tricked into using, regardless of what any file's content
suggests.

**"Does the vendor ever see our proprietary source code?"** [Insert your
specific, accurate answer here based on actual data handling practices before
sharing this document externally — this must be precise for compliance-sensitive
customers.]

**"Is there an audit trail?"** Every session's full history — including every
tool call and its result — is retained and viewable within your own account,
providing a complete, chronological record of every action taken during
BUILD-mode work.

## 7. Our Commitment

We treat the responsibility that comes with local write and execute access as
core to the product, not an afterthought bolted on for a security review. If you
have questions beyond what's covered here, [insert security contact /
responsible disclosure contact] is available to go deeper on any specific
concern.

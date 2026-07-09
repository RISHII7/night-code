# Client Onboarding Guide

*Hand this document to a new customer (individual or team) after signup to get them to a working first session as quickly as possible.*

## 1. What You'll Need

- A terminal (macOS, Linux, or Windows with WSL or a modern terminal app).
- A supported package manager to install the CLI.
- A web browser for the one-time login step.
- Two minutes.

## 2. Step-by-Step Setup

### Step 1 — Install the CLI

```bash
[Insert actual install command, e.g. via npm/Homebrew/curl script]
```

### Step 2 — Log In

```bash
nightcode login
```

This opens your default browser to a secure sign-in page. Approve the request, and you'll be redirected back automatically — no password to create, no token to copy-paste.

### Step 3 — Open Your First Session

Navigate to any project directory and run:

```bash
cd my-project
nightcode
```

Select **New Session**, give it a title, and you're in.

### Step 4 — Start in PLAN Mode

Your first session starts in **PLAN** mode by default — safe, read-only exploration. Try asking something like:

> "Give me an overview of how this codebase is structured."

Watch the agent use its research tools (reading files, searching, listing directories) and respond with a real, grounded answer based on your actual project — not a generic response.

### Step 5 — Switch to BUILD Mode

When you're ready to have the agent make changes, switch modes from the command palette or the mode indicator in the status bar, then try:

> "Add a basic test for the function we just discussed."

Watch each file write happen live in your terminal as it occurs.

### Step 6 — Explore the Command Palette

Open the command palette (see your platform's documented shortcut) to discover: switching models, switching themes, viewing past sessions, and checking your remaining daily allowance.

## 3. Recommended First-Week Workflow

| Day | Suggested activity |
|---|---|
| Day 1 | Install, log in, run one PLAN-mode session exploring a familiar part of your codebase. |
| Day 2–3 | Try BUILD mode on a low-risk task — a small refactor, a new test, a docs update. |
| Day 4–5 | Try a different model from the picker for a task suited to it (e.g. the reasoning-focused model for a tricky debugging session). |
| End of week | Review your usage in the status bar to understand your typical daily consumption relative to the free allowance. |

## 4. Team Rollout Guidance *(for Team plan customers)*

1. Have each team member install and log in individually — avoid shared credentials so session history and usage are correctly attributed per person.
2. Designate a team admin to manage centralized billing through the Team billing portal.
3. Share this onboarding guide directly with each new team member rather than routing everyone through a single onboarding call — the setup is designed to be self-serve in under five minutes.
4. Establish a lightweight internal norm for BUILD-mode usage on sensitive repositories (e.g. running inside a container/VM for untrusted or especially sensitive code) — see the [Security & Trust Overview](./10-security-and-trust-overview.md).

## 5. Common First-Session Questions

**"The agent asked to run a shell command — should I be worried?"**
No — this is expected in BUILD mode, and you'll see the exact command and its full output directly in your terminal before and as it runs.

**"Can I stop the agent mid-response?"**
Yes — an in-progress response can be interrupted at any time from the input bar.

**"How do I know which mode I'm in?"**
The mode is always visible, color-coded, in the status bar at the bottom of the screen.

## 6. Where to Go Next

- [Client FAQ](./07-client-faq.md) for common questions.
- [Feature Sheet & Comparison](./03-feature-sheet-and-comparison.md) to explore capability in more depth.
- [Security & Trust Overview](./10-security-and-trust-overview.md) before rolling out to a full team or sensitive repository.
- [Insert support/community channel link] if you get stuck.

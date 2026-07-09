# Pitch Deck Outline

_A slide-by-slide outline ready to convert into a presentation deck. Each slide
includes its core message and supporting talking points — populate with visuals,
logos, and current metrics before presenting._

---

## Slide 1 — Title

**NightCode** A terminal-based AI coding agent, free for every developer.
[Insert presenter name, date, audience]

---

## Slide 2 — The Hook

"Every AI coding agent on the market today assumes you're already paying for a
frontier model API key. What if the best one didn't?"

---

## Slide 3 — The Problem

- AI coding agents are one of the highest-leverage tools a developer can adopt.
- Every leading terminal-based agent requires a paid, metered provider API key
  from day one.
- This quietly excludes students, solo builders, open-source maintainers, and
  cost-sensitive teams — not because the tools aren't good, but because the
  access model assumes a funded budget.

---

## Slide 4 — The Insight

- Open-weight models have closed the capability gap with closed frontier models
  faster than the market has priced in.
- NVIDIA has invested in free, high-throughput hosted access to frontier-class
  open models.
- Nobody has turned that shift into a polished, trustworthy, terminal-native
  developer product yet.

---

## Slide 5 — The Product

Live demo or screenshot sequence:

1. Install and log in.
2. Ask a question in PLAN mode — agent researches, explains, proposes.
3. Switch to BUILD mode — agent writes and edits code, runs a command, all
   visible in real time.
4. Show the status bar's live usage indicator.

---

## Slide 6 — How It Works (Architecture, Simplified)

- Terminal client ↔ NightCode API ↔ NVIDIA's free model catalog.
- Server-mediated access is what makes "free for everyone" possible — one pooled
  connection to the model catalog serves every user, fairly rate-limited.
- Every local file/shell action happens on the user's own machine, sandboxed to
  their project — never on our servers.

---

## Slide 7 — Why Now

- Open-model quality inflection point.
- Developer trust in "free" AI tools is rising as usage-based abuse patterns
  (and their mitigations) have matured across the industry.
- Terminal-first developer tooling adoption (across the category broadly)
  continues to grow.

---

## Slide 8 — Business Model

- Free tier: the default, real product experience — drives adoption and
  word-of-mouth.
- Pro tier: flat-rate subscription for higher limits, priority throughput, and
  premium models — funds infrastructure and roadmap.
- [Insert current/target unit economics: cost per free-tier user, Pro conversion
  rate, LTV assumptions.]

---

## Slide 9 — Traction _(populate with real data before presenting)_

- Signups: [Insert]
- Daily/weekly active sessions: [Insert]
- Pro conversion: [Insert]
- Notable users/organizations (if permissioned to share): [Insert]

---

## Slide 10 — Competitive Landscape

- Paid-API terminal agents: strong products, but cost is the adoption barrier we
  remove.
- General-purpose chat AI tools: lack local, sandboxed tool execution and
  terminal-native workflow integration.
- NightCode's position: the free, trustworthy, terminal-native option — see the
  [Feature Sheet & Comparison](./03-feature-sheet-and-comparison.md) for full
  detail.

---

## Slide 11 — Defensibility

- Provider-agnostic architecture: not locked to a single model vendor, can pool
  capacity across providers as the market shifts.
- Trust-first design: sandboxing, explicit PLAN/BUILD separation, full
  local-action transparency — a real product moat with security-conscious
  buyers, not just a pricing gimmick.
- Two-sided model that reinforces itself: free drives adoption, Pro funds
  growth.

---

## Slide 12 — Roadmap Highlights

- [Pull 2–3 items from the internal Roadmap doc most relevant to this audience —
  e.g. team workspaces for an enterprise pitch, additional free model providers
  for a technical audience.]

---

## Slide 13 — The Ask

[Insert specific ask: investment terms / partnership scope / pilot commitment.]

---

## Slide 14 — Contact & Next Steps

[Insert contact details and proposed next step — demo, pilot, follow-up
meeting.]

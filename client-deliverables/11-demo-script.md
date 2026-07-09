# Demo Script

_A structured walkthrough for live product demonstrations — sales calls,
conference booths, or self-recorded demo videos. Timing estimates assume a
focused 8–10 minute demo; trim sections for shorter slots._

## Pre-Demo Checklist

- [ ] NightCode installed and logged into a demo account with a clean,
      representative sample project open.
- [ ] Terminal font size increased for screen-share/projector visibility.
- [ ] A prepared, realistic sample project with a few intentional, demo-friendly
      quirks (a missing test, a small bug, an area worth explaining) — avoid a
      toy "hello world" repo, it undersells the product.
- [ ] Free-tier allowance confirmed to have enough headroom for the full demo.
- [ ] Network connection verified (the demo depends on live streaming
      responses).

## Opening (30 seconds)

> "I'm going to show you an AI coding agent that runs entirely in the terminal,
> works directly on this real project, and — the part most tools in this
> category can't say — is free to use, no API key or credit card required to get
> started."

## Segment 1 — Installation & Login (60 seconds, or pre-staged if time-constrained)

- Show the install command and how quickly it completes.
- Run `nightcode login`, show the browser opening, approve, and return to the
  terminal automatically.
- **Talking point:** "No password to create, no API key to paste in — this is
  the entire setup."

## Segment 2 — First Session, PLAN Mode (2–3 minutes)

- Open a session inside the prepared sample project.
- Ask a real, specific question about the codebase: _"Walk me through how
  authentication works in this project and flag anything that looks fragile."_
- Let the response stream live — don't skip or fast-forward this part, the live
  streaming and visible tool use (file reads, searches) is itself part of the
  demonstration.
- **Talking point while it's working:** "Notice it's actually reading the real
  files in this project right now — you can see exactly what it's looking at as
  it works. This isn't a canned response."

## Segment 3 — Switching to BUILD Mode (3–4 minutes)

- Explicitly narrate the mode switch: _"So far it's only been reading — it
  couldn't change anything even if it wanted to. Now I'll switch it into BUILD
  mode."_
- Ask for a concrete, visible change: _"Add a test for the function we just
  discussed."_
- Let the audience watch the file write happen live in the terminal.
- Run the resulting test (or have the agent run it) to show the loop closing.
- **Talking point:** "Every single action — every file write, every command —
  happens right here, visible, as it happens. Nothing runs silently in the
  background."

## Segment 4 — The Free Model Story (1–2 minutes)

- Open the model picker, show the available free models.
- **Talking point:** "Every model here is free to use — this isn't a limited
  trial tier, this is the real product. We built this specifically so cost is
  never the reason someone can't use a genuinely capable AI coding agent."
- If relevant to the audience, briefly show the status bar's usage indicator:
  "You always know exactly where you stand — full transparency, no surprise
  bill."

## Segment 5 — Sessions & Continuity (30–60 seconds)

- Open the sessions list, point out prior saved conversations.
- **Talking point:** "Everything's saved automatically — I can close this
  terminal, open it on a different machine tomorrow, log in, and pick up exactly
  here."

## Closing (30 seconds)

> "That's the core experience: real AI coding assistance, directly in your
> terminal, on your actual project, with full transparency into what it's doing
> — and free to start using today. [Insert specific call to action: sign-up
> link, next-step meeting, pilot proposal.]"

## Anticipated Live-Demo Questions & Quick Answers

| Question                                    | Quick answer                                                                                                                                                                    |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "What if it makes a mistake in BUILD mode?" | Every change is visible as it happens, and standard version control (git) remains your safety net exactly as it would with a human-written change.                              |
| "Can it access things outside this folder?" | No — every file and shell action is sandboxed to this project directory specifically; point to the [Security & Trust Overview](./10-security-and-trust-overview.md) for detail. |
| "How is this actually free?"                | It's built on NVIDIA's free, hosted model catalog — point to the [Pricing & Packages](./04-pricing-and-packages.md) doc for the full model.                                     |

## Fallback Plan

If live network/streaming fails during a demo, have a pre-recorded screen
capture of Segments 2–3 ready as an immediate fallback — narrate over the
recording rather than stalling live.

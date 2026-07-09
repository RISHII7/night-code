# Feature Sheet & Competitive Comparison

## 1. Full Feature List

| Feature                           | Description                                                                                                                                     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Terminal-native interactive UI    | Full command palette, dialogs, theming, and live streaming rendering — not a bare text prompt loop.                                             |
| PLAN mode                         | Read-only research and proposal mode; zero risk of unintended file changes.                                                                     |
| BUILD mode                        | Full read/write/edit/shell-execution capability, explicitly opted into.                                                                         |
| Free model catalog                | Multiple frontier-class open models available at zero cost, spanning general reasoning, long chain-of-thought, and coding-specialized variants. |
| Streaming responses               | Real-time token-by-token output, including visible reasoning content for supported models.                                                      |
| Sandboxed local tools             | File and shell operations strictly contained to the opened project directory.                                                                   |
| Persistent, cross-device sessions | Full conversation history saved server-side and resumable from any machine after login.                                                         |
| Browser-based secure login        | Modern OAuth login flow — no passwords to manage, no shared credentials.                                                                        |
| Transparent usage indicator       | Always-visible remaining daily allowance in the terminal status bar.                                                                            |
| Optional Pro tier                 | Higher/no daily limits, priority throughput, premium model access, team billing.                                                                |

## 2. Comparison at a Glance

| Capability                      | NightCode                                                      | Typical Paid-API Terminal Agents                                              |
| ------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Cost to start using             | **Free — no card required**                                    | Requires a funded provider API key from day one                               |
| Billing model                   | Free daily allowance; optional flat-rate Pro subscription      | Per-token metered billing on every message                                    |
| Models available                | Curated free catalog of frontier-class open models             | Whatever the user's own paid API key provides access to                       |
| Setup complexity for a new user | Install → log in → go                                          | Install → create provider account → generate API key → configure billing → go |
| Cost predictability             | Fixed (free tier: $0; Pro: flat subscription)                  | Variable, can spike unexpectedly with heavy usage                             |
| Local tool sandboxing           | Explicit project-directory containment, disclosed threat model | Varies significantly by product                                               |
| Plan/Build mode separation      | Explicit, visible mode switch with layered enforcement         | Varies; many tools blend research and execution without a hard mode boundary  |

_This comparison describes general patterns in the terminal AI agent category as
of this document's writing, not any single named competitor. Update with
specific competitive detail as needed for a given sales conversation._

## 3. Feature-to-Benefit Mapping

| Feature                  | Benefit to the customer                                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Free model catalog       | Removes the single biggest adoption barrier for individual developers and cost-conscious teams.                                                    |
| PLAN/BUILD separation    | Lets risk-averse teams and regulated environments adopt AI-assisted development with a clear, auditable boundary on when code can actually change. |
| Sandboxed tool execution | Protects against the agent ever reaching outside the intended project, a common concern raised by security-conscious buyers.                       |
| Persistent sessions      | Removes the friction of re-explaining context every time work resumes, across any machine.                                                         |
| Optional Pro tier        | Lets the same product scale from an individual hobbyist to a funded team without switching tools.                                                  |

## 4. Who Each Feature Matters Most To

- **Individual developers & students** care most about: free model catalog, low
  setup friction.
- **Team leads & engineering managers** care most about: PLAN/BUILD mode
  separation, sandboxing, Pro team billing.
- **Security & compliance reviewers** care most about: sandboxing, transparency
  of local actions, the documented threat model (see
  [Security & Trust Overview](./10-security-and-trust-overview.md)).
- **Budget owners** care most about: cost predictability, the free tier's real
  usefulness (not a crippled trial).

## 5. Objection Handling Reference

| Likely objection                                                  | Response                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "Free models can't be as good as [closed frontier model]."        | The free catalog includes some of the strongest open-weight models available today, spanning general reasoning, extended chain-of-thought, and coding-specialized variants — capability gaps with closed models have narrowed significantly, and NightCode's provider-agnostic architecture means the catalog can grow as the model landscape evolves. |
| "What's the catch with 'free'?"                                   | The free tier is the intended default experience for the large majority of users, sized generously for real daily development work — not a time-limited trial. Pro exists for genuinely high-volume or team use cases, and upgrading is a convenience, not a requirement.                                                                              |
| "How do we know the agent won't touch files outside our project?" | Every file and shell tool is strictly sandboxed to the directory the agent was launched in, enforced independently at two layers — see the [Security & Trust Overview](./10-security-and-trust-overview.md).                                                                                                                                           |
| "Can we trust an agent with shell/write access?"                  | The explicit PLAN/BUILD mode split means write and execute capability is never active unless a user consciously opts in, and every local action is visible in the terminal in real time as it happens.                                                                                                                                                 |

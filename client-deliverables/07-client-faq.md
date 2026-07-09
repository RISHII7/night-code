# Client FAQ

## General

**What is NightCode?** NightCode is a terminal-based AI coding agent. You
install a CLI, run it inside any project, log in once, and chat with an AI agent
that can research your codebase and — when you enable it — write code, edit
files, and run commands directly, streamed live in your terminal.

**Is it really free?** Yes. Every account gets a generous daily allowance of AI
requests against our free model catalog, with no credit card required to start.
An optional Pro plan exists for users and teams who need more scale, but it's
not required to get real value from the product.

**What models does NightCode use?** NightCode is built on NVIDIA's free, hosted
catalog of frontier-class open models, including large general-purpose models,
an extended-reasoning model, and a coding-specialized model. See the
[Product Brochure](./02-product-brochure.md) for a plain-language overview, or
the technical [AI Model Integration](../docs/07-ai-model-integration.md)
document for full detail.

**What platforms does NightCode run on?** macOS, Linux, and Windows (via a
standard terminal or WSL).

## Using NightCode

**What's the difference between PLAN and BUILD mode?** PLAN mode is read-only —
the agent can explore and explain your codebase but cannot change anything.
BUILD mode adds the ability to write files, edit files, and run shell commands.
You choose which mode is active, and you can switch between them
mid-conversation without losing context.

**Can the agent access files outside my project?** No. Every file and shell
action is strictly limited to the project directory you launched NightCode in.
This is enforced in the software itself, not just as a policy — see the
[Security & Trust Overview](./10-security-and-trust-overview.md).

**Will I see what the agent is doing, or does it work silently?** Every action —
every file it reads, every edit it makes, every command it runs — appears in
your terminal in real time as it happens. Nothing runs invisibly in the
background.

**Do my sessions save automatically?** Yes. Every conversation is saved to your
account and can be resumed later, on any machine, once you log in.

## Billing & Limits

**What happens when I hit my daily free limit?** You'll get a clear message and
a one-step option to upgrade. Nothing you've already done is lost, and your
allowance resets on its normal daily schedule if you'd rather wait than upgrade.

**Is the free tier a trial that expires?** No. It's a permanent tier of the
product, not a time-limited trial.

**What does Pro add?** Higher (or no) daily limits, priority throughput during
high-demand periods, and access to premium hosted models. See
[Pricing & Packages](./04-pricing-and-packages.md) for current plan details.

**Can I cancel Pro at any time?** Yes, self-serve, through the billing portal
accessible from within NightCode — no need to contact support.

## Trust & Security

**Does NightCode ever see or store my source code on its own servers
permanently?** Your project files are read and processed as needed to answer
your requests, and conversation content (including relevant file excerpts the
agent read) is stored as part of your session history so you can resume
conversations later. Files themselves are never uploaded or stored wholesale
outside of what's needed for the active conversation. [Confirm and refine this
answer against your actual data-retention policy before publishing externally.]

**Who can see my sessions?** Only you. Sessions are scoped strictly to your
authenticated account.

**Is NightCode suitable for use with proprietary or sensitive codebases?**
Review the [Security & Trust Overview](./10-security-and-trust-overview.md) and
your organization's own compliance requirements. For especially sensitive
environments, we recommend running BUILD mode inside an isolated container or
VM, consistent with best practice for any tool granted local shell access.

## Account & Access

**Do I need to create a separate NightCode password?** No — login uses a secure,
browser-based sign-in flow. There's no NightCode-specific password to manage or
lose.

**Can a team share one account?** We recommend individual accounts per user,
with team billing centralized under a Team plan, rather than credential sharing
— this keeps session history and usage properly attributed per person. [Confirm
against actual Team plan terms.]

**How do I get support if something's not working?** [Insert support contact
channel — email, help center link, or community forum.]

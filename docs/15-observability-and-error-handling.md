# Observability & Error Handling

## 1. Philosophy

NightCode's error handling is designed around one principle: **a user should never see a raw stack trace or an unexplained failure, and the team should never learn about a production issue from a user report before their own monitoring caught it.** This means every layer — CLI, API, and the streaming AI pipeline itself — has both a user-facing failure message and a machine-readable signal sent to centralized monitoring.

## 2. Error Monitoring Setup

Sentry is integrated on both sides of the system:

| Surface | What's captured |
|---|---|
| CLI | Unhandled exceptions in the terminal UI render loop, local tool execution failures, OAuth flow failures, network errors talking to the API. |
| API server | Unhandled exceptions in any route handler, database errors, upstream provider errors (NVIDIA NIM, Clerk, Polar) that escape their normal error handling. |

Each captured error is tagged with enough context to triage without needing to reproduce locally: environment (local/preview/production), route or command involved, and — critically — never the content of user prompts, file contents, or tokens, which are explicitly scrubbed from error context before reporting.

## 3. Centralized API Error Handling

Every route runs through a single top-level error boundary in the Hono application:

```ts
app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json({ error: error.message || "Request failed" }, error.status);
  }

  console.error("Unhandled server error", error);
  // reported to Sentry
  return c.json({ error: "Internal server error" }, 500);
});
```

This guarantees two things: known, intentional errors (`HTTPException`s thrown deliberately by route logic, like "session not found") always return their specific status and message, while any *unexpected* error is caught, logged with full detail server-side, and returned to the client as a generic, non-leaking `500` — internal error details (stack traces, database error messages) are never forwarded to the client.

## 4. Error Taxonomy

| Category | Example | User-facing message | Logged detail |
|---|---|---|---|
| Auth failure | Expired/invalid token | "Unauthorized. Run `/login` to continue." | Token validation failure reason |
| Allowance exhausted | Free tier daily cap hit | "No free requests remaining today. Run `/upgrade` for more." | userId, current allowance state |
| Validation failure | Malformed chat request body | "Invalid request body" | Zod validation error detail |
| Not found | Session doesn't exist / isn't owned by user | "Session not found" | Requested id + requesting userId |
| Upstream provider failure | NVIDIA NIM rate limit or outage | "AI provider is busy, please retry in a moment" | Full upstream error response |
| Unexpected server error | Any uncaught exception | "Internal server error" | Full stack trace, request context |

## 5. Streaming-Specific Error Handling

Because chat responses stream token-by-token, an error that occurs mid-stream (a model provider disconnect, a tool execution failure) cannot simply return an HTTP error status — the response has already started. The AI SDK's `onError` handler for `streamText` intercepts these and injects a terminal error message into the stream itself, which the CLI's message renderer displays as a distinct error-message component inline in the conversation, rather than crashing the terminal session or leaving the user staring at a frozen "thinking" indicator.

## 6. Client-Side Tool Execution Errors

Errors from local tool execution (a `bash` command failing, an `editFile` call whose `oldString` isn't found) are captured as **tool results**, not thrown exceptions — they're deliberately returned to the model as structured error output (e.g. `"oldString not found in file"`) so the model can see what went wrong and adapt its next action, rather than the whole turn failing outright. This is a meaningful UX distinction: a failed `grep` with no matches doesn't end the conversation, it informs the next step.

## 7. Logging Standards

- Server logs are structured (not free-text) wherever practical, including consistent fields like `userId`, `sessionId`, and `route` so log aggregation and correlation with a specific user report is fast.
- Sensitive values (tokens, API keys, full prompt/file content) are never included in logs, even at debug level — logging code is reviewed with the same scrutiny as any code path that touches secrets.

## 8. Health & Uptime Monitoring

A lightweight health-check endpoint reports the API's own liveness and, optionally, the reachability of its immediate dependencies (database connectivity). This is polled by the hosting platform (Railway) to drive automatic restarts of unhealthy instances, and can be wired to external uptime monitoring for alerting independent of the hosting platform's own health checks.

## 9. Incident Response Expectations

For a production-facing system with local write/execute capability (see [Security Architecture](./12-security-architecture.md)), the team should maintain:
- A defined on-call rotation or notification path for Sentry alerts crossing a severity threshold.
- A runbook for the most likely failure modes: NVIDIA NIM outage/rate-limit exhaustion, database connectivity loss, Clerk/Polar API disruption — each of which degrades a different, identifiable part of the product (AI responses, all functionality, and login/billing respectively) rather than the whole system failing uniformly.

## 10. What Gets Measured

| Metric | Why it matters |
|---|---|
| `/chat` request success rate | Direct proxy for whether users are getting working AI responses. |
| p50/p95 time-to-first-token | Perceived responsiveness of the streaming experience. |
| Free-tier allowance exhaustion rate | Signals whether the default free allowance is sized correctly for real usage patterns. |
| NVIDIA NIM error/rate-limit rate | Early warning that pooled capacity needs to be renegotiated or that a fallback model should be triggered more aggressively. |
| Pro conversion rate off allowance-exhaustion prompts | Core business signal tying the free/Pro model together. |

# API Reference

## 1. Overview

The NightCode API is a single Hono application exposing four route groups: `auth`, `billing`, `sessions`, and `chat`. All routes except the OAuth callback and billing-success page require a valid bearer token. The API is consumed almost exclusively by the official CLI via a typed RPC client, but every route is a plain HTTP/JSON (or streamed) endpoint and can be called by any authenticated client.

**Base URL (local development):** `http://localhost:3000`
**Base URL (production):** the deployed Railway service URL, configured in the CLI via `API_URL`.

## 2. Authentication

Every protected route expects:

```
Authorization: Bearer <access_token>
```

Tokens are issued by Clerk during the CLI's OAuth login flow (see [Authentication & OAuth](./06-authentication-and-oauth.md)) and verified server-side on every request. A request with a missing, expired, or invalid token receives:

```json
{ "error": "Unauthorized. Run /login to continue." }
```
`HTTP 401`

## 3. Route Summary

| Method | Path | Auth required | Description |
|---|---|---|---|
| GET | `/auth/callback` | No | Relays the OAuth authorization code from Clerk back to the CLI's local callback server. |
| POST | `/billing/checkout` | Yes | Creates a Polar checkout URL for upgrading to Pro. |
| POST | `/billing/portal` | Yes | Creates a Polar customer portal URL for managing an existing subscription. |
| GET | `/billing/success` | No | Static confirmation page shown after checkout/portal redirect. |
| GET | `/sessions` | Yes | Lists the authenticated user's sessions. |
| GET | `/sessions/:id` | Yes | Fetches one session, including full message history. |
| POST | `/sessions` | Yes | Creates a new session. |
| POST | `/chat` | Yes | Submits a message to a session and streams the AI response. |

## 4. `GET /auth/callback`

Not called directly by application code — this is the redirect target registered with Clerk. It receives `code`, `state`, and optionally `error`/`error_description` as query parameters, decodes the local callback port embedded in `state`, and 302-redirects the browser to the CLI's temporary local server (`http://localhost:<port>/callback?...`) so the token exchange can complete on the user's own machine.

## 5. `POST /billing/checkout`

Creates a one-time Polar checkout session for a Pro upgrade.

**Request:** no body required; the authenticated user's id is taken from the bearer token.

**Response `200`:**
```json
{ "url": "https://polar.sh/checkout/..." }
```

The CLI opens this URL in the user's default browser (`nightcode upgrade`).

## 6. `POST /billing/portal`

Creates a Polar customer portal session for an existing subscriber to manage or cancel their plan.

**Response `200`:**
```json
{ "url": "https://polar.sh/portal/..." }
```

## 7. `GET /billing/success`

Plain text confirmation page (`Done. You can close this tab and return to NightCode.`) shown after a checkout or portal flow completes in the browser.

## 8. `GET /sessions`

Lists all sessions owned by the authenticated user, most recent first.

**Response `200`:**
```json
[
  { "id": "cksess_abc123", "title": "Refactor auth middleware", "createdAt": "2026-06-02T10:15:00.000Z" }
]
```

Only `id`, `title`, and `createdAt` are returned — message bodies are omitted from the list view for payload size.

## 9. `GET /sessions/:id`

Fetches a single session, scoped to the authenticated user (a session ID belonging to another user returns `404`, not `403`, to avoid confirming the ID's existence).

**Response `200`:** the full `Session` record, including `messages`.

**Response `404`:**
```json
{ "error": "Session not found" }
```

## 10. `POST /sessions`

Creates a new session. Gated by the usage-allowance middleware — creating a session counts against the free daily allowance the same way a chat turn does, since a new session is only useful as a prelude to chatting.

**Request body:**
```json
{ "title": "Refactor auth middleware" }
```

**Response `201`:** the created `Session` record.

**Response `402`** (allowance exhausted):
```json
{ "error": "No free requests remaining today. Run /upgrade for more." }
```

## 11. `POST /chat`

The core endpoint. Submits one or more new messages to an existing session, streams the model's response, executes any requested tool calls in coordination with the client, and persists the final message list once the turn completes.

**Request body:**
```json
{
  "id": "cksess_abc123",
  "messages": [ /* array of UI message objects, AI-SDK message format */ ],
  "mode": "PLAN" ,
  "model": "meta/llama-3.3-70b-instruct"
}
```

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | Target session ID. Must belong to the authenticated user. |
| `messages` | `UIMessage[]` | New/updated messages to merge into the session's history, in AI SDK message format. |
| `mode` | `"PLAN" \| "BUILD"` | Determines which tool contracts are attached to the model call. |
| `model` | `string` | Must match an entry in the supported model registry; unsupported IDs are rejected with `400`. |

**Response:** a streamed UI-message response (`text/event-stream`-style chunked transfer). The stream carries incremental text, tool-call requests, tool-result acknowledgements, and a final `finish` part carrying usage metadata (`durationMs`, token usage) used for allowance accounting.

**Response `402`** (allowance exhausted, checked before the model call is made):
```json
{ "error": "No free requests remaining today. Run /upgrade for more." }
```

**Response `404`:** session not found for this user.

**Response `400`:** invalid body (missing fields, empty `messages`, unsupported `model`).

### 11.1 Tool-Calling Mid-Stream

When the model requests a tool call (e.g. `readFile`), the stream includes a tool-call part with `state: "input-available"`. The CLI executes the tool locally (see [Agent Modes & Tool System](./08-agent-modes-and-tool-system.md)) and the *client* — not the server — performs the actual file/shell operation, since only the client has access to the user's local project. The server's role is limited to orchestrating the model's turn-taking around tool calls it does not execute itself.

### 11.2 Usage Accounting

After a `/chat` stream finishes successfully (and was not aborted, and has no still-pending tool calls), the server:
1. Persists the merged message list to the session.
2. Computes billable usage from the model's reported token usage.
3. Ingests a usage event against the user's allowance meter.

If usage ingestion fails, the chat response itself is unaffected — the failure is logged server-side rather than surfaced to the user, since the AI response has already been delivered and re-billing after the fact is preferable to blocking a user who already received their answer.

## 12. Error Shape

All error responses share a consistent shape:

```json
{ "error": "Human-readable message" }
```

| Status | Meaning |
|---|---|
| `400` | Malformed request body or unsupported parameter (e.g. unknown model ID). |
| `401` | Missing or invalid bearer token. |
| `402` | Usage allowance exhausted; upgrade required to continue immediately. |
| `404` | Resource not found, or not owned by the authenticated user. |
| `503` | Upstream dependency (billing/allowance check) temporarily unavailable. |
| `500` | Unhandled server error. |

## 13. Typed Client Access

The CLI does not hand-write `fetch` calls against this API. It imports the server's route types directly and constructs a typed RPC client, so every request body, response shape, and route path is checked at compile time against the actual server implementation — a request to a renamed or removed route fails to compile in the CLI rather than failing at runtime in a user's terminal.

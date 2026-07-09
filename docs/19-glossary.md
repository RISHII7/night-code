# Glossary

| Term                          | Definition                                                                                                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **NightCode**                 | The product: a terminal-based AI coding agent powered by NVIDIA's free model catalog.                                                                                      |
| **PLAN mode**                 | Read-only agent mode; the model can research and propose but has no write/execute tool access.                                                                             |
| **BUILD mode**                | Full-capability agent mode; adds `writeFile`, `editFile`, and `bash` tool access on top of PLAN's read-only tools.                                                         |
| **Session**                   | A single persisted conversation, scoped to one authenticated user, containing the full ordered message history.                                                            |
| **Tool call**                 | A structured request from the model to invoke a specific capability (e.g. `readFile`) with defined input arguments.                                                        |
| **Tool contract**             | The Zod-validated input schema and description pairing that defines what a tool accepts and how it's presented to the model.                                               |
| **Local tool execution**      | The client-side (CLI) process of actually running a requested tool against the user's own filesystem/shell — the server never executes tools directly.                     |
| **Sandboxing**                | The path-containment logic that prevents any file tool from reading or writing outside the current project directory.                                                      |
| **NVIDIA NIM**                | NVIDIA Inference Microservices — the managed, OpenAI-compatible inference platform hosting NightCode's supported model catalog.                                            |
| **Model registry**            | The shared, centrally-declared list of supported model IDs, their provider, tier, and metadata, referenced everywhere a model must be resolved or validated.               |
| **Free tier**                 | The default account tier: a generous, resetting daily request allowance against free NVIDIA-hosted models, with no payment method required.                                |
| **Pro tier**                  | The optional paid subscription tier: removes daily allowance caps, adds priority throughput, and unlocks premium hosted models.                                            |
| **Usage meter / allowance**   | The per-user counter (backed by Polar) tracking free-tier request consumption and resetting on a fixed schedule.                                                           |
| **Clerk**                     | The managed identity provider handling OAuth login for the CLI.                                                                                                            |
| **PKCE**                      | Proof Key for Code Exchange — an OAuth extension that lets a public client (like a CLI, which can't hold a secret) securely complete an authorization code exchange.       |
| **Polar**                     | The managed billing and usage-metering platform backing NightCode's free-tier allowance and Pro subscriptions.                                                             |
| **Hono**                      | The lightweight, streaming-friendly web framework the API server is built on.                                                                                              |
| **OpenTUI**                   | The React renderer targeting the terminal, used to build NightCode's interactive terminal UI.                                                                              |
| **AI SDK**                    | The Vercel AI SDK (`ai` package) providing model-agnostic streaming, message state, and tool-calling orchestration.                                                        |
| **Streaming response**        | A chat completion delivered incrementally (token by token / part by part) rather than as a single blocking response.                                                       |
| **UI message**                | The AI SDK's structured message representation, composed of typed parts (text, tool call, tool result, reasoning, etc.).                                                   |
| **Merge-on-write**            | The session persistence strategy of merging incoming messages into stored history by message ID, rather than overwriting the whole document on every write.                |
| **Provider (AI)**             | An inference backend (e.g. NVIDIA NIM) exposed behind NightCode's model resolver, allowing new providers to be added without changing the chat pipeline.                   |
| **Idempotency key**           | A unique identifier (e.g. a message ID) used to ensure a retried operation — such as usage ingestion — is never double-counted.                                            |
| **Expand/contract migration** | A database migration pattern where schema changes remain backward-compatible with the previous application version for at least one release cycle, enabling safe rollback. |
| **Prompt injection**          | An attack where instructions embedded in model input (e.g. file content) attempt to override the model's intended behavior.                                                |

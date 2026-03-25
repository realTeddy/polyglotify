# Vercel AI SDK Migration + UI Updates Design

## Summary

Migrate the AI chat system from custom `fetch`-based provider calls to the Vercel AI SDK (`ai` package) with streaming support. Switch Astro from static to hybrid output mode. Add 12 providers with dynamic model selection. Update nav and footer with GitHub links.

## Scope

Three independent changes:

1. **AI SDK migration** — Replace custom AI code with Vercel AI SDK, add server-side API routes, enable streaming, support 12 providers with dynamic model fetching
2. **Nav update** — Replace hardcoded `v0.1.0` badge with GitHub icon link
3. **Footer update** — Link "open source on GitHub" to repo, remove "built by the community"

---

## 1. AI SDK Migration

### Architecture Change

- **Astro output mode**: `'static'` -> `'hybrid'` in `astro.config.mjs`. All existing pages remain statically generated (default). Only API routes run server-side.
- **Vercel adapter**: Add `@astrojs/vercel` adapter for server-side route support on Vercel.
- **New API routes**: Two server-side endpoints under `src/pages/api/`:
  - `chat.ts` — Accepts messages + provider + API key + model, calls `streamText()`, returns streaming response
  - `models.ts` — Accepts provider + API key, fetches available models from provider, returns filtered list

### BYOK Flow

1. Client stores provider slug + API key + selected model in localStorage
2. On chat send, client POSTs to `/api/chat` with `{ messages, systemPrompt, provider, apiKey, model }`
3. API route creates a provider instance with the user's key and calls `streamText()`
4. Response streams back to client via the AI SDK's `useChat` hook
5. The API key is used per-request only — never stored server-side

### Provider Packages

| Provider | npm Package | Key URL |
|---|---|---|
| OpenAI | `@ai-sdk/openai` | platform.openai.com/api-keys |
| Anthropic | `@ai-sdk/anthropic` | console.anthropic.com |
| Google AI | `@ai-sdk/google` | aistudio.google.com/apikey |
| Mistral | `@ai-sdk/mistral` | console.mistral.ai/api-keys |
| Groq | `@ai-sdk/groq` | console.groq.com/keys |
| xAI (Grok) | `@ai-sdk/xai` | console.x.ai |
| DeepSeek | `@ai-sdk/deepseek` | platform.deepseek.com/api_keys |
| Cohere | `@ai-sdk/cohere` | dashboard.cohere.com/api-keys |
| Fireworks | `@ai-sdk/fireworks` | fireworks.ai/api-keys |
| Together AI | `@ai-sdk/togetherai` | api.together.xyz/settings/api-keys |
| Perplexity | `@ai-sdk/perplexity` | perplexity.ai/settings/api |
| OpenRouter | `@openrouter/ai-sdk-provider` | openrouter.ai/keys |

Core package: `ai` (Vercel AI SDK runtime)

### Dynamic Model Fetching

After the user saves their API key, the client calls `/api/models` with the provider + key. The API route fetches the provider's models list endpoint and returns a filtered, sorted list.

**Models list endpoints per provider:**

| Provider | Endpoint |
|---|---|
| OpenAI | `https://api.openai.com/v1/models` |
| Anthropic | `https://api.anthropic.com/v1/models` |
| Google AI | `https://generativelanguage.googleapis.com/v1beta/models?key={KEY}` |
| Mistral | `https://api.mistral.ai/v1/models` |
| Groq | `https://api.groq.com/openai/v1/models` |
| xAI | `https://api.x.ai/v1/models` |
| DeepSeek | `https://api.deepseek.com/models` |
| Cohere | `https://api.cohere.com/v1/models` |
| Fireworks | `https://api.fireworks.ai/inference/v1/models` |
| Together AI | `https://api.together.xyz/v1/models` |
| Perplexity | None — use static fallback only |
| OpenRouter | `https://openrouter.ai/api/v1/models` |

**Notes:**
- Google requires API key as query param, not Bearer token
- Perplexity has no models endpoint — always use fallback list
- OpenRouter returns 400+ models — return all models sorted alphabetically by ID; the dropdown will be searchable via a text filter input above the list

### Fallback Model Lists

Used when dynamic fetch fails or provider has no models endpoint.

```ts
const PROVIDER_FALLBACK_MODELS: Record<string, { id: string; name: string }[]> = {
  openai: [
    { id: 'gpt-5.4-mini', name: 'GPT-5.4 Mini' },
    { id: 'gpt-5.4', name: 'GPT-5.4' },
    { id: 'gpt-5.4-nano', name: 'GPT-5.4 Nano' },
    { id: 'o3', name: 'o3' },
    { id: 'o4-mini', name: 'o4 Mini' },
  ],
  anthropic: [
    { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6' },
    { id: 'claude-haiku-4-5-20251001', name: 'Claude Haiku 4.5' },
    { id: 'claude-opus-4-6', name: 'Claude Opus 4.6' },
  ],
  google: [
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
    { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite' },
    { id: 'gemini-3.1-flash-preview', name: 'Gemini 3.1 Flash (Preview)' },
  ],
  mistral: [
    { id: 'mistral-small-4-0-26-03', name: 'Mistral Small 4.0' },
    { id: 'mistral-large-3-25-12', name: 'Mistral Large 3' },
    { id: 'mistral-medium-3-1-25-08', name: 'Mistral Medium 3.1' },
    { id: 'codestral-25-08', name: 'Codestral' },
  ],
  groq: [
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B' },
    { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant' },
    { id: 'openai/gpt-oss-120b', name: 'GPT-OSS 120B' },
    { id: 'openai/gpt-oss-20b', name: 'GPT-OSS 20B' },
  ],
  xai: [
    { id: 'grok-4-1-fast-non-reasoning', name: 'Grok 4.1 Fast' },
    { id: 'grok-4.20-0309-non-reasoning', name: 'Grok 4' },
    { id: 'grok-4.20-0309-reasoning', name: 'Grok 4 Reasoning' },
    { id: 'grok-code-fast-1', name: 'Grok Code Fast' },
  ],
  deepseek: [
    { id: 'deepseek-chat', name: 'DeepSeek Chat (V3.2)' },
    { id: 'deepseek-reasoner', name: 'DeepSeek Reasoner' },
  ],
  cohere: [
    { id: 'command-a-03-2025', name: 'Command A' },
    { id: 'command-a-reasoning-08-2025', name: 'Command A Reasoning' },
    { id: 'command-r-plus-08-2024', name: 'Command R+' },
    { id: 'command-r7b-12-2024', name: 'Command R 7B' },
  ],
  fireworks: [
    { id: 'accounts/fireworks/models/llama-v3p3-70b-instruct', name: 'Llama 3.3 70B' },
    { id: 'accounts/fireworks/models/deepseek-v3p1', name: 'DeepSeek V3.1' },
    { id: 'accounts/fireworks/models/llama-v3p1-405b-instruct', name: 'Llama 3.1 405B' },
    { id: 'accounts/fireworks/models/qwen3-235b-a22b-instruct-2507', name: 'Qwen3 235B' },
  ],
  togetherai: [
    { id: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8', name: 'Llama 4 Maverick' },
    { id: 'Qwen/Qwen3.5-397B-A17B', name: 'Qwen 3.5 397B' },
    { id: 'deepseek-ai/DeepSeek-R1', name: 'DeepSeek R1' },
    { id: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo', name: 'Llama 3.1 8B Turbo' },
  ],
  perplexity: [
    { id: 'sonar', name: 'Sonar' },
    { id: 'sonar-pro', name: 'Sonar Pro' },
    { id: 'sonar-reasoning-pro', name: 'Sonar Reasoning Pro' },
    { id: 'sonar-deep-research', name: 'Sonar Deep Research' },
  ],
  openrouter: [
    { id: 'anthropic/claude-sonnet-4-6', name: 'Claude Sonnet 4.6' },
    { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
    { id: 'x-ai/grok-4-fast', name: 'Grok 4 Fast' },
    { id: 'deepseek/deepseek-chat-v3-0324', name: 'DeepSeek V3' },
  ],
};
```

### Default Model Per Provider

```ts
const PROVIDER_DEFAULTS: Record<string, string> = {
  openai: 'gpt-5.4-mini',
  anthropic: 'claude-sonnet-4-6',
  google: 'gemini-2.5-flash',
  mistral: 'mistral-small-4-0-26-03',
  groq: 'llama-3.3-70b-versatile',
  xai: 'grok-4-1-fast-non-reasoning',
  deepseek: 'deepseek-chat',
  cohere: 'command-a-03-2025',
  fireworks: 'accounts/fireworks/models/llama-v3p3-70b-instruct',
  togetherai: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8',
  perplexity: 'sonar',
  openrouter: 'anthropic/claude-sonnet-4-6',
};
```

### Client-Side Changes

**Replace `src/lib/ai.ts`:**
- Remove all custom `fetch` calls to individual provider APIs — this includes `sendChatMessage`, `sendByokMessage`, `sendAnthropicMessage`, `sendOpenAiMessage`, `sendGoogleMessage`, and `sendPaidMessage`. None of these are needed post-migration since the `useChat` hook talks to `/api/chat` directly.
- Remove the `paid` mode — the `/api/chat` route is BYOK-only going forward. Simplify `AiConfig.mode` to `'none' | 'byok'`.
- Keep `AiConfig` (with `mode` simplified to `'none' | 'byok'`), `saveByokKey`, `clearByokKey`, `hasAiAccess`, `buildSystemPrompt` (adjusted for new provider list)
- Add `AiProvider` type expanded to 12 providers
- Add `fetchModels(provider, apiKey)` function that calls `/api/models`
- Add localStorage helpers for selected model: `saveSelectedModel()`, `getSelectedModel()`

**Replace `AiChat.tsx`:**
- Use AI SDK's `useChat` hook instead of manual message state + fetch
- `useChat` handles: messages array, input state, loading state, streaming, error state
- Pass a custom `body` option via `handleSubmit(e, { body: { provider, apiKey, model } })` so that provider/key/model are read fresh from localStorage on each send — this prevents stale credentials if the user switches provider mid-session
- Preserve the `featureContext` prop behavior — on key set, pre-populate input via `useChat`'s `setInput` function

**Update `AiKeyPrompt.tsx`:**
- Expand provider list to 12 entries
- After saving key, fetch models and show model selector dropdown
- Store selected model in localStorage

### Server-Side API Routes

**`src/pages/api/chat.ts`:**
```ts
// POST handler
// 1. Extract { messages, systemPrompt, provider, apiKey, model } from request body
// 2. Create provider instance with apiKey (e.g., createOpenAI({ apiKey }))
// 3. Call streamText({ model: provider(model), system: systemPrompt, messages })
// 4. Return streaming response via result.toDataStreamResponse()
```

**`src/pages/api/models.ts`:**
```ts
// POST handler
// 1. Extract { provider, apiKey } from request body
// 2. Fetch models from provider's models endpoint using the apiKey
// 3. Filter/normalize response into { id, name }[] format
// 4. Return JSON response
// 5. On failure, return fallback model list for that provider
```

### Files Changed

- **Modify**: `astro.config.mjs` — Add Vercel adapter, switch to hybrid output
- **Modify**: `package.json` — Add `ai`, `@astrojs/vercel`, all 12 provider packages
- **Rewrite**: `src/lib/ai.ts` — New provider registry, remove direct fetch calls, add model helpers
- **Rewrite**: `src/components/AiChat.tsx` — Use `useChat` hook with streaming
- **Rewrite**: `src/components/AiKeyPrompt.tsx` — 12 providers + model selector
- **Update**: `src/components/AiChatWrapper.tsx` — May need minor adjustments for new `useChat`-based AiChat props
- **Create**: `src/pages/api/chat.ts` — Streaming chat API route
- **Create**: `src/pages/api/models.ts` — Models list API route
- **Delete**: Nothing (old ai.ts code is fully replaced)

---

## 2. Nav Update

Replace the hardcoded version badge in `BaseLayout.astro` nav:

**Before:** `<span class="mono-badge">v0.1.0</span>`

**After:** Inline SVG GitHub icon (16x16) wrapped in an `<a>` tag linking to `https://github.com/realTeddy/polyglotify`. Styled with `color: var(--text-muted)`, hover `var(--text-primary)`, matching the Code Noir aesthetic.

**Note:** The `.mono-badge` CSS class in `global.css` is still used by `ComparisonPanel.tsx` — do not remove it.

### Files Changed

- **Modify**: `src/layouts/BaseLayout.astro` — Replace version badge with GitHub icon link

---

## 3. Footer Update

**Before:**
```html
<span style="color: var(--accent-known);">// </span>open source on GitHub &mdash; built by the community
```

**After:**
```html
<span style="color: var(--accent-known);">// </span>open source on <a href="https://github.com/realTeddy/polyglotify" target="_blank" rel="noopener noreferrer" style="color: var(--accent-ui); text-decoration: none;">GitHub</a>
```

### Files Changed

- **Modify**: `src/layouts/BaseLayout.astro` — Update footer text and add link

---

## Testing

- **Existing tests**: Validate they still pass (ComparisonView, Dashboard, validate-content, etc.)
- **AI routes**: Add tests for `/api/chat` and `/api/models` endpoint handlers
- **AiKeyPrompt**: Update tests for new provider list and model selector
- **AiChat.test.tsx**: Needs substantial updates — the `getByLabelText(/anthropic api key/i)` assertion and the localStorage-based access test (which sets `polyglotify:ai:byok-key` directly) both break after the migration to `useChat` and new provider list
- **ai.test.ts**: `tests/lib/ai.test.ts` tests `getAiConfig`, `saveByokKey`, `clearByokKey`, `hasAiAccess` — needs updates for removed `paid` mode, new `fetchModels`/`saveSelectedModel`/`getSelectedModel` functions, and expanded provider type
- **Manual**: Verify streaming works end-to-end with at least one provider

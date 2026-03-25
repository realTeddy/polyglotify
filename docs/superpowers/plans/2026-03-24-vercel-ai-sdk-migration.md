# Vercel AI SDK Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate AI chat from custom fetch calls to Vercel AI SDK with streaming, 12 providers, dynamic model selection, and update nav/footer with GitHub links.

**Architecture:** Switch Astro from static to hybrid output with Vercel adapter. Add two server-side API routes (`/api/chat` for streaming chat, `/api/models` for model list fetching). Client uses AI SDK's `useChat` hook. BYOK keys sent per-request from client localStorage.

**Tech Stack:** Vercel AI SDK (`ai`), `@astrojs/vercel`, 12 provider packages, React `useChat` hook, Astro hybrid output mode.

**Spec:** `docs/superpowers/specs/2026-03-24-vercel-ai-sdk-migration-design.md`

---

## File Structure

### Created
- `src/pages/api/chat.ts` — Streaming chat API route (server-side)
- `src/pages/api/models.ts` — Model list fetching API route (server-side)

### Modified
- `astro.config.mjs` — Add Vercel adapter, switch to hybrid output
- `package.json` — Add AI SDK + provider dependencies
- `src/lib/ai.ts` — Rewrite: provider registry, model helpers, remove fetch calls
- `src/components/AiKeyPrompt.tsx` — Rewrite: 12 providers + model selector
- `src/components/AiChat.tsx` — Rewrite: `useChat` hook with streaming
- `src/layouts/BaseLayout.astro` — Nav GitHub icon + footer link
- `tests/lib/ai.test.ts` — Update for new API surface
- `tests/components/AiChat.test.tsx` — Update for new component behavior

### Unchanged
- `src/components/AiChatWrapper.tsx` — Props are the same, no changes needed
- `src/components/AiChatButton.tsx` — No changes
- `src/styles/global.css` — `.mono-badge` stays (used by ComparisonPanel)

---

### Task 1: Install Dependencies and Update Astro Config

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Install Vercel AI SDK and all provider packages**

```bash
npm install ai @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/google @ai-sdk/mistral @ai-sdk/groq @ai-sdk/xai @ai-sdk/deepseek @ai-sdk/cohere @ai-sdk/fireworks @ai-sdk/togetherai @ai-sdk/perplexity @openrouter/ai-sdk-provider @astrojs/vercel
```

- [ ] **Step 2: Update astro.config.mjs to hybrid output with Vercel adapter**

Replace the entire file with:

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'hybrid',
  adapter: vercel(),
});
```

- [ ] **Step 3: Verify the project builds**

```bash
npm run build
```

Expected: Build succeeds. All existing static pages still generated. A `.vercel/output` directory is produced instead of the plain `dist/` folder.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json astro.config.mjs
git commit -m "chore: add Vercel AI SDK deps, switch to hybrid output"
```

---

### Task 2: Rewrite `src/lib/ai.ts` — Provider Registry and Helpers

**Files:**
- Rewrite: `src/lib/ai.ts`
- Modify: `tests/lib/ai.test.ts`

- [ ] **Step 1: Write the updated tests**

Replace the entire contents of `tests/lib/ai.test.ts` with:

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getAiConfig,
  saveByokKey,
  clearByokKey,
  hasAiAccess,
  buildSystemPrompt,
  saveSelectedModel,
  getSelectedModel,
  getProviderConfig,
  fetchModels,
  PROVIDERS,
} from '@/lib/ai';
import type { AiProvider } from '@/lib/ai';

const storage = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
  clear: () => storage.clear(),
  get length() { return storage.size; },
  key: (i: number) => Array.from(storage.keys())[i] ?? null,
};
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });

beforeEach(() => storage.clear());

describe('PROVIDERS', () => {
  it('has 12 providers', () => {
    expect(PROVIDERS).toHaveLength(12);
  });

  it('each provider has required fields', () => {
    for (const p of PROVIDERS) {
      expect(p.value).toBeTruthy();
      expect(p.label).toBeTruthy();
      expect(p.placeholder).toBeTruthy();
      expect(p.url).toMatch(/^https?:\/\//);
      expect(p.defaultModel).toBeTruthy();
    }
  });
});

describe('getProviderConfig', () => {
  it('returns config for a valid provider', () => {
    const config = getProviderConfig('openai');
    expect(config).toBeDefined();
    expect(config!.label).toBe('OpenAI');
  });

  it('returns undefined for an invalid provider', () => {
    expect(getProviderConfig('invalid' as AiProvider)).toBeUndefined();
  });
});

describe('getAiConfig', () => {
  it('returns mode none when no key is stored', () => {
    const config = getAiConfig();
    expect(config.mode).toBe('none');
    expect(config.apiKey).toBeUndefined();
  });

  it('returns mode byok with key when BYOK key is stored', () => {
    saveByokKey('sk-ant-test-key', 'anthropic');
    const config = getAiConfig();
    expect(config.mode).toBe('byok');
    expect(config.apiKey).toBe('sk-ant-test-key');
  });

  it('returns correct provider when key is saved with provider', () => {
    saveByokKey('sk-test-123', 'openai');
    const config = getAiConfig();
    expect(config.provider).toBe('openai');
  });
});

describe('saveByokKey / clearByokKey', () => {
  it('saves and clears the BYOK key', () => {
    saveByokKey('sk-ant-abc123', 'anthropic');
    expect(getAiConfig().mode).toBe('byok');
    clearByokKey();
    expect(getAiConfig().mode).toBe('none');
  });
});

describe('hasAiAccess', () => {
  it('returns false when no key is stored', () => {
    expect(hasAiAccess()).toBe(false);
  });

  it('returns true when BYOK key is stored', () => {
    saveByokKey('sk-ant-test', 'anthropic');
    expect(hasAiAccess()).toBe(true);
  });
});

describe('buildSystemPrompt', () => {
  it('includes both language names', () => {
    const prompt = buildSystemPrompt('Python', 'Rust');
    expect(prompt).toContain('Python');
    expect(prompt).toContain('Rust');
  });
});

describe('saveSelectedModel / getSelectedModel', () => {
  it('returns default model when none saved', () => {
    const model = getSelectedModel('openai');
    expect(model).toBe('gpt-5.4-mini');
  });

  it('saves and retrieves a custom model', () => {
    saveSelectedModel('openai', 'gpt-5.4');
    expect(getSelectedModel('openai')).toBe('gpt-5.4');
  });

  it('returns default when different provider is queried', () => {
    saveSelectedModel('openai', 'gpt-5.4');
    expect(getSelectedModel('anthropic')).toBe('claude-sonnet-4-6');
  });
});

describe('fetchModels', () => {
  it('calls /api/models with correct provider and apiKey', async () => {
    const mockResponse = [{ id: 'gpt-5.4', name: 'GPT-5.4' }];
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await fetchModels('openai', 'sk-test-key');
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/models', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider: 'openai', apiKey: 'sk-test-key' }),
    });
    expect(result).toEqual(mockResponse);
  });

  it('throws on non-ok response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false });
    await expect(fetchModels('openai', 'bad-key')).rejects.toThrow('Failed to fetch models');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run tests/lib/ai.test.ts
```

Expected: Multiple failures — `PROVIDERS`, `getProviderConfig`, `saveSelectedModel`, `getSelectedModel` don't exist yet.

- [ ] **Step 3: Rewrite `src/lib/ai.ts`**

Replace the entire file with:

```ts
export type AiProvider =
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'mistral'
  | 'groq'
  | 'xai'
  | 'deepseek'
  | 'cohere'
  | 'fireworks'
  | 'togetherai'
  | 'perplexity'
  | 'openrouter';

export interface ProviderInfo {
  value: AiProvider;
  label: string;
  placeholder: string;
  url: string;
  defaultModel: string;
}

export interface AiConfig {
  mode: 'none' | 'byok';
  provider?: AiProvider;
  apiKey?: string;
}

export const PROVIDERS: ProviderInfo[] = [
  { value: 'anthropic', label: 'Anthropic', placeholder: 'sk-ant-...', url: 'https://console.anthropic.com/', defaultModel: 'claude-sonnet-4-6' },
  { value: 'openai', label: 'OpenAI', placeholder: 'sk-...', url: 'https://platform.openai.com/api-keys', defaultModel: 'gpt-5.4-mini' },
  { value: 'google', label: 'Google AI', placeholder: 'AI...', url: 'https://aistudio.google.com/apikey', defaultModel: 'gemini-2.5-flash' },
  { value: 'openrouter', label: 'OpenRouter', placeholder: 'sk-or-...', url: 'https://openrouter.ai/keys', defaultModel: 'anthropic/claude-sonnet-4-6' },
  { value: 'groq', label: 'Groq', placeholder: 'gsk_...', url: 'https://console.groq.com/keys', defaultModel: 'llama-3.3-70b-versatile' },
  { value: 'mistral', label: 'Mistral', placeholder: '...', url: 'https://console.mistral.ai/api-keys', defaultModel: 'mistral-small-4-0-26-03' },
  { value: 'xai', label: 'xAI (Grok)', placeholder: 'xai-...', url: 'https://console.x.ai', defaultModel: 'grok-4-1-fast-non-reasoning' },
  { value: 'deepseek', label: 'DeepSeek', placeholder: 'sk-...', url: 'https://platform.deepseek.com/api_keys', defaultModel: 'deepseek-chat' },
  { value: 'cohere', label: 'Cohere', placeholder: '...', url: 'https://dashboard.cohere.com/api-keys', defaultModel: 'command-a-03-2025' },
  { value: 'fireworks', label: 'Fireworks', placeholder: 'fw_...', url: 'https://fireworks.ai/api-keys', defaultModel: 'accounts/fireworks/models/llama-v3p3-70b-instruct' },
  { value: 'togetherai', label: 'Together AI', placeholder: '...', url: 'https://api.together.xyz/settings/api-keys', defaultModel: 'meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8' },
  { value: 'perplexity', label: 'Perplexity', placeholder: 'pplx-...', url: 'https://perplexity.ai/settings/api', defaultModel: 'sonar' },
];

const BYOK_KEY = 'polyglotify:ai:byok-key';
const BYOK_PROVIDER = 'polyglotify:ai:byok-provider';
const MODEL_KEY_PREFIX = 'polyglotify:ai:model:';

export function getProviderConfig(provider: AiProvider): ProviderInfo | undefined {
  return PROVIDERS.find((p) => p.value === provider);
}

export function getAiConfig(): AiConfig {
  const byokKey = localStorage.getItem(BYOK_KEY);
  const provider = (localStorage.getItem(BYOK_PROVIDER) as AiProvider) || 'anthropic';
  if (byokKey) return { mode: 'byok', apiKey: byokKey, provider };
  return { mode: 'none' };
}

export function saveByokKey(key: string, provider: AiProvider = 'anthropic'): void {
  localStorage.setItem(BYOK_KEY, key);
  localStorage.setItem(BYOK_PROVIDER, provider);
}

export function clearByokKey(): void {
  localStorage.removeItem(BYOK_KEY);
  localStorage.removeItem(BYOK_PROVIDER);
}

export function hasAiAccess(): boolean {
  return getAiConfig().mode !== 'none';
}

export function buildSystemPrompt(knownLang: string, learningLang: string): string {
  return `You are a programming language tutor helping someone who knows ${knownLang} learn ${learningLang}. Explain concepts by relating back to what they already know in ${knownLang}. Be concise but thorough. Use code examples in both languages when helpful.`;
}

export function saveSelectedModel(provider: AiProvider, modelId: string): void {
  localStorage.setItem(MODEL_KEY_PREFIX + provider, modelId);
}

export function getSelectedModel(provider: AiProvider): string {
  const saved = localStorage.getItem(MODEL_KEY_PREFIX + provider);
  if (saved) return saved;
  const config = getProviderConfig(provider);
  return config?.defaultModel ?? '';
}

export async function fetchModels(
  provider: AiProvider,
  apiKey: string
): Promise<{ id: string; name: string }[]> {
  const response = await fetch('/api/models', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, apiKey }),
  });
  if (!response.ok) throw new Error('Failed to fetch models');
  return response.json();
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/lib/ai.test.ts
```

Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/ai.ts tests/lib/ai.test.ts
git commit -m "feat: rewrite ai.ts with 12-provider registry and model helpers"
```

---

### Task 3: Create `/api/chat.ts` — Streaming Chat Route

**Files:**
- Create: `src/pages/api/chat.ts`

- [ ] **Step 1: Create the streaming chat API route**

Create `src/pages/api/chat.ts`:

```ts
import type { APIRoute } from 'astro';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createMistral } from '@ai-sdk/mistral';
import { createGroq } from '@ai-sdk/groq';
import { createXai } from '@ai-sdk/xai';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { createCohere } from '@ai-sdk/cohere';
import { createFireworks } from '@ai-sdk/fireworks';
import { createTogetherAI } from '@ai-sdk/togetherai';
import { createPerplexity } from '@ai-sdk/perplexity';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import type { AiProvider } from '@/lib/ai';

export const prerender = false;

function createProviderModel(provider: AiProvider, apiKey: string, modelId: string) {
  switch (provider) {
    case 'openai':
      return createOpenAI({ apiKey })(modelId);
    case 'anthropic':
      return createAnthropic({ apiKey })(modelId);
    case 'google':
      return createGoogleGenerativeAI({ apiKey })(modelId);
    case 'mistral':
      return createMistral({ apiKey })(modelId);
    case 'groq':
      return createGroq({ apiKey })(modelId);
    case 'xai':
      return createXai({ apiKey })(modelId);
    case 'deepseek':
      return createDeepSeek({ apiKey })(modelId);
    case 'cohere':
      return createCohere({ apiKey })(modelId);
    case 'fireworks':
      return createFireworks({ apiKey })(modelId);
    case 'togetherai':
      return createTogetherAI({ apiKey })(modelId);
    case 'perplexity':
      return createPerplexity({ apiKey })(modelId);
    case 'openrouter':
      return createOpenRouter({ apiKey })(modelId);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}

export const POST: APIRoute = async ({ request }) => {
  const { messages, systemPrompt, provider, apiKey, model } = await request.json();

  if (!provider || !apiKey || !model) {
    return new Response(JSON.stringify({ error: 'Missing provider, apiKey, or model' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const result = streamText({
      model: createProviderModel(provider, apiKey, model),
      system: systemPrompt,
      messages,
      maxTokens: 1024,
    });

    return result.toDataStreamResponse();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
```

- [ ] **Step 2: Verify the project builds**

```bash
npm run build
```

Expected: Build succeeds. The `/api/chat` route is compiled as a serverless function.

- [ ] **Step 3: Commit**

```bash
git add src/pages/api/chat.ts
git commit -m "feat: add streaming chat API route with 12 providers"
```

---

### Task 4: Create `/api/models.ts` — Model List Route

**Files:**
- Create: `src/pages/api/models.ts`

- [ ] **Step 1: Create the models API route**

Create `src/pages/api/models.ts`:

```ts
import type { APIRoute } from 'astro';
import type { AiProvider } from '@/lib/ai';

export const prerender = false;

const FALLBACK_MODELS: Record<string, { id: string; name: string }[]> = {
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

interface ModelsEndpointConfig {
  url: string;
  headers: Record<string, string>;
  extractModels: (data: any) => { id: string; name: string }[];
}

function getModelsEndpoint(provider: AiProvider, apiKey: string): ModelsEndpointConfig | null {
  const bearerAuth = { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' };

  switch (provider) {
    case 'openai':
      return {
        url: 'https://api.openai.com/v1/models',
        headers: bearerAuth,
        extractModels: (data) =>
          data.data
            .map((m: any) => ({ id: m.id, name: m.id }))
            .sort((a: any, b: any) => a.id.localeCompare(b.id)),
      };
    case 'anthropic':
      return {
        url: 'https://api.anthropic.com/v1/models',
        headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        extractModels: (data) =>
          data.data
            .map((m: any) => ({ id: m.id, name: m.display_name || m.id }))
            .sort((a: any, b: any) => a.id.localeCompare(b.id)),
      };
    case 'google':
      return {
        url: `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
        headers: {},
        extractModels: (data) =>
          data.models
            .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
            .map((m: any) => ({
              id: m.name.replace('models/', ''),
              name: m.displayName || m.name.replace('models/', ''),
            }))
            .sort((a: any, b: any) => a.id.localeCompare(b.id)),
      };
    case 'mistral':
      return {
        url: 'https://api.mistral.ai/v1/models',
        headers: bearerAuth,
        extractModels: (data) =>
          data.data
            .map((m: any) => ({ id: m.id, name: m.id }))
            .sort((a: any, b: any) => a.id.localeCompare(b.id)),
      };
    case 'groq':
      return {
        url: 'https://api.groq.com/openai/v1/models',
        headers: bearerAuth,
        extractModels: (data) =>
          data.data
            .map((m: any) => ({ id: m.id, name: m.id }))
            .sort((a: any, b: any) => a.id.localeCompare(b.id)),
      };
    case 'xai':
      return {
        url: 'https://api.x.ai/v1/models',
        headers: bearerAuth,
        extractModels: (data) =>
          data.data
            .map((m: any) => ({ id: m.id, name: m.id }))
            .sort((a: any, b: any) => a.id.localeCompare(b.id)),
      };
    case 'deepseek':
      return {
        url: 'https://api.deepseek.com/models',
        headers: bearerAuth,
        extractModels: (data) =>
          data.data
            .map((m: any) => ({ id: m.id, name: m.id }))
            .sort((a: any, b: any) => a.id.localeCompare(b.id)),
      };
    case 'cohere':
      return {
        url: 'https://api.cohere.com/v1/models',
        headers: bearerAuth,
        extractModels: (data) =>
          data.models
            .map((m: any) => ({ id: m.name, name: m.name }))
            .sort((a: any, b: any) => a.id.localeCompare(b.id)),
      };
    case 'fireworks':
      return {
        url: 'https://api.fireworks.ai/inference/v1/models',
        headers: bearerAuth,
        extractModels: (data) =>
          data.data
            .map((m: any) => ({ id: m.id, name: m.id }))
            .sort((a: any, b: any) => a.id.localeCompare(b.id)),
      };
    case 'togetherai':
      return {
        url: 'https://api.together.xyz/v1/models',
        headers: bearerAuth,
        extractModels: (data) =>
          (Array.isArray(data) ? data : data.data || [])
            .map((m: any) => ({ id: m.id, name: m.display_name || m.id }))
            .sort((a: any, b: any) => a.id.localeCompare(b.id)),
      };
    case 'perplexity':
      return null; // No models endpoint
    case 'openrouter':
      return {
        url: 'https://openrouter.ai/api/v1/models',
        headers: bearerAuth,
        extractModels: (data) =>
          data.data
            .map((m: any) => ({ id: m.id, name: m.name || m.id }))
            .sort((a: any, b: any) => a.id.localeCompare(b.id)),
      };
    default:
      return null;
  }
}

export const POST: APIRoute = async ({ request }) => {
  const { provider, apiKey } = (await request.json()) as {
    provider: AiProvider;
    apiKey: string;
  };

  if (!provider || !apiKey) {
    return new Response(JSON.stringify({ error: 'Missing provider or apiKey' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const endpoint = getModelsEndpoint(provider, apiKey);

  // No models endpoint — return fallback
  if (!endpoint) {
    return new Response(JSON.stringify(FALLBACK_MODELS[provider] ?? []), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(endpoint.url, { headers: endpoint.headers });
    if (!response.ok) throw new Error(`Provider returned ${response.status}`);
    const data = await response.json();
    const models = endpoint.extractModels(data);
    return new Response(JSON.stringify(models), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    // On failure, return fallback
    return new Response(JSON.stringify(FALLBACK_MODELS[provider] ?? []), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
```

- [ ] **Step 2: Verify the project builds**

```bash
npm run build
```

Expected: Build succeeds. Both `/api/chat` and `/api/models` routes compiled.

- [ ] **Step 3: Commit**

```bash
git add src/pages/api/models.ts
git commit -m "feat: add models list API route with fallbacks for 12 providers"
```

---

### Task 5: Rewrite `AiKeyPrompt.tsx` — 12 Providers + Model Selector

**Files:**
- Rewrite: `src/components/AiKeyPrompt.tsx`

- [ ] **Step 1: Rewrite `src/components/AiKeyPrompt.tsx`**

Replace the entire file with:

```tsx
import { useState, useEffect } from 'react';
import { saveByokKey, saveSelectedModel, getSelectedModel, fetchModels, PROVIDERS } from '@/lib/ai';
import type { AiProvider } from '@/lib/ai';

interface Props {
  onKeySet: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  borderRadius: '2px',
  backgroundColor: 'var(--bg-base)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border)',
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.75rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.65rem',
  color: 'var(--text-muted)',
  display: 'block',
  marginBottom: '0.25rem',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
};

export function AiKeyPrompt({ onKeySet }: Props) {
  const [provider, setProvider] = useState<AiProvider>('anthropic');
  const [key, setKey] = useState('');
  const [models, setModels] = useState<{ id: string; name: string }[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [loadingModels, setLoadingModels] = useState(false);
  const [step, setStep] = useState<'key' | 'model'>('key');

  const selected = PROVIDERS.find((p) => p.value === provider)!;

  useEffect(() => {
    setSelectedModel(getSelectedModel(provider));
  }, [provider]);

  async function handleKeySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!key.trim()) return;

    saveByokKey(key.trim(), provider);
    setLoadingModels(true);

    try {
      const fetched = await fetchModels(provider, key.trim());
      setModels(fetched);
      if (fetched.length > 0) {
        const defaultModel = getSelectedModel(provider);
        const exists = fetched.some((m) => m.id === defaultModel);
        setSelectedModel(exists ? defaultModel : fetched[0].id);
        setStep('model');
        setLoadingModels(false);
        return;
      }
    } catch {
      // Fallback: skip model selection
    }

    setLoadingModels(false);
    saveSelectedModel(provider, getSelectedModel(provider));
    onKeySet();
  }

  function handleModelSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveSelectedModel(provider, selectedModel);
    onKeySet();
  }

  const filteredModels = modelFilter
    ? models.filter(
        (m) =>
          m.id.toLowerCase().includes(modelFilter.toLowerCase()) ||
          m.name.toLowerCase().includes(modelFilter.toLowerCase())
      )
    : models;

  if (step === 'model') {
    return (
      <div style={{ padding: '1rem' }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            color: 'var(--text-secondary)',
            marginBottom: '0.75rem',
            lineHeight: 1.6,
          }}
        >
          // select a model for {selected.label}
        </p>
        <form onSubmit={handleModelSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {models.length > 10 && (
            <input
              type="text"
              value={modelFilter}
              onChange={(e) => setModelFilter(e.target.value)}
              placeholder="filter models..."
              style={inputStyle}
            />
          )}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            aria-label="Select model"
            style={{ ...inputStyle, maxHeight: '12rem' }}
            size={Math.min(filteredModels.length, 8)}
          >
            {filteredModels.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name !== m.id ? `${m.name} (${m.id})` : m.id}
              </option>
            ))}
          </select>
          <button
            type="submit"
            style={{
              padding: '0.45rem 1rem',
              backgroundColor: 'var(--accent-ui)',
              color: 'var(--bg-base)',
              border: '1px solid var(--accent-ui)',
              borderRadius: '2px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.04em',
            }}
          >
            start_chat()
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          color: 'var(--text-secondary)',
          marginBottom: '0.75rem',
          lineHeight: 1.6,
        }}
      >
        // enter your API key to enable AI chat.
        <br />
        // stored only in your browser.
      </p>
      <form onSubmit={handleKeySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <div>
          <label style={labelStyle}>provider</label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value as AiProvider)}
            style={inputStyle}
          >
            {PROVIDERS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>
            <a
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-ui)', textDecoration: 'none' }}
            >
              {selected.label} API Key
            </a>
          </label>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder={selected.placeholder}
            aria-label={`${selected.label} API key`}
            style={inputStyle}
          />
        </div>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
          }}
        >
          // never sent to our servers
        </p>
        <button
          type="submit"
          disabled={!key.trim() || loadingModels}
          style={{
            padding: '0.45rem 1rem',
            backgroundColor: key.trim() && !loadingModels ? 'var(--accent-ui)' : 'var(--bg-card)',
            color: key.trim() && !loadingModels ? 'var(--bg-base)' : 'var(--text-muted)',
            border: `1px solid ${key.trim() && !loadingModels ? 'var(--accent-ui)' : 'var(--border)'}`,
            borderRadius: '2px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: key.trim() && !loadingModels ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.15s, color 0.15s',
            letterSpacing: '0.04em',
          }}
        >
          {loadingModels ? '// loading...' : 'save_key()'}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Verify the project builds**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/AiKeyPrompt.tsx
git commit -m "feat: rewrite AiKeyPrompt with 12 providers and model selector"
```

---

### Task 6: Rewrite `AiChat.tsx` — useChat Hook with Streaming

**Files:**
- Rewrite: `src/components/AiChat.tsx`
- Modify: `tests/components/AiChat.test.tsx`

- [ ] **Step 1: Update the tests**

Replace the entire contents of `tests/components/AiChat.test.tsx` with:

```tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AiChat } from '@/components/AiChat';

// Mock the ai SDK's useChat hook
vi.mock('ai/react', () => ({
  useChat: () => ({
    messages: [],
    input: '',
    handleInputChange: vi.fn(),
    handleSubmit: vi.fn(),
    setInput: vi.fn(),
    status: 'idle',
    error: undefined,
  }),
}));

const storage = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
  clear: () => storage.clear(),
  get length() { return storage.size; },
  key: (i: number) => Array.from(storage.keys())[i] ?? null,
};
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true });

beforeEach(() => storage.clear());

describe('AiChat', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <AiChat isOpen={false} knownLang="python" learningLang="rust" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('opens the chat panel when isOpen is true', () => {
    render(<AiChat isOpen={true} knownLang="python" learningLang="rust" />);
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText(/AI Tutor/i)).toBeDefined();
  });

  it('shows key prompt when no AI access is configured', () => {
    render(<AiChat isOpen={true} knownLang="python" learningLang="rust" />);
    // The key prompt shows a provider dropdown — check for that
    expect(screen.getByLabelText(/api key/i)).toBeDefined();
  });

  it('shows chat input when BYOK key is set', () => {
    storage.set('polyglotify:ai:byok-key', 'sk-ant-test');
    storage.set('polyglotify:ai:byok-provider', 'anthropic');
    render(<AiChat isOpen={true} knownLang="python" learningLang="rust" />);
    expect(screen.getByLabelText(/chat message/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /send message/i })).toBeDefined();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run tests/components/AiChat.test.tsx
```

Expected: Tests may fail because the component hasn't been rewritten yet (imports `useChat` from `ai/react` which the mock expects).

- [ ] **Step 3: Rewrite `src/components/AiChat.tsx`**

Replace the entire file with:

```tsx
import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { getAiConfig, hasAiAccess, buildSystemPrompt, getSelectedModel } from '@/lib/ai';
import { AiKeyPrompt } from './AiKeyPrompt';

interface Props {
  isOpen: boolean;
  knownLang: string;
  learningLang: string;
  featureContext?: string;
}

export function AiChat({ isOpen, knownLang, learningLang, featureContext }: Props) {
  const [hasAccess, setHasAccess] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, setInput, status, error } = useChat({
    api: '/api/chat',
  });

  const isLoading = status === 'loading' || status === 'streaming';

  useEffect(() => {
    setHasAccess(hasAiAccess());
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  function handleKeySet() {
    setHasAccess(true);
    if (featureContext) {
      setInput(featureContext);
    }
  }

  function onSubmit(e: React.FormEvent) {
    const config = getAiConfig();
    const model = getSelectedModel(config.provider ?? 'anthropic');
    handleSubmit(e, {
      body: {
        provider: config.provider,
        apiKey: config.apiKey,
        model,
        systemPrompt: buildSystemPrompt(knownLang, learningLang),
      },
    });
  }

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '5rem',
        right: '1rem',
        width: '20rem',
        maxWidth: 'calc(100vw - 2rem)',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--accent-ui)',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '70vh',
        zIndex: 50,
      }}
      role="dialog"
      aria-label="AI chat panel"
    >
      {/* Header */}
      <div
        style={{
          padding: '0.6rem 1rem',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--accent-ui)',
            margin: 0,
          }}
        >
          <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
            AI Tutor
          </span>
          ai_tutor()
        </h2>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            marginTop: '0.15rem',
            marginBottom: 0,
          }}
        >
          // {knownLang} vs {learningLang}
        </p>
      </div>

      {!hasAccess ? (
        <AiKeyPrompt onKeySet={handleKeySet} />
      ) : (
        <>
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              minHeight: 0,
            }}
          >
            {messages.length === 0 && (
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                }}
              >
                // ask a question to get started
              </p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.5rem 0.75rem',
                  maxWidth: '85%',
                  whiteSpace: 'pre-wrap',
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.role === 'user' ? 'var(--accent-ui)' : 'var(--bg-card)',
                  color: msg.role === 'user' ? 'var(--bg-base)' : 'var(--text-secondary)',
                  border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                  borderRadius: '2px',
                  fontFamily: msg.role === 'assistant' ? "'JetBrains Mono', monospace" : 'inherit',
                }}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  alignSelf: 'flex-start',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              >
                // thinking...
              </div>
            )}
            {error && (
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  color: '#f87171',
                }}
              >
                // error: {error.message}
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={onSubmit}
            style={{
              padding: '0.6rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: '0.4rem',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="ask a question..."
              aria-label="Chat message"
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '0.4rem 0.6rem',
                borderRadius: '2px',
                backgroundColor: 'var(--bg-base)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                outline: 'none',
                opacity: isLoading ? 0.5 : 1,
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              style={{
                padding: '0.4rem 0.75rem',
                backgroundColor: 'var(--accent-ui)',
                color: 'var(--bg-base)',
                border: 'none',
                borderRadius: '2px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !input.trim() ? 0.5 : 1,
                transition: 'opacity 0.15s',
              }}
            >
              →
            </button>
          </form>
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run tests/components/AiChat.test.tsx
```

Expected: All 4 tests pass.

- [ ] **Step 5: Run full test suite**

```bash
npm test
```

Expected: All tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/AiChat.tsx tests/components/AiChat.test.tsx
git commit -m "feat: rewrite AiChat with useChat hook for streaming"
```

---

### Task 7: Update BaseLayout — GitHub Icon Nav + Footer Link

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Replace the version badge with a GitHub icon link**

In `src/layouts/BaseLayout.astro`, replace line 32:

```html
<span class="mono-badge">v0.1.0</span>
```

With:

```html
<a
  href="https://github.com/realTeddy/polyglotify"
  target="_blank"
  rel="noopener noreferrer"
  style="color: var(--text-muted); transition: color 0.15s;"
  class="hover:!text-[var(--text-primary)]"
  aria-label="View on GitHub"
>
  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
  </svg>
</a>
```

- [ ] **Step 2: Update the footer text**

In `src/layouts/BaseLayout.astro`, replace lines 39-41:

```html
<p style="font-family: 'JetBrains Mono', monospace; color: var(--text-muted);">
  <span style="color: var(--accent-known);">// </span>open source on GitHub &mdash; built by the community
</p>
```

With:

```html
<p style="font-family: 'JetBrains Mono', monospace; color: var(--text-muted);">
  <span style="color: var(--accent-known);">// </span>open source on <a href="https://github.com/realTeddy/polyglotify" target="_blank" rel="noopener noreferrer" style="color: var(--accent-ui); text-decoration: none;" class="hover:underline">GitHub</a>
</p>
```

- [ ] **Step 3: Verify the project builds**

```bash
npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Run full test suite**

```bash
npm test
```

Expected: All tests pass (no tests directly reference BaseLayout).

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: replace version badge with GitHub icon, update footer link"
```

---

### Task 8: Final Verification

- [ ] **Step 1: Run full test suite**

```bash
npm test
```

Expected: All tests pass.

- [ ] **Step 2: Build the project**

```bash
npm run build
```

Expected: Build succeeds with hybrid output.

- [ ] **Step 3: Start dev server and manually verify**

```bash
npm run dev
```

Manual checks:
1. Visit the homepage — GitHub icon visible in nav (top right), footer says "open source on GitHub" with link
2. Navigate to a lesson page — open AI chat, verify provider dropdown shows 12 providers
3. Select a provider, enter a key, verify model list loads (or falls back)
4. Send a message, verify streaming response appears

- [ ] **Step 4: Commit any remaining fixes if needed**

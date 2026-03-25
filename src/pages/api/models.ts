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

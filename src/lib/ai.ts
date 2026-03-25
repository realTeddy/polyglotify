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

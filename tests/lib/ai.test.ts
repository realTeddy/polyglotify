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

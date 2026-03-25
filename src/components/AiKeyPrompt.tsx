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

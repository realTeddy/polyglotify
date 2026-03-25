import { useState } from 'react';
import type { LanguageInfo } from '@/types';

interface Props {
  languages: LanguageInfo[];
  firstFeatureSlug?: string;
}

export function LanguagePicker({ languages, firstFeatureSlug = 'variables' }: Props) {
  const [known, setKnown] = useState('');
  const [learning, setLearning] = useState('');

  const canStart = known !== '' && learning !== '' && known !== learning;

  function handleStart() {
    if (!canStart) return;
    window.location.href = `/learn/${known}/${learning}/${firstFeatureSlug}`;
  }

  const selectBase: React.CSSProperties = {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.85rem',
    borderRadius: '4px',
    outline: 'none',
    width: '100%',
    padding: '0.75rem 1rem',
    appearance: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', maxWidth: '22rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label
          htmlFor="known-lang"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--accent-known)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          // i know
        </label>
        <select
          id="known-lang"
          value={known}
          onChange={(e) => {
            setKnown(e.target.value);
            if (e.target.value === learning) setLearning('');
          }}
          style={{ ...selectBase, borderLeftColor: known ? 'var(--accent-known)' : 'var(--border)', borderLeftWidth: '3px' }}
        >
          <option value="">select a language...</option>
          {languages.map((lang) => (
            <option key={lang.slug} value={lang.slug}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label
          htmlFor="learning-lang"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'var(--accent-learning)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          // i want to learn
        </label>
        <select
          id="learning-lang"
          value={learning}
          onChange={(e) => setLearning(e.target.value)}
          style={{ ...selectBase, borderLeftColor: learning ? 'var(--accent-learning)' : 'var(--border)', borderLeftWidth: '3px' }}
        >
          <option value="">select a language...</option>
          {languages.map((lang) => (
            <option key={lang.slug} value={lang.slug} disabled={lang.slug === known}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleStart}
        disabled={!canStart}
        aria-label="Start Learning"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.85rem',
          fontWeight: 600,
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          border: canStart ? '1px solid var(--accent-ui)' : '1px solid var(--border)',
          backgroundColor: canStart ? 'var(--accent-ui)' : 'var(--bg-card)',
          color: canStart ? 'var(--bg-base)' : 'var(--text-muted)',
          cursor: canStart ? 'pointer' : 'not-allowed',
          transition: 'opacity 0.15s',
          letterSpacing: '0.05em',
        }}
      >
        start_learning()
      </button>
    </div>
  );
}

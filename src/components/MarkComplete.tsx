import { useState, useEffect } from 'react';
import { isFeatureComplete, markFeatureComplete } from '@/lib/progress';

interface Props {
  knownLang: string;
  learningLang: string;
  featureSlug: string;
}

export function MarkComplete({ knownLang, learningLang, featureSlug }: Props) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(isFeatureComplete(knownLang, learningLang, featureSlug));
  }, [knownLang, learningLang, featureSlug]);

  function handleClick() {
    markFeatureComplete(knownLang, learningLang, featureSlug);
    setCompleted(true);
  }

  if (completed) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--accent-known)',
          padding: '0.4rem 0.75rem',
          border: '1px solid var(--accent-known)',
          borderRadius: '2px',
          letterSpacing: '0.06em',
          backgroundColor: 'transparent',
        }}
      >
        <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        completed
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Mark as complete"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        padding: '0.4rem 0.75rem',
        border: '1px solid var(--border)',
        borderRadius: '2px',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        letterSpacing: '0.06em',
        transition: 'color 0.15s, border-color 0.15s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = 'var(--accent-known)';
        el.style.borderColor = 'var(--accent-known)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = 'var(--text-muted)';
        el.style.borderColor = 'var(--border)';
      }}
    >
      <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      mark_complete()
    </button>
  );
}

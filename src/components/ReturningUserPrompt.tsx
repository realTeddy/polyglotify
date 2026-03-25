import { useState, useEffect } from 'react';
import { getAllProgressKeys, getProgress } from '@/lib/progress';

interface LanguageNames {
  [slug: string]: string;
}

interface Props {
  languageNames: LanguageNames;
}

export function ReturningUserPrompt({ languageNames }: Props) {
  const [sessions, setSessions] = useState<{ known: string; learning: string; lastFeature: string | null }[]>([]);

  useEffect(() => {
    const keys = getAllProgressKeys();
    const results = keys
      .map(({ known, learning }) => {
        const progress = getProgress(known, learning);
        return { known, learning, lastFeature: progress?.lastFeature ?? null };
      })
      .filter(({ lastFeature }) => lastFeature !== null);
    setSessions(results);
  }, []);

  if (sessions.length === 0) return null;

  return (
    <div
      style={{
        marginBottom: '3rem',
        padding: '1.25rem',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--accent-ui)',
        borderRadius: '4px',
        maxWidth: '22rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <h2
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          fontWeight: 600,
          color: 'var(--accent-ui)',
          marginBottom: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        // welcome back
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {sessions.map(({ known, learning }) => (
          <a
            key={`${known}-${learning}`}
            href={`/learn/${known}/${learning}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              padding: '0.5rem 0.75rem',
              textDecoration: 'none',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-hover)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-surface)'; }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8rem',
                color: 'var(--text-primary)',
              }}
            >
              <span style={{ color: 'var(--accent-known)' }}>{languageNames[known] ?? known}</span>
              <span style={{ color: 'var(--text-muted)' }}> → </span>
              <span style={{ color: 'var(--accent-learning)' }}>{languageNames[learning] ?? learning}</span>
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                color: 'var(--accent-ui)',
                letterSpacing: '0.06em',
              }}
            >
              continue →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

import type { FeatureDefinition } from '@/types';

interface Props {
  knownLang: string;
  learningLang: string;
  prev: FeatureDefinition | null;
  next: FeatureDefinition | null;
}

export function FeatureNav({ knownLang, learningLang, prev, next }: Props) {
  const buildUrl = (slug: string) => `/learn/${knownLang}/${learningLang}/${slug}`;

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 0',
        borderTop: '1px solid var(--border)',
        marginTop: '2rem',
      }}
    >
      {prev ? (
        <a
          href={buildUrl(prev.slug)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textDecoration: 'none',
            color: 'var(--text-muted)',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.2rem',
            }}
          >
            ← prev
          </span>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{prev.title}</span>
        </a>
      ) : (
        <div />
      )}
      {next ? (
        <a
          href={buildUrl(next.slug)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            textDecoration: 'none',
            color: 'var(--text-muted)',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.2rem',
            }}
          >
            next →
          </span>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{next.title}</span>
        </a>
      ) : (
        <div />
      )}
    </nav>
  );
}

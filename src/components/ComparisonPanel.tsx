import type { FeatureContent } from '@/types';

interface Props {
  content: FeatureContent;
  languageName: string;
  variant: 'known' | 'learning';
  onAskAboutThis?: () => void;
}

export function ComparisonPanel({ content, languageName, variant, onAskAboutThis }: Props) {
  const accentColor = variant === 'known' ? 'var(--accent-known)' : 'var(--accent-learning)';

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '0.6rem 1rem',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--bg-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.8rem',
              fontWeight: 600,
              color: accentColor,
              letterSpacing: '0.03em',
            }}
          >
            {languageName}
          </span>
          <span
            className="mono-badge"
            style={{ color: accentColor, borderColor: accentColor, opacity: 0.6 }}
          >
            {variant}
          </span>
        </div>
        {onAskAboutThis && (
          <button
            onClick={onAskAboutThis}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              padding: '0.2rem 0.6rem',
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
          >
            ask about this
          </button>
        )}
      </div>
      <div style={{ padding: '1.25rem' }}>
        {!content.frontmatter.applicable ? (
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.8rem',
              color: accentColor,
              opacity: 0.7,
              marginBottom: '1rem',
              fontStyle: 'italic',
            }}
          >
            {`// This concept doesn't directly exist in ${languageName}.`}
          </div>
        ) : null}
        <div
          className="prose prose-invert prose-sm max-w-none
            prose-pre:bg-[var(--bg-base)] prose-pre:border prose-pre:border-[var(--border)]
            prose-code:text-[var(--accent-known)] prose-headings:text-[var(--text-primary)]
            prose-p:text-[var(--text-secondary)] prose-li:text-[var(--text-secondary)]"
          dangerouslySetInnerHTML={{ __html: content.body }}
        />
      </div>
    </div>
  );
}

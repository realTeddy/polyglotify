interface Props {
  category: string;
  categoryTitle: string;
  featureTitle: string;
  knownLang: string;
  learningLang: string;
}

export function Breadcrumb({ categoryTitle, featureTitle, knownLang, learningLang }: Props) {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        marginBottom: '1.5rem',
      }}
    >
      <a
        href={`/learn/${knownLang}/${learningLang}`}
        style={{ color: 'var(--accent-ui)', textDecoration: 'none', transition: 'opacity 0.15s' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.75'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
      >
        ~/all-topics
      </a>
      <span style={{ color: 'var(--border)' }}>/</span>
      <span style={{ color: 'var(--text-secondary)' }}>{categoryTitle}</span>
      <span style={{ color: 'var(--border)' }}>/</span>
      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{featureTitle}</span>
    </nav>
  );
}

interface Props {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: Props) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          {completed} of {total} features
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'var(--accent-known)',
          }}
        >
          {percentage}%
        </span>
      </div>
      <div
        style={{
          width: '100%',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          height: '4px',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--accent-known)',
            height: '100%',
            width: `${percentage}%`,
            borderRadius: '2px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { ProgressBar } from './ProgressBar';
import { getProgress, getNextIncompleteFeature } from '@/lib/progress';
import type { CategoryDefinition } from '@/types';

interface Props {
  categories: CategoryDefinition[];
  knownLang: string;
  learningLang: string;
}

type Filter = 'all' | 'completed' | 'remaining';

export function Dashboard({ categories, knownLang, learningLang }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const [completedSet, setCompletedSet] = useState<Set<string>>(new Set());
  const [nextFeature, setNextFeature] = useState<string | null>(null);

  useEffect(() => {
    const progress = getProgress(knownLang, learningLang);
    setCompletedSet(new Set(progress?.completed ?? []));
    const allSlugs = categories.flatMap((c) => c.features).map((f) => f.slug);
    setNextFeature(getNextIncompleteFeature(knownLang, learningLang, allSlugs));
  }, [knownLang, learningLang, categories]);

  const allFeatures = categories.flatMap((c) => c.features);
  const completedCount = completedSet.size;
  const totalCount = allFeatures.length;

  function isVisible(slug: string): boolean {
    if (filter === 'all') return true;
    if (filter === 'completed') return completedSet.has(slug);
    return !completedSet.has(slug);
  }

  return (
    <div>
      <ProgressBar completed={completedCount} total={totalCount} />

      {nextFeature && (
        <a
          href={`/learn/${knownLang}/${learningLang}/${nextFeature}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--accent-ui)',
            color: 'var(--bg-base)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.8rem',
            fontWeight: 600,
            padding: '0.5rem 1.25rem',
            borderRadius: '4px',
            textDecoration: 'none',
            marginBottom: '2rem',
            letterSpacing: '0.04em',
            transition: 'opacity 0.15s',
          }}
        >
          resume →
        </a>
      )}

      {/* Filter buttons */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem' }}>
        {(['all', 'completed', 'remaining'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '2px',
              border: `1px solid ${filter === f ? 'var(--accent-ui)' : 'var(--border)'}`,
              backgroundColor: filter === f ? 'var(--accent-ui)' : 'transparent',
              color: filter === f ? 'var(--bg-base)' : 'var(--text-muted)',
              cursor: 'pointer',
              letterSpacing: '0.06em',
              textTransform: 'lowercase',
              transition: 'background-color 0.15s, color 0.15s',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Category list with line numbers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {categories.map((category) => {
          const visibleFeatures = category.features.filter((f) => isVisible(f.slug));
          if (visibleFeatures.length === 0) return null;

          return (
            <div key={category.slug}>
              {/* Category header in comment style */}
              <h2
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--accent-purple)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '0.75rem',
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>// </span>
                {category.title}
              </h2>

              {/* Feature rows with line-number styling */}
              <div className="line-numbered" style={{ display: 'grid', gap: '0.3rem' }}>
                {visibleFeatures.map((feature) => (
                  <a
                    key={feature.slug}
                    href={`/learn/${knownLang}/${learningLang}/${feature.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderLeft: completedSet.has(feature.slug)
                        ? '3px solid var(--accent-known)'
                        : '3px solid var(--border)',
                      padding: '0.6rem 1rem',
                      textDecoration: 'none',
                      transition: 'background-color 0.15s, border-left-color 0.15s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-hover)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-card)';
                    }}
                  >
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                      {feature.title}
                    </span>
                    {completedSet.has(feature.slug) && (
                      <svg
                        style={{ width: '1rem', height: '1rem', color: 'var(--accent-known)', flexShrink: 0 }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { ComparisonPanel } from './ComparisonPanel';
import type { FeatureContent } from '@/types';

interface Props {
  known: FeatureContent;
  learning: FeatureContent;
  knownName: string;
  learningName: string;
  onAskAboutKnown?: () => void;
  onAskAboutLearning?: () => void;
}

export function ComparisonView({
  known,
  learning,
  knownName,
  learningName,
  onAskAboutKnown,
  onAskAboutLearning,
}: Props) {
  const [activeTab, setActiveTab] = useState<'known' | 'learning'>('known');

  return (
    <div>
      {/* Tab navigation (visible on mobile, hidden on desktop) */}
      <div
        className="flex md:hidden mb-4 p-1"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '4px' }}
        role="tablist"
      >
        <button
          role="tab"
          aria-selected={activeTab === 'known'}
          aria-label={`${knownName} (you know)`}
          onClick={() => setActiveTab('known')}
          style={{
            flex: 1,
            padding: '0.4rem 1rem',
            borderRadius: '3px',
            fontSize: '0.8rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            transition: 'background-color 0.15s, color 0.15s',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeTab === 'known' ? 'var(--accent-known)' : 'transparent',
            color: activeTab === 'known' ? 'var(--bg-base)' : 'var(--text-muted)',
          }}
        >
          {knownName}
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'learning'}
          aria-label={`${learningName} (learning)`}
          onClick={() => setActiveTab('learning')}
          style={{
            flex: 1,
            padding: '0.4rem 1rem',
            borderRadius: '3px',
            fontSize: '0.8rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            transition: 'background-color 0.15s, color 0.15s',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: activeTab === 'learning' ? 'var(--accent-learning)' : 'transparent',
            color: activeTab === 'learning' ? 'var(--bg-base)' : 'var(--text-muted)',
          }}
        >
          {learningName}
        </button>
      </div>

      {/* Panels: single column on mobile (tab-controlled), side-by-side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={activeTab === 'known' ? 'block md:block' : 'hidden md:block'}>
          <ComparisonPanel
            content={known}
            languageName={knownName}
            variant="known"
            onAskAboutThis={onAskAboutKnown}
          />
        </div>
        <div className={activeTab === 'learning' ? 'block md:block' : 'hidden md:block'}>
          <ComparisonPanel
            content={learning}
            languageName={learningName}
            variant="learning"
            onAskAboutThis={onAskAboutLearning}
          />
        </div>
      </div>
    </div>
  );
}

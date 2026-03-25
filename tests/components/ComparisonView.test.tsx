import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComparisonView } from '@/components/ComparisonView';
import type { FeatureContent } from '@/types';

const knownContent: FeatureContent = {
  frontmatter: {
    title: 'Variables',
    language: 'python',
    feature: 'variables',
    category: 'basics',
    applicable: true,
  },
  body: '<h2>Example</h2><pre><code>name = "hello"</code></pre><h2>Gotchas</h2><ul><li>Can change type</li></ul>',
};

const learningContent: FeatureContent = {
  frontmatter: {
    title: 'Variables',
    language: 'rust',
    feature: 'variables',
    category: 'basics',
    applicable: true,
  },
  body: '<h2>Example</h2><pre><code>let name = "hello";</code></pre>',
};

describe('ComparisonView', () => {
  it('renders both language panels', () => {
    render(
      <ComparisonView
        known={knownContent}
        learning={learningContent}
        knownName="Python"
        learningName="Rust"
      />
    );
    expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Rust').length).toBeGreaterThan(0);
  });

  it('shows language names as panel headers', () => {
    render(
      <ComparisonView
        known={knownContent}
        learning={learningContent}
        knownName="Python"
        learningName="Rust"
      />
    );
    expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Rust').length).toBeGreaterThan(0);
  });

  it('renders tab buttons for mobile view', () => {
    render(
      <ComparisonView
        known={knownContent}
        learning={learningContent}
        knownName="Python"
        learningName="Rust"
      />
    );
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
  });

  it('switches tabs on click', () => {
    render(
      <ComparisonView
        known={knownContent}
        learning={learningContent}
        knownName="Python"
        learningName="Rust"
      />
    );
    const tabs = screen.getAllByRole('tab');
    fireEvent.click(tabs[1]);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
  });
});

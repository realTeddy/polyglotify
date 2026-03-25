import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeatureNav } from '@/components/FeatureNav';

describe('FeatureNav', () => {
  it('renders previous and next links', () => {
    render(
      <FeatureNav
        knownLang="python"
        learningLang="rust"
        prev={{ slug: 'variables', title: 'Variables', category: 'basics', order: 1 }}
        next={{ slug: 'operators', title: 'Operators', category: 'basics', order: 3 }}
      />
    );
    expect(screen.getByText(/variables/i)).toBeDefined();
    expect(screen.getByText(/operators/i)).toBeDefined();
  });

  it('hides previous when null', () => {
    render(
      <FeatureNav
        knownLang="python"
        learningLang="rust"
        prev={null}
        next={{ slug: 'types', title: 'Types', category: 'basics', order: 2 }}
      />
    );
    expect(screen.queryByText(/previous/i)).toBeNull();
    expect(screen.getByText(/types/i)).toBeDefined();
  });

  it('hides next when null', () => {
    render(
      <FeatureNav
        knownLang="python"
        learningLang="rust"
        prev={{ slug: 'variables', title: 'Variables', category: 'basics', order: 1 }}
        next={null}
      />
    );
    expect(screen.getByText(/variables/i)).toBeDefined();
    expect(screen.queryByText(/next/i)).toBeNull();
  });

  it('links to correct URLs', () => {
    render(
      <FeatureNav
        knownLang="python"
        learningLang="rust"
        prev={{ slug: 'variables', title: 'Variables', category: 'basics', order: 1 }}
        next={{ slug: 'operators', title: 'Operators', category: 'basics', order: 3 }}
      />
    );
    const links = screen.getAllByRole('link');
    expect(links[0].getAttribute('href')).toBe('/learn/python/rust/variables');
    expect(links[1].getAttribute('href')).toBe('/learn/python/rust/operators');
  });
});

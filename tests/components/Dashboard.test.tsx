import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dashboard } from '@/components/Dashboard';
import type { CategoryDefinition } from '@/types';

const storage = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear(),
    get length() { return storage.size; },
    key: (i: number) => Array.from(storage.keys())[i] ?? null,
  },
});

beforeEach(() => storage.clear());

const mockCategories: CategoryDefinition[] = [
  {
    slug: 'basics',
    title: 'Basics',
    order: 1,
    features: [
      { slug: 'variables', title: 'Variables', category: 'basics', order: 1 },
      { slug: 'types', title: 'Types', category: 'basics', order: 2 },
    ],
  },
  {
    slug: 'functions',
    title: 'Functions',
    order: 2,
    features: [
      { slug: 'declaration', title: 'Declaration', category: 'functions', order: 1 },
    ],
  },
];

describe('Dashboard', () => {
  it('renders all categories', () => {
    render(<Dashboard categories={mockCategories} knownLang="python" learningLang="rust" />);
    expect(screen.getByText('Basics')).toBeDefined();
    expect(screen.getByText('Functions')).toBeDefined();
  });

  it('renders all features', () => {
    render(<Dashboard categories={mockCategories} knownLang="python" learningLang="rust" />);
    expect(screen.getByText('Variables')).toBeDefined();
    expect(screen.getByText('Types')).toBeDefined();
    expect(screen.getByText('Declaration')).toBeDefined();
  });

  it('shows progress count', () => {
    render(<Dashboard categories={mockCategories} knownLang="python" learningLang="rust" />);
    expect(screen.getByText(/0.*of.*3/i)).toBeDefined();
  });

  it('links features to correct URLs', () => {
    render(<Dashboard categories={mockCategories} knownLang="python" learningLang="rust" />);
    const varLink = screen.getByText('Variables').closest('a');
    expect(varLink?.getAttribute('href')).toBe('/learn/python/rust/variables');
  });

  it('filters to show only remaining features', () => {
    storage.set('polyglotify:progress:python:rust', JSON.stringify({
      knownLang: 'python', learningLang: 'rust', completed: ['variables'], lastFeature: 'variables',
    }));
    render(<Dashboard categories={mockCategories} knownLang="python" learningLang="rust" />);
    fireEvent.click(screen.getByText(/remaining/i));
    expect(screen.queryByText('Variables')).toBeNull();
    expect(screen.getByText('Types')).toBeDefined();
  });
});

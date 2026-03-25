import { describe, it, expect } from 'vitest';
import { loadFeatureContent, loadComparisonPair } from '@/lib/content';

describe('loadFeatureContent', () => {
  it('loads and parses a markdown file for a language feature', async () => {
    const content = await loadFeatureContent('python', 'basics', 'variables');
    expect(content.frontmatter.title).toBe('Variables & Declaration');
    expect(content.frontmatter.language).toBe('python');
    expect(content.frontmatter.applicable).toBe(true);
    expect(content.body).toContain('dynamically typed');
    expect(content.body).toContain('<p>'); // body is rendered HTML, not raw markdown
  });
});

describe('loadComparisonPair', () => {
  it('loads both languages for a feature', async () => {
    const pair = await loadComparisonPair('python', 'javascript', 'basics', 'variables');
    expect(pair.known.frontmatter.language).toBe('python');
    expect(pair.learning.frontmatter.language).toBe('javascript');
    expect(pair.feature.slug).toBe('variables');
  });
});

import { describe, it, expect } from 'vitest';
import { getAvailableLanguages } from '@/lib/languages';

describe('getAvailableLanguages', () => {
  it('discovers languages from content directory', async () => {
    const langs = await getAvailableLanguages();
    expect(langs.length).toBeGreaterThanOrEqual(2);
    const slugs = langs.map((l) => l.slug);
    expect(slugs).toContain('python');
    expect(slugs).toContain('javascript');
  });

  it('returns language name derived from slug', async () => {
    const langs = await getAvailableLanguages();
    const python = langs.find((l) => l.slug === 'python');
    expect(python?.name).toBe('Python');
  });
});

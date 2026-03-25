import { describe, it, expect } from 'vitest';
import { validateContent } from '../../scripts/validate-content';

describe('validateContent', () => {
  it('returns no frontmatter or consistency errors for authored content', async () => {
    const errors = await validateContent();
    const nonMissingErrors = errors.filter((e) => !e.endsWith('file missing'));
    expect(nonMissingErrors).toEqual([]);
  });

  it('validates all content files pass with no errors', async () => {
    const errors = await validateContent();
    expect(errors).toEqual([]);
  });
});

import { describe, it, expect } from 'vitest';
import { loadFeatures, getFlatFeatureList, getFeatureBySlug, getAdjacentFeatures } from '@/lib/features';

describe('loadFeatures', () => {
  it('loads and parses features.yaml', async () => {
    const config = await loadFeatures();
    expect(config.categories).toBeDefined();
    expect(config.categories.length).toBeGreaterThan(0);
    expect(config.categories[0].slug).toBe('basics');
  });
});

describe('getFlatFeatureList', () => {
  it('returns features in order across categories', async () => {
    const config = await loadFeatures();
    const flat = getFlatFeatureList(config);
    expect(flat.length).toBeGreaterThan(0);
    expect(flat[0].slug).toBe('variables');
    expect(flat[0].category).toBe('basics');
  });
});

describe('getFeatureBySlug', () => {
  it('finds a feature by slug', async () => {
    const config = await loadFeatures();
    const feature = getFeatureBySlug(config, 'variables');
    expect(feature).toBeDefined();
    expect(feature!.title).toBe('Variables & Declaration');
  });

  it('returns undefined for unknown slug', async () => {
    const config = await loadFeatures();
    const feature = getFeatureBySlug(config, 'nonexistent');
    expect(feature).toBeUndefined();
  });
});

describe('getAdjacentFeatures', () => {
  it('returns previous and next features', async () => {
    const config = await loadFeatures();
    const { prev, next } = getAdjacentFeatures(config, 'types');
    expect(prev?.slug).toBe('variables');
    expect(next?.slug).toBe('operators');
  });

  it('returns null prev for first feature', async () => {
    const config = await loadFeatures();
    const { prev, next } = getAdjacentFeatures(config, 'variables');
    expect(prev).toBeNull();
    expect(next?.slug).toBe('types');
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import {
  getProgress,
  saveProgress,
  markFeatureComplete,
  isFeatureComplete,
  getCompletedCount,
  getNextIncompleteFeature,
  clearProgress,
} from '@/lib/progress';
import type { ProgressState } from '@/types';

// Mock localStorage
const storage = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
  clear: () => storage.clear(),
};
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

beforeEach(() => storage.clear());

describe('getProgress', () => {
  it('returns null when no progress exists', () => {
    const progress = getProgress('python', 'rust');
    expect(progress).toBeNull();
  });

  it('returns saved progress', () => {
    const state: ProgressState = {
      knownLang: 'python',
      learningLang: 'rust',
      completed: ['variables'],
      lastFeature: 'variables',
    };
    saveProgress(state);
    const result = getProgress('python', 'rust');
    expect(result).toEqual(state);
  });
});

describe('markFeatureComplete', () => {
  it('adds a feature to completed list', () => {
    markFeatureComplete('python', 'rust', 'variables');
    const progress = getProgress('python', 'rust');
    expect(progress?.completed).toContain('variables');
    expect(progress?.lastFeature).toBe('variables');
  });

  it('does not duplicate completed features', () => {
    markFeatureComplete('python', 'rust', 'variables');
    markFeatureComplete('python', 'rust', 'variables');
    const progress = getProgress('python', 'rust');
    expect(progress?.completed.filter((f) => f === 'variables')).toHaveLength(1);
  });
});

describe('isFeatureComplete', () => {
  it('returns false for incomplete feature', () => {
    expect(isFeatureComplete('python', 'rust', 'variables')).toBe(false);
  });

  it('returns true for completed feature', () => {
    markFeatureComplete('python', 'rust', 'variables');
    expect(isFeatureComplete('python', 'rust', 'variables')).toBe(true);
  });
});

describe('getCompletedCount', () => {
  it('returns 0 with no progress', () => {
    expect(getCompletedCount('python', 'rust')).toBe(0);
  });

  it('counts completed features', () => {
    markFeatureComplete('python', 'rust', 'variables');
    markFeatureComplete('python', 'rust', 'types');
    expect(getCompletedCount('python', 'rust')).toBe(2);
  });
});

describe('getNextIncompleteFeature', () => {
  it('returns first feature when nothing completed', () => {
    const allFeatures = ['variables', 'types', 'operators'];
    const next = getNextIncompleteFeature('python', 'rust', allFeatures);
    expect(next).toBe('variables');
  });

  it('returns next incomplete feature', () => {
    markFeatureComplete('python', 'rust', 'variables');
    const allFeatures = ['variables', 'types', 'operators'];
    const next = getNextIncompleteFeature('python', 'rust', allFeatures);
    expect(next).toBe('types');
  });

  it('returns null when all complete', () => {
    markFeatureComplete('python', 'rust', 'variables');
    markFeatureComplete('python', 'rust', 'types');
    const allFeatures = ['variables', 'types'];
    const next = getNextIncompleteFeature('python', 'rust', allFeatures);
    expect(next).toBeNull();
  });
});

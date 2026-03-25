import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import type { FeaturesConfig, FeatureDefinition } from '@/types';

const FEATURES_PATH = path.resolve('content/features.yaml');

export async function loadFeatures(): Promise<FeaturesConfig> {
  const raw = await fs.readFile(FEATURES_PATH, 'utf-8');
  const parsed = yaml.load(raw) as FeaturesConfig;
  parsed.categories.sort((a, b) => a.order - b.order);
  for (const cat of parsed.categories) {
    cat.features.sort((a, b) => a.order - b.order);
    for (const f of cat.features) {
      f.category = cat.slug;
    }
  }
  return parsed;
}

export function getFlatFeatureList(config: FeaturesConfig): FeatureDefinition[] {
  return config.categories.flatMap((cat) => cat.features);
}

export function getFeatureBySlug(
  config: FeaturesConfig,
  slug: string
): FeatureDefinition | undefined {
  return getFlatFeatureList(config).find((f) => f.slug === slug);
}

export function getAdjacentFeatures(
  config: FeaturesConfig,
  slug: string
): { prev: FeatureDefinition | null; next: FeatureDefinition | null } {
  const flat = getFlatFeatureList(config);
  const index = flat.findIndex((f) => f.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

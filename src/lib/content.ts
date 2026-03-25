import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { loadFeatures, getFeatureBySlug } from '@/lib/features';
import type { FeatureContent, ComparisonPair, FeatureFrontmatter } from '@/types';

const LANGUAGES_DIR = path.resolve('content/languages');

export async function loadFeatureContent(
  language: string,
  category: string,
  featureSlug: string
): Promise<FeatureContent> {
  const filePath = path.join(LANGUAGES_DIR, language, category, `${featureSlug}.md`);
  const raw = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const html = await marked(content.trim());
  return {
    frontmatter: data as FeatureFrontmatter,
    body: html,
  };
}

export async function loadComparisonPair(
  knownLang: string,
  learningLang: string,
  category: string,
  featureSlug: string
): Promise<ComparisonPair> {
  const config = await loadFeatures();
  const feature = getFeatureBySlug(config, featureSlug);
  if (!feature) throw new Error(`Unknown feature: ${featureSlug}`);

  const [known, learning] = await Promise.all([
    loadFeatureContent(knownLang, category, featureSlug),
    loadFeatureContent(learningLang, category, featureSlug),
  ]);

  return { feature, known, learning };
}

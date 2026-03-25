import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import type { FeaturesConfig } from '../src/types';

const CONTENT_DIR = path.resolve('content');
const FEATURES_PATH = path.join(CONTENT_DIR, 'features.yaml');
const LANGUAGES_DIR = path.join(CONTENT_DIR, 'languages');

const REQUIRED_FRONTMATTER = ['title', 'language', 'feature', 'category', 'applicable'];

export async function validateContent(): Promise<string[]> {
  const errors: string[] = [];

  let config: FeaturesConfig;
  try {
    const raw = await fs.readFile(FEATURES_PATH, 'utf-8');
    config = yaml.load(raw) as FeaturesConfig;
  } catch (e) {
    return [`Cannot read features.yaml: ${e}`];
  }

  const langEntries = await fs.readdir(LANGUAGES_DIR, { withFileTypes: true });
  const languages = langEntries.filter((e) => e.isDirectory()).map((e) => e.name);

  if (languages.length === 0) {
    return ['No languages found in content/languages/'];
  }

  for (const lang of languages) {
    for (const category of config.categories) {
      for (const feature of category.features) {
        const filePath = path.join(LANGUAGES_DIR, lang, category.slug, `${feature.slug}.md`);
        try {
          const raw = await fs.readFile(filePath, 'utf-8');
          const { data } = matter(raw);

          for (const field of REQUIRED_FRONTMATTER) {
            if (data[field] === undefined) {
              errors.push(`${lang}/${category.slug}/${feature.slug}.md: missing frontmatter field "${field}"`);
            }
          }

          if (data.language && data.language !== lang) {
            errors.push(`${lang}/${category.slug}/${feature.slug}.md: language "${data.language}" doesn't match directory "${lang}"`);
          }
          if (data.feature && data.feature !== feature.slug) {
            errors.push(`${lang}/${category.slug}/${feature.slug}.md: feature "${data.feature}" doesn't match expected "${feature.slug}"`);
          }
          if (data.category && data.category !== category.slug) {
            errors.push(`${lang}/${category.slug}/${feature.slug}.md: category "${data.category}" doesn't match expected "${category.slug}"`);
          }
          if (data.applicable !== undefined && typeof data.applicable !== 'boolean') {
            errors.push(`${lang}/${category.slug}/${feature.slug}.md: "applicable" must be boolean`);
          }
        } catch {
          errors.push(`${lang}/${category.slug}/${feature.slug}.md: file missing`);
        }
      }
    }
  }

  return errors;
}

const isMainModule = process.argv[1]?.endsWith('validate-content.ts');
if (isMainModule) {
  validateContent().then((errors) => {
    if (errors.length === 0) {
      console.log('Content validation passed!');
      process.exit(0);
    } else {
      console.error('Content validation failed:');
      errors.forEach((e) => console.error(`  - ${e}`));
      process.exit(1);
    }
  });
}

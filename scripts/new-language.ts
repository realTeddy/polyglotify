import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import type { FeaturesConfig } from '../src/types';

const CONTENT_DIR = path.resolve('content');
const FEATURES_PATH = path.join(CONTENT_DIR, 'features.yaml');
const LANGUAGES_DIR = path.join(CONTENT_DIR, 'languages');

async function main() {
  const langSlug = process.argv[2];
  if (!langSlug) {
    console.error('Usage: npm run new-language <language-slug>');
    console.error('Example: npm run new-language rust');
    process.exit(1);
  }

  const langDir = path.join(LANGUAGES_DIR, langSlug);
  try {
    await fs.access(langDir);
    console.error(`Language "${langSlug}" already exists at ${langDir}`);
    process.exit(1);
  } catch {
    // Directory doesn't exist, good
  }

  const raw = await fs.readFile(FEATURES_PATH, 'utf-8');
  const config = yaml.load(raw) as FeaturesConfig;

  let fileCount = 0;
  for (const category of config.categories) {
    const categoryDir = path.join(langDir, category.slug);
    await fs.mkdir(categoryDir, { recursive: true });

    for (const feature of category.features) {
      const filePath = path.join(categoryDir, `${feature.slug}.md`);
      const content = `---\ntitle: "${feature.title}"\nlanguage: "${langSlug}"\nfeature: "${feature.slug}"\ncategory: "${category.slug}"\napplicable: true\n---\n\nTODO: Add description for ${feature.title} in ${langSlug}.\n\n## Example\n\n\`\`\`${langSlug}\n// TODO: Add code example\n\`\`\`\n`;
      await fs.writeFile(filePath, content);
      fileCount++;
    }
  }

  console.log(`Scaffolded ${fileCount} files for "${langSlug}" at ${langDir}`);
  console.log('Edit each file to add descriptions, examples, and gotchas.');
}

main();

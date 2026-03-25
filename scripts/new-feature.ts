import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import type { FeaturesConfig } from '../src/types';

const CONTENT_DIR = path.resolve('content');
const FEATURES_PATH = path.join(CONTENT_DIR, 'features.yaml');
const LANGUAGES_DIR = path.join(CONTENT_DIR, 'languages');

async function main() {
  const featurePath = process.argv[2];
  const featureTitle = process.argv[3];

  if (!featurePath || !featureTitle) {
    console.error('Usage: npm run new-feature <category/slug> "<Title>"');
    console.error('Example: npm run new-feature basics/pattern-matching "Pattern Matching"');
    process.exit(1);
  }

  const [category, slug] = featurePath.split('/');
  if (!category || !slug) {
    console.error('Feature path must be in format: category/slug');
    process.exit(1);
  }

  const langEntries = await fs.readdir(LANGUAGES_DIR, { withFileTypes: true });
  const languages = langEntries.filter((e) => e.isDirectory()).map((e) => e.name);

  let fileCount = 0;
  for (const lang of languages) {
    const categoryDir = path.join(LANGUAGES_DIR, lang, category);
    await fs.mkdir(categoryDir, { recursive: true });

    const filePath = path.join(categoryDir, `${slug}.md`);
    const content = `---\ntitle: "${featureTitle}"\nlanguage: "${lang}"\nfeature: "${slug}"\ncategory: "${category}"\napplicable: true\n---\n\nTODO: Add description for ${featureTitle} in ${lang}.\n\n## Example\n\n\`\`\`${lang}\n// TODO: Add code example\n\`\`\`\n`;
    await fs.writeFile(filePath, content);
    fileCount++;
  }

  console.log(`Scaffolded ${fileCount} files for "${featureTitle}" across ${languages.length} languages.`);
  console.log(`Don't forget to add the feature to features.yaml under the "${category}" category.`);
}

main();

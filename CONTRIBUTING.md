# Contributing to Polyglotify

Thank you for helping build Polyglotify! This guide covers how to add content and contribute code.

## Adding a New Language

1. Fork the repo and clone it
2. Run the scaffolding script:
   ```bash
   npm run new-language <language-slug>
   ```
   This creates a markdown file for every feature.
3. Edit each file in `content/languages/<your-language>/` to add:
   - A description of the concept in your language
   - Code examples (runnable or near-runnable)
   - Optional gotchas section
4. If a feature doesn't exist in your language, set `applicable: false` in the frontmatter and explain the alternative in the body.
5. Run validation: `npm run validate-content`
6. Submit a PR

## Adding a New Feature

1. Add the feature to `content/features.yaml` under the appropriate category
2. Run the scaffolding script:
   ```bash
   npm run new-feature <category/slug> "<Feature Title>"
   ```
3. Fill in the content for every existing language
4. Run validation: `npm run validate-content`
5. Submit a PR

## Markdown File Format

Every content file follows this structure:

```markdown
---
title: "Feature Name"
language: "language-slug"
feature: "feature-slug"
category: "category-slug"
applicable: true
---

Description of the concept in this language.

## Example

\```language
// Code example here
\```

## Gotchas

- Optional list of common pitfalls
```

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Feature name as it applies to this language |
| language | string | Yes | Must match the directory name |
| feature | string | Yes | Must match the filename (without .md) |
| category | string | Yes | Must match the parent directory name |
| applicable | boolean | Yes | `false` if the concept doesn't exist in this language |

### When `applicable: false`

Set this when a language doesn't have the concept. In the body, explain:
- Why the concept doesn't exist
- What the language does instead
- An example of the alternative approach

## Development

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run test         # Run tests
npm run validate-content  # Validate content files
```

## Content Guidelines

- Write for someone who knows one language and is learning another
- Keep descriptions concise but complete
- Code examples should be runnable or near-runnable
- Always explain "why" not just "what"
- Use gotchas to highlight non-obvious differences

# Polyglotify - Design Spec

A free, open-source web app that teaches programming languages by comparing them to a language you already know. Every language feature is shown side-by-side: what you know on one side, what you're learning on the other.

## Core Concept

Users select "I know X" and "I want to learn Y." The app presents every language feature with descriptions, code examples, and optional gotchas for both languages in a side-by-side comparison. Content is exhaustive — every feature is covered for every language, with explicit "not applicable" entries when a concept doesn't exist (explaining the alternative).

## Content Structure

### Directory Layout

```
content/
  languages/
    python/
      basics/
        variables.md
        types.md
        operators.md
      functions/
        declaration.md
        closures.md
      ...
    rust/
      basics/
        variables.md
        types.md
        ...
  features.yaml
```

### features.yaml

The canonical source of truth for all features, their categories, display order, and slugs. Every language must have a markdown file for every feature listed here. CI enforces this.

### Markdown File Format

```markdown
---
title: "Variables"
language: "python"
feature: "variables"
category: "basics"
applicable: true
---

Variables in Python are dynamically typed...

## Example

\```python
name = "hello"
count = 42
\```

## Gotchas

- Variables can change type at any time
```

- `applicable: true/false` — when `false`, the body explains what the language does instead and why the concept doesn't exist
- `Gotchas` section is optional
- Code examples should be runnable or near-runnable

### Feature Categories

- **Basics**: variables, types, operators, control flow
- **Functions**: declaration, parameters, return values, closures/lambdas
- **Data Structures**: arrays/lists, maps/dicts, sets, tuples, structs/classes
- **OOP**: classes, inheritance, interfaces/traits, generics
- **Error Handling**: exceptions, result types, try/catch
- **Concurrency**: async/await, threads, channels
- **Ecosystem**: package manager, project structure, testing, build tools
- **Idioms**: common patterns, style conventions

## Tech Stack

- **Framework**: Astro (static-first, content-heavy site)
- **Interactive islands**: React (language picker, comparison view, AI chat, progress tracker, dashboard)
- **Content processing**: Astro's built-in markdown/MDX support, processed at build time
- **Hosting**: Vercel, Netlify, or GitHub Pages (static output + edge functions for API)
- **Auth**: Auth.js or Lucia (lightweight, only needed for accounts)
- **AI**: Claude API (or configurable provider) for chat feature

## Application Architecture

### Project Structure

```
polyglotify/
  src/
    components/
      LanguagePicker.tsx
      ComparisonView.tsx
      ProgressTracker.tsx
      AiChat.tsx
      Dashboard.tsx
    layouts/
      BaseLayout.astro
      LessonLayout.astro
    pages/
      index.astro
      learn/
        [known]/[learning]/
          index.astro         # Dashboard for language pair
          [feature].astro     # Comparison page
    lib/
      content.ts              # Loads & pairs markdown
      progress.ts             # Local storage read/write
      ai.ts                   # Chat client
    api/
      chat.ts                 # AI proxy (auth + BYOK)
      auth/                   # Login, signup, tokens
  content/
    languages/
    features.yaml
  public/
  astro.config.mjs
```

### URL Structure

`/learn/{known}/{learning}/{feature}` — e.g., `/learn/python/rust/variables`

Clean, shareable, bookmarkable. The language pair is in the URL so links work standalone.

### Build Strategy

Astro generates static pages for every valid language pair + feature combination at build time. For N languages and F features, that's N*(N-1)*F pages. All static HTML — builds stay fast and hosting is free/cheap.

React islands are hydrated only where interactivity is needed: language picker, comparison view (for tab switching on mobile), AI chat, progress tracker, dashboard.

### API Routes

Two server-side endpoints, deployed as edge functions:

- `/api/chat` — AI proxy for paid users (handles auth, rate limiting, provider key)
- `/api/auth/` — account management (signup, login, token management)

## User Flow

### New User

1. **Landing page** — hero explaining the concept, CTA "Start Learning"
2. **Language picker** — two dropdowns with search/autocomplete: "I know ___" and "I want to learn ___"
3. **Redirects** to first feature in guided progression (e.g., `/learn/python/rust/variables`)
4. **Guided mode** — bottom nav with Previous/Next buttons stepping through features in order
5. **Top bar** has "View all topics" link to dashboard

### Returning User

1. **Landing page** detects local storage with previous session
2. Shows "Continue where you left off: Python -> Rust" prompt
3. Clicks through to **dashboard** at `/learn/python/rust/`
4. Dashboard shows categories/features as a grid with completion checkmarks
5. **Resume** button goes to next uncompleted feature

### Comparison Page

- **Header**: breadcrumb (Basics > Variables), language pair, progress indicator
- **Main content**: side-by-side on desktop, tabbed on mobile
- **Below content**: "Mark as complete" button
- **Bottom nav**: Previous / Next feature
- **Floating AI chat** button (bottom-right)
- **"Ask about this"** button on each language panel (opens contextual chat)
- **Sidebar** (desktop) or hamburger (mobile): table of contents

### Dashboard (`/learn/{known}/{learning}/`)

- Categories as collapsible sections
- Each feature: title, completion status, one-line summary
- Filter: All / Completed / Remaining
- Progress bar at top (e.g., "12/45 features completed")

## Comparison View Layout

- **Desktop**: true side-by-side — known language on the left (green accent), learning language on the right (amber accent). Descriptions, code, and gotchas aligned horizontally.
- **Mobile**: tabbed view — tabs at top to switch between known and learning language. One language visible at a time, full width.
- Responsive breakpoint switches between layouts.

## AI Chat Feature

### Two Entry Points

1. **Floating button** (always visible) — general questions, no preset context beyond the language pair
2. **"Ask about this"** (per comparison panel) — pre-loads the feature name, both language descriptions, and code examples as context

### System Prompt

The AI is told: "You're helping someone who knows {known_lang} learn {learning_lang}. Explain concepts by relating back to what they know."

### Access Model

- **Free**: all content, progress (local storage), AI chat with BYOK
- **Free with account**: everything above + progress sync across devices
- **Paid (requires account)**: using our hosted AI — the only paid feature

### BYOK (Bring Your Own Key)

- User clicks AI chat -> if no access, prompt: "Use your own API key or get a paid account"
- "Use your own key" -> enters key -> stored in local storage (never sent to our server)
- Chat requests go directly from browser to AI provider API (client-side)
- No account needed

### Paid AI

- Account required, API key managed server-side
- Chat requests proxy through `/api/chat`
- Rate limiting per account

### Auth

Lightweight auth via Auth.js or Lucia. Email + password or OAuth (GitHub, Google). Only needed for paid AI and progress sync — core functionality requires no account.

## Contributor Experience

### Adding a New Language

1. Fork the repo
2. Create `content/languages/{language}/` with a markdown file for every feature in `features.yaml`
3. Submit a PR
4. CI validates coverage, frontmatter schema, and build

### Adding a New Feature

1. Add entry to `features.yaml` (name, category, slug, order)
2. Add markdown file for that feature in every existing language folder
3. CI fails if any language is missing the new feature

### CI Validation

- Every feature in `features.yaml` has a file for every language
- Frontmatter schema validation (required fields, correct types)
- Linting code examples for basic syntax (optional, language-dependent)
- Full site build to catch rendering issues

### Tooling

- `CONTRIBUTING.md` with template, schema reference, and step-by-step guide
- `npm run new-language {lang}` — scaffolds empty files for every feature
- `npm run new-feature {category/feature}` — scaffolds files across all languages

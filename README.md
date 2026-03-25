# Polyglotify

Learn programming languages by comparing them to what you already know.

Pick a language you're comfortable with and one you want to learn. Every concept is shown **side-by-side** with descriptions, code examples, and gotchas.

**Live:** [polyglotify.tewodros.me](https://polyglotify.tewodros.me)

## Features

- **Side-by-side comparison** -- every language feature shown simultaneously, no context switching
- **50 languages** -- from Python and Rust to Gleam, Mojo, and COBOL
- **28 features across 8 categories** -- basics, functions, data structures, OOP, error handling, concurrency, ecosystem, and idioms
- **Progress tracking** -- mark features complete, resume where you left off
- **AI tutor** -- bring your own API key (12 providers supported) and ask questions in context
- **Fully static** -- content is prerendered, only the AI chat requires a server

## Supported Languages

Ada, Assembly, Bash, C, C++, C#, Clojure, COBOL, Crystal, D, Dart, Elixir, Erlang, F#, Fortran, Gleam, Go, Groovy, Haskell, Java, JavaScript, Julia, Kotlin, Lisp, Lua, MATLAB, Mojo, Nim, Objective-C, OCaml, Odin, Pascal, Perl, PHP, PowerShell, Prolog, Python, R, Racket, Ruby, Rust, Scala, Scheme, Solidity, SQL, Swift, Tcl, TypeScript, V, Zig

## AI Providers

The AI tutor uses a bring-your-own-key (BYOK) model. Your API key is stored in your browser's localStorage and sent directly to the provider -- it never touches our servers beyond proxying the request. Supported providers:

Anthropic, OpenAI, Google AI, OpenRouter, Groq, Mistral, xAI, DeepSeek, Cohere, Fireworks, Together AI, Perplexity

## Getting Started

```bash
git clone https://github.com/realTeddy/polyglotify.git
cd polyglotify
npm install
npm run dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run validate-content` | Validate all content files |
| `npm run new-language <slug>` | Scaffold a new language |
| `npm run new-feature <category/slug> "<title>"` | Scaffold a new feature |

## Tech Stack

- [Astro](https://astro.build) -- static site generation with hybrid server routes
- [React](https://react.dev) -- interactive components
- [Tailwind CSS](https://tailwindcss.com) -- styling
- [Vercel AI SDK](https://sdk.vercel.ai) -- streaming chat with 12 providers
- [Vitest](https://vitest.dev) -- testing
- Deployed on [Vercel](https://vercel.com)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add languages, features, and contribute code.

## How This Was Built

This project was created almost entirely using [Claude Code](https://claude.ai/claude-code) (Anthropic's AI coding agent). From the initial design spec through implementation, content generation for all 50 languages, and iteration -- Claude Code wrote the vast majority of the code and content. Human involvement focused on direction, review, and final decisions.

## License

[MIT](LICENSE)

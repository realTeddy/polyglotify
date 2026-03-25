import fs from 'node:fs/promises';
import path from 'node:path';
import type { LanguageInfo } from '@/types';

const LANGUAGES_DIR = path.resolve('content/languages');

const LANGUAGE_NAMES: Record<string, string> = {
  ada: 'Ada',
  assembly: 'Assembly',
  bash: 'Bash',
  c: 'C',
  clojure: 'Clojure',
  cobol: 'COBOL',
  cpp: 'C++',
  crystal: 'Crystal',
  csharp: 'C#',
  dart: 'Dart',
  dlang: 'D',
  elixir: 'Elixir',
  erlang: 'Erlang',
  fortran: 'Fortran',
  fsharp: 'F#',
  gleam: 'Gleam',
  go: 'Go',
  groovy: 'Groovy',
  haskell: 'Haskell',
  java: 'Java',
  javascript: 'JavaScript',
  julia: 'Julia',
  kotlin: 'Kotlin',
  lisp: 'Common Lisp',
  lua: 'Lua',
  matlab: 'MATLAB',
  mojo: 'Mojo',
  nim: 'Nim',
  'objective-c': 'Objective-C',
  ocaml: 'OCaml',
  odin: 'Odin',
  pascal: 'Pascal',
  perl: 'Perl',
  php: 'PHP',
  powershell: 'PowerShell',
  prolog: 'Prolog',
  python: 'Python',
  r: 'R',
  racket: 'Racket',
  ruby: 'Ruby',
  rust: 'Rust',
  scala: 'Scala',
  scheme: 'Scheme',
  solidity: 'Solidity',
  sql: 'SQL',
  swift: 'Swift',
  tcl: 'Tcl',
  typescript: 'TypeScript',
  vlang: 'V',
  zig: 'Zig',
};

function toDisplayName(slug: string): string {
  return LANGUAGE_NAMES[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

export async function getAvailableLanguages(): Promise<LanguageInfo[]> {
  const entries = await fs.readdir(LANGUAGES_DIR, { withFileTypes: true });
  const languages: LanguageInfo[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const langDir = path.join(LANGUAGES_DIR, entry.name);
    const files = await countMarkdownFiles(langDir);
    languages.push({
      slug: entry.name,
      name: toDisplayName(entry.name),
      featureCount: files,
    });
  }

  return languages.sort((a, b) => a.name.localeCompare(b.name));
}

async function countMarkdownFiles(dir: string): Promise<number> {
  let count = 0;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += await countMarkdownFiles(fullPath);
    } else if (entry.name.endsWith('.md')) {
      count++;
    }
  }
  return count;
}

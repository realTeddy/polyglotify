---
title: "Build Tools"
language: "racket"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

`raco` (Racket Command) is the primary build and tooling CLI. `raco make` byte-compiles `.rkt` files to `.zo` bytecode for faster loading. `raco exe` bundles a Racket program with the runtime into a standalone executable. `raco dist` creates a distributable directory. Scribble (`raco scribble`) generates HTML/PDF documentation.

## Example

```bash
# Byte-compile a file
raco make main.rkt

# Compile the whole package
raco setup my-package

# Create a standalone executable
raco exe -o myapp main.rkt

# Create a distributable (includes runtime)
raco dist myapp-dist myapp

# Generate documentation
raco scribble --html scribblings/my-package.scrbl

# Run tests
raco test .

# Check for syntax errors / expand macros
raco expand main.rkt

# Profile a program
raco profile main.rkt
```

## Gotchas

- `raco make` only byte-compiles; it does not link or create executables. Use `raco exe` for that.
- Bytecode (`.zo`) files are stored in `compiled/` subdirectories next to source files.
- `raco setup` is the canonical way to compile an installed package and its documentation in one step.
- Cross-compilation is not natively supported; you need to run `raco exe` on the target platform.

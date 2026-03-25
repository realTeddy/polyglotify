---
title: "Build Tools"
language: "vlang"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

V's build tool is the `v` compiler itself. `v build` compiles a project to a native binary. `v run` compiles and executes. `v -prod` enables production optimizations. V can cross-compile and translate V code to C or JavaScript. No external build system is required.

## Example

```bash
# Run directly (compile + execute)
v run .
v run main.v

# Build to binary
v build .
v build -o myapp main.v

# Production build (optimized)
v -prod build -o myapp .

# Translate to C
v -o output.c main.v

# Translate to JavaScript
v -b js -o output.js main.v

# Cross-compile
v -os linux -arch amd64 build .
v -os windows build .
v -os macos build .

# Run tests
v test .

# Format code
v fmt -w .

# Check for errors without building
v vet .
```

## Gotchas

- `v -prod` enables aggressive optimizations and removes safety checks (bounds checking, etc.); profile before using.
- The C backend (default) produces readable C code that is compiled with gcc/clang; this is how V achieves native performance.
- `v fmt` auto-formats code; consider adding it to pre-commit hooks for consistent style.

---
title: "Build Tools"
language: "mojo"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Mojo's primary build tool is the `mojo` compiler CLI, wrapped by **Magic** for project management. `mojo build` compiles to a native binary. `mojo package` creates distributable `.mojopkg` files. Mojo compiles via MLIR/LLVM, producing highly optimized native code. There is no separate Makefile or build system required for most projects.

## Example

```bash
# Run a Mojo file directly (compile + execute)
mojo main.mojo
magic run mojo main.mojo

# Build to a native binary
mojo build main.mojo -o myapp
magic run mojo build main.mojo -o myapp

# Build a package (for distribution without source)
mojo package src/mylib -o mylib.mojopkg

# Run tests
mojo test/test_math.mojo

# Format code
mojo format main.mojo
mojo format src/        # format entire directory

# Check without compiling
# (type checking is done by the compiler during build)

# Debug build with symbols
mojo build -debug-level full main.mojo -o myapp_debug

# Optimize for size
mojo build -O0 main.mojo    # no optimization
mojo build -O3 main.mojo    # max optimization
```

## Gotchas

- Mojo compiles via MLIR → LLVM → native machine code; the compilation pipeline is designed for maximum performance on hardware accelerators and CPUs.
- `mojo build` produces a statically linked binary by default on most platforms, simplifying deployment.
- The Mojo SDK is distributed via `magic`/conda; do not install `mojo` directly via pip as it may be outdated.

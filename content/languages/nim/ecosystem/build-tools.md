---
title: "Build Tools"
language: "nim"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Nim compiles via the `nim` compiler. Common compilation targets are C (default), C++, JavaScript, and LLVM IR. **Nimble** orchestrates builds, dependencies, and tasks. The `nim c` command compiles a single file; `-d:release` enables optimizations. Nimble tasks (in `.nimble` files) replace Makefile scripts.

## Example

```bash
# Basic compilation
nim c src/main.nim               # debug build -> ./main
nim c -r src/main.nim            # compile and run
nim c -d:release src/main.nim    # release (optimized)
nim c -d:release -d:strip --opt:size src/main.nim  # small binary

# Compile to C++ backend
nim cpp src/main.nim

# Compile to JavaScript (for browser use)
nim js src/app.nim

# Cross-compile (specify target)
nim c --cpu:arm --os:linux src/main.nim

# Nimble build commands
nimble build                 # build from .nimble definition
nimble build -d:release      # release build via nimble
nimble run                   # build and run
nimble test                  # run tests
nimble tasks                 # list defined tasks

# Common flags
# -d:release          — enable optimizations, disable assertions
# -d:ssl              — enable SSL support
# --gc:arc            — use ARC memory management (deterministic)
# --gc:orc            — use ORC (ARC + cycle detection)
# --threads:on        — enable threading
```

## Gotchas

- `-d:release` disables runtime checks (bounds, nil, overflow); always test with debug builds first.
- `--gc:arc` or `--gc:orc` is recommended for new code; the legacy `--gc:refc` is being phased out.
- Nim generates C code and then invokes a C compiler; the C compiler (gcc, clang, etc.) must be installed.

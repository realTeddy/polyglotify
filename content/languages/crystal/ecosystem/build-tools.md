---
title: "Build Tools"
language: "crystal"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Crystal's primary build tool is the `crystal` compiler itself. `crystal build` compiles to a native binary. `crystal run` compiles and runs in one step. `shards build` uses the `targets` section of `shard.yml` to build named executables. No separate build system (Makefile, CMake) is needed for most projects.

## Example

```bash
# Compile to native binary
crystal build src/my_app.cr -o my_app

# Optimized release build
crystal build src/my_app.cr --release -o my_app

# Compile and run immediately
crystal run src/my_app.cr -- arg1 arg2

# Run tests
crystal spec

# Type-check without compiling
crystal tool hierarchy src/my_app.cr
crystal tool types src/my_app.cr

# Build via shards (uses shard.yml targets section)
shards build --release
```

```yaml
# shard.yml targets section
targets:
  my_app:
    main: src/my_app.cr
  worker:
    main: src/worker.cr
```

```bash
# Cross-compile (generate object file for another target)
crystal build --cross-compile --target x86_64-linux-gnu src/my_app.cr
# Then link on the target machine
```

## Gotchas

- `--release` enables LLVM optimizations and disables bounds checking; always use for production binaries.
- Debug builds include stack traces; release builds are significantly faster but harder to debug.
- Crystal links statically by default on some platforms; this can produce large binaries but simplifies deployment.

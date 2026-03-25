---
title: "Build Tools"
language: "zig"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Zig has a fully integrated build system — `build.zig` is a Zig program that describes the build. There is no external make/cmake needed. The Zig compiler (`zig build-exe`, `zig build-lib`, `zig build`) handles compilation, linking, and cross-compilation. Zig can also compile C and C++ code, making it a drop-in replacement for build toolchains.

## Example

```bash
# Initialize a new project
zig init

# Build (runs build.zig)
zig build

# Build and run
zig build run

# Run tests
zig build test

# Direct compilation (no build.zig needed)
zig build-exe src/main.zig
zig run src/main.zig

# Cross-compile (e.g., Linux ARM from Windows)
zig build -Dtarget=aarch64-linux-gnu

# Build optimized release
zig build -Doptimize=ReleaseFast
zig build -Doptimize=ReleaseSmall
zig build -Doptimize=ReleaseSafe

# Use Zig as a C compiler
zig cc -o hello hello.c
zig c++ -o hello hello.cpp
```

```zig
// Optimization levels available in build.zig
// .Debug        — safety checks, no optimization
// .ReleaseSafe  — safety checks, optimized
// .ReleaseFast  — no safety checks, max speed
// .ReleaseSmall — no safety checks, min binary size
```

## Gotchas

- `zig build` with no arguments builds the default step (usually the executable); add `-Doptimize=ReleaseFast` for production.
- Cross-compilation requires no additional toolchain; Zig bundles everything including `libc` for most targets.
- `zig-cache/` can grow large on CI; cache it between runs to speed up builds significantly.

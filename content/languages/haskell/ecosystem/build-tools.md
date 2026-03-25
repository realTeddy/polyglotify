---
title: "Build Tools"
language: "haskell"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

**GHC** is the primary Haskell compiler. **Cabal** and **Stack** are the standard build tools. **GHCup** manages GHC and toolchain versions. **HLS** (Haskell Language Server) provides IDE integration.

## Example

```bash
# Install toolchain via GHCup (recommended)
curl --proto '=https' --tlsv1.2 -sSf https://get-ghcup.haskell.org | sh
ghcup install ghc 9.6.4
ghcup install cabal latest
ghcup install hls latest
ghcup set ghc 9.6.4

# Compile a single file
ghc -O2 Main.hs -o main
./main

# Cabal workflow
cabal build                      # compile
cabal run myproject               # build and run
cabal test                        # run tests
cabal bench                       # run benchmarks
cabal repl                        # interactive REPL with project loaded
cabal clean                       # remove build artefacts

# Stack workflow
stack build                       # compile
stack run                         # build and run
stack test                        # run tests
stack ghci                        # REPL
stack clean

# Useful GHC flags
ghc -Wall -Wextra -Werror Main.hs        # strict warnings
ghc -prof -fprof-auto Main.hs            # profiling
ghc -O2 Main.hs                          # optimisation

# Profiling a built executable
./main +RTS -p -RTS
cat main.prof
```

```cabal
-- Benchmark stanza in .cabal
benchmark mybench
  type:           exitcode-stdio-1.0
  main-is:        Bench.hs
  hs-source-dirs: bench
  build-depends:  base, criterion, myproject
```

## Gotchas

- Always build with `-O2` for production; the default (`-O0`) is significantly slower
- `cabal build` and `stack build` maintain separate package databases; don't mix them in the same project
- Enable `-Wall` to catch common issues (incomplete patterns, unused imports, etc.); treat them as errors with `-Werror`

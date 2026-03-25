---
title: "Package Manager"
language: "haskell"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Haskell has two primary build tools: **Cabal** (the low-level standard) and **Stack** (reproducible builds via Stackage snapshots). Most projects use one or the other; both can coexist. **Hackage** is the central package repository.

## Example

```bash
# --- Stack ---
# Install Stack
curl -sSL https://get.haskellstack.org/ | sh

# Create a new project
stack new myproject simple

# Build
stack build

# Run
stack exec myproject

# Add a dependency: edit package.yaml, then:
stack build  # Stack resolves from the Stackage snapshot

# Install a tool globally
stack install hlint

# --- Cabal ---
# Install via GHCup (recommended)
ghcup install cabal

# Initialise a project
cabal init --interactive

# Build
cabal build

# Run
cabal run

# Add dependency: edit myproject.cabal
# dependencies: base, text, aeson

cabal update         # refresh Hackage index
cabal install --lib text  # install library

# REPL
stack ghci
cabal repl
```

```yaml
# package.yaml (Stack / hpack)
name: myproject
version: 0.1.0.0
dependencies:
  - base >= 4.14
  - text
  - aeson
  - bytestring

executables:
  myproject:
    main: Main.hs
    source-dirs: app
```

## Gotchas

- Stack uses **Stackage snapshots** (curated, compatible package sets) for reproducibility; Cabal uses a SAT solver against Hackage
- `stack.yaml` pins the snapshot (`resolver: lts-22.0`); update it explicitly to get new packages
- GHCup is now the recommended way to install GHC, Cabal, Stack, and HLS (Haskell Language Server)

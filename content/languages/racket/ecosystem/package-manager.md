---
title: "Package Manager"
language: "racket"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Racket uses **`raco pkg`** (Racket Command) as its package manager. Packages are hosted on the official **pkgs.racket-lang.org** catalog. Packages can also be installed from GitHub or a local directory. Dependency declarations live in `info.rkt` files. `raco` is the Swiss-army-knife CLI for Racket: it compiles, tests, installs packages, and more.

## Example

```bash
# Install a package
raco pkg install threading

# Install from GitHub
raco pkg install git://github.com/user/pkg-name

# Remove a package
raco pkg remove threading

# Update all packages
raco pkg update --all

# List installed packages
raco pkg show
```

```racket
; info.rkt — package metadata (like package.json or Cargo.toml)
#lang info
(define name "my-package")
(define version "1.0.0")
(define deps '("base"
               "threading"
               "rackunit-lib"))
(define build-deps '("scribble-lib"))
```

## Gotchas

- Packages are installed user-wide by default; use `--scope installation` for system-wide install or `--scope user` explicitly.
- `raco pkg install` can install from the catalog, a directory, a git URL, or a `.zip`; the source type is detected automatically.
- The `base` package provides the Racket standard library; most packages depend on it.

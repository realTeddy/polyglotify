---
title: "Package Manager"
language: "scheme"
feature: "package-manager"
category: "ecosystem"
applicable: false
---

Standard R7RS Scheme has no package manager. Each Scheme implementation has its own library management: **Racket** has `raco pkg` and the package catalog, **Guile** uses Guix and manually installed libraries, **Chicken Scheme** has `chicken-install` (eggs), **Gambit** has `gambit-install`, **Chez Scheme** manages libraries manually. There is no cross-implementation package ecosystem analogous to npm or pip.

## Example

```bash
# Chicken Scheme — "eggs" package system
chicken-install srfi-1       # install SRFI-1 (list library)
chicken-install spiffy       # install web server
chicken-install medea        # install JSON library
chicken-install -list        # list installed eggs

# Racket — raco pkg
raco pkg install srfi-lib    # install SRFI libraries
raco pkg install web-server  # install web server
raco pkg install json-lib    # install JSON
raco pkg show                # list installed packages

# Guile — mostly manual or via Guix
guix install guile-json      # via the Guix package manager
# Or clone and add to load path:
# git clone https://github.com/aconchillo/guile-json
# export GUILE_LOAD_PATH=.../guile-json:$GUILE_LOAD_PATH

# Chez Scheme — manual library paths
# Download library, then:
# (library-directories '("." "/usr/local/lib/chez"))
# (import (json-lib))
```

## Gotchas

- A library written for Chicken Scheme cannot be installed on Guile or Racket — libraries are implementation-specific unless they use only standard R7RS.
- R7RS's `(import (scheme ...))` form is standard, but most real-world libraries use implementation extensions.
- Racket is the Scheme implementation with the richest package ecosystem (thousands of packages on `pkgs.racket-lang.org`) but it diverges significantly from standard R7RS.

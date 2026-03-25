---
title: "Build Tools"
language: "scheme"
feature: "build-tools"
category: "ecosystem"
applicable: false
---

Standard R7RS Scheme has no build tools. Each implementation provides its own: **Chicken Scheme** compiles `.scm` to native binaries via `csc`. **Racket** uses `raco make` and `raco exe`. **Guile** compiles to `.go` (Guile Object) bytecode automatically on first load. **Chez Scheme** compiles with `compile-file`. Portable R7RS code is typically interpreted or compiled by whichever implementation the user has.

## Example

```bash
# Chicken Scheme — compile to native executable
csc myprogram.scm -o myprogram         # compile to native binary
csc -dynamic mylib.scm -o mylib.so     # shared library
csi myprogram.scm                       # interpret directly

# Racket — compile and run
racket myprogram.rkt                    # run interpreted
raco make myprogram.rkt                 # compile to bytecode .zo
raco exe -o myprogram myprogram.rkt     # standalone executable
raco test myprogram-test.rkt           # run tests

# Guile — compile
guile myprogram.scm                     # run (auto-compiles to .go cache)
guild compile myprogram.scm             # explicit compile to .go
guile --r7rs myprogram.scm             # run in R7RS mode

# MIT Scheme
mit-scheme --load myprogram.scm
mit-scheme --batch-mode --quiet --load myprogram.scm  # non-interactive

# Chibi-Scheme (minimal R7RS)
chibi-scheme myprogram.scm

# Chez Scheme
chez --script myprogram.scm            # run as script
echo '(compile-file "mylib.scm")' | chez  # compile to .so
```

## Gotchas

- Chicken Scheme's `csc` compiler produces native code with excellent performance; compiled `.so` files can be used as extensions, but they are not portable across OSes.
- Racket's `raco exe` produces a standalone executable that bundles the Racket runtime — typically 10–20 MB.
- Guile's bytecode cache (`.go` files in `$HOME/.cache/guile`) is invalidated automatically when source changes, making development seamless but cache directory growth a concern on servers.

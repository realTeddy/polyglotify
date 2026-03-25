---
title: "Build Tools"
language: "ocaml"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

The standard OCaml build tool is **Dune** (formerly Jbuilder). It handles compilation, linking, ppx preprocessing, documentation generation, and tests. `ocamlfind` is a lower-level tool for locating libraries. The OCaml compiler can be invoked directly (`ocamlopt`, `ocamlc`) for simple scripts.

## Example

```bash
# Create a new Dune project
mkdir my_app && cd my_app
cat > dune-project << 'EOF'
(lang dune 3.0)
EOF

# Build everything
dune build

# Build and run an executable
dune exec bin/main.exe

# Run tests
dune test
dune runtest          # alias for dune test

# Watch mode — rebuild on file changes
dune build --watch

# Clean build artifacts
dune clean

# Generate .opam file from dune-project
dune-release opam publish   # (requires dune-release)

# Direct compiler usage (simple scripts)
ocamlopt -o hello hello.ml
ocamlc   -o hello hello.ml   # bytecode (slower, portable)

# With libraries via ocamlfind
ocamlfind ocamlopt -package str,lwt -linkpkg prog.ml -o prog
```

```scheme
; Common dune build options
(executable
 (name main)
 (libraries core lwt)
 (ocamlopt_flags (:standard -O3 -unbox-closures)))
```

## Gotchas

- `dune build` is incremental; it only recompiles changed files.
- `.cmo` (bytecode) and `.cmx` (native) object files are separate; Dune manages this transparently.
- `dune exec` automatically builds before running; no need for a separate `dune build` step.

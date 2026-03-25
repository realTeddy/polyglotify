---
title: "Package Manager"
language: "ocaml"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

OCaml's package manager is **opam** (OCaml Package Manager). It manages OCaml compiler versions, packages, and project switches (isolated environments). The **opam-repository** is the central package index. `opam install` fetches and builds packages. Project dependencies are declared in `.opam` files or `dune-project`.

## Example

```bash
# Initialize opam (first time)
opam init

# Create a project switch (isolated environment)
opam switch create my_project ocaml-base-compiler.5.1.0

# Install packages
opam install dune
opam install lwt
opam install core ppx_jane   # Jane Street's Core library

# Install from .opam file
opam install . --deps-only

# List installed packages
opam list

# Update opam and packages
opam update
opam upgrade

# Show package info
opam info lwt
```

```
# my_project.opam
opam-version: "2.0"
name: "my_project"
version: "0.1.0"
synopsis: "My OCaml Project"
authors: ["Alice"]
license: "MIT"
depends: [
  "ocaml" {>= "4.14"}
  "dune"  {>= "3.0"}
  "lwt"   {>= "5.6"}
]
build: [["dune" "build" "@install"]]
```

## Gotchas

- Always create a per-project `opam switch` to avoid version conflicts between projects.
- `eval $(opam env)` updates shell environment variables after switch changes — add it to your shell config.
- `opam install . --deps-only` installs only the dependencies of the current project, not the project itself.

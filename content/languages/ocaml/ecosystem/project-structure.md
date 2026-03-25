---
title: "Project Structure"
language: "ocaml"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

OCaml projects use **Dune** as the build system. `dune-project` defines the project root and metadata. `dune` files in each directory describe libraries, executables, and tests. Source files are `.ml` (implementation) and `.mli` (interface/signature). The standard layout separates library code from executable entry points.

## Example

```
my_project/
├── dune-project           # Project root marker
├── my_project.opam        # opam package metadata
├── lib/
│   ├── dune               # Library definition
│   ├── my_project.ml      # Library source
│   ├── my_project.mli     # Public interface (optional but recommended)
│   └── utils.ml
├── bin/
│   ├── dune               # Executable definition
│   └── main.ml            # Entry point
└── test/
    ├── dune               # Test definition
    └── test_my_project.ml
```

```scheme
; dune-project
(lang dune 3.0)
(name my_project)

; lib/dune
(library
 (name my_project)
 (libraries lwt str))

; bin/dune
(executable
 (name main)
 (libraries my_project lwt))

; test/dune
(test
 (name test_my_project)
 (libraries my_project alcotest))
```

## Gotchas

- Module names are capitalized versions of filenames: `utils.ml` defines module `Utils`.
- `.mli` files define the public interface; without them, all definitions are exported.
- `dune build` compiles everything; `dune exec bin/main.exe` builds and runs the executable.

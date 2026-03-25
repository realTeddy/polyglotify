---
title: "Package Manager"
language: "fortran"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Fortran gained an official package manager in 2020: **fpm** (Fortran Package Manager), developed by the Fortran-lang community. `fpm` handles dependency resolution, building, testing, and running Fortran projects. Packages are hosted on GitHub and referenced by their URL. The `fpm.toml` file defines the project and its dependencies — a modern development experience that was absent from Fortran for decades.

## Example

```toml
# fpm.toml — project manifest
name = "my-fortran-project"
version = "0.1.0"
license = "MIT"

[build]
auto-executables = true
auto-tests = true

[dependencies]
stdlib = { git = "https://github.com/fortran-lang/stdlib" }
json-fortran = { git = "https://github.com/jacobwilliams/json-fortran" }

[dev-dependencies]
# test-only dependencies
```

```bash
# fpm commands
fpm new my_project       # create a new project
fpm build                # compile the project
fpm run                  # compile and run the default executable
fpm test                 # run all tests
fpm install              # install executable to ~/.local/bin

# Running a specific executable
fpm run --target my_app

# Adding a dependency manually (edit fpm.toml, then build)
fpm build
```

## Gotchas

- `fpm` requires each source file to be a module, program, or subprogram that fpm can discover automatically — it uses a naming convention matching filenames to module names.
- The Fortran package ecosystem is much smaller than Python's PyPI or Rust's crates.io; many scientific libraries are still distributed as tarballs with Makefiles.
- `fpm` does not yet handle all build complexity (generated sources, mixed C/Fortran projects); CMake with `FetchContent` remains common for complex HPC codes.

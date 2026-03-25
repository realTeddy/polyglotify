---
title: "Project Structure"
language: "crystal"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A Crystal project generated with `crystal init` has a conventional structure: `src/` for source files, `spec/` for tests, `shard.yml` for metadata. The main entry point is `src/<name>.cr`. Libraries expose their API from `src/<name>.cr`; binaries have an entry point in `src/<name>.cr` or a separate `src/main.cr`.

## Example

```
my_app/
├── shard.yml          # package metadata & dependencies
├── shard.lock         # locked dependency versions
├── src/
│   ├── my_app.cr      # main entry point / library root
│   └── my_app/
│       ├── models/
│       │   └── user.cr
│       └── services/
│           └── auth.cr
└── spec/
    ├── spec_helper.cr
    └── my_app_spec.cr
```

```crystal
# src/my_app.cr
require "./my_app/models/user"
require "./my_app/services/auth"

module MyApp
  VERSION = "0.1.0"
end
```

```bash
# Initialize a new project
crystal init app my_app    # executable
crystal init lib my_lib    # library

# Build
crystal build src/my_app.cr -o my_app

# Run directly
crystal run src/my_app.cr

# Run tests
crystal spec
```

## Gotchas

- `require` paths are relative to the file or use the shard name for installed dependencies.
- `crystal init app` creates a binary project; `crystal init lib` creates a library with a module namespace.
- The `spec/` directory is the convention for test files; Crystal's built-in test framework (`Spec`) looks for `*_spec.cr` files.

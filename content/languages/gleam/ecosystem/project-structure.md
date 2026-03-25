---
title: "Project Structure"
language: "gleam"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A Gleam project created with `gleam new` follows a standard layout. Source files live in `src/`, tests in `test/`. The project is defined by `gleam.toml`. Modules correspond to file paths — `src/my_app/utils.gleam` becomes the module `my_app/utils`. The entry point for `gleam run` is `src/{project_name}.gleam`.

## Example

```
my_app/
├── gleam.toml          # Project config and dependencies
├── manifest.toml       # Dependency lockfile
├── README.md
├── src/
│   ├── my_app.gleam    # Entry point (main function)
│   ├── my_app/
│   │   ├── router.gleam     # Module: my_app/router
│   │   ├── db.gleam         # Module: my_app/db
│   │   └── models/
│   │       └── user.gleam   # Module: my_app/models/user
└── test/
    ├── my_app_test.gleam
    └── my_app/
        └── router_test.gleam
```

```gleam
// src/my_app.gleam
import gleam/io
import my_app/router

pub fn main() {
  io.println("Starting my_app")
  router.start()
}
```

```gleam
// Import another module
import my_app/models/user
import gleam/list as l  // aliased import
```

## Gotchas

- Module names are derived from file paths relative to `src/`. A file at `src/foo/bar.gleam` is imported as `import foo/bar`.
- All public functions and types are automatically exported — there is no explicit export list (unlike some languages).
- Private items use no `pub` prefix. `pub(internal)` restricts to the package (not exported to dependents).
- There is no `main` module requirement — `gleam run` looks for `pub fn main()` in `src/{project_name}.gleam`.

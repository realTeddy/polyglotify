---
title: "Project Structure"
language: "vlang"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A V project is a directory containing `.v` source files. All `.v` files in the same directory belong to the same module. `v.mod` declares the module name and dependencies. `v new` scaffolds a new project. The entry point for executables is a `main` function, typically in `main.v` or `src/main.v`.

## Example

```
my_app/
├── v.mod            # module metadata
├── main.v           # entry point (fn main)
├── src/
│   ├── models/
│   │   └── user.v   # module models
│   └── services/
│       └── auth.v   # module services
└── tests/
    └── user_test.v  # test file (_test.v suffix)
```

```v
// v.mod
Module {
    name: 'my_app'
    description: 'Example V app'
    version: '0.1.0'
    license: 'MIT'
    dependencies: []
}
```

```v
// main.v
module main

import my_app.src.models

fn main() {
    user := models.new_user('Alice')
    println(user)
}
```

```bash
# Create new project
v new my_app

# Run
v run .

# Build
v build .

# Run tests
v test .
```

## Gotchas

- All `.v` files in the same directory must declare the same module name at the top (`module name`).
- Test files must end with `_test.v`; test functions must start with `test_`.
- The `module main` declaration is required for the entry-point directory; sub-packages use their own module names.

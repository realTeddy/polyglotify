---
title: "Project Structure"
language: "nim"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A Nim project created with `nimble init` follows a standard layout. Source files live in `src/`, tests in `tests/`. The main entry point is `src/project_name.nim`. The `.nimble` file acts as both a package manifest and build script. Libraries expose their API from the `src/` module.

## Example

```
my_project/
├── my_project.nimble    # Package manifest + build tasks
├── src/
│   ├── my_project.nim   # Library root / executable entry
│   └── my_project/
│       ├── utils.nim    # Internal modules
│       └── types.nim
├── tests/
│   ├── all.nim          # Test runner (imports all test files)
│   ├── test_utils.nim
│   └── test_types.nim
└── .gitignore
```

```nim
# src/my_project.nim — library root
import my_project/utils
import my_project/types

export utils, types   # re-export for library users
```

```nim
# tests/all.nim — import all test suites
import testament/testutils

import test_utils
import test_types
```

```bash
# Build
nim c src/my_project.nim

# Or via nimble
nimble build

# Run tests
nimble test
```

## Gotchas

- Nim module names match filenames: `utils.nim` defines the `utils` module.
- Use `import my_project/utils` (path-style) for submodules within a package.
- The `nimble init` wizard asks whether to create an executable or library; choose accordingly.

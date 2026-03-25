---
title: "Project Structure"
language: "mojo"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A Mojo project managed with `magic` contains a `mojoproject.toml` (or `pixi.toml`) at the root, source files with `.mojo` or `.🔥` extension, and optionally a `src/` layout. Mojo packages are directories with an `__init__.mojo` file. Tests conventionally live in a `test/` directory with files ending in `_test.mojo`.

## Example

```
my_project/
├── mojoproject.toml   # project metadata and dependencies
├── magic.lock         # locked dependency versions
├── src/
│   ├── main.mojo      # entry point
│   └── mylib/
│       ├── __init__.mojo  # package root
│       ├── math_utils.mojo
│       └── data.mojo
└── test/
    ├── test_math_utils.mojo
    └── test_data.mojo
```

```mojo
# src/mylib/__init__.mojo
from .math_utils import add, multiply
from .data import DataProcessor

# src/main.mojo
from mylib import add, DataProcessor

fn main():
    print(add(3, 4))
    var dp = DataProcessor()
    dp.run()
```

```bash
# Initialize project
magic init my_project --format mojoproject

# Run the project
magic run mojo src/main.mojo

# Build a Mojo package
mojo package src/mylib -o mylib.mojopkg

# Run tests
magic run mojo test/test_math_utils.mojo
```

## Gotchas

- A Mojo package is a directory with `__init__.mojo`; without it, you cannot import from subdirectories using package syntax.
- `.mojo` and `.🔥` are equivalent file extensions; `.mojo` is recommended for cross-platform tooling compatibility.
- Mojo compiled packages (`.mojopkg`) distribute compiled code without source; useful for distributing libraries.

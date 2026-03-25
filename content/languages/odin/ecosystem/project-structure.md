---
title: "Project Structure"
language: "odin"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

An Odin project is a directory of `.odin` files sharing the same `package` declaration. Sub-packages are subdirectories. The `odin` compiler operates on directories (packages), not individual files. Large projects use the `-collection` flag to namespace groups of packages.

## Example

```
my_game/
├── main.odin              # package main — entry point
├── game.odin              # package main — same package
├── renderer/
│   ├── renderer.odin      # package renderer
│   └── shader.odin        # package renderer
├── physics/
│   └── physics.odin       # package physics
├── vendor/
│   └── stb_image/         # vendored C library wrapper
└── build.sh               # build script
```

```odin
// main.odin
package main

import "core:fmt"
import "renderer"  // relative import
import "physics"

main :: proc() {
    renderer.init()
    physics.init()
    fmt.println("Game started")
}
```

```sh
# Build commands
odin build .                        # build current package
odin build . -out:game              # specify output name
odin build . -debug                 # debug build
odin build . -o:speed               # optimized build
odin run .                          # build and run
odin check .                        # type-check without building

# With collections
odin build . -collection:vendor=./vendor
```

## Gotchas

- All `.odin` files in a directory must have the same `package` declaration.
- `package main` is required for the entry-point directory; only one `main :: proc()` is allowed.
- The `core:` collection maps to the standard library bundled with the compiler.
- There is no `import` path resolution via environment variable — use relative paths or explicit `-collection` flags.

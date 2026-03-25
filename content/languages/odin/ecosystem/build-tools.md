---
title: "Build Tools"
language: "odin"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Odin's build tool is the `odin` compiler itself. It compiles entire packages (directories) at once. For complex builds (multiple packages, linking C libraries, platform-specific flags), Odin code can be used as a build script via `odin run build.odin -file`. There is no Makefile requirement, though many projects use one for convenience.

## Example

```sh
# Core build commands
odin build .                  # Build current directory as a package
odin build . -out:app         # Specify output binary name
odin build . -debug           # Debug build (bounds checks, assertions)
odin build . -o:speed         # Optimize for speed
odin build . -o:size          # Optimize for size
odin build . -target:windows_amd64  # Cross-compile

odin run .                    # Build and run
odin check .                  # Type-check only (no binary)
odin test .                   # Run tests

# Linking C libraries
odin build . -extra-linker-flags:"-lm -lpthread"

# Using a build.odin script
odin run build.odin -file     # Run a single-file build script
```

```odin
// build.odin — minimal build script example
package build

import "core:os"
import "core:fmt"

main :: proc() {
    // You can shell out or use os.* to orchestrate builds
    exit_code := os.system("odin build src -out:app -o:speed")
    if exit_code != 0 {
        fmt.eprintln("Build failed")
        os.exit(1)
    }
    fmt.println("Build successful")
}
```

## Gotchas

- There is no incremental compilation — the entire package is recompiled each time (though this is fast).
- The `-collection:name=path` flag maps import names to filesystem paths — essential for large projects.
- Odin can include C source files via `#load` or link against pre-compiled C libraries with linker flags.
- The `vendor:` built-in collection maps to `<odin-root>/vendor/`, which ships with some common C bindings.

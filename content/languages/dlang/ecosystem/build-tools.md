---
title: "Build Tools"
language: "dlang"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

D's primary build tool is **DUB**, which handles both package management and building. For fine-grained control, projects can call the D compilers directly: **DMD** (reference, fast compile), **LDC** (LLVM-based, best optimisation), or **GDC** (GCC-based). DUB generates build commands internally but also supports custom build scripts in D itself via `build.d`.

## Example

```bash
# Compile with DMD directly
dmd source/app.d -of=myapp -I=source -O -release

# Compile with LDC (optimised release)
ldc2 source/app.d -of=myapp -O3 -release -I=source

# DUB build configurations
dub build                          # debug build
dub build --build=release          # release (optimised, no asserts)
dub build --build=release-debug    # release with debug symbols
dub build --compiler=ldc2          # use LDC instead of DMD

# Run tests
dub test

# Build a specific configuration defined in dub.json
dub build --config=server
```

```json
// dub.json build configurations
{
    "name": "myapp",
    "targetType": "executable",
    "configurations": [
        {
            "name": "server",
            "sourceFiles": ["source/server_main.d"]
        },
        {
            "name": "cli",
            "sourceFiles": ["source/cli_main.d"]
        }
    ],
    "buildTypes": {
        "release": {
            "buildOptions": ["optimize", "inline"]
        }
    }
}
```

## Gotchas

- DMD produces fast debug builds; LDC produces the fastest binaries — always benchmark with LDC for production.
- DUB supports multiple configurations in `dub.json`, allowing one project to produce several executables or libraries.
- `-release` removes bounds checks, asserts, and contracts — never use it without thorough testing.
- `dub generate visuald` generates a Visual Studio project; `dub generate cmake` generates a CMakeLists.txt for IDE integration.

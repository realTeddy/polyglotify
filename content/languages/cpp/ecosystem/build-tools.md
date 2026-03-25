---
title: "Build Tools"
language: "cpp"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

**CMake** is the de facto standard build system generator for C++. It generates native build files (Makefiles, Ninja, Visual Studio, Xcode) from a `CMakeLists.txt`. **Ninja** is the preferred backend for speed. **Meson** is an alternative with simpler syntax. **Bazel** is used in large monorepos (Google, Meta). For faster compilation, tools like **ccache** (compile cache), **IncrediBuild**, and **sccache** (for CI) are common additions.

## Example

```bash
# Configure with CMake (Ninja backend)
cmake -S . -B build -G Ninja \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_CXX_COMPILER=clang++

# Build
cmake --build build --parallel

# Install
cmake --install build --prefix /usr/local

# Preset-based workflow (CMakePresets.json — modern)
cmake --preset release
cmake --build --preset release

# Run tests
ctest --preset release --output-on-failure

# Static analysis
cmake -S . -B build -DCMAKE_CXX_CLANG_TIDY="clang-tidy;-checks=modernize-*"
cmake --build build

# Format
find src include -name "*.cpp" -o -name "*.hpp" | xargs clang-format -i
```

```json
// CMakePresets.json
{
  "version": 6,
  "configurePresets": [
    {
      "name": "release",
      "generator": "Ninja",
      "binaryDir": "${sourceDir}/build/release",
      "cacheVariables": {
        "CMAKE_BUILD_TYPE": "Release",
        "CMAKE_EXPORT_COMPILE_COMMANDS": "ON"
      }
    }
  ]
}
```

## Gotchas

- Always use out-of-source builds (`-B build`) — in-source builds mix generated files with source and make `git clean` dangerous.
- `CMAKE_BUILD_TYPE` only applies to single-config generators (Ninja, Make). Multi-config generators (Visual Studio, Xcode) use `--config Release` at build time instead.

---
title: "Project Structure"
language: "c"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

C project structure is convention-based, not enforced by a build system. The most common layout separates public headers (`include/`), implementation sources (`src/`), tests (`tests/`), and third-party libraries (`lib/` or `vendor/`). CMake or a hand-crafted `Makefile` describes the build. Larger projects split into subdirectories with their own `Makefile` fragments or `CMakeLists.txt`.

## Example

```
my-c-project/
├── CMakeLists.txt        (or GNUmakefile)
├── include/
│   └── mylib/
│       ├── mylib.h       # public API
│       └── utils.h
├── src/
│   ├── mylib.c
│   └── utils.c
├── tests/
│   ├── test_mylib.c
│   └── test_utils.c
├── examples/
│   └── demo.c
├── vendor/               # vendored third-party libs
│   └── parson/           # e.g., a JSON parser
└── .clang-format
```

```c
/* include/mylib/mylib.h — public header */
#ifndef MYLIB_H
#define MYLIB_H

#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

/* Opaque type — implementation hidden */
typedef struct MyLib MyLib;

MyLib *mylib_create(const char *config);
void   mylib_destroy(MyLib *lib);
int    mylib_process(MyLib *lib, const void *data, size_t len);

#ifdef __cplusplus
}
#endif

#endif /* MYLIB_H */
```

```cmake
# CMakeLists.txt
cmake_minimum_required(VERSION 3.20)
project(MyLib VERSION 1.0 LANGUAGES C)
set(CMAKE_C_STANDARD 11)

add_library(mylib src/mylib.c src/utils.c)
target_include_directories(mylib PUBLIC include)
target_compile_options(mylib PRIVATE -Wall -Wextra -Wpedantic)

enable_testing()
add_executable(test_mylib tests/test_mylib.c)
target_link_libraries(test_mylib PRIVATE mylib)
add_test(NAME mylib_tests COMMAND test_mylib)
```

## Gotchas

- The `#ifndef HEADER_H / #define HEADER_H / #endif` include guard (or `#pragma once`) is essential in every header file — without it, multiple inclusions cause redefinition errors.
- The `extern "C"` block in headers makes the library usable from C++ by disabling C++ name mangling. Always add it to public C library headers.

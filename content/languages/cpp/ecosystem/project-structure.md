---
title: "Project Structure"
language: "cpp"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

C++ projects are structured around a build system — typically **CMake**. Headers go in `include/` (public API) or alongside sources in `src/` (internal). Source files are in `src/`. Tests live in `tests/`. C++20 modules (`.cppm` / `.ixx`) are gradually replacing the header/source split. A `CMakeLists.txt` at the root and in each subdirectory describes the build graph.

## Example

```
my-project/
├── CMakeLists.txt
├── include/
│   └── mylib/
│       ├── mylib.hpp        # public API header
│       └── utils.hpp
├── src/
│   ├── CMakeLists.txt
│   ├── mylib.cpp
│   └── utils.cpp
├── tests/
│   ├── CMakeLists.txt
│   └── test_mylib.cpp
├── examples/
│   └── basic_usage.cpp
└── .clang-format
```

```cmake
# Root CMakeLists.txt
cmake_minimum_required(VERSION 3.25)
project(MyLib VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)  # for clangd

add_library(mylib src/mylib.cpp src/utils.cpp)
target_include_directories(mylib PUBLIC include)

# Tests
enable_testing()
add_subdirectory(tests)
```

```cmake
# tests/CMakeLists.txt
include(FetchContent)
FetchContent_Declare(googletest GIT_REPOSITORY https://github.com/google/googletest.git GIT_TAG v1.14.0)
FetchContent_MakeAvailable(googletest)

add_executable(tests test_mylib.cpp)
target_link_libraries(tests PRIVATE mylib GTest::gtest_main)
include(GoogleTest)
gtest_discover_tests(tests)
```

## Gotchas

- Header-only libraries are simple to distribute but force all template instantiation into every translation unit that includes them, increasing compile times. Use explicit instantiation or `extern template` to mitigate.
- `CMAKE_EXPORT_COMPILE_COMMANDS=ON` generates `compile_commands.json`, which clang-based tools (clangd, clang-tidy, include-what-you-use) require to work correctly.

---
title: "Package Manager"
language: "cpp"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

C++ historically had no standard package manager, but the ecosystem has matured. **vcpkg** (Microsoft, integrates with CMake/MSBuild) and **Conan** (JFrog, supports many build systems) are the dominant choices. Both pull packages from curated registries. **CMake FetchContent** is a build-system-native alternative that downloads dependencies at configure time. C++23's proposed module ecosystem may eventually reshape this landscape.

## Example

```bash
# vcpkg — install and integrate
git clone https://github.com/microsoft/vcpkg
./vcpkg/bootstrap-vcpkg.sh
./vcpkg/vcpkg install boost-json nlohmann-json fmt

# CMakeLists.txt integration
# cmake -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake ..
```

```cmake
# CMakeLists.txt — CMake FetchContent (no external manager needed)
cmake_minimum_required(VERSION 3.24)
project(MyApp CXX)
set(CMAKE_CXX_STANDARD 23)

include(FetchContent)

FetchContent_Declare(
  nlohmann_json
  GIT_REPOSITORY https://github.com/nlohmann/json.git
  GIT_TAG        v3.11.3
)
FetchContent_MakeAvailable(nlohmann_json)

FetchContent_Declare(
  fmt
  GIT_REPOSITORY https://github.com/fmtlib/fmt.git
  GIT_TAG        10.2.1
)
FetchContent_MakeAvailable(fmt)

add_executable(myapp main.cpp)
target_link_libraries(myapp PRIVATE nlohmann_json::nlohmann_json fmt::fmt)
```

```cpp
// main.cpp
#include <nlohmann/json.hpp>
#include <fmt/core.h>

int main() {
    auto j = nlohmann::json::parse(R"({"name":"Alice","age":30})");
    fmt::println("Hello, {}! Age: {}", j["name"].get<std::string>(), j["age"].get<int>());
}
```

## Gotchas

- The C++ package ecosystem is fragmented — `vcpkg` and `Conan` are not universally compatible with all build systems. Always check compatibility before committing to one.
- `FetchContent` downloads at CMake configure time; in CI, cache the `_deps` directory to avoid repeated downloads. Pin to a specific tag/hash for reproducible builds.

---
title: "Build Tools"
language: "c"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

C's primary build tools are **Make** (GNU Make) for simple to medium projects and **CMake** for larger, cross-platform projects. **Meson** is a modern alternative to CMake with cleaner syntax. **Ninja** is the preferred low-level build backend for speed. Compilers: **GCC** and **Clang** on POSIX, **MSVC** on Windows. Static analysis tools include `cppcheck`, `clang-tidy`, and `scan-build` (Clang Static Analyzer).

## Example

```makefile
# GNUmakefile — simple but complete
CC      := gcc
CFLAGS  := -std=c11 -Wall -Wextra -Wpedantic -Wshadow
CFLAGS  += -O2 -DNDEBUG    # release flags
DBGFLAGS:= -g3 -fsanitize=address,undefined  # debug flags
LDFLAGS :=
LDLIBS  := -lm

SRC_DIR := src
OBJ_DIR := build/obj
TARGET  := build/myapp

SRCS := $(wildcard $(SRC_DIR)/*.c)
OBJS := $(patsubst $(SRC_DIR)/%.c,$(OBJ_DIR)/%.o,$(SRCS))

$(TARGET): $(OBJS)
	@mkdir -p $(@D)
	$(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS) $(LDLIBS)

$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c
	@mkdir -p $(@D)
	$(CC) $(CFLAGS) -c $< -o $@

.PHONY: clean debug
clean:
	rm -rf build/

debug: CFLAGS := $(DBGFLAGS)
debug: $(TARGET)
```

```bash
# CMake build
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --parallel

# GCC with AddressSanitizer (find memory bugs)
gcc -fsanitize=address,undefined -g -o myapp main.c && ./myapp

# Clang Static Analyzer
scan-build gcc -o myapp main.c

# clang-tidy linting
clang-tidy src/*.c -- -std=c11 -Iinclude
```

## Gotchas

- GNU Make uses tabs (not spaces) for recipe indentation — a space instead of a tab produces the cryptic `"missing separator"` error. Configure your editor to insert tabs in Makefiles.
- `-fsanitize=address,undefined` is invaluable during development for catching buffer overflows, use-after-free, and undefined behavior. Always run the test suite with sanitizers enabled.

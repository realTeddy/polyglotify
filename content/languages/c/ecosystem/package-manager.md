---
title: "Package Manager"
language: "c"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

C has no single universal package manager — the ecosystem is fragmented. System package managers (`apt`, `dnf`, `brew`, `vcpkg`, `Conan`) are commonly used. **Conan** and **vcpkg** are the closest to dedicated C/C++ package managers. **CMake FetchContent** downloads source dependencies at build time. On POSIX systems, `pkg-config` is the standard mechanism for libraries to advertise their compiler/linker flags.

## Example

```bash
# System packages (Debian/Ubuntu)
sudo apt install libssl-dev libcurl4-openssl-dev

# pkg-config — find compiler flags for a library
pkg-config --cflags --libs libcurl
# Output: -I/usr/include/x86_64-linux-gnu  -lcurl

# Use in Makefile
CFLAGS  += $(shell pkg-config --cflags libcurl)
LDFLAGS += $(shell pkg-config --libs   libcurl)
```

```makefile
# Makefile — traditional C build + pkg-config
CC      = gcc
CFLAGS  = -std=c11 -Wall -Wextra -O2 $(shell pkg-config --cflags libcurl)
LDFLAGS = $(shell pkg-config --libs libcurl)
TARGET  = myapp
SRCS    = main.c network.c utils.c
OBJS    = $(SRCS:.c=.o)

$(TARGET): $(OBJS)
	$(CC) $(OBJS) -o $@ $(LDFLAGS)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJS) $(TARGET)

.PHONY: clean
```

```cmake
# Alternative: CMake + pkg-config
find_package(PkgConfig REQUIRED)
pkg_check_modules(CURL REQUIRED libcurl)
target_include_directories(myapp PRIVATE ${CURL_INCLUDE_DIRS})
target_link_libraries(myapp PRIVATE ${CURL_LIBRARIES})
```

## Gotchas

- `pkg-config` is POSIX-centric — on Windows it requires extra setup (MSYS2 or vcpkg). Windows C projects typically use vcpkg or manual DLL/import library management.
- Vendoring (copying library source directly into the project) is common in embedded and systems C, avoiding dependency on a package manager entirely. It trades convenience for control.

---
title: "Testing"
language: "c"
feature: "testing"
category: "ecosystem"
applicable: true
---

C testing frameworks are simpler than those in managed languages. **Unity** (ThrowTheSwitch) is popular for embedded C. **Check** is a POSIX unit test framework with forking for isolation. **cmocka** supports mocking. Many C projects use **a hand-rolled test harness** — a `main()` that runs functions and checks return values. CMake's `CTest` integrates all of these.

## Example

```c
/* tests/test_math.c — simple hand-rolled test harness */
#include <stdio.h>
#include <math.h>
#include <assert.h>
#include "../include/mylib/math.h"

static int passed = 0;
static int failed = 0;

#define EXPECT_EQ(a, b) do {                                          \
    if ((a) == (b)) { passed++; }                                      \
    else { fprintf(stderr, "FAIL %s:%d: %s != %s (%d != %d)\n",       \
           __FILE__, __LINE__, #a, #b, (int)(a), (int)(b)); failed++; } \
} while(0)

#define EXPECT_DOUBLE_EQ(a, b) do {                                    \
    if (fabs((a) - (b)) < 1e-9) { passed++; }                         \
    else { fprintf(stderr, "FAIL: %g != %g\n", (double)(a), (double)(b)); failed++; } \
} while(0)

static void test_add(void) {
    EXPECT_EQ(add(2, 3), 5);
    EXPECT_EQ(add(-1, 1), 0);
    EXPECT_EQ(add(0, 0), 0);
}

static void test_divide(void) {
    EXPECT_DOUBLE_EQ(divide(10.0, 4.0), 2.5);
    EXPECT_DOUBLE_EQ(divide(0.0, 5.0), 0.0);
}

int main(void) {
    test_add();
    test_divide();

    printf("Results: %d passed, %d failed\n", passed, failed);
    return failed > 0 ? 1 : 0;
}
```

```bash
# Build and run via CMake/CTest
cmake -S . -B build && cmake --build build
cd build && ctest --output-on-failure

# Or directly
gcc -o test_math tests/test_math.c src/math.c -lm && ./test_math
```

## Gotchas

- `assert()` aborts the process and is disabled when `NDEBUG` is defined (i.e., in release builds). Never use `assert()` for production error handling or test assertions that should run in release — use explicit checks instead.
- Test executables should return non-zero on failure so that `make`, `ctest`, and CI systems detect failures automatically.

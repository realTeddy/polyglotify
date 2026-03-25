---
title: "Types"
language: "c"
feature: "types"
category: "basics"
applicable: true
---

C's type system is minimal: integer types (`char`, `short`, `int`, `long`, `long long`), floating-point types (`float`, `double`, `long double`), pointer types (`T*`), array types, struct, union, and enum. Most integer sizes are platform-dependent; use `<stdint.h>` (C99) for portable fixed-width types. C has no boolean type until C99 (`_Bool` / `<stdbool.h>`), no string type (strings are `char` arrays), and no generics.

## Example

```c
#include <stdint.h>   /* fixed-width integer types */
#include <stdbool.h>  /* bool */
#include <stdio.h>

int main(void) {
    /* Fixed-width integers (portable) */
    int8_t  tiny  = 127;
    int32_t i32   = 2147483647;
    int64_t i64   = 9223372036854775807LL;
    uint32_t u32  = 0xDEADBEEFU;

    /* size_t — unsigned type for sizes and array indices */
    size_t len = 100;

    /* Floating point */
    float  f = 3.14f;
    double d = 3.141592653589793;

    /* C strings — null-terminated char array */
    char greeting[] = "Hello, C!";   /* array, writable */
    const char *msg = "World";        /* pointer to string literal, read-only */

    /* Struct */
    struct Point { int x; int y; };
    struct Point p = {3, 4};

    /* Enum */
    enum Color { RED, GREEN, BLUE };
    enum Color c = GREEN;

    /* Union — all members share the same memory */
    union Data { int i; float f; char bytes[4]; };
    union Data data;
    data.i = 42;

    printf("i32=%d, i64=%lld, p=(%d,%d)\n", i32, i64, p.x, p.y);
    return 0;
}
```

## Gotchas

- `int` size varies by platform (typically 32-bit today but historically 16-bit). Use `int32_t`/`int64_t` from `<stdint.h>` when exact width matters.
- Signed integer overflow is undefined behavior in C, just as in C++. Unsigned integer overflow is well-defined (wraps modulo 2^N).

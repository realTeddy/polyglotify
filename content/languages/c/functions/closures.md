---
title: "Closures"
language: "c"
feature: "closures"
category: "functions"
applicable: false
---

Standard C (C89/C99/C11/C17) does not have closures or anonymous functions. Functions cannot be defined inside other functions (nested functions are a GCC extension, not standard C). The typical alternatives are: passing a callback function pointer along with a `void *user_data` context pointer, or using a struct to bundle a function pointer with its associated state.

## Example

```c
#include <stdio.h>
#include <stdlib.h>

/* Simulating a closure with a function pointer + context */

/* The "closure" state */
typedef struct {
    int multiplier;
} MultiplyContext;

/* The "closure body" — a plain function taking its context */
int apply_multiply(const void *ctx, int x) {
    const MultiplyContext *m = (const MultiplyContext *)ctx;
    return x * m->multiplier;
}

/* Higher-order function that accepts a callback + context */
void transform_array(int *arr, size_t len,
                     int (*fn)(const void *ctx, int),
                     const void *ctx) {
    for (size_t i = 0; i < len; i++)
        arr[i] = fn(ctx, arr[i]);
}

/* qsort-compatible comparator (function pointer, no context) */
int compare_desc(const void *a, const void *b) {
    return (*(const int *)b) - (*(const int *)a);
}

int main(void) {
    int nums[] = {1, 2, 3, 4, 5};

    MultiplyContext ctx = {.multiplier = 3};
    transform_array(nums, 5, apply_multiply, &ctx);

    for (size_t i = 0; i < 5; i++) printf("%d ", nums[i]); /* 3 6 9 12 15 */
    printf("\n");

    qsort(nums, 5, sizeof(int), compare_desc);
    for (size_t i = 0; i < 5; i++) printf("%d ", nums[i]); /* 15 12 9 6 3 */
    printf("\n");

    return 0;
}
```

## Gotchas

- The GCC `__block` nested function extension is not standard C and is not supported by MSVC or Clang in standard mode. Clang's Blocks extension (`^{ }` syntax) is available on Apple platforms but is also non-standard.
- For complex callback scenarios in C, consider the Continuation-Passing Style pattern or wrapping everything in a struct that holds both function pointer and state (an explicit vtable).

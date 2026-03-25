---
title: "Operators"
language: "c"
feature: "operators"
category: "basics"
applicable: true
---

C provides arithmetic, relational, logical, bitwise, assignment, and pointer operators. There is no operator overloading. The `sizeof` operator returns the byte size of a type or expression. Pointer arithmetic (`ptr + n` advances by `n * sizeof(*ptr)` bytes) is fundamental. The comma operator evaluates left-to-right and yields the rightmost value. Operator precedence has many levels — parentheses are always clearer than relying on precedence.

## Example

```c
#include <stdio.h>

int main(void) {
    /* Arithmetic */
    int a = 10, b = 3;
    printf("%d %d %d %d %d\n", a+b, a-b, a*b, a/b, a%b); /* 13 7 30 3 1 */

    /* Bitwise */
    int flags = 0b1010;
    int mask  = 0b1100;
    printf("%d\n", flags & mask);  /* 8  (0b1000) */
    printf("%d\n", flags | mask);  /* 14 (0b1110) */
    printf("%d\n", flags ^ mask);  /* 6  (0b0110) */
    printf("%d\n", ~flags & 0xF);  /* 5  (0b0101) */
    printf("%d\n", flags << 1);    /* 20 (0b10100) */
    printf("%d\n", flags >> 1);    /* 5  (0b0101) */

    /* sizeof */
    printf("int=%zu, double=%zu, pointer=%zu\n",
           sizeof(int), sizeof(double), sizeof(void*));

    /* Pointer arithmetic */
    int arr[] = {10, 20, 30, 40};
    int *p = arr;
    printf("%d %d\n", *p, *(p + 2));  /* 10 30 */

    /* Ternary */
    int max = (a > b) ? a : b;

    /* Comma operator (rare in idiomatic C) */
    int x = (a++, b++, a + b);  /* x = 11 + 4 = 15 */

    return 0;
}
```

## Gotchas

- Integer division truncates toward zero: `7 / 2 == 3`. The result of `%` with negative operands is implementation-defined in C89 but specified as truncation-toward-zero in C99+.
- `==` compares values; `=` assigns. The accidental `if (x = 0)` is a common bug — some compilers warn about it; enable `-Wall -Wextra` to catch it.

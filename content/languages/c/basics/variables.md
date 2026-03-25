---
title: "Variables"
language: "c"
feature: "variables"
category: "basics"
applicable: true
---

C variables are statically typed and must be declared before use. There is no type inference — every declaration requires an explicit type. Storage classes (`auto`, `static`, `extern`, `register`) control lifetime and linkage. `const` marks a variable read-only after initialization. C99 allows declarations anywhere in a block (not just at the top); C89 requires all declarations before statements.

## Example

```c
#include <stdio.h>
#include <stdbool.h>  /* C99: bool, true, false */

int main(void) {
    /* Explicit typed declarations */
    int age = 30;
    double pi = 3.14159;
    char initial = 'A';
    bool active = true;   /* requires <stdbool.h> in C99 */

    /* const — read-only after initialization */
    const int MAX_SIZE = 100;

    /* C99: mix declarations and code */
    int x = 5;
    int y = x * 2;

    /* Pointer */
    int *ptr = &x;
    *ptr = 42;          /* x is now 42 */

    /* static — persists across function calls */
    static int call_count = 0;
    call_count++;

    /* Multiple declarations of same type */
    int a = 1, b = 2, c = 3;

    printf("age=%d, pi=%.2f\n", age, pi);
    return 0;
}
```

## Gotchas

- Uninitialized local variables contain indeterminate (garbage) values — reading them is undefined behavior. Always initialize, especially pointers (use `NULL` / `nullptr` in C23).
- `const int *p` means the pointed-to value is const; `int * const p` means the pointer itself is const. The placement of `const` relative to `*` matters.

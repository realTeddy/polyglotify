---
title: "Control Flow"
language: "c"
feature: "control-flow"
category: "basics"
applicable: true
---

C provides `if/else`, `switch` (with fall-through), `for`, `while`, `do/while`, `break`, `continue`, and `goto`. There are no range-based loops, pattern matching, or switch expressions. `switch` dispatches on integer-valued expressions only. `goto` is occasionally used for cleanup in C (the "cleanup goto" pattern is idiomatic in kernel and systems code to avoid duplicating error teardown logic).

## Example

```c
#include <stdio.h>

/* Cleanup goto pattern — common in systems/kernel C */
int open_and_process(const char *path) {
    FILE *f = NULL;
    char *buf = NULL;
    int result = -1;

    f = fopen(path, "r");
    if (!f) goto cleanup;

    buf = malloc(4096);
    if (!buf) goto cleanup;

    /* ... process file ... */
    result = 0;

cleanup:
    free(buf);
    if (f) fclose(f);
    return result;
}

int main(void) {
    /* if / else if / else */
    int score = 85;
    if      (score >= 90) printf("A\n");
    else if (score >= 80) printf("B\n");
    else                  printf("C\n");

    /* switch — falls through unless break */
    int day = 2;
    switch (day) {
        case 1: printf("Mon"); break;
        case 2: printf("Tue"); break;  /* explicit break */
        case 3: /* fall-through intentional */
        case 4: printf("Wed/Thu"); break;
        default: printf("Other"); break;
    }

    /* for loop */
    int sum = 0;
    for (int i = 1; i <= 10; i++) sum += i;  /* C99: declare in init */
    printf("\nsum=%d\n", sum);  /* 55 */

    /* while */
    int n = 1;
    while (n < 100) n *= 2;
    printf("n=%d\n", n);  /* 128 */

    return 0;
}
```

## Gotchas

- `switch` fall-through is implicit — forgetting a `break` is a common source of bugs. Some compilers warn about unintentional fall-through (GCC `-Wimplicit-fallthrough`).
- C has no `bool` short-circuit control flow special cases — `0` is false, any non-zero is true. `&&` and `||` short-circuit, but the expressions must evaluate to integers, not typed booleans.

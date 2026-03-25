---
title: "Return Values"
language: "c"
feature: "return-values"
category: "functions"
applicable: true
---

C functions return a single value. `void` functions return nothing. Multiple values are returned via out-parameters (pointers), or by returning a struct. The idiomatic C pattern for error-or-value is to return an `int` status code (0 = success) and write the result through an output pointer. Dynamically allocated memory returned by a function must be freed by the caller.

## Example

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>

/* Return a struct — small structs are efficient to return by value */
typedef struct { int x; int y; } Point;

Point make_point(int x, int y) {
    return (Point){x, y};   /* compound literal */
}

/* Error code + out parameter idiom */
int safe_divide(int a, int b, int *result) {
    if (b == 0) return -1;  /* error */
    *result = a / b;
    return 0;               /* success */
}

/* Return heap-allocated string — caller must free */
char *build_greeting(const char *name) {
    size_t len = strlen("Hello, ") + strlen(name) + 2;
    char *s = malloc(len);
    if (!s) return NULL;  /* allocation failed */
    snprintf(s, len, "Hello, %s!", name);
    return s;
}

/* errno pattern — used by standard library functions */
#include <math.h>
double safe_log(double x) {
    if (x <= 0) {
        errno = EDOM;
        return -1.0;
    }
    return log(x);
}

int main(void) {
    Point p = make_point(3, 4);
    printf("(%d, %d)\n", p.x, p.y);  /* (3, 4) */

    int result;
    if (safe_divide(10, 2, &result) == 0)
        printf("result=%d\n", result);  /* 5 */

    char *msg = build_greeting("Alice");
    if (msg) {
        printf("%s\n", msg);  /* Hello, Alice! */
        free(msg);            /* caller frees */
    }

    return 0;
}
```

## Gotchas

- Returning a pointer to a local (stack) variable produces a dangling pointer — the stack frame is invalid after the function returns. Only return pointers to heap-allocated memory, global variables, or data passed in by the caller.
- Ignoring a non-void return value (especially error codes) is valid C but a common source of silent failures. Use `[[nodiscard]]` in C23 or the `__attribute__((warn_unused_result))` GCC extension to get compiler warnings.

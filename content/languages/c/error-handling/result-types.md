---
title: "Result Types"
language: "c"
feature: "result-types"
category: "error-handling"
applicable: false
---

C has no standard `Result` type, but the pattern is commonly implemented as a struct containing a success flag (or error code) and a value. This is more explicit than out-parameters and groups error and value together. Large C projects (Linux, SQLite, cURL) define their own error code enums and conventions. C11's anonymous union feature makes the result struct ergonomic.

## Example

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <math.h>

/* Result type for double */
typedef struct {
    int    ok;      /* non-zero on success */
    union {
        double value;
        struct { int code; char msg[64]; } error;
    };
} DoubleResult;

static DoubleResult ok_double(double v) {
    return (DoubleResult){ .ok = 1, .value = v };
}

static DoubleResult err_double(int code, const char *msg) {
    DoubleResult r = { .ok = 0 };
    r.error.code = code;
    strncpy(r.error.msg, msg, 63);
    return r;
}

DoubleResult safe_div(double a, double b) {
    if (b == 0.0) return err_double(EDOM, "division by zero");
    return ok_double(a / b);
}

DoubleResult safe_sqrt(double x) {
    if (x < 0.0) return err_double(EDOM, "sqrt of negative");
    return ok_double(sqrt(x));
}

/* Simulated pipeline */
DoubleResult pipeline(double a, double b) {
    DoubleResult r = safe_div(a, b);
    if (!r.ok) return r;
    return safe_sqrt(r.value);
}

int main(void) {
    DoubleResult r1 = pipeline(16.0, 4.0);
    if (r1.ok)
        printf("Result: %.2f\n", r1.value);   /* 2.00 */

    DoubleResult r2 = pipeline(4.0, 0.0);
    if (!r2.ok)
        printf("Error [%d]: %s\n", r2.error.code, r2.error.msg);
        /* Error [33]: division by zero */

    return 0;
}
```

## Gotchas

- Anonymous unions (used above for ergonomics) are C11; in C99 you must name the union and access it as `r.error.code` or define separate named fields.
- This pattern copies the value by struct value, which is efficient for small types like `double` but may add overhead for large structs — use a pointer-based result for large payloads.

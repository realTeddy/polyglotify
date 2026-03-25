---
title: "Common Patterns"
language: "c"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Idiomatic C relies on KISS (Keep It Simple, Stupid), explicit resource management, and defensive programming. Key patterns: opaque types for encapsulation, function pointers for polymorphism, the cleanup-goto for error handling, `const`-correctness throughout, and X-macros for DRY enumeration-heavy code. Modern C (C11/C17) adds `_Generic`, `_Static_assert`, `_Atomic`, and thread-local storage (`_Thread_local`).

## Example

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

/* 1. X-macro — DRY enum + string table */
#define STATUS_LIST(X)     \
    X(STATUS_OK,     "OK") \
    X(STATUS_ERROR,  "Error") \
    X(STATUS_TIMEOUT,"Timeout") \
    X(STATUS_BUSY,   "Busy")

typedef enum {
#define X(id, str) id,
    STATUS_LIST(X)
#undef X
    STATUS_COUNT
} Status;

static const char *status_name(Status s) {
    static const char *names[] = {
#define X(id, str) str,
        STATUS_LIST(X)
#undef X
    };
    return s < STATUS_COUNT ? names[s] : "Unknown";
}

/* 2. Cleanup goto pattern */
int open_and_process(const char *path, long *out_size) {
    FILE *f = NULL;
    char *buf = NULL;
    int result = -1;

    f = fopen(path, "rb");
    if (!f) goto done;

    fseek(f, 0, SEEK_END);
    *out_size = ftell(f);
    result = 0;

done:
    free(buf);  /* safe to free NULL */
    if (f) fclose(f);
    return result;
}

/* 3. Flexible array member — struct + data in one allocation */
typedef struct { size_t len; int data[]; } IntVec;

IntVec *intvec_new(size_t n) {
    IntVec *v = malloc(sizeof(IntVec) + n * sizeof(int));
    if (v) v->len = n;
    return v;
}

/* 4. Static assert — compile-time checks */
_Static_assert(sizeof(int) >= 4, "int must be at least 32 bits");
_Static_assert(sizeof(void*) == 8, "64-bit only build");

int main(void) {
    printf("%s\n", status_name(STATUS_TIMEOUT)); /* Timeout */

    IntVec *v = intvec_new(5);
    for (size_t i = 0; i < v->len; i++) v->data[i] = (int)(i * i);
    for (size_t i = 0; i < v->len; i++) printf("%d ", v->data[i]);
    printf("\n");  /* 0 1 4 9 16 */
    free(v);

    return 0;
}
```

## Gotchas

- X-macros tightly couple the enum and string table, preventing them from getting out of sync. The pattern is powerful but can confuse developers unfamiliar with it — add a comment explaining the technique.
- Flexible array members (`int data[]`) make the struct variable-sized; you cannot put such a struct in an array or use `sizeof` to get the full size. Always heap-allocate with the data included.

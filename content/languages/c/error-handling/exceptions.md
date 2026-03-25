---
title: "Exceptions"
language: "c"
feature: "exceptions"
category: "error-handling"
applicable: false
---

C has no exceptions. Error handling is done through return codes (integers, `NULL`, or typed error enums), the global `errno` variable (set by standard library functions), or `setjmp`/`longjmp` for non-local exits (rarely used; does not run destructors). The idiomatic C approach is: check every return value, propagate errors upward via return codes, and use the cleanup-goto pattern to release resources consistently.

## Example

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>

/* Error code enum */
typedef enum {
    ERR_OK    = 0,
    ERR_IO    = 1,
    ERR_PARSE = 2,
    ERR_OOM   = 3,
} ErrorCode;

/* Process function — returns error code, writes result via out-param */
ErrorCode process_file(const char *path, long *line_count) {
    FILE *f = NULL;
    char *buf = NULL;
    ErrorCode rc = ERR_OK;

    f = fopen(path, "r");
    if (!f) { rc = ERR_IO; goto cleanup; }

    buf = malloc(4096);
    if (!buf) { rc = ERR_OOM; goto cleanup; }

    long count = 0;
    while (fgets(buf, 4096, f)) count++;
    if (ferror(f)) { rc = ERR_IO; goto cleanup; }

    *line_count = count;

cleanup:
    free(buf);
    if (f) fclose(f);
    return rc;
}

/* errno pattern — reading standard library errors */
#include <math.h>
void try_sqrt(double x) {
    errno = 0;
    double result = sqrt(x);
    if (errno != 0) {
        fprintf(stderr, "sqrt(%g) failed: %s\n", x, strerror(errno));
    } else {
        printf("sqrt(%g) = %g\n", x, result);
    }
}

int main(void) {
    long lines;
    ErrorCode err = process_file("data.txt", &lines);
    switch (err) {
        case ERR_OK:  printf("Lines: %ld\n", lines); break;
        case ERR_IO:  fprintf(stderr, "I/O error: %s\n", strerror(errno)); break;
        case ERR_OOM: fprintf(stderr, "Out of memory\n"); break;
        default:      fprintf(stderr, "Unknown error %d\n", err); break;
    }
    return (int)err;
}
```

## Gotchas

- `errno` is a thread-local variable in modern POSIX implementations, but only meaningful immediately after a library call fails — it can be overwritten by any subsequent library call.
- `setjmp`/`longjmp` skips local variable destructors (there are none in C) but does not release heap memory or close file handles — use only with extreme care.

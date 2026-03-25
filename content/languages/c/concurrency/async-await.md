---
title: "Async / Await"
language: "c"
feature: "async-await"
category: "concurrency"
applicable: false
---

C has no async/await syntax. Asynchronous programming in C is done through callbacks (event loops), non-blocking I/O with `select`/`poll`/`epoll` (POSIX), or coroutine-style state machines implemented manually or with `setjmp`/`longjmp`. Frameworks like **libuv** (used by Node.js), **libevent**, and **libev** provide event-loop abstractions. C23 does not add async/await either — it remains a language-level feature absent from standard C.

## Example

```c
/* Event-loop + callback pattern (conceptual — libuv style) */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Simulated async I/O with callbacks */
typedef void (*ReadCallback)(int status, const char *data, void *user_data);

typedef struct {
    const char  *path;
    ReadCallback callback;
    void        *user_data;
} ReadRequest;

/* "Async" file read — in a real event loop this would be non-blocking */
void async_read_file(const char *path, ReadCallback cb, void *user_data) {
    FILE *f = fopen(path, "r");
    if (!f) {
        cb(-1, NULL, user_data);
        return;
    }
    char buf[256];
    size_t n = fread(buf, 1, sizeof(buf)-1, f);
    buf[n] = '\0';
    fclose(f);
    cb(0, buf, user_data);   /* call the callback with result */
}

/* User callback */
void on_file_read(int status, const char *data, void *user_data) {
    const char *filename = (const char *)user_data;
    if (status != 0) {
        fprintf(stderr, "Failed to read %s\n", filename);
        return;
    }
    printf("Read from %s: %.40s...\n", filename, data);
}

/* Manual coroutine via computed goto (GCC extension) */
typedef struct {
    void *resume_point;  /* label pointer */
    int   state;
    int   value;
} Coroutine;

int main(void) {
    async_read_file("/etc/hostname", on_file_read, (void *)"/etc/hostname");
    return 0;
}
```

## Gotchas

- Callback-based C code ("callback hell") becomes deeply nested and hard to maintain for complex async pipelines. Event-loop frameworks like libuv use handle and request objects to manage state across callbacks.
- Non-blocking I/O with `epoll` requires careful state management — each file descriptor needs an associated state machine tracking where in the protocol it is.

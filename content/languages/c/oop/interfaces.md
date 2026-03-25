---
title: "Interfaces"
language: "c"
feature: "interfaces"
category: "oop"
applicable: false
---

C has no interfaces. The equivalent is a **struct of function pointers** (a vtable). Any struct that provides matching function pointers "implements" the interface. This is the mechanism used by POSIX file descriptors (`read`, `write`, `close` being the interface), the Linux VFS layer, and countless C libraries. The pattern is more explicit than language-level interfaces but just as powerful.

## Example

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Interface: Writer */
typedef struct Writer {
    int  (*write)(struct Writer *self, const char *data, size_t len);
    void (*flush)(struct Writer *self);
    void (*destroy)(struct Writer *self);
} Writer;

/* Helper to call through the interface */
static inline int  writer_write(Writer *w, const char *s, size_t n) { return w->write(w, s, n); }
static inline void writer_flush(Writer *w)   { w->flush(w); }
static inline void writer_destroy(Writer *w) { w->destroy(w); }

/* Implementation 1: stdout writer */
static int stdout_write(Writer *self, const char *data, size_t len) {
    (void)self;
    return fwrite(data, 1, len, stdout);
}
static void stdout_flush(Writer *self)   { (void)self; fflush(stdout); }
static void stdout_destroy(Writer *self) { (void)self; }

Writer *stdout_writer_new(void) {
    static const Writer vtable = {stdout_write, stdout_flush, stdout_destroy};
    Writer *w = malloc(sizeof(Writer));
    *w = vtable;
    return w;
}

/* Implementation 2: buffer writer */
typedef struct {
    Writer base;
    char  *buf;
    size_t len;
    size_t cap;
} BufWriter;

static int bufwriter_write(Writer *self, const char *data, size_t len) {
    BufWriter *bw = (BufWriter *)self;
    /* simplified: no realloc */
    memcpy(bw->buf + bw->len, data, len);
    bw->len += len;
    return (int)len;
}
static void bufwriter_flush(Writer *self) { (void)self; }
static void bufwriter_destroy(Writer *self) { free(((BufWriter*)self)->buf); free(self); }

/* Using the interface polymorphically */
void write_greeting(Writer *w, const char *name) {
    writer_write(w, "Hello, ", 7);
    writer_write(w, name, strlen(name));
    writer_write(w, "!\n", 2);
    writer_flush(w);
}

int main(void) {
    Writer *out = stdout_writer_new();
    write_greeting(out, "C");   /* Hello, C! */
    writer_destroy(out);
    free(out);
    return 0;
}
```

## Gotchas

- C function pointer casting rules are strict — a function pointer cast to an incompatible type and called is undefined behavior. All implementations must exactly match the signature declared in the vtable struct.
- Unlike C++ virtual dispatch, C vtable calls require an extra pointer dereference. For hot paths where every nanosecond counts, this can matter; profile before optimizing.

---
title: "Generics"
language: "c"
feature: "generics"
category: "oop"
applicable: false
---

C has no generics. The traditional approaches are: `void *` for type-erased containers (the `qsort`/`bsearch` approach, requiring casts and function pointers), macro-based code generation (defining a type-specific data structure for each element type via macros), or C11's `_Generic` selection expression for type dispatching at compile time. C11 `_Generic` is the closest to generics, enabling overloaded-function-like dispatch.

## Example

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* 1. void* approach — type-erased (like Java pre-generics) */
typedef struct {
    void  *data;
    size_t element_size;
    size_t length;
    size_t capacity;
} GenericArray;

GenericArray ga_create(size_t elem_size) {
    return (GenericArray){ malloc(16 * elem_size), elem_size, 0, 16 };
}

void ga_push(GenericArray *a, const void *elem) {
    if (a->length == a->capacity) {
        a->capacity *= 2;
        a->data = realloc(a->data, a->capacity * a->element_size);
    }
    memcpy((char *)a->data + a->length * a->element_size, elem, a->element_size);
    a->length++;
}

void *ga_get(const GenericArray *a, size_t i) {
    return (char *)a->data + i * a->element_size;
}

/* 2. _Generic — compile-time type dispatch (C11) */
#define abs_generic(x) _Generic((x),    \
    int:    abs,                          \
    long:   labs,                         \
    double: fabs,                         \
    float:  fabsf                         \
)(x)

/* 3. Macro-generated typed list */
#define DEFINE_STACK(Type, Name)                                \
typedef struct { Type *data; int top; int cap; } Name;          \
static inline Name Name##_new(void) {                           \
    return (Name){ malloc(16 * sizeof(Type)), 0, 16 };          \
}                                                               \
static inline void Name##_push(Name *s, Type v) {               \
    if (s->top == s->cap) { s->cap *= 2; s->data = realloc(s->data, s->cap * sizeof(Type)); } \
    s->data[s->top++] = v; }                                    \
static inline Type Name##_pop(Name *s) { return s->data[--s->top]; }

DEFINE_STACK(int, IntStack)
DEFINE_STACK(double, DblStack)

int main(void) {
    printf("%d\n", abs_generic(-5));     /* 5 (calls abs) */
    printf("%.1f\n", abs_generic(-3.0)); /* 3.0 (calls fabs) */

    IntStack s = IntStack_new();
    IntStack_push(&s, 10);
    IntStack_push(&s, 20);
    printf("%d\n", IntStack_pop(&s));   /* 20 */

    free(s.data);
    return 0;
}
```

## Gotchas

- `void *` containers require careful casting — the compiler cannot catch type mismatches. A `void *` array of `int` will silently accept a `double *` being pushed.
- Macro-generated code (approach 3) produces code size proportional to the number of instantiations and can generate confusing error messages. Prefer header-only `static inline` functions with `void *` and a size parameter when code size matters.

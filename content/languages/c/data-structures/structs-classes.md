---
title: "Structs & Classes"
language: "c"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

C has `struct` for grouping data and `union` for overlapping storage, but no `class`. There is no encapsulation, inheritance, or methods. The C OOP idiom uses structs with function pointers as "vtables" and opaque types (forward-declared structs with implementation hidden in the `.c` file) for encapsulation. C11 adds anonymous structs and unions. `typedef struct` eliminates the need to write `struct` before the type name everywhere.

## Example

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>

/* Simple named struct */
typedef struct {
    double x;
    double y;
} Vec2;

double vec2_length(Vec2 v) {
    return sqrt(v.x * v.x + v.y * v.y);
}

Vec2 vec2_add(Vec2 a, Vec2 b) {
    return (Vec2){a.x + b.x, a.y + b.y};
}

/* Opaque type for encapsulation */
/* --- stack.h --- */
typedef struct Stack Stack;
Stack *stack_create(void);
void   stack_destroy(Stack *s);
void   stack_push(Stack *s, int value);
int    stack_pop(Stack *s);
int    stack_empty(const Stack *s);

/* --- stack.c --- */
struct Stack {            /* definition hidden from callers */
    int  *data;
    int   top;
    int   capacity;
};

Stack *stack_create(void) {
    Stack *s = malloc(sizeof(Stack));
    s->data = malloc(16 * sizeof(int));
    s->top = 0; s->capacity = 16;
    return s;
}
void stack_destroy(Stack *s) { free(s->data); free(s); }
void stack_push(Stack *s, int v) {
    if (s->top == s->capacity) {
        s->capacity *= 2;
        s->data = realloc(s->data, s->capacity * sizeof(int));
    }
    s->data[s->top++] = v;
}
int stack_pop(Stack *s)  { return s->data[--s->top]; }
int stack_empty(const Stack *s) { return s->top == 0; }

int main(void) {
    Vec2 a = {3, 0}, b = {0, 4};
    printf("%.1f\n", vec2_length(vec2_add(a, b)));  /* 5.0 */

    Stack *s = stack_create();
    stack_push(s, 10); stack_push(s, 20); stack_push(s, 30);
    while (!stack_empty(s)) printf("%d ", stack_pop(s));
    printf("\n");  /* 30 20 10 */
    stack_destroy(s);
    return 0;
}
```

## Gotchas

- C structs have no access control — all fields are public. Encapsulation is achieved by forward-declaring the struct in the header and keeping the definition in the `.c` file (opaque pointer idiom).
- Bit fields (`int flag : 1;`) pack multiple values into a single word but have implementation-defined padding and signedness — avoid them for serialization or network protocols.

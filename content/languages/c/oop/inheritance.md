---
title: "Inheritance"
language: "c"
feature: "inheritance"
category: "oop"
applicable: false
---

C has no inheritance. The closest idiom is **struct embedding**: placing a parent struct as the first member of a child struct, then casting between their pointers. This works because C guarantees the first member has zero offset. GObject (used by GTK) and the Linux kernel's driver model both use this pattern extensively. Virtual dispatch is simulated with function pointer tables (vtables stored in a struct).

## Example

```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

/* "Base class" — vtable (virtual function table) */
typedef struct Shape Shape;

typedef struct {
    double (*area)(const Shape *self);
    double (*perimeter)(const Shape *self);
    const char *(*name)(void);
    void (*destroy)(Shape *self);
} ShapeVTable;

/* "Base" struct — vtable pointer must be first */
struct Shape {
    const ShapeVTable *vtable;
};

/* Convenience macros / inline calls */
static inline double shape_area(const Shape *s)      { return s->vtable->area(s); }
static inline double shape_perimeter(const Shape *s) { return s->vtable->perimeter(s); }
static inline void   shape_destroy(Shape *s)         { s->vtable->destroy(s); }

/* "Derived class" Circle */
typedef struct {
    Shape base;       /* base must be FIRST — zero offset */
    double radius;
} Circle;

static double circle_area(const Shape *self) {
    return M_PI * ((const Circle *)self)->radius * ((const Circle *)self)->radius;
}
static double circle_perimeter(const Shape *self) {
    return 2 * M_PI * ((const Circle *)self)->radius;
}
static const char *circle_name(void) { return "Circle"; }
static void circle_destroy(Shape *self) { free(self); }

static const ShapeVTable circle_vtable = {
    circle_area, circle_perimeter, circle_name, circle_destroy
};

Shape *circle_new(double radius) {
    Circle *c = malloc(sizeof(Circle));
    c->base.vtable = &circle_vtable;
    c->radius = radius;
    return (Shape *)c;  /* upcast: safe because base is first member */
}

int main(void) {
    Shape *shapes[] = { circle_new(5.0), circle_new(3.0) };
    for (int i = 0; i < 2; i++) {
        printf("area=%.2f\n", shape_area(shapes[i]));
        shape_destroy(shapes[i]);
    }
    return 0;
}
```

## Gotchas

- The base struct must be the first member for safe pointer casting. If it is not first, the cast `(Shape *)derived` has undefined behavior.
- This pattern is powerful but verbose. Every "derived type" requires its own vtable, constructor, and set of functions. In C, it is often simpler to compose rather than inherit.

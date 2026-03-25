---
title: "Tuples"
language: "c"
feature: "tuples"
category: "data-structures"
applicable: false
---

C has no tuple type. The equivalent is a **struct** with named fields. Structs in C serve the purpose of grouping heterogeneous data, just as tuples do in other languages, but require explicit field names. C99 compound literals allow inline struct creation without a separate variable. Returning a struct by value is efficient for small structs as modern ABIs pass them in registers.

## Example

```c
#include <stdio.h>
#include <math.h>

/* Named struct replaces a tuple */
typedef struct {
    int quotient;
    int remainder;
} DivResult;

DivResult divmod(int a, int b) {
    return (DivResult){.quotient = a / b, .remainder = a % b};
}

typedef struct {
    double x;
    double y;
} Point;

/* Named pair */
typedef struct {
    const char *name;
    int         score;
} NameScore;

int main(void) {
    /* "Tuple" via struct */
    DivResult r = divmod(17, 5);
    printf("%d remainder %d\n", r.quotient, r.remainder);  /* 3 remainder 2 */

    /* Compound literal — inline struct (C99) */
    Point p = (Point){.x = 3.0, .y = 4.0};
    double len = sqrt(p.x*p.x + p.y*p.y);
    printf("%.1f\n", len);  /* 5.0 */

    /* Array of "tuples" */
    NameScore students[] = {
        {"Alice", 95},
        {"Bob",   87},
        {"Carol", 91},
    };
    size_t n = sizeof(students) / sizeof(students[0]);
    for (size_t i = 0; i < n; i++)
        printf("%s: %d\n", students[i].name, students[i].score);

    return 0;
}
```

## Gotchas

- Structs with flexible array members (`struct { int len; int data[]; }`) cannot be returned by value or stored directly in arrays — they must be heap-allocated.
- Anonymous structs (nested `struct { int x; int y; };` inside another struct) are a C11 feature and not available in C99 or C89.

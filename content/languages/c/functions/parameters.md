---
title: "Parameters"
language: "c"
feature: "parameters"
category: "functions"
applicable: true
---

C passes all function arguments by value — a copy of the argument is made. To allow a function to modify the caller's variable, pass a pointer. Arrays decay to a pointer to their first element when passed to a function, so the length must be passed separately. There are no named parameters, default values, or keyword arguments. Variadic functions use `<stdarg.h>` macros.

## Example

```c
#include <stdio.h>
#include <stdarg.h>

/* Pass by value — caller's variable unchanged */
void double_val(int n) {
    n *= 2;   /* only the local copy is modified */
}

/* Pass by pointer — modifies caller's variable */
void double_ptr(int *n) {
    *n *= 2;
}

/* Array parameter — receives pointer to first element */
double array_average(const double *arr, size_t len) {
    double sum = 0.0;
    for (size_t i = 0; i < len; i++) sum += arr[i];
    return len > 0 ? sum / (double)len : 0.0;
}

/* Struct by pointer — avoids copying a large struct */
typedef struct { double x, y; } Point;

double magnitude(const Point *p) {
    return sqrt(p->x * p->x + p->y * p->y);
}

/* Out parameter — return multiple values via pointers */
void divmod(int a, int b, int *quotient, int *remainder) {
    *quotient  = a / b;
    *remainder = a % b;
}

/* Variadic */
double max_of(int count, ...) {
    va_list ap;
    va_start(ap, count);
    double m = va_arg(ap, double);
    for (int i = 1; i < count; i++) {
        double v = va_arg(ap, double);
        if (v > m) m = v;
    }
    va_end(ap);
    return m;
}

int main(void) {
    int x = 5;
    double_val(x);
    printf("%d\n", x);   /* 5 — unchanged */
    double_ptr(&x);
    printf("%d\n", x);   /* 10 — modified */

    double nums[] = {3.0, 1.0, 4.0, 1.0, 5.0};
    printf("avg=%.2f\n", array_average(nums, 5)); /* 2.80 */

    int q, r;
    divmod(17, 5, &q, &r);
    printf("%d r %d\n", q, r);  /* 3 r 2 */

    return 0;
}
```

## Gotchas

- Passing a pointer to a local variable out of a function (as an out-parameter) is fine; returning the address of a local variable is not — it becomes a dangling pointer when the function returns.
- C arrays passed as parameters decay to pointers; `sizeof(arr)` inside the function gives the pointer size, not the array size. Always pass the length separately.

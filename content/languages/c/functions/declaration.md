---
title: "Function Declaration"
language: "c"
feature: "declaration"
category: "functions"
applicable: true
---

C functions must be declared before use (either with a prototype or by defining the function above the call site). A function prototype specifies the return type, name, and parameter types. C does not support function overloading, default parameters, or namespaces. Functions are the only unit of code reuse — there are no methods, lambdas (in standard C), or closures. `static` limits visibility to the current translation unit.

## Example

```c
#include <stdio.h>
#include <math.h>

/* Function prototypes (declarations) */
int add(int a, int b);
double distance(double x1, double y1, double x2, double y2);
static int clamp(int value, int min, int max);

/* Function with void parameter list — takes NO arguments */
void greet(void) {
    printf("Hello, C!\n");
}

/* Variadic function (requires at least one fixed param) */
#include <stdarg.h>
int sum_n(int count, ...) {
    va_list args;
    va_start(args, count);
    int total = 0;
    for (int i = 0; i < count; i++)
        total += va_arg(args, int);
    va_end(args);
    return total;
}

/* Recursive function */
unsigned long long factorial(unsigned int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

/* Definitions */
int add(int a, int b) { return a + b; }

double distance(double x1, double y1, double x2, double y2) {
    return sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
}

static int clamp(int v, int lo, int hi) {
    return v < lo ? lo : (v > hi ? hi : v);
}

int main(void) {
    greet();
    printf("%d\n", add(3, 4));            /* 7 */
    printf("%.2f\n", distance(0,0,3,4)); /* 5.00 */
    printf("%d\n", sum_n(4, 10, 20, 30, 40)); /* 100 */
    return 0;
}
```

## Gotchas

- In C (pre-C99 style), a function declared as `int f()` accepts any number of arguments — `f(1,2,3)` is valid. Use `int f(void)` to declare a function that truly takes no arguments.
- Calling a function before its prototype is declared is an error in C99+ but was historically allowed in C89 (implicit `int` return). Always include the relevant header or write prototypes.

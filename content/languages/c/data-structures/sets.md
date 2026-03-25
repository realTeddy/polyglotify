---
title: "Sets"
language: "c"
feature: "sets"
category: "data-structures"
applicable: false
---

C has no built-in set data structure. Sets must be implemented manually or via third-party libraries. For small integer domains, a **bitset** (an array of `uint64_t` used as bit flags) is efficient. For general key sets, the same approaches as maps apply: sorted arrays with `bsearch`, open-addressing hash tables, or library solutions like **uthash** (using keys with no values). POSIX provides no set API.

## Example

```c
#include <stdint.h>
#include <string.h>
#include <stdio.h>

/* Bitset — for small integer domains (0..N-1) */
#define BITSET_SIZE 128  /* supports integers 0..127 */

typedef struct { uint64_t bits[BITSET_SIZE / 64]; } Bitset;

void bs_add(Bitset *s, int n)    { s->bits[n/64] |=  (UINT64_C(1) << (n%64)); }
void bs_remove(Bitset *s, int n) { s->bits[n/64] &= ~(UINT64_C(1) << (n%64)); }
int  bs_has(const Bitset *s, int n) { return (s->bits[n/64] >> (n%64)) & 1; }

void bs_union(Bitset *dst, const Bitset *a, const Bitset *b) {
    for (int i = 0; i < BITSET_SIZE/64; i++) dst->bits[i] = a->bits[i] | b->bits[i];
}

void bs_intersection(Bitset *dst, const Bitset *a, const Bitset *b) {
    for (int i = 0; i < BITSET_SIZE/64; i++) dst->bits[i] = a->bits[i] & b->bits[i];
}

int main(void) {
    Bitset a = {0}, b = {0}, u = {0}, inter = {0};

    /* a = {1, 2, 3, 4} */
    bs_add(&a, 1); bs_add(&a, 2); bs_add(&a, 3); bs_add(&a, 4);

    /* b = {3, 4, 5, 6} */
    bs_add(&b, 3); bs_add(&b, 4); bs_add(&b, 5); bs_add(&b, 6);

    bs_union(&u, &a, &b);
    bs_intersection(&inter, &a, &b);

    printf("Contains 3: %d\n", bs_has(&a, 3));    /* 1 */
    printf("Union has 5: %d\n", bs_has(&u, 5));   /* 1 */
    printf("Intersection has 3: %d, 1: %d\n",
           bs_has(&inter, 3), bs_has(&inter, 1)); /* 1, 0 */

    return 0;
}
```

## Gotchas

- Bitsets are only practical when the element domain is small and bounded. For arbitrary string keys or large integer ranges, use a hash-based set instead.
- This bitset is not thread-safe — concurrent `bs_add`/`bs_remove` from multiple threads requires atomic operations (`_Atomic` / `__atomic_or_fetch`).

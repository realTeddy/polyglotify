---
title: "Arrays"
language: "c"
feature: "arrays"
category: "data-structures"
applicable: true
---

C arrays are contiguous blocks of elements of the same type, zero-indexed, with fixed size determined at compile time (or at runtime for C99 VLAs). There are no bounds checks. Arrays decay to pointers to their first element in most expressions. The standard library in `<string.h>` and `<stdlib.h>` provides `memcpy`, `memmove`, `memset`, `qsort`, and `bsearch` for array manipulation.

## Example

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

/* Comparator for qsort */
int cmp_int(const void *a, const void *b) {
    return (*(const int *)a) - (*(const int *)b);
}

int main(void) {
    /* Fixed-size array */
    int scores[5] = {90, 75, 85, 60, 95};
    size_t n = sizeof(scores) / sizeof(scores[0]);  /* 5 */

    /* Element access */
    printf("First: %d, Last: %d\n", scores[0], scores[n-1]);

    /* memset — fill with a byte value (here 0) */
    int zeros[5];
    memset(zeros, 0, sizeof(zeros));

    /* qsort — in-place sort */
    qsort(scores, n, sizeof(int), cmp_int);
    for (size_t i = 0; i < n; i++) printf("%d ", scores[i]);
    printf("\n");  /* 60 75 85 90 95 */

    /* bsearch — binary search (array must be sorted) */
    int key = 85;
    int *found = (int *)bsearch(&key, scores, n, sizeof(int), cmp_int);
    if (found) printf("Found %d at index %td\n", *found, found - scores);

    /* Dynamic array (heap-allocated) */
    size_t cap = 8;
    int *dyn = malloc(cap * sizeof(int));
    for (size_t i = 0; i < cap; i++) dyn[i] = (int)(i * i);
    dyn = realloc(dyn, cap * 2 * sizeof(int));  /* grow */
    free(dyn);

    /* 2D array */
    int matrix[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
    printf("center=%d\n", matrix[1][1]);  /* 5 */

    return 0;
}
```

## Gotchas

- C arrays do not track their own length — always carry the length separately. `sizeof(arr)/sizeof(arr[0])` works only when `arr` is an actual array (not a pointer), so using this in a function receiving an array parameter gives the wrong answer.
- Out-of-bounds access is undefined behavior — the program may crash, corrupt data, or appear to work correctly. Always validate indices.

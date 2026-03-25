---
title: "Maps"
language: "c"
feature: "maps"
category: "data-structures"
applicable: false
---

C has no built-in map or hash table. The standard library provides no associative container. Maps must be implemented manually or sourced from third-party libraries. Common approaches: sorted arrays with `bsearch` (fast lookup, slow insert), hand-rolled hash tables, or libraries like **uthash** (header-only, macro-based), **glib's GHashTable**, or **POSIX `hcreate/hsearch`** (limited and non-reentrant).

## Example

```c
/* ---- Approach 1: sorted array + bsearch (simple, read-heavy) ---- */
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

typedef struct { const char *key; int value; } Entry;

int entry_cmp(const void *a, const void *b) {
    return strcmp(((const Entry *)a)->key, ((const Entry *)b)->key);
}

/* ---- Approach 2: simple open-addressing hash table ---- */
#define HT_SIZE 64

typedef struct { char key[32]; int value; int used; } Slot;

static Slot table[HT_SIZE];

static unsigned int hash(const char *s) {
    unsigned int h = 5381;
    for (; *s; s++) h = ((h << 5) + h) ^ (unsigned char)*s;
    return h % HT_SIZE;
}

void ht_set(const char *key, int value) {
    unsigned int i = hash(key);
    while (table[i].used && strcmp(table[i].key, key) != 0)
        i = (i + 1) % HT_SIZE;
    strncpy(table[i].key, key, 31);
    table[i].value = value;
    table[i].used = 1;
}

int ht_get(const char *key, int *out) {
    unsigned int i = hash(key);
    while (table[i].used) {
        if (strcmp(table[i].key, key) == 0) { *out = table[i].value; return 1; }
        i = (i + 1) % HT_SIZE;
    }
    return 0;  /* not found */
}

int main(void) {
    ht_set("Alice", 95);
    ht_set("Bob",   87);

    int score;
    if (ht_get("Alice", &score)) printf("Alice: %d\n", score);  /* 95 */
    if (!ht_get("Dave", &score)) printf("Dave not found\n");

    return 0;
}
```

## Gotchas

- The POSIX `hcreate`/`hsearch` interface is not thread-safe and only allows one hash table at a time in a process — avoid it in modern code.
- Hand-rolled hash tables are a common source of bugs (off-by-one in probing, integer overflow in hash functions, missing null termination). Prefer a well-tested library like **uthash** for non-trivial use.

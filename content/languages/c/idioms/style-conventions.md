---
title: "Style Conventions"
language: "c"
feature: "style-conventions"
category: "idioms"
applicable: true
---

C style is less standardized than newer languages — different organizations use different conventions. Common ground: `snake_case` for functions and variables, `SCREAMING_SNAKE_CASE` for macros and constants, `PascalCase` or `snake_case` for `typedef`-named structs. The **Linux Kernel Coding Style** and **GNU Coding Standards** are the two most influential guides. `clang-format` with a `.clang-format` file enforces style automatically.

## Example

```c
/* snake_case functions, SCREAMING_SNAKE_CASE macros */
#include <stddef.h>
#include <stdint.h>
#include <stdbool.h>

/* Constants: SCREAMING_SNAKE_CASE */
#define MAX_NAME_LEN 64
#define DEFAULT_PORT 8080

/* Typedef'd struct: snake_case with _t suffix (POSIX) or PascalCase */
typedef struct user {
    uint32_t    id;
    char        name[MAX_NAME_LEN];
    bool        active;
} User;                 /* or user_t — team choice */

/* Function: module_verb_noun (namespace via prefix) */
User *user_create(uint32_t id, const char *name);
void  user_destroy(User *u);
bool  user_is_active(const User *u);

/* Boolean functions: is_ / has_ / can_ prefix */
static inline bool user_is_active(const User *u) {
    return u != NULL && u->active;
}

/* Pointer in declaration: asterisk with variable name (Linux style)
   or with type name (C++ influenced style) — pick one */
void process(User *u);    /* Linux / K&R style (preferred) */
/* void process(User* u); C++ style — avoid mixing */

/* Braces: opening brace on same line (Kernighan & Ritchie style) */
int compute(int n) {
    if (n <= 0) {
        return 0;
    }
    int result = 0;
    for (int i = 1; i <= n; i++) {
        result += i;
    }
    return result;
}
```

## Gotchas

- The POSIX standard reserves all identifiers ending in `_t` for system use. Using `my_type_t` in portable code can cause name collisions on some platforms. Many projects use `MyType` or `my_type` without the `_t` suffix.
- Always enable `-Wall -Wextra -Wpedantic` during development. Many common C bugs (uninitialized variables, sign comparison, implicit function declarations) are caught by compiler warnings, not the language itself.

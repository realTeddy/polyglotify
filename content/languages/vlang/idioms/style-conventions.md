---
title: "Style Conventions"
language: "vlang"
feature: "style-conventions"
category: "idioms"
applicable: true
---

V enforces a single style via `v fmt`. Names use `snake_case` for variables, functions, and module names; `PascalCase` for types and interfaces; `SCREAMING_SNAKE_CASE` for constants. Tabs (not spaces) are used for indentation. No semicolons. `v fmt -w` auto-formats files in-place.

## Example

```v
// snake_case for functions and variables
fn calculate_total(items []f64) f64 {
    mut total := 0.0
    for item in items {
        total += item
    }
    return total
}

// PascalCase for types
struct UserProfile {
    first_name string
    last_name  string
    age        int
}

// PascalCase for interfaces
interface Serializable {
    to_json() string
}

// SCREAMING_SNAKE_CASE for module-level constants
const max_retries = 3
const default_timeout = 30 * time.second

// Module names are snake_case
// module user_service

// Short, descriptive names
fn (u UserProfile) full_name() string {
    return '${u.first_name} ${u.last_name}'
}
```

```bash
# Format a file in place
v fmt -w src/main.v

# Format entire project
v fmt -w .

# Check style without modifying
v vet .
```

## Gotchas

- `v fmt` is opinionated and non-configurable — it enforces V's single style with no options.
- V uses tabs, not spaces; editors should be configured accordingly.
- Unused imports and variables are compile errors, keeping code clean by default.

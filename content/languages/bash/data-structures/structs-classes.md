---
title: "Structs & Classes"
language: "bash"
feature: "structs-classes"
category: "data-structures"
applicable: false
---

Bash has no struct or class types. Structured data is represented with naming conventions: prefixed variable names (`user_name`, `user_age`), associative arrays keyed by field name, or serialised formats (JSON/CSV) processed with external tools like `jq` or `awk`. For complex object models, switching to Python, Ruby, or another scripting language is strongly recommended.

## Example

```bash
#!/usr/bin/env bash
# Bash 4+ for associative arrays

# Approach 1: Prefixed variables (simple struct-like)
user_name="Alice"
user_age=30
user_role="admin"
echo "User: ${user_name}, ${user_age}, ${user_role}"

# Approach 2: Associative array as a struct
declare -A user
user[name]="Bob"
user[age]=25
user[role]="viewer"
echo "User: ${user[name]}, ${user[age]}, ${user[role]}"

# Approach 3: Serialised JSON with jq
user_json='{"name":"Carol","age":35,"role":"editor"}'
name=$(echo "${user_json}" | jq -r '.name')
age=$(echo "${user_json}" | jq -r '.age')
echo "From JSON: ${name}, ${age}"

# Approach 4: Constructor function writing to associative array
declare -A person
make_person() {
    declare -n _p="${1}"
    _p[name]="${2}"
    _p[age]="${3}"
}
make_person person "Dave" 28
echo "Person: ${person[name]}, age ${person[age]}"
```

## Gotchas

- Prefixed-variable naming has no enforcement; there is nothing preventing a typo that silently creates a new unrelated variable.
- Associative arrays passed between functions require namerefs or global variables; there is no true encapsulation.
- For any script that grows beyond ~100 lines and needs structured data, seriously consider using Python or another language that has real data types.

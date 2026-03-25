---
title: "Tuples"
language: "bash"
feature: "tuples"
category: "data-structures"
applicable: false
---

Bash has no tuple type. Fixed-size groups of values are handled by using multiple positional parameters, arrays with known indices, or newline-delimited strings that are split into arrays. For structured data, a common pattern is to output tab-delimited or colon-delimited records and parse them with `IFS` or `read -r -a`.

## Example

```bash
#!/usr/bin/env bash

# "Tuple" via array with fixed indices
make_point() {
    local -a pt=("${1}" "${2}")
    echo "${pt[@]}"
}
read -r -a point < <(make_point 3 4)
echo "x=${point[0]} y=${point[1]}"

# Multiple output values via IFS-delimited string
get_stats() {
    echo "42:100:71"   # min:max:avg
}
IFS=':' read -r mn mx avg < <(get_stats)
echo "min=${mn} max=${mx} avg=${avg}"

# Parallel arrays as a struct-of-arrays
names=("Alice" "Bob" "Carol")
ages=(30 25 35)
for i in "${!names[@]}"; do
    echo "${names[i]} is ${ages[i]} years old"
done

# Tab-delimited records (pseudo-tuple rows)
while IFS=$'\t' read -r name age role; do
    echo "User: ${name}, ${age}, ${role}"
done <<'EOF'
Alice	30	admin
Bob	25	viewer
Carol	35	editor
EOF
```

## Gotchas

- Using arrays as tuples relies on convention; nothing prevents index out-of-bounds access or element modification, making them purely informal.
- `IFS`-splitting is affected by the global `IFS` variable; always set it locally with `IFS=':' read -r ...` or restore it afterwards.
- Tab characters in heredocs must be literal tabs, not spaces; using spaces will cause `read` to split incorrectly if `IFS` is set to tab.

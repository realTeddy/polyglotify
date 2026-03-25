---
title: "Maps & Dictionaries"
language: "bash"
feature: "maps"
category: "data-structures"
applicable: true
---

Bash 4+ supports associative arrays (hash maps) declared with `declare -A`. Keys and values are strings. Lookup, insertion, and deletion use the same `${arr[key]}` syntax as indexed arrays. Iteration over keys uses `"${!map[@]}"`. Associative arrays are not available in Bash 3.x (the default on macOS before Homebrew bash).

## Example

```bash
#!/usr/bin/env bash
# Requires Bash 4+

declare -A scores
scores["Alice"]=95
scores["Bob"]=87
scores["Carol"]=92

# Access
echo "${scores["Alice"]}"    # 95
echo "${scores["Dave"]:-0}"  # 0 (default for missing key)

# Check key existence
if [[ -v scores["Alice"] ]]; then
    echo "Alice is in the map"
fi

# Iterate keys
for name in "${!scores[@]}"; do
    echo "  ${name}: ${scores[${name}]}"
done

# Iterate key-value pairs (sorted by key)
for name in $(printf '%s\n' "${!scores[@]}" | sort); do
    echo "  ${name} => ${scores[${name}]}"
done

# Delete key
unset 'scores["Bob"]'
echo "After delete: ${#scores[@]} entries"

# Inline initialisation
declare -A config=(
    [host]="localhost"
    [port]="5432"
    [db]="myapp"
)
echo "Connecting to ${config[host]}:${config[port]}/${config[db]}"
```

## Gotchas

- Associative arrays require `declare -A`; without it, Bash creates an indexed array and the key is treated as `0` (the result of arithmetic evaluation on a string).
- Key iteration order is not guaranteed — associative arrays are hash maps with no defined ordering.
- Passing associative arrays to functions requires either using a nameref (`declare -n`) or serialising the array to a string and reconstructing inside the function.

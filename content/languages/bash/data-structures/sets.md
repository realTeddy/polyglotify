---
title: "Sets"
language: "bash"
feature: "sets"
category: "data-structures"
applicable: false
---

Bash has no built-in set type. Sets are typically simulated with associative arrays where the key is the element and the value is ignored (or set to `1`). Set membership testing, union, and intersection are implemented as loops. For large datasets, `sort -u` and `comm` are more efficient UNIX tools for set operations on sorted lists.

## Example

```bash
#!/usr/bin/env bash
# Bash 4+ required for associative arrays

# Simulate a set with an associative array
declare -A seen_set

# Add elements
for item in "apple" "banana" "apple" "cherry" "banana"; do
    seen_set["${item}"]=1
done
echo "unique count: ${#seen_set[@]}"   # 3

# Membership test
if [[ -v seen_set["apple"] ]]; then
    echo "apple is in set"
fi

# Set union (two associative arrays)
declare -A set_a=([a]=1 [b]=1 [c]=1)
declare -A set_b=([c]=1 [d]=1 [e]=1)
declare -A union
for k in "${!set_a[@]}" "${!set_b[@]}"; do union["${k}"]=1; done
echo "union: ${!union[@]}"

# Set intersection
declare -A inter
for k in "${!set_a[@]}"; do
    [[ -v set_b["${k}"] ]] && inter["${k}"]=1
done
echo "intersection: ${!inter[@]}"

# Using sort + comm for set ops on files/lists
# comm requires sorted input
list1=$(printf '%s\n' a b c d | sort)
list2=$(printf '%s\n' c d e f | sort)
echo "diff (a-b):        $(comm -23 <(echo "$list1") <(echo "$list2") | tr '\n' ' ')"
echo "intersection:      $(comm -12 <(echo "$list1") <(echo "$list2") | tr '\n' ' ')"
```

## Gotchas

- Associative-array-based sets have no defined ordering; if ordered output is needed, pipe through `sort`.
- `comm` requires both inputs to be sorted; passing unsorted data produces incorrect results without any error.
- For very large sets (millions of items), Bash associative arrays are memory-inefficient; use Python, awk, or a database instead.

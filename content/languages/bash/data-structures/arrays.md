---
title: "Arrays & Lists"
language: "bash"
feature: "arrays"
category: "data-structures"
applicable: true
---

Bash supports one-dimensional indexed arrays (declared with `declare -a` or directly with `arr=(...)` syntax). Arrays are zero-indexed and can be sparse (indices need not be contiguous). Elements are always strings. There are no built-in array operations like map or filter; iteration is done with `for` loops. `mapfile`/`readarray` populates an array from stdin or a file.

## Example

```bash
#!/usr/bin/env bash

# Array literal
fruits=("apple" "banana" "cherry" "date")

# Access
echo "${fruits[0]}"     # apple
echo "${fruits[-1]}"    # date (Bash 4.3+ negative indexing)
echo "${fruits[@]}"     # all elements
echo "${#fruits[@]}"    # count: 4

# Slice
echo "${fruits[@]:1:2}"  # banana cherry (offset 1, length 2)

# Append
fruits+=("elderberry")
echo "${#fruits[@]}"    # 5

# Modify
fruits[1]="blueberry"

# Delete element (leaves sparse gap)
unset 'fruits[2]'

# Iterate safely (quoted)
for fruit in "${fruits[@]}"; do
    echo "  ${fruit}"
done

# Read file into array
mapfile -t lines < /etc/hosts
echo "hosts lines: ${#lines[@]}"

# Array from command output
mapfile -t words < <(echo "one two three" | tr ' ' '\n')
echo "${words[1]}"   # two
```

## Gotchas

- `"${arr[@]}"` expands each element as a separate word (safe for elements with spaces); `"${arr[*]}"` joins all into one string with IFS separator.
- Unset elements leave sparse gaps; `"${!arr[@]}"` gives the list of set indices, which may not be 0, 1, 2, … after deletion.
- Bash arrays are not passed to functions; pass them by expanding `"${arr[@]}"` and reconstruct inside the function, or pass the array name and use a nameref.

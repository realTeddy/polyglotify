---
title: "Types & Type Systems"
language: "bash"
feature: "types"
category: "basics"
applicable: true
---

Bash is dynamically and weakly typed: all variables are strings by default. Integer arithmetic is supported via `$(( ))` or `declare -i`. Arrays (`declare -a`) and associative arrays (`declare -A`) are the only compound types. There is no float arithmetic — use `bc` or `awk` for floating-point calculations. `declare` attributes can attach weak type hints to variables.

## Example

```bash
#!/usr/bin/env bash

# All variables are strings by default
x="hello"
echo "${x}"   # hello

# Integer arithmetic
declare -i num=10
num+=5
echo "${num}"   # 15

# Indexed array
declare -a fruits=("apple" "banana" "cherry")
echo "${fruits[0]}"       # apple
echo "${fruits[@]}"       # all elements
echo "${#fruits[@]}"      # count: 3

# Associative array (Bash 4+)
declare -A scores
scores["Alice"]=95
scores["Bob"]=87
echo "${scores["Alice"]}"  # 95
echo "${!scores[@]}"       # all keys

# Floating point via bc
result=$(echo "scale=2; 22 / 7" | bc)
echo "pi ≈ ${result}"   # 3.14

# Type inspection (weak — everything is a string)
val="42"
if [[ "${val}" =~ ^[0-9]+$ ]]; then
    echo "looks like an integer"
fi
```

## Gotchas

- Arithmetic expansion `$(( ))` only handles integers; decimal results are truncated silently (`echo $((7/2))` prints `3`).
- Associative arrays require Bash 4+; macOS ships with Bash 3.2 by default (due to the GPL license change). Check `bash --version` and install a newer Bash via Homebrew if needed.
- `declare -i` does not prevent assigning a non-numeric string; it just silently evaluates non-numeric strings as zero in arithmetic context.

---
title: "Interfaces & Traits"
language: "bash"
feature: "interfaces"
category: "oop"
applicable: false
---

Bash has no interfaces, traits, or protocols. The shell's equivalent of a "contract" is documentation and naming conventions: if a function accepts a callback name as an argument, it is convention that the callback implements certain positional parameters. There is no compile-time or runtime enforcement of any interface contract.

## Example

```bash
#!/usr/bin/env bash

# "Interface by convention": document and enforce manually
# Convention: a "transformer" function takes one arg and prints the result

# "Implementations" of the transformer interface
to_upper() { echo "${1^^}"; }
to_lower() { echo "${1,,}"; }
double()   { echo "${1}${1}"; }

# "Caller" that accepts a transformer callback
transform_list() {
    local transformer="${1}"; shift
    for item in "$@"; do
        "${transformer}" "${item}"
    done
}

transform_list to_upper "hello" "world"   # HELLO WORLD
transform_list double   "ha" "ho"          # haha hoho

# Runtime "interface check": verify a command exists and is callable
implements_transformer() {
    declare -f "${1}" > /dev/null 2>&1
}

if implements_transformer to_upper; then
    echo "to_upper implements the transformer interface"
fi
if ! implements_transformer nonexistent_fn; then
    echo "nonexistent_fn does not implement the interface"
fi
```

## Gotchas

- `declare -f func_name` is the only way to check if a function is defined; it prints the function body and exits 0 if found, non-zero if not.
- There is no way to enforce that a function accepts the correct number or type of arguments; callers and implementers must agree by convention alone.
- "Duck typing" in Bash is entirely runtime: a missing function discovered during script execution will raise a "command not found" error, not a helpful type error.

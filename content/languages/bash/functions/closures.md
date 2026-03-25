---
title: "Closures & Lambdas"
language: "bash"
feature: "closures"
category: "functions"
applicable: false
---

Bash does not support closures or lambda expressions. Functions are not first-class values and cannot be passed as arguments or returned from other functions by reference. The closest equivalent patterns are: passing a function name as a string argument and calling it with `"${callback}"`, using aliases for simple renaming, or storing command strings in variables and evaluating them (which is fragile and a security risk with untrusted input).

## Example

```bash
#!/usr/bin/env bash

# Simulating a callback: pass function name as string
double() { echo $(( $1 * 2 )); }
triple() { echo $(( $1 * 3 )); }

apply() {
    local fn="${1}"; shift
    for val in "$@"; do
        "${fn}" "${val}"
    done
}

apply double 1 2 3 4   # 2 4 6 8
apply triple 1 2 3 4   # 3 6 9 12

# Simulating partial application with wrapper functions
make_adder() {
    local n="${1}"
    # "Return" a function name
    eval "add_${n}() { echo \$(( \$1 + ${n} )); }"
    echo "add_${n}"
}
fn=$(make_adder 10)
"${fn}" 5    # 15
"${fn}" 42   # 52

# Higher-order-style map using process substitution
map_fn() {
    local fn="${1}"; shift
    for item in "$@"; do
        "${fn}" "${item}"
    done
}
shout() { echo "${1^^}"; }
map_fn shout "hello" "world" "bash"
```

## Gotchas

- Passing function names as strings and calling them with `"${fn}" args` works only for functions defined in the current shell; exporting functions with `export -f` makes them available to subshells.
- `eval` to generate dynamic functions is a security risk if any part of the generated string comes from user input; avoid `eval` in scripts that handle external data.
- There is no lexical scoping; variables captured inside the "closure" wrapper are by name, not by value — they will reflect later changes to the outer variable.

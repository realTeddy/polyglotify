---
title: "Function Declaration"
language: "bash"
feature: "declaration"
category: "functions"
applicable: true
---

Bash functions are declared with the `function` keyword or by using `name() { }` syntax (both are equivalent). Functions must be defined before they are called. They share the global variable scope by default; `local` creates function-scoped variables. A function's return value is its exit code (0–255); string output is communicated via stdout and captured with command substitution.

## Example

```bash
#!/usr/bin/env bash

# Style 1: name() syntax
greet() {
    local name="${1}"
    echo "Hello, ${name}!"
}

# Style 2: function keyword
function shout() {
    echo "${1^^}"   # uppercase (Bash 4+)
}

# Calling functions
greet "World"   # Hello, World!
shout "quiet"   # QUIET

# Function returning a string via stdout
get_timestamp() {
    date +"%Y-%m-%dT%H:%M:%S"
}
ts=$(get_timestamp)
echo "Timestamp: ${ts}"

# Function with exit code (return value)
is_even() {
    (( $1 % 2 == 0 ))   # arithmetic exits 0 if true, 1 if false
}

if is_even 4; then
    echo "4 is even"
fi

# Recursive function
factorial() {
    local n="${1}"
    if (( n <= 1 )); then echo 1; return; fi
    echo $(( n * $(factorial $((n - 1))) ))
}
echo "5! = $(factorial 5)"   # 120
```

## Gotchas

- Functions are not in a separate scope; unless you use `local`, all variables modified inside a function affect the global scope.
- `return` only sets the exit code (0–255); to return a string, print to stdout and capture with `$(function_name)`.
- Recursive functions that produce output via `echo` and capture via `$()` spawn a subshell for each level; deep recursion is slow and can exhaust process limits.

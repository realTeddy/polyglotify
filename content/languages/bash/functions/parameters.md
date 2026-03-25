---
title: "Parameters & Arguments"
language: "bash"
feature: "parameters"
category: "functions"
applicable: true
---

Bash functions receive arguments as positional parameters: `$1`, `$2`, … `$N`. `$0` is the script name. `$@` expands to all arguments as separate words; `$*` joins them with the first character of `IFS`. `$#` holds the argument count. There are no named parameters or default values built into the syntax, but defaults can be set with `${1:-default}`.

## Example

```bash
#!/usr/bin/env bash

# Positional parameters
describe() {
    local name="${1}"
    local age="${2:-unknown}"   # default if not provided
    local role="${3:-user}"
    echo "${name} is ${age} years old, role: ${role}"
}
describe "Alice" 30 "admin"   # Alice is 30 years old, role: admin
describe "Bob"                 # Bob is unknown years old, role: user

# $@ vs $* — always prefer "$@"
print_args() {
    echo "Count: $#"
    for arg in "$@"; do
        echo "  arg: [${arg}]"
    done
}
print_args "hello world" "foo" "bar baz"

# Named-parameter simulation with getopts
parse_opts() {
    local name="" verbose=false
    while getopts "n:v" opt; do
        case "${opt}" in
            n) name="${OPTARG}" ;;
            v) verbose=true ;;
            *) echo "Unknown option"; return 1 ;;
        esac
    done
    echo "name=${name}, verbose=${verbose}"
}
parse_opts -n Alice -v

# Variadic: passing all args to another command
run_with_retry() {
    local retries="${1}"; shift
    for ((i = 0; i < retries; i++)); do
        "$@" && return 0
        echo "Retry $((i+1))..."
    done
    return 1
}
```

## Gotchas

- `"$@"` preserves argument boundaries (each argument remains a separate word); `"$*"` joins all arguments into one string. Almost always use `"$@"`.
- Positional parameters beyond 9 require braces: `${10}`, not `$10` (which expands as `$1` followed by literal `0`).
- `shift` pops the first positional parameter; use it after consuming `$1` to process remaining arguments, especially after `getopts`.

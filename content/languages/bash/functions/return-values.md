---
title: "Return Values"
language: "bash"
feature: "return-values"
category: "functions"
applicable: true
---

Bash functions communicate results in two ways: exit codes (integers 0–255 via `return`) for success/failure signalling, and stdout output for string data (captured by the caller with `$(function_name)`). The special variable `$?` holds the exit code of the last command or function. Named output variables can be simulated using `nameref` (`declare -n`) or by writing to a caller-supplied variable name.

## Example

```bash
#!/usr/bin/env bash

# Return exit code for success/failure
file_exists() {
    [[ -f "${1}" ]]   # exits 0 (true) or 1 (false)
}

if file_exists "/etc/hosts"; then
    echo "file found"
fi
echo "exit code: $?"

# Return string via stdout
uppercase() {
    echo "${1^^}"
}
result=$(uppercase "hello")
echo "${result}"   # HELLO

# Multiple outputs via stdout (line-separated)
stats() {
    local -a nums=("$@")
    local sum=0
    for n in "${nums[@]}"; do ((sum += n)); done
    local count=${#nums[@]}
    echo "${sum}"
    echo "${count}"
    echo "$(( sum / count ))"
}
# Capture into array
mapfile -t stat_vals < <(stats 10 20 30 40)
echo "sum=${stat_vals[0]} count=${stat_vals[1]} avg=${stat_vals[2]}"

# Nameref — write to caller's variable
get_user() {
    declare -n _result="${1}"   # nameref
    _result="Alice"
}
get_user my_var
echo "${my_var}"   # Alice
```

## Gotchas

- `return` can only pass values 0–255; returning a negative number or a value above 255 wraps around silently.
- Command substitution `$(func)` runs `func` in a subshell; any variable changes inside `func` are invisible to the caller. Use namerefs to avoid this.
- `$?` is reset after every command; save it immediately (`status=$?`) before any other command if you need to inspect it later.

---
title: "Result Types"
language: "bash"
feature: "result-types"
category: "error-handling"
applicable: false
---

Bash has no result type. The idiomatic equivalent is the exit code: `0` means success (like `Ok`), and non-zero means failure (like `Err`). Functions communicate error details via stderr or an out-variable convention. The `||` and `&&` operators enable result-style chaining: `command && on_success || on_failure`.

## Example

```bash
#!/usr/bin/env bash

# Exit code as Result: 0=Ok, non-zero=Err
try_parse_int() {
    local input="${1}"
    declare -n _result="${2}"  # out-variable (nameref)
    if [[ "${input}" =~ ^-?[0-9]+$ ]]; then
        _result="${input}"
        return 0   # Ok
    else
        echo "Not an integer: '${input}'" >&2
        return 1   # Err
    fi
}

# Using the "Result"
declare value
if try_parse_int "42" value; then
    echo "Parsed: ${value}"
else
    echo "Parse failed"
fi

try_parse_int "abc" value || echo "Handling error"

# Result chaining with && / ||
fetch_data() { echo "raw data"; return 0; }
process_data() { echo "processed: ${1}"; return 0; }
save_data() { echo "saved: ${1}"; return 0; }

data=$(fetch_data) \
  && processed=$(process_data "${data}") \
  && save_data "${processed}" \
  || echo "Pipeline failed at some step" >&2
```

## Gotchas

- Exit codes only carry a number 0–255; detailed error messages must be printed to stderr separately, making error context easily lost.
- `&&`/`||` chaining works but the `||` fires whenever any preceding command fails, not just the last one; use explicit `if` blocks for precise error handling.
- Reading an out-variable via nameref works only in Bash 4.3+; in older Bash, use `eval` (carefully) or print to stdout and capture with `$()`.

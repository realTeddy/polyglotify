---
title: "Variables & Declaration"
language: "bash"
feature: "variables"
category: "basics"
applicable: true
---

Bash variables are untyped strings by default and require no declaration keyword. Assignments must not have spaces around `=`. Variables are referenced with `$name` or `${name}` (the braced form is safer inside strings). `local` restricts scope to a function. `readonly` makes a variable immutable. `export` makes a variable available to child processes as an environment variable.

## Example

```bash
#!/usr/bin/env bash

# Assignment — no spaces around =
name="Alice"
count=42
pi=3.14

# Reference with braces (safer)
echo "Hello, ${name}!"
echo "Count: ${count}"

# Default value if unset or empty
greeting=${GREETING:-"Good morning"}
echo "${greeting}"

# Readonly variable
readonly MAX_RETRIES=3

# Local variable inside a function
greet() {
    local local_var="only inside greet"
    echo "${local_var}"
}
greet
# echo "${local_var}"   # empty — not accessible here

# Export to environment
export APP_ENV="production"

# Arithmetic (integer only)
result=$((count + 8))
echo "result: ${result}"

# Command substitution
current_date=$(date +%Y-%m-%d)
echo "Today: ${current_date}"
```

## Gotchas

- Spaces around `=` in an assignment (`name = "Alice"`) are a syntax error; Bash interprets `name` as a command.
- Unquoted variable expansion is subject to word splitting and glob expansion; always quote: `"${name}"`, not `${name}`.
- `local` only works inside a function; using it at the top level is silently accepted but has no effect.

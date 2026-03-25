---
title: "Operators"
language: "bash"
feature: "operators"
category: "basics"
applicable: true
---

Bash uses different operators depending on context. Arithmetic uses `$(( ))` with standard operators. String comparison uses `=`, `!=`, `<`, `>` inside `[[ ]]`. File-test operators (`-f`, `-d`, `-e`, `-r`, `-x`) check file properties. Logical operators are `&&` and `||` (both in conditions and as command chaining). The pipe `|` chains command stdout to command stdin.

## Example

```bash
#!/usr/bin/env bash

# Arithmetic operators
a=10; b=3
echo "add:  $((a + b))"   # 13
echo "sub:  $((a - b))"   # 7
echo "mul:  $((a * b))"   # 30
echo "div:  $((a / b))"   # 3  (integer division)
echo "mod:  $((a % b))"   # 1
echo "exp:  $((2 ** 8))"  # 256

# String comparison (inside [[ ]])
name="Alice"
[[ "${name}" == "Alice" ]] && echo "equal"
[[ "${name}" != "Bob" ]]   && echo "not Bob"
[[ "${name}" < "Zara" ]]   && echo "lexically before Zara"

# Numeric comparison
score=85
[[ ${score} -gt 80 ]] && echo "pass"   # -gt -lt -ge -le -eq -ne

# File test operators
[[ -f "/etc/hosts" ]]  && echo "is a file"
[[ -d "/tmp" ]]        && echo "is a directory"
[[ -x "/bin/ls" ]]     && echo "is executable"
[[ -z "${empty}" ]]    && echo "variable is empty"
[[ -n "${name}" ]]     && echo "variable is non-empty"

# Regex matching
[[ "user@example.com" =~ ^[^@]+@[^@]+\.[^@]+$ ]] && echo "looks like email"
```

## Gotchas

- `=` inside `[ ]` (POSIX test) is string comparison; `==` inside `[[ ]]` is also string comparison. Use `-eq` for numeric equality to avoid surprises.
- `<` and `>` inside single brackets `[ ]` are redirection operators; always use `[[ ]]` for string comparisons to avoid accidental file creation.
- The `[[ ]]` construct is a Bash/ksh extension; for POSIX portability, use `[ ]` or `test`, but be aware of the stricter quoting requirements.

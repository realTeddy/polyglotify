---
title: "Control Flow"
language: "bash"
feature: "control-flow"
category: "basics"
applicable: true
---

Bash control flow includes `if`/`elif`/`else`, `case`/`esac`, `for`, `while`, `until`, and `select`. Conditions are based on command exit codes: `0` is success/true, any non-zero is failure/false. The `[[ ]]` keyword and `test`/`[ ]` built-ins return appropriate exit codes for use in conditions. `break` and `continue` work inside loops.

## Example

```bash
#!/usr/bin/env bash

# if/elif/else
score=75
if [[ ${score} -ge 90 ]]; then
    echo "A"
elif [[ ${score} -ge 80 ]]; then
    echo "B"
elif [[ ${score} -ge 70 ]]; then
    echo "C"   # prints this
else
    echo "F"
fi

# case statement (glob patterns)
ext="jpg"
case "${ext}" in
    jpg|jpeg) echo "JPEG image" ;;
    png)      echo "PNG image"  ;;
    pdf)      echo "PDF doc"    ;;
    *)        echo "unknown"    ;;
esac

# for loop — list
for lang in bash python ruby go; do
    echo "  ${lang}"
done

# for loop — C-style
for ((i = 0; i < 5; i++)); do
    echo -n "${i} "
done
echo

# while loop
counter=1
while [[ ${counter} -le 3 ]]; do
    echo "tick ${counter}"
    ((counter++))
done

# Loop over array
fruits=("apple" "banana" "cherry")
for fruit in "${fruits[@]}"; do
    echo "fruit: ${fruit}"
done
```

## Gotchas

- Missing `;;` at the end of a `case` clause causes fall-through to the next clause (unlike C, which requires explicit `break`; Bash `;;` is its own terminator).
- `for item in ${array}` (without quotes) is wrong for arrays with spaces; use `"${array[@]}"` to iterate safely.
- Conditions in `if` are commands; `if my_command; then` is valid and checks the exit code — which is the basis for error-checking patterns like `if ! command; then`.

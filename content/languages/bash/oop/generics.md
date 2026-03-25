---
title: "Generics"
language: "bash"
feature: "generics"
category: "oop"
applicable: false
---

Bash has no generics or type parameters. Because all Bash variables are strings (or untyped arrays), there is no need for generics — functions and data structures already work with any string value by default. There is no compile-time type system to parameterise. If you need type-safe generic containers, use a typed language.

## Example

```bash
#!/usr/bin/env bash

# Bash functions are naturally "generic" because everything is a string
# No type annotation needed

# A generic "stack" using a nameref and array
stack_push() {
    declare -n _stk="${1}"
    _stk+=("${2}")
}

stack_pop() {
    declare -n _stk="${1}"
    declare -n _out="${2}"
    local last_idx=$(( ${#_stk[@]} - 1 ))
    _out="${_stk[${last_idx}]}"
    unset '_stk[last_idx]'
}

# Works with any "type" (strings, numbers — all the same in Bash)
declare -a my_stack

stack_push my_stack "hello"
stack_push my_stack "world"
stack_push my_stack "42"

stack_pop my_stack top_item
echo "Popped: ${top_item}"   # 42

stack_pop my_stack top_item
echo "Popped: ${top_item}"   # world
```

## Gotchas

- The "generic" behaviour is a consequence of dynamic typing, not a language feature; there is no enforcement that items stored in a "typed stack" are actually of the intended type.
- Namerefs (`declare -n`) are a Bash 4.3+ feature; older Bash versions require indirect expansion (`${!varname}`) which is read-only.
- For anything beyond simple key/value or list storage, shell scripts are not the right tool; use a language with a real type system.

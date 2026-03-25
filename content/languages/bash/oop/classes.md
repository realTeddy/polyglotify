---
title: "Classes"
language: "bash"
feature: "classes"
category: "oop"
applicable: false
---

Bash has no object-oriented programming model. There are no classes, objects, methods, or constructors. Some projects implement a rudimentary OOP simulation using function naming conventions and associative arrays (e.g., `ClassName.methodName`), but this is a complex hack that is hard to maintain. For OOP in shell-adjacent contexts, use Python, Ruby, or another scripting language.

## Example

```bash
#!/usr/bin/env bash
# Simulated OOP using function naming conventions — for illustration only

# "Class" definition: functions prefixed with class name
Animal.new() {
    declare -n _self="${1}"
    _self[name]="${2}"
    _self[sound]="${3}"
}

Animal.speak() {
    declare -n _self="${1}"
    echo "${_self[name]} says ${_self[sound]}"
}

# "Instantiate"
declare -A cat
Animal.new cat "Cat" "Meow"
Animal.speak cat   # Cat says Meow

declare -A dog
Animal.new dog "Dog" "Woof"
Animal.speak dog   # Dog says Woof

# "Method" dispatch by convention
call_method() {
    local class="${1}"
    local method="${2}"
    local instance="${3}"
    shift 3
    "${class}.${method}" "${instance}" "$@"
}
call_method Animal speak cat
```

## Gotchas

- This OOP simulation has no inheritance, polymorphism, access control, or encapsulation — it is purely a naming convention.
- Function names containing dots are not valid in all POSIX shells; this approach is Bash-specific and not portable.
- Any non-trivial OOP design in Bash will be more complex and fragile than the equivalent code in a language with built-in OOP support.

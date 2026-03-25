---
title: "Style Conventions"
language: "tcl"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Tcl style is documented in the [Tcl Style Guide](https://wiki.tcl-lang.org/page/Tcl+Style+Guide). Key conventions: `camelCase` for procedure names, `ALL_CAPS` for constants, `lowerCamelCase` for local variables, four-space indentation, always brace `expr` arguments, use `lappend`/`list` rather than string concatenation for list building, and `namespace eval` for module organisation. Comments use `#` at the start of a line or after a newline (not inline after a command on the same line).

## Example

```tcl
# Good Tcl style
namespace eval myapp {

    # Constants (ALL_CAPS by convention)
    variable VERSION "1.0.0"
    variable MAX_RETRIES 3

    # Exported public API
    namespace export createUser fetchData

    # Private helper (not exported)
    proc _validateName {name} {
        if {[string length $name] == 0} {
            error "Name cannot be empty"
        }
        return $name
    }

    proc createUser {name args} {
        set name [_validateName $name]

        # Default options
        set opts [dict merge {-age 0 -admin false} $args]

        return [dict create \
            name  $name \
            age   [dict get $opts -age] \
            admin [dict get $opts -admin]]
    }

    proc fetchData {url} {
        package require http

        # Always brace expr
        set maxLen [expr {1024 * 1024}]

        set token [http::geturl $url -timeout 5000]
        try {
            return [http::data $token]
        } finally {
            http::cleanup $token
        }
    }
}

# Usage
namespace import myapp::createUser
set u [createUser "Alice" -age 30 -admin true]
puts [dict get $u name]    ;# Alice
```

## Gotchas

- Comments must appear on their own line or after a semicolon — `command ;# comment` is the idiom for end-of-line comments, but only after a complete command.
- Inline comments with `#` after a command on the same line (without a semicolon) are a syntax error: `set x 1 # comment` tries to call `set` with three arguments.
- The convention of prefixing private procedures with `_` is idiomatic but not enforced — Tcl has no access control.
- Always use `list` or `lappend` to construct lists, never string concatenation — `"$a $b"` creates a two-element list only if neither element contains spaces; `list $a $b` is always correct.

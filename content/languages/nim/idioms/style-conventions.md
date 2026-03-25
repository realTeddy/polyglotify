---
title: "Style Conventions"
language: "nim"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Nim follows a style guide: `camelCase` for procedures and variables, `PascalCase` for types and modules, `ALL_CAPS` for compile-time constants. Since Nim identifiers are case-insensitive after the first character, `myVar` and `my_var` refer to the same identifier — use consistent casing. `nimpretty` is the official formatter.

## Example

```nim
# Types: PascalCase
type
  HttpMethod = enum
    hmGet, hmPost, hmPut, hmDelete

  RequestOptions = object
    host*:    string
    port*:    int
    timeout*: int

# Procs: camelCase
proc newRequestOptions(host: string): RequestOptions =
  RequestOptions(host: host, port: 80, timeout: 30)

# Constants: ALL_CAPS (compile-time) or camelCase (runtime let)
const MaxRetries = 3
const DefaultTimeout = 5000

let serverVersion = "1.0.0"

# Private procs (no export marker *)
proc internalHelper(x: int): int =
  x * 2

# Exported procs (marked with *)
proc processRequest*(opts: RequestOptions): string =
  "Connecting to " & opts.host & ":" & $opts.port

# Avoid abbreviations; prefer clear names
proc calculateTotalPrice(items: seq[float]): float =
  var total = 0.0
  for item in items:
    total += item
  total
```

## Gotchas

- Nim's case-insensitivity means `myVar` and `my_var` conflict; pick one style and stick to it.
- Export symbols with `*` suffix: `proc myFunc*(x: int)` is public; without `*` it's module-private.
- `nimpretty` reformats Nim code; run it before committing for consistent style.

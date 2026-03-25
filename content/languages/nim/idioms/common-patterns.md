---
title: "Common Patterns"
language: "nim"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Nim idioms include UFCS (Uniform Function Call Syntax), method chaining, template/macro metaprogramming, functional operations on sequences via `sequtils`, the `result` implicit return variable, and pragmas for performance tuning. Nim's powerful macro system enables DSLs and zero-cost abstractions.

## Example

```nim
import std/[sequtils, strutils, sugar, options]

# 1. UFCS — call any proc as a method
proc double(x: int): int = x * 2
echo 5.double()       # same as double(5)
echo "hello".toUpper  # same as toUpper("hello")

# 2. Method chaining with sequtils
let result = @[1, 2, 3, 4, 5, 6]
  .filter(x => x mod 2 == 0)
  .map(x => x * x)
  .foldl(a + b)
echo result   # 56

# 3. Collect comprehension
import std/enumerate
let evens = collect:
  for x in 1..10:
    if x mod 2 == 0: x
echo evens

# 4. Template for DRY code
template withLogging(body: untyped) =
  echo "Starting..."
  body
  echo "Done."

withLogging:
  echo "Do work"

# 5. Object variant (tagged union)
type
  JsonKind = enum jNull, jBool, jInt, jString
  Json = object
    case kind: JsonKind
    of jBool:   bval: bool
    of jInt:    ival: int
    of jString: sval: string
    of jNull:   discard

let j = Json(kind: jString, sval: "hello")
case j.kind
of jString: echo "string: ", j.sval
else: echo "other"
```

## Gotchas

- UFCS means `x.f(y)` and `f(x, y)` are equivalent; this enables fluent chaining without `|>` operators.
- Nim templates are hygienic by default; use `{.inject.}` pragma if you need to inject names into the caller's scope.
- `collect` requires `import std/sugar`; it's a macro that builds a sequence from a for/if expression.

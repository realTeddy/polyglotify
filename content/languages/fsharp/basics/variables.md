---
title: "Variables & Declaration"
language: "fsharp"
feature: "variables"
category: "basics"
applicable: true
---

F# values are immutable by default. `let` binds a name to a value; `let mutable` enables mutation. F# uses significant whitespace (indentation-based scoping). The `use` binding is like `let` but disposes the resource at end of scope.

## Example

```fsharp
// Immutable binding
let name = "Alice"
let age = 30
let isActive = true

// Type annotation (optional; usually inferred)
let pi: float = 3.14159

// Mutable variable
let mutable counter = 0
counter <- counter + 1    // <- is the mutation operator
printfn "%d" counter       // 1

// Multiple bindings (sequential, not simultaneous)
let x = 10
let y = x + 5    // x is in scope

// Tuple destructuring
let (a, b) = (1, 2)

// Discard with _
let (_, second) = ("ignored", "kept")
printfn "%s" second   // kept

// Constants (module-level let is a constant)
[<Literal>]
let MaxRetries = 3    // [<Literal>] enables use in match patterns

// use: automatic resource disposal
let readFile path =
    use reader = System.IO.File.OpenText(path)
    reader.ReadToEnd()   // reader disposed here
```

## Gotchas

- `let` creates an immutable binding; `let mutable` is needed for mutation but should be avoided in functional code
- `<-` assigns to a `mutable` binding; using it on an immutable binding is a compile error
- `[<Literal>]` is needed if you want to use a `let` constant in a `match` pattern; regular `let` bindings cannot be used there

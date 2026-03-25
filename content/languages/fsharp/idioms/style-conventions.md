---
title: "Style Conventions"
language: "fsharp"
feature: "style-conventions"
category: "idioms"
applicable: true
---

The F# community follows the [F# style guide](https://docs.microsoft.com/en-us/dotnet/fsharp/style-guide/). **Fantomas** is the standard auto-formatter; **FSharpLint** provides additional linting. F# uses 4-space indentation.

## Example

```fsharp
// Naming conventions
// PascalCase: types, modules, members, DU cases, namespaces
type UserName = UserName of string
module UserService =
    type Status = Active | Inactive

// camelCase: functions, local values, parameters
let myFunction x y = x + y
let localValue = 42

// SCREAMING_SNAKE_CASE: NOT used in F#
// Constants are just PascalCase module-level lets
let MaxRetries = 3

// Module: PascalCase, matches file name
module MyApp.Domain.User

// 4-space indentation
let processUser user =
    match user.Status with
    | Active ->
        let result = compute user.Data
        Ok result
    | Inactive ->
        Error "User is inactive"

// Prefer pipeline over nested function calls
// Avoid: List.map f (List.filter g xs)
// Prefer:
xs |> List.filter g |> List.map f

// Type annotations: only when necessary; type inference handles most cases
let add (x: int) (y: int) : int = x + y   // explicit (useful in public API)
let add' x y = x + y                       // inferred (idiomatic for internal)

// Discriminated union cases: PascalCase
type Shape = Circle of float | Square of float

// Record fields: PascalCase
type Point = { X: float; Y: float }

// Use meaningful names; avoid single-letter names except for short lambdas
```

```bash
# Auto-format with Fantomas
dotnet fantomas src/

# Lint with FSharpLint
dotnet fsharplint lint MyProject.fsproj
```

## Gotchas

- F# uses significant whitespace; incorrect indentation causes compile errors, not just style warnings
- Fantomas is the authoritative formatter; configure it via `.editorconfig` or `fantomasconfig.json`
- Avoid mixing functional and OOP styles in the same module; pick one and stay consistent

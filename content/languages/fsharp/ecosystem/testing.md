---
title: "Testing"
language: "fsharp"
feature: "testing"
category: "ecosystem"
applicable: true
---

F# supports all .NET test frameworks. **Expecto** is the most idiomatic F# testing library (tests as values). **xUnit** and **NUnit** are popular alternatives with .NET-standard attributes. **FsCheck** provides property-based testing.

## Example

```fsharp
// --- Expecto (idiomatic F#) ---
// tests/MyApp.Tests/Tests.fs
module Tests

open Expecto

let mathTests =
    testList "Math" [
        test "add two numbers" {
            Expect.equal (2 + 3) 5 "2+3 should be 5"
        }

        test "safe divide returns Ok" {
            let result = MyApp.safeDivide 10.0 2.0
            Expect.equal result (Ok 5.0) "Should succeed"
        }

        test "divide by zero returns Error" {
            let result = MyApp.safeDivide 10.0 0.0
            Expect.isError result "Should fail"
        }

        testProperty "add is commutative" <| fun (x: int) y ->
            x + y = y + x
    ]

[<EntryPoint>]
let main args = runTestsWithCLIArgs [] args mathTests
```

```fsharp
// --- xUnit (familiar for .NET developers) ---
module XUnitTests

open Xunit

[<Fact>]
let ``add two numbers`` () =
    Assert.Equal(5, 2 + 3)

[<Theory>]
[<InlineData(10, 2, 5.0)>]
[<InlineData(9, 3, 3.0)>]
let ``divide`` (x, y, expected) =
    Assert.Equal(expected, float x / float y)
```

```bash
# Run tests
dotnet test

# Expecto with filtering
dotnet run --project tests/MyApp.Tests -- --filter "Math"

# With coverage
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=lcov
```

## Gotchas

- Expecto tests are plain F# values (not attributes); this makes them composable and easier to generate dynamically
- xUnit attribute names in F# are the same as C# but backtick-quoted names allow descriptive test names with spaces
- `testProperty` in Expecto integrates FsCheck for property-based testing; FsCheck also integrates with xUnit via `[<Property>]`

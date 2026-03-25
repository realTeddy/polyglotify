---
title: "Operators"
language: "powershell"
feature: "operators"
category: "basics"
applicable: true
---

PowerShell operators are keyword-based for comparisons (`-eq`, `-ne`, `-lt`, `-gt`, `-le`, `-ge`) to avoid confusion with redirection. String operators include `-like` (wildcards), `-match` (regex), `-replace` (regex substitution), `-split`, and `-join`. The `-contains` and `-in` operators test membership in arrays. PowerShell 7 adds the null-coalescing `??` and null-conditional `?.` operators.

## Example

```powershell
# Arithmetic
$a = 10; $b = 3
Write-Host "$($a + $b) $($a - $b) $($a * $b) $($a / $b) $($a % $b)"

# Comparison — keyword based
Write-Host (10 -eq 10)    # True
Write-Host (10 -ne 5)     # True
Write-Host (10 -gt 5)     # True
Write-Host ("abc" -lt "abd")  # True (lexicographic)

# String operators
"Hello World" -like "*World"          # True (wildcard)
"Hello World" -match "W\w+"           # True (regex); $Matches[0] = "World"
"Hello World" -replace "World","PS"   # "Hello PS"
"a,b,c" -split ","                    # @("a","b","c")
"a","b","c" -join "-"                 # "a-b-c"

# Case-insensitive by default; add 'c' prefix for case-sensitive
"hello" -eq "HELLO"    # True
"hello" -ceq "HELLO"   # False

# Array membership
$fruits = @("apple","banana","cherry")
"apple" -in $fruits       # True
$fruits -contains "grape" # False

# Null-coalescing (PowerShell 7+)
$val = $null
$result = $val ?? "default"
Write-Host $result   # default

# Logical
(1 -eq 1) -and (2 -eq 2)   # True
(1 -eq 2) -or  (2 -eq 2)   # True
-not $false                  # True
```

## Gotchas

- String comparisons are case-insensitive by default; prefix operators with `c` (`-ceq`, `-clike`, `-cmatch`) for case-sensitive behaviour.
- `-match` sets the `$Matches` automatic variable; the match is always against the whole string for `-eq` but substring for `-match`.
- `+` is always the left operand's type; `"5" + 3` returns `"53"` but `5 + "3"` returns `8`. Always be explicit about the type of the left operand.

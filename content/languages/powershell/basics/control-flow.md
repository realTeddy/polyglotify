---
title: "Control Flow"
language: "powershell"
feature: "control-flow"
category: "basics"
applicable: true
---

PowerShell supports `if`/`elseif`/`else`, `switch`, `for`, `foreach`, `while`, `do-while`, and `do-until`. The `switch` statement is powerful: it can match strings (with `-Wildcard`, `-Regex`, `-CaseSensitive` options), numbers, and script blocks as conditions. `foreach` is the idiomatic loop for collections. The pipeline `|` with `ForEach-Object` and `Where-Object` provides functional-style iteration.

## Example

```powershell
# if/elseif/else
$score = 85
if ($score -ge 90)     { "A" }
elseif ($score -ge 80) { "B" }   # prints B
elseif ($score -ge 70) { "C" }
else                   { "F" }

# switch with multiple match types
$input = "hello"
switch -Regex ($input) {
    "^\d+"   { "Starts with digits" }
    "^[a-z]" { "Starts with lowercase: $_" }   # prints this
    default  { "Unknown" }
}

# foreach — preferred for collections
$langs = @("PowerShell","Python","Go")
foreach ($lang in $langs) {
    Write-Host "  $lang"
}

# Pipeline style (functional)
1..10 | Where-Object { $_ % 2 -eq 0 } | ForEach-Object { $_ * $_ }

# for loop
for ($i = 0; $i -lt 5; $i++) { Write-Host -NoNewline "$i " }

# while
$n = 1
while ($n -le 8) { $n *= 2 }
Write-Host "n = $n"   # 16

# do-until
$x = 0
do { $x++ } until ($x -ge 5)
Write-Host "x = $x"   # 5
```

## Gotchas

- `switch` without a modifier is case-insensitive for strings; use `-CaseSensitive` to enable case-sensitive matching.
- `foreach ($item in $collection)` works on `$null` without error (iterates zero times); `ForEach-Object` in a pipeline with `$null` input also produces no output.
- `break` and `continue` work in `switch` blocks as well as loops; in a `switch` inside a loop, `break` exits the `switch`, not the outer loop — use labelled breaks for outer-loop control.

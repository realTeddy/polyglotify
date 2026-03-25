---
title: "Control Flow"
language: "python"
feature: "control-flow"
category: "basics"
applicable: true
---

Python uses `if`/`elif`/`else` for branching, `for` and `while` for loops, and `break`/`continue`/`pass` for loop control. Indentation (not braces) defines blocks. Python 3.10+ adds `match`/`case` for structural pattern matching.

## Example

```python
# if / elif / else
score = 85
if score >= 90:
    grade = "A"
elif score >= 75:
    grade = "B"
else:
    grade = "C"

# for loop over an iterable
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# range-based loop
for i in range(5):       # 0, 1, 2, 3, 4
    print(i)

# while loop
count = 0
while count < 3:
    count += 1

# Loop with else (runs if loop wasn't broken out of)
for n in range(2, 10):
    if n % 2 == 0:
        print(f"First even: {n}")
        break
else:
    print("No even number found")

# Pattern matching (Python 3.10+)
command = "quit"
match command:
    case "quit":
        print("Quitting")
    case "go" | "run":
        print("Going")
    case _:
        print("Unknown command")
```

## Gotchas

- Python has no `switch` statement before 3.10; use `match`/`case` (3.10+) or a dict dispatch pattern instead
- The `for`/`while` `else` clause is a common source of confusion — it runs only when the loop completes without hitting `break`
- `pass` is a no-op placeholder required where Python syntax demands a statement but you have nothing to do

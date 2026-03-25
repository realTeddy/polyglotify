---
title: "Exceptions & Try/Catch"
language: "python"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Python uses `try`/`except`/`else`/`finally` for exception handling. Exceptions are class instances that inherit from `BaseException`. The `raise` statement throws an exception and can re-raise the current one. Custom exceptions are created by subclassing `Exception`.

## Example

```python
# Basic try/except
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")

# Multiple exception types
try:
    value = int("abc")
except (ValueError, TypeError) as e:
    print(f"Conversion error: {e}")

# else — runs only if no exception was raised
try:
    data = int("42")
except ValueError:
    print("Invalid number")
else:
    print(f"Parsed: {data}")   # runs here

# finally — always runs (cleanup)
file = None
try:
    file = open("data.txt")
    contents = file.read()
except FileNotFoundError:
    print("File not found")
finally:
    if file:
        file.close()

# Custom exception
class InsufficientFundsError(Exception):
    def __init__(self, amount: float, balance: float) -> None:
        self.amount = amount
        self.balance = balance
        super().__init__(f"Cannot withdraw {amount}; balance is {balance}")

def withdraw(balance: float, amount: float) -> float:
    if amount > balance:
        raise InsufficientFundsError(amount, balance)
    return balance - amount

# Exception chaining
try:
    int("bad")
except ValueError as original:
    raise RuntimeError("Config parse failed") from original
```

## Gotchas

- Catching `except Exception` is usually fine; catching bare `except:` also catches `KeyboardInterrupt` and `SystemExit`, which is almost never what you want
- The `else` block only runs when no exception occurred — it is not the same as code placed after the `try` block, which would still run after a caught exception
- Using `raise` (no argument) inside an `except` block re-raises the current exception with its original traceback; using `raise e` creates a new traceback from that line

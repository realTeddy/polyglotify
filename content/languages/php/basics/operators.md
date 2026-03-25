---
title: "Operators"
language: "php"
feature: "operators"
category: "basics"
applicable: true
---

PHP supports arithmetic, comparison, logical, bitwise, string (`.` for concatenation), and assignment operators. Notable unique operators include the null coalescing operator `??` and `??=`, the spaceship operator `<=>` for three-way comparison, and the nullsafe operator `?->` for chained method calls on nullable objects.

## Example

```php
<?php

$a = 10; $b = 3;
echo "$a+$b=" . ($a + $b) . "\n";
echo "Concat: " . "Hello" . " " . "World\n";

// Null coalescing
$name = null;
echo ($name ?? "Anonymous") . "\n";

$config = [];
$config['timeout'] ??= 30;  // assign only if null/not set
echo $config['timeout'] . "\n";

// Spaceship operator (useful for sorting)
echo (1 <=> 2) . "\n";  // -1
echo (2 <=> 2) . "\n";  //  0
echo (3 <=> 2) . "\n";  //  1

// Nullsafe operator
class User { public ?Address $address = null; }
class Address { public string $city = "NYC"; }

$user = new User();
echo ($user?->address?->city ?? "No city") . "\n";  // No city
```

## Gotchas

- String concatenation uses `.` not `+`; using `+` on strings performs numeric addition after coercion.
- `==` is type-juggling; `0 == "foo"` returns `true` in PHP < 8 (changed to `false` in PHP 8) — always use `===`.
- The `??` operator checks for `null` or unset; it does not short-circuit on `false` or `0`, unlike JavaScript's `||`.

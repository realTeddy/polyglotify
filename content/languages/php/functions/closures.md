---
title: "Closures & Lambdas"
language: "php"
feature: "closures"
category: "functions"
applicable: true
---

PHP supports anonymous functions (`function() {}`) and arrow functions (`fn() =>`). Anonymous functions capture outer variables explicitly with `use ($var)` (by value) or `use (&$var)` (by reference). Arrow functions (PHP 7.4+) automatically capture variables from the outer scope by value. Both implement the `Closure` class.

## Example

```php
<?php
declare(strict_types=1);

$multiplier = 5;

// Anonymous function — explicit capture by value
$times5 = function(int $x) use ($multiplier): int {
    return $x * $multiplier;
};

// Arrow function — implicit capture
$times5Arrow = fn(int $x): int => $x * $multiplier;

echo $times5(3) . "\n";       // 15
echo $times5Arrow(3) . "\n";  // 15

// Capture by reference
$counter = 0;
$increment = function() use (&$counter): void {
    $counter++;
};
$increment();
$increment();
echo $counter . "\n";  // 2

// Array functions with closures
$numbers = [1, 2, 3, 4, 5, 6];
$evens = array_filter($numbers, fn($n) => $n % 2 === 0);
$doubled = array_map(fn($n) => $n * 2, $evens);
echo implode(', ', $doubled) . "\n";  // 4, 8, 12
```

## Gotchas

- Variables captured with `use ($var)` are captured at the time the closure is created, not at call time; use `use (&$var)` to see later changes.
- Arrow functions can only contain a single expression; multi-statement closures require the anonymous function syntax.
- `Closure::bind()` and `Closure::bindTo()` rebind the closure's `$this` to a different object, which is useful for frameworks but can be confusing.

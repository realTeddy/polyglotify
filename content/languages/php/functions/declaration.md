---
title: "Function Declaration"
language: "php"
feature: "declaration"
category: "functions"
applicable: true
---

PHP functions are declared with `function`. Return types are optional but recommended with `declare(strict_types=1)`. Functions are first-class values and can be passed as callbacks. Named functions are global by default (within their namespace); closures create anonymous functions that capture variables from scope explicitly.

## Example

```php
<?php
declare(strict_types=1);

function add(int $a, int $b): int {
    return $a + $b;
}

function greet(string $name, string $greeting = "Hello"): string {
    return "$greeting, $name!";
}

// Arrow function (PHP 7.4+) — implicit capture
$multiplier = 3;
$triple = fn(int $x): int => $x * $multiplier;

// Higher-order function
function applyTwice(callable $f, int $x): int {
    return $f($f($x));
}

echo add(3, 4) . "\n";
echo greet("PHP") . "\n";
echo $triple(7) . "\n";
echo applyTwice(fn($x) => $x + 1, 5) . "\n";  // 7
```

## Gotchas

- PHP function names are case-insensitive (`Add` and `add` refer to the same function), but convention is to use `camelCase` or `snake_case` consistently.
- Arrow functions (`fn`) capture variables from the enclosing scope by value automatically; closures (`function`) require explicit `use ($var)` declarations.
- Declaring a function inside a conditional block is valid but the function becomes globally available (within the namespace) once the code path is executed.

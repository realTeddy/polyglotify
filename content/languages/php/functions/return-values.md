---
title: "Return Values"
language: "php"
feature: "return-values"
category: "functions"
applicable: true
---

PHP functions return a single value or `null` implicitly if no `return` is reached. Multiple values are returned as arrays (often with `list()` or array destructuring). The return type `void` prohibits returning a value. PHP 8 introduced `never` for functions that always throw or exit. Nullable return types use `?Type`.

## Example

```php
<?php
declare(strict_types=1);

function minMax(array $numbers): array {
    return [min($numbers), max($numbers)];
}

function divide(float $a, float $b): ?float {
    if ($b === 0.0) return null;
    return $a / $b;
}

// Destructuring the return
[$min, $max] = minMax([3, 1, 4, 1, 5, 9]);
echo "min=$min max=$max\n";

$result = divide(10.0, 3.0);
echo ($result !== null ? number_format($result, 4) : "undefined") . "\n";

// List unpacking with keys (PHP 7.1+)
function getUser(): array {
    return ['name' => 'Alice', 'age' => 30];
}
['name' => $name, 'age' => $age] = getUser();
echo "$name is $age\n";
```

## Gotchas

- A function with a `void` return type that has a `return;` statement (no value) is valid; a function with no return type annotation that returns nothing implicitly returns `null`.
- Array destructuring with `[..] = ...` is the modern equivalent of `list(...) = ...`; both work but the bracket syntax is preferred in PHP 7.1+.
- Returning a large array copies it by value in PHP (copy-on-write applies until mutation), which can be surprising for very large data structures — pass and return by reference or use generators for streaming data.

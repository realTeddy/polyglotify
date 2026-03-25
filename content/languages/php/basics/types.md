---
title: "Types & Type Systems"
language: "php"
feature: "types"
category: "basics"
applicable: true
---

PHP is dynamically typed with optional type declarations. Scalar types include `int`, `float`, `string`, `bool`. Compound types include `array`, `object`, `callable`, `iterable`. PHP 8 added union types (`int|string`), intersection types, `mixed`, `never`, and `enum`. Strict mode (`declare(strict_types=1)`) disables implicit type coercion in typed function signatures.

## Example

```php
<?php
declare(strict_types=1);

function add(int $a, int $b): int {
    return $a + $b;
}

function maybeLength(?string $s): ?int {
    return $s !== null ? strlen($s) : null;
}

// PHP 8 union types
function process(int|string $value): string {
    return is_int($value) ? "number: $value" : "string: $value";
}

echo add(3, 4) . "\n";
echo process(42) . "\n";
echo process("hello") . "\n";
var_dump(maybeLength(null));    // NULL
var_dump(maybeLength("hello")); // int(5)

// Type checking
$x = "42";
var_dump(is_string($x));  // bool(true)
var_dump((int)$x);        // int(42) — explicit cast
```

## Gotchas

- Without `declare(strict_types=1)`, PHP silently coerces `"42"` to `42` when passed to an `int` parameter — enabling strict mode is strongly recommended.
- `==` performs type-juggling comparison (`0 == "foo"` is `true` in older PHP); always use `===` for strict equality.
- PHP 8 fibers, enums, and `readonly` properties have significantly modernized the type system; avoid PHP 7 patterns in new code.

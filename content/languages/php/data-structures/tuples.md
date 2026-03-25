---
title: "Tuples"
language: "php"
feature: "tuples"
category: "data-structures"
applicable: false
---

PHP has no tuple type. Functions return multiple values as plain arrays, which can be destructured with the short array syntax `[$a, $b] = func()`. For typed groupings, value objects or readonly classes (PHP 8.2+) are the idiomatic alternative.

## Example

```php
<?php
declare(strict_types=1);

// Array as a "tuple"
function minMax(array $nums): array {
    return [min($nums), max($nums)];
}

[$min, $max] = minMax([3, 1, 4, 1, 5, 9]);
echo "min=$min max=$max\n";

// Named "tuple" with readonly class (PHP 8.2+)
readonly class Point {
    public function __construct(
        public float $x,
        public float $y,
    ) {}
}

$p = new Point(3.0, 4.0);
echo "{$p->x}, {$p->y}\n";

// Associative array as named tuple
function getCoords(): array {
    return ['lat' => 51.5, 'lon' => -0.12];
}
['lat' => $lat, 'lon' => $lon] = getCoords();
echo "$lat, $lon\n";
```

## Gotchas

- Returning arrays as tuples provides no type safety — the caller must know the order or key names by convention.
- `readonly class` (PHP 8.2+) is the most type-safe way to express a fixed-shape value; all properties must be initialized in the constructor and cannot be changed after construction.
- Array destructuring silently assigns `null` for missing keys; always validate that returned arrays have the expected structure.

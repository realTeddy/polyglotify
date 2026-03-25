---
title: "Arrays & Lists"
language: "php"
feature: "arrays"
category: "data-structures"
applicable: true
---

PHP arrays are ordered maps that serve as both lists (sequential integer keys) and associative arrays (string keys). They are copy-on-write value types. The standard library includes `array_map`, `array_filter`, `array_reduce`, `array_slice`, `usort`, and dozens more. The spread operator `...` unpacks arrays into function calls or other array literals.

## Example

```php
<?php

// Sequential array (list)
$fruits = ['apple', 'banana', 'cherry'];
$fruits[] = 'date';               // append
array_unshift($fruits, 'avocado'); // prepend
echo count($fruits) . "\n";

// Functional operations
$lengths = array_map('strlen', $fruits);
$long = array_filter($fruits, fn($f) => strlen($f) > 6);
$total = array_sum($lengths);
echo implode(', ', $long) . "\n";

// Sorting
usort($fruits, fn($a, $b) => strlen($a) <=> strlen($b));
print_r($fruits);

// Spread into array
$a = [1, 2, 3];
$b = [0, ...$a, 4, 5];
print_r($b);  // [0, 1, 2, 3, 4, 5]
```

## Gotchas

- PHP arrays are always copies on assignment (copy-on-write); modifying `$b = $a; $b[] = 4;` does not affect `$a`.
- `array_filter` preserves original keys; wrap with `array_values()` to re-index if you need sequential keys.
- `array_map` with multiple arrays iterates them in parallel; the arrays are not nested.

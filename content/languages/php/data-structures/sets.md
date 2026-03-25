---
title: "Sets"
language: "php"
feature: "sets"
category: "data-structures"
applicable: true
---

PHP has no built-in set type. The idiomatic approach is to use `array_unique` for deduplication, or an associative array with values as keys for O(1) membership tests. The `SplFixedArray` and `SplDoublyLinkedList` from the SPL extension cover specialized structures but not sets. `array_diff`, `array_intersect`, and `array_unique` provide set-like operations.

## Example

```php
<?php

// Emulate a set with array_flip (value → key, O(1) lookup)
function makeSet(array $values): array {
    return array_fill_keys($values, true);
}

$a = makeSet([1, 2, 3, 4, 5]);
$b = makeSet([3, 4, 5, 6, 7]);

// Contains
var_dump(isset($a[2]));  // true

// Union
$union = array_keys($a + $b);
sort($union);
print_r($union);

// Intersection
$intersection = array_values(array_intersect_key($a, $b));
print_r($intersection);

// Difference
$diff = array_values(array_diff_key($a, $b));
print_r($diff);

// Deduplicate with array_unique
$dupes = [1, 2, 2, 3, 3, 3];
$unique = array_values(array_unique($dupes));
print_r($unique);
```

## Gotchas

- `array_unique` uses string comparison by default; use `SORT_REGULAR` flag for type-aware deduplication.
- Using `array_search` for membership testing is O(n); use an associative array with `isset` for O(1) lookups on large collections.
- `array_intersect` and `array_diff` work on values (O(n²)); `array_intersect_key` and `array_diff_key` work on keys (O(n)), which is much faster.

---
title: "Maps & Dictionaries"
language: "php"
feature: "maps"
category: "data-structures"
applicable: true
---

PHP does not have a separate map/dictionary type — the built-in `array` with string keys serves this role. Associative arrays maintain insertion order, support any string or integer as a key, and are accessed with square brackets. Functions like `array_key_exists`, `isset`, `array_keys`, `array_values`, and `array_merge` provide dictionary-like operations.

## Example

```php
<?php

$scores = ['Alice' => 95, 'Bob' => 87, 'Carol' => 91];

// Access
echo $scores['Alice'] . "\n";  // 95
echo ($scores['Dave'] ?? 0) . "\n";  // 0 (key doesn't exist)

// Add / update / remove
$scores['Dave'] = 88;
$scores['Bob'] = 90;
unset($scores['Carol']);

// Check existence
var_dump(array_key_exists('Alice', $scores));  // true
var_dump(isset($scores['Carol']));             // false (was unset)

// Iterate
foreach ($scores as $name => $score) {
    echo "$name: $score\n";
}

// Merge (later keys overwrite earlier)
$extra = ['Eve' => 82, 'Alice' => 100];
$merged = array_merge($scores, $extra);
echo $merged['Alice'] . "\n";  // 100
```

## Gotchas

- `array_key_exists` checks if a key is present even if its value is `null`; `isset` returns `false` for `null` values, which can cause subtle bugs.
- `array_merge` renumbers integer keys; use the `+` operator or `array_replace` to preserve integer keys.
- PHP arrays are ordered maps — insertion order is guaranteed, unlike hash maps in most other languages.

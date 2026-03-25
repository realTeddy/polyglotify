---
title: "Parameters & Arguments"
language: "php"
feature: "parameters"
category: "functions"
applicable: true
---

PHP function parameters support type hints, default values, pass-by-reference (`&$param`), and variadic arguments (`...$args`). Named arguments (PHP 8.0+) allow passing arguments by name in any order. Parameters can be marked `readonly` in constructors (PHP 8.1+).

## Example

```php
<?php
declare(strict_types=1);

function sum(int ...$numbers): int {
    return array_sum($numbers);
}

function log(string $message, string $level = 'INFO', bool $timestamp = true): void {
    $prefix = $timestamp ? date('H:i:s') . ' ' : '';
    echo "{$prefix}[{$level}] {$message}\n";
}

function addToArray(array &$arr, mixed $value): void {
    $arr[] = $value;
}

$nums = [10, 20, 30];
echo sum(...$nums) . "\n";  // spread array into variadic: 60

// Named arguments (PHP 8.0+)
log(level: 'ERROR', message: 'Something failed', timestamp: false);

$list = [1, 2, 3];
addToArray($list, 4);  // modifies $list directly
print_r($list);
```

## Gotchas

- Pass-by-reference (`&$param`) modifies the caller's variable but makes code harder to reason about; prefer returning a new value when possible.
- Named arguments skip parameters by their name — if you rename a parameter in a library function, callers using named arguments will break.
- Variadic `...$args` collects all extra positional arguments into an array; it must be the last parameter.

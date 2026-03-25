---
title: "Control Flow"
language: "php"
feature: "control-flow"
category: "basics"
applicable: true
---

PHP has `if`/`elseif`/`else`, `switch`, `match` (PHP 8), `for`, `foreach`, `while`, and `do-while`. `match` is a strict-comparison expression that returns a value and throws an `UnhandledMatchError` if no arm matches. `foreach` iterates over arrays and objects that implement `Traversable`.

## Example

```php
<?php

// match expression (PHP 8) — strict, returns value
function classify(int $n): string {
    return match(true) {
        $n < 0  => 'negative',
        $n === 0 => 'zero',
        default  => 'positive',
    };
}

// foreach with key => value
$scores = ['Alice' => 95, 'Bob' => 87, 'Carol' => 91];
foreach ($scores as $name => $score) {
    echo "$name: $score\n";
}

// for loop
for ($i = 0; $i < 5; $i++) {
    echo classify($i - 2) . "\n";
}

// list() destructuring in foreach
$points = [[1, 2], [3, 4], [5, 6]];
foreach ($points as [$x, $y]) {
    echo "($x, $y)\n";
}
```

## Gotchas

- `switch` uses loose `==` comparison; `match` uses strict `===` — prefer `match` in PHP 8+ code.
- `match` throws `UnhandledMatchError` if no arm matches and there is no `default`; `switch` falls through silently to the end if no `case` matches.
- `break 2` exits two levels of nested loops/switches; the numeric argument controls how many enclosing structures to break out of.

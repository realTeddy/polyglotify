---
title: "Variables & Declaration"
language: "php"
feature: "variables"
category: "basics"
applicable: true
---

PHP variables start with `$` and are dynamically typed — no declaration keyword is needed, and a variable is created on first assignment. Variables are local to functions by default; accessing a global variable inside a function requires the `global` keyword or the `$GLOBALS` superglobal. Constants are defined with `const` or `define()`.

## Example

```php
<?php

$name = "PHP";          // string
$count = 0;             // int
$pi = 3.14159;          // float
$active = true;         // bool
$nothing = null;        // null

$count++;
echo "$name count=$count\n";

// String interpolation
echo "Hello, {$name}!\n";

// Constants
const MAX_SIZE = 100;
define('APP_ENV', 'production');
echo MAX_SIZE . ' ' . APP_ENV . "\n";

// Variable variables (use sparingly)
$varName = "greeting";
$$varName = "Hello";
echo $greeting . "\n";  // Hello
```

## Gotchas

- A typo in a variable name creates a new `null` variable rather than an error (unless strict mode or a linter catches it).
- Variables declared inside a function are not visible outside, and variables from the outer scope are not visible inside without `global $var` or passing as a parameter.
- PHP has no block scope — variables declared inside `if` or `for` blocks remain accessible in the enclosing function scope after the block exits.

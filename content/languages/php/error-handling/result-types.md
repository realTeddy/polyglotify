---
title: "Result Types"
language: "php"
feature: "result-types"
category: "error-handling"
applicable: false
---

PHP has no built-in `Result` type. The common alternatives are returning `null` (with nullable return types), throwing exceptions, or using a custom `Result` value object. Libraries like `league/result-type` or `nevermind/result` provide a `Result<T>` pattern, and PHPDoc enables type-safe usage under static analysis tools.

## Example

```php
<?php
declare(strict_types=1);

/**
 * Simple Result type implementation
 * @template T
 */
final class Result {
    private function __construct(
        private readonly bool  $success,
        private readonly mixed $value,
        private readonly ?string $error = null,
    ) {}

    /** @param T $value */
    public static function ok(mixed $value): self { return new self(true, $value); }

    public static function err(string $error): self { return new self(false, null, $error); }

    public function isOk(): bool { return $this->success; }

    /** @return T */
    public function unwrap(): mixed {
        if (!$this->success) throw new \RuntimeException("Called unwrap on Err: {$this->error}");
        return $this->value;
    }

    public function getError(): ?string { return $this->error; }
}

function parsePositive(string $input): Result {
    $n = filter_var($input, FILTER_VALIDATE_INT);
    if ($n === false) return Result::err("not an integer");
    if ($n <= 0)      return Result::err("must be positive");
    return Result::ok($n);
}

$result = parsePositive("42");
if ($result->isOk()) {
    echo "Value: " . $result->unwrap() . "\n";
} else {
    echo "Error: " . $result->getError() . "\n";
}
```

## Gotchas

- Without generics, PHP's `Result` implementation loses type information at runtime; rely on PHPDoc `@template` annotations and a static analysis tool for type safety.
- The `null` return pattern (nullable types) is simpler for functions that can "not find" something; reserve `Result` for operations that can fail with meaningful error context.
- Exceptions remain the idiomatic PHP error-handling mechanism; `Result` types are more common in functional programming styles or when integrating with typed domain models.

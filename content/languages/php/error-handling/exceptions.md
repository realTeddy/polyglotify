---
title: "Exceptions & Try/Catch"
language: "php"
feature: "exceptions"
category: "error-handling"
applicable: true
---

PHP uses `try`/`catch`/`finally` for exception handling. All exceptions extend `\Throwable`; user exceptions extend `\Exception` and fatal errors extend `\Error`. Multiple `catch` blocks or a union catch (`catch (TypeA | TypeB $e)`) handle different types. PHP 8.0 added non-capturing catches (`catch (Exception)` without a variable).

## Example

```php
<?php
declare(strict_types=1);

class NotFoundException extends \RuntimeException {}
class ValidationException extends \InvalidArgumentException {
    public function __construct(string $message, private array $errors = []) {
        parent::__construct($message);
    }
    public function getErrors(): array { return $this->errors; }
}

function findUser(int $id): array {
    if ($id <= 0) throw new ValidationException("Invalid ID", ['id' => 'must be positive']);
    if ($id > 100) throw new NotFoundException("User $id not found");
    return ['id' => $id, 'name' => "User $id"];
}

try {
    $user = findUser(0);
    echo $user['name'] . "\n";
} catch (ValidationException $e) {
    echo "Validation: " . $e->getMessage() . "\n";
    print_r($e->getErrors());
} catch (NotFoundException $e) {
    echo "Not found: " . $e->getMessage() . "\n";
} catch (\Throwable $e) {
    echo "Unexpected: " . $e->getMessage() . "\n";
} finally {
    echo "Cleanup done\n";
}
```

## Gotchas

- `finally` always executes, even if a `return` is encountered in the `try` or `catch` block — but a `return` in `finally` overrides the `try`/`catch` return value.
- PHP's `Error` class (and subclasses like `TypeError`, `ParseError`) represent internal PHP errors; always catch `\Throwable` if you need to catch everything.
- Exception hierarchies in PHP are not checked at compile time; document `@throws` in PHPDoc and use PHPStan to enforce callers handle them.

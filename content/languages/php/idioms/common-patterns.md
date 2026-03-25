---
title: "Common Patterns"
language: "php"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Key PHP idioms include: constructor property promotion for concise data classes, readonly classes for value objects, first-class callable syntax (PHP 8.1+), `match` expressions over `switch`, named arguments for clarity, and the Repository + Service layer pattern for application architecture. The null coalescing operator `??` and nullsafe operator `?->` are essential for safe null handling.

## Example

```php
<?php
declare(strict_types=1);

// First-class callable syntax (PHP 8.1+)
$strlen = strlen(...);
$lengths = array_map($strlen, ['hello', 'world', 'php']);
print_r($lengths);

// Named arguments for clarity
function createUser(string $name, int $age, bool $isAdmin = false): array {
    return compact('name', 'age', 'isAdmin');
}
$user = createUser(name: 'Alice', age: 30, isAdmin: true);
print_r($user);

// match as expression
$status = 404;
$message = match($status) {
    200, 201 => 'Success',
    301, 302 => 'Redirect',
    404      => 'Not Found',
    500      => 'Server Error',
    default  => 'Unknown',
};
echo $message . "\n";

// Readonly value object
readonly class EmailAddress {
    public function __construct(public readonly string $value) {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException("Invalid email: $value");
        }
    }
    public function __toString(): string { return $this->value; }
}

$email = new EmailAddress('alice@example.com');
echo $email . "\n";
```

## Gotchas

- First-class callable syntax (`strlen(...)`) creates a `Closure` from a named function, enabling type-safe callables without wrapping in `fn($x) => strlen($x)`.
- `compact()` creates an associative array from variable names — it is concise but brittle; renaming variables without updating the `compact` call is a common bug.
- `match` is strict (`===`) and exhaustive (throws `UnhandledMatchError` on no match); always add a `default` arm unless you want the error.

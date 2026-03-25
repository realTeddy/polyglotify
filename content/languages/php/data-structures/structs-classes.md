---
title: "Structs & Classes"
language: "php"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

PHP has no struct type. The closest equivalents are plain objects, `readonly class` (PHP 8.2+) for immutable value objects, and classes with constructor property promotion (PHP 8.0+). Readonly classes have all properties implicitly `readonly`, making them suitable for data transfer objects and value objects.

## Example

```php
<?php
declare(strict_types=1);

// Constructor property promotion (PHP 8.0+)
class User {
    public function __construct(
        public readonly int    $id,
        public readonly string $name,
        public string          $email,
    ) {}

    public function withEmail(string $email): static {
        $clone = clone $this;
        $clone->email = $email;
        return $clone;
    }
}

// Readonly class — all properties are readonly (PHP 8.2+)
readonly class Money {
    public function __construct(
        public int    $amount,
        public string $currency,
    ) {}

    public function add(Money $other): Money {
        assert($this->currency === $other->currency);
        return new Money($this->amount + $other->amount, $this->currency);
    }
}

$user = new User(1, 'Alice', 'alice@example.com');
echo $user->name . "\n";

$price = new Money(100, 'USD');
$tax   = new Money(8, 'USD');
$total = $price->add($tax);
echo "{$total->amount} {$total->currency}\n";
```

## Gotchas

- Constructor property promotion generates a property AND assigns the argument in one step; it dramatically reduces boilerplate for data classes.
- `readonly` properties can be initialized only once; cloning an object with `clone` creates a shallow copy, but readonly properties in the clone can be set in `__clone`.
- `readonly class` does not allow uninitialized properties and cannot extend non-readonly classes (except `stdClass`-derived ones).

---
title: "Classes"
language: "php"
feature: "classes"
category: "oop"
applicable: true
---

PHP has full OOP support with classes, visibility modifiers (`public`, `protected`, `private`), static members, constants, abstract classes, and constructor property promotion. PHP 8.0+ constructor promotion and readonly properties dramatically reduce boilerplate for typical classes.

## Example

```php
<?php
declare(strict_types=1);

class BankAccount {
    private float $balance;

    public function __construct(
        public readonly string $owner,
        float $initialBalance = 0.0,
    ) {
        $this->balance = $initialBalance;
    }

    public function deposit(float $amount): void {
        if ($amount <= 0) throw new \InvalidArgumentException("Amount must be positive");
        $this->balance += $amount;
    }

    public function withdraw(float $amount): void {
        if ($amount > $this->balance) throw new \RuntimeException("Insufficient funds");
        $this->balance -= $amount;
    }

    public function getBalance(): float { return $this->balance; }

    public function __toString(): string {
        return "{$this->owner}: \${$this->balance}";
    }
}

$account = new BankAccount('Alice', 1000.0);
$account->deposit(500.0);
$account->withdraw(200.0);
echo $account . "\n";  // Alice: $1300
```

## Gotchas

- PHP does not enforce access modifiers at runtime in reflection-heavy code; `ReflectionProperty::setAccessible(true)` can bypass `private`.
- Magic methods (`__toString`, `__get`, `__set`, `__call`) are powerful but make code hard to analyze statically; prefer explicit methods.
- Class names are case-insensitive in PHP, but PSR-4 autoloading depends on the filename matching the exact case of the class name.

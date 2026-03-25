---
title: "Generics"
language: "php"
feature: "generics"
category: "oop"
applicable: false
---

PHP does not have runtime generics. The common workaround is PHPDoc type annotations (`@template`, `@param T`, `@return T`) which are understood by static analysis tools like PHPStan and Psalm. These provide generic-like type safety at analysis time without any runtime overhead or enforcement.

## Example

```php
<?php
declare(strict_types=1);

/**
 * @template T
 */
class TypedCollection {
    /** @var T[] */
    private array $items = [];

    /** @param T $item */
    public function add(mixed $item): void {
        $this->items[] = $item;
    }

    /**
     * @return T[]
     */
    public function all(): array {
        return $this->items;
    }

    public function count(): int {
        return count($this->items);
    }
}

/**
 * @template T
 * @param T[] $items
 * @param callable(T): bool $predicate
 * @return T[]
 */
function filter(array $items, callable $predicate): array {
    return array_values(array_filter($items, $predicate));
}

// PHPStan/Psalm will type-check usage of TypedCollection<User>
// but PHP itself does not enforce it at runtime
```

## Gotchas

- PHPDoc generics are enforced only by static analysis tools, not at runtime — invalid types will not cause errors during execution.
- PHPStan and Psalm have slightly different `@template` syntaxes; check the documentation for the tool you are using.
- Some frameworks (e.g., Laravel Collections) use detailed PHPDoc generics that enable excellent IDE autocomplete even without runtime generics.

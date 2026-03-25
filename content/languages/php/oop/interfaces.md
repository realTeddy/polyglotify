---
title: "Interfaces & Traits"
language: "php"
feature: "interfaces"
category: "oop"
applicable: true
---

PHP interfaces define method signatures that implementing classes must fulfill. A class can implement multiple interfaces. Traits provide horizontal code reuse — they are included into classes with `use` and their methods are merged into the class. PHP 8.1 added intersection types and enums that can implement interfaces.

## Example

```php
<?php
declare(strict_types=1);

interface Serializable {
    public function serialize(): string;
    public static function deserialize(string $data): static;
}

interface Printable {
    public function print(): void;
}

trait Timestamps {
    private \DateTimeImmutable $createdAt;

    public function initTimestamps(): void {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getCreatedAt(): \DateTimeImmutable { return $this->createdAt; }
}

class Document implements Serializable, Printable {
    use Timestamps;

    public function __construct(public readonly string $title, public readonly string $body) {
        $this->initTimestamps();
    }

    public function serialize(): string { return json_encode(['title' => $this->title, 'body' => $this->body]); }

    public static function deserialize(string $data): static {
        $d = json_decode($data, true);
        return new static($d['title'], $d['body']);
    }

    public function print(): void { echo "# {$this->title}\n{$this->body}\n"; }
}

$doc = new Document("Hello", "World");
$doc->print();
$json = $doc->serialize();
Document::deserialize($json)->print();
```

## Gotchas

- Traits can cause method name conflicts if two traits define the same method; resolve with `insteadof` and `as` operators in the `use` block.
- Interfaces cannot have property declarations (only constants); use abstract classes if you need to declare properties as part of the contract.
- Trait methods are copied into the using class at compile time; they behave as if written directly in the class body and have full access to `private` members.

---
title: "Inheritance"
language: "php"
feature: "inheritance"
category: "oop"
applicable: true
---

PHP supports single class inheritance with `extends`. Methods are overridden without any special keyword (unlike Kotlin's `override`). Parent methods are accessed with `parent::`. Abstract classes and abstract methods enforce that subclasses provide implementations. `final` prevents further subclassing or method overriding.

## Example

```php
<?php
declare(strict_types=1);

abstract class Shape {
    public function __construct(public readonly string $color) {}

    abstract public function area(): float;

    public function describe(): string {
        return sprintf("%s %s with area %.2f", $this->color, static::class, $this->area());
    }
}

class Circle extends Shape {
    public function __construct(string $color, public readonly float $radius) {
        parent::__construct($color);
    }

    public function area(): float {
        return M_PI * $this->radius ** 2;
    }
}

final class Square extends Shape {
    public function __construct(string $color, public readonly float $side) {
        parent::__construct($color);
    }

    public function area(): float { return $this->side ** 2; }
}

$shapes = [new Circle('red', 5.0), new Square('blue', 4.0)];
foreach ($shapes as $shape) {
    echo $shape->describe() . "\n";
}
```

## Gotchas

- PHP uses late static binding via `static::` for the current class and `self::` for the class where the method is defined — mixing them in class hierarchies causes subtle bugs.
- Calling `parent::__construct()` is not automatic; forgetting it means the parent's constructor logic (including property initialization) is skipped.
- Multiple inheritance is not supported; use interfaces and traits for composing behavior from multiple sources.

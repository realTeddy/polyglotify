---
title: "Testing"
language: "php"
feature: "testing"
category: "ecosystem"
applicable: true
---

PHPUnit is PHP's standard testing framework. Tests extend `TestCase` and use `assert*` methods. Pest PHP is a modern, expressive alternative with a Jasmine/Jest-like API built on top of PHPUnit. PHPStan and Psalm provide static analysis. Mockery and PHPUnit's built-in `createMock` handle test doubles.

## Example

```php
<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;

function divide(float $a, float $b): float {
    if ($b === 0.0) throw new \DivisionByZeroError("Cannot divide by zero");
    return $a / $b;
}

class DivideTest extends TestCase {
    public function test_basic_division(): void {
        $this->assertEqualsWithDelta(3.333, divide(10.0, 3.0), 0.001);
    }

    public function test_divide_by_zero_throws(): void {
        $this->expectException(\DivisionByZeroError::class);
        divide(1.0, 0.0);
    }

    /** @dataProvider additionProvider */
    public function test_with_data_provider(float $a, float $b, float $expected): void {
        $this->assertEqualsWithDelta($expected, divide($a, $b), 0.001);
    }

    public static function additionProvider(): array {
        return [[10.0, 2.0, 5.0], [9.0, 3.0, 3.0], [7.0, 2.0, 3.5]];
    }
}
```

## Gotchas

- `setUp()` and `tearDown()` run before and after each test method; `setUpBeforeClass()` and `tearDownAfterClass()` run once per class — use static for the class-level methods.
- Data providers must be `static` methods in PHPUnit 10+; non-static data providers generate a deprecation warning.
- PHPUnit's `createMock()` creates a strict mock that fails if unexpected methods are called; use `getMockBuilder()->...->getMock()` for more control.

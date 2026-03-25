---
title: "Style Conventions"
language: "php"
feature: "style-conventions"
category: "idioms"
applicable: true
---

PHP style is governed by the PSR standards from PHP-FIG. PSR-1 (basic coding standards), PSR-12 (extended coding style), and PSR-4 (autoloading) are universally adopted. Naming uses `PascalCase` for classes, `camelCase` for methods and variables, `SCREAMING_SNAKE_CASE` for constants, and `snake_case` is acceptable for legacy code. PHP CS Fixer and Laravel Pint automate formatting.

## Example

```php
<?php
declare(strict_types=1);

namespace App\Domain\Users;

use App\Domain\Common\ValueObject;

/**
 * Represents a user in the system.
 */
final class User {
    private const STATUS_ACTIVE = 'active';
    private const STATUS_INACTIVE = 'inactive';

    public function __construct(
        private readonly UserId $id,
        private string          $name,
        private string          $status = self::STATUS_ACTIVE,
    ) {}

    public function getId(): UserId { return $this->id; }

    public function getName(): string { return $this->name; }

    public function isActive(): bool { return $this->status === self::STATUS_ACTIVE; }

    public function deactivate(): void {
        $this->status = self::STATUS_INACTIVE;
    }
}
```

## Gotchas

- PSR-12 requires a blank line after the opening `<?php` and `declare(strict_types=1)` must be on a line by itself.
- PHP CS Fixer can be configured with a `.php-cs-fixer.php` config file; use `@PSR12` or `@Symfony` as a base ruleset and customize from there.
- Avoid mixing PSR-12 and older PSR-2 conventions in the same codebase; run the fixer on the entire codebase once to establish a consistent baseline.

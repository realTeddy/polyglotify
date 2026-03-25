---
title: "Project Structure"
language: "php"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

PHP projects follow PSR-4 autoloading conventions. Source code lives in `src/`, tests in `tests/`, and the web document root in `public/`. Framework-specific structures (Laravel, Symfony) add `app/`, `config/`, `routes/`, `resources/`, etc. The `composer.json` `autoload` section maps namespaces to directories.

## Example

```
my-project/
├── composer.json
├── composer.lock
├── phpunit.xml
├── phpstan.neon
├── public/
│   └── index.php          # web entry point
├── src/
│   ├── Application.php    # namespace: App
│   ├── Domain/
│   │   ├── User.php       # namespace: App\Domain
│   │   └── UserRepository.php
│   └── Infrastructure/
│       └── DatabaseUserRepository.php
└── tests/
    ├── Unit/
    │   └── Domain/
    │       └── UserTest.php
    └── Integration/
        └── DatabaseUserRepositoryTest.php
```

```php
<?php
// public/index.php — web entry point
require __DIR__ . '/../vendor/autoload.php';

use App\Application;

$app = new Application();
$app->run();
```

## Gotchas

- PSR-4 requires the namespace to exactly match the directory structure (case-sensitive on Linux); a mismatch causes autoloading to silently fail.
- The `public/` directory should be the only directory exposed to the web server; all other directories (especially `vendor/`, `src/`, `config/`) should be outside the webroot.
- Never store secrets in `config/` files committed to version control; use `.env` files (gitignored) and `symfony/dotenv` or `vlucas/phpdotenv` to load them.

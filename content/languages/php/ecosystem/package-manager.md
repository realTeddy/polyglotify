---
title: "Package Manager"
language: "php"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Composer is PHP's standard dependency manager. Packages are listed in `composer.json` and fetched from Packagist (the central repository). `composer.lock` pins exact versions for reproducible installs. Composer also manages autoloading via PSR-4, eliminating manual `require` calls. The `require`, `require-dev`, and `suggest` sections separate production, development, and optional dependencies.

## Example

```json
{
    "name": "example/my-app",
    "require": {
        "php": "^8.2",
        "guzzlehttp/guzzle": "^7.8",
        "symfony/console": "^7.0"
    },
    "require-dev": {
        "phpunit/phpunit": "^11.0",
        "phpstan/phpstan": "^1.10",
        "laravel/pint": "^1.14"
    },
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    }
}
```

```bash
# Install dependencies
composer install

# Add a new package
composer require monolog/monolog

# Add a dev dependency
composer require --dev phpstan/phpstan

# Update dependencies within constraints
composer update

# Dump optimized autoloader for production
composer dump-autoload --optimize
```

## Gotchas

- `composer install` uses `composer.lock` for exact versions; `composer update` resolves fresh versions within `composer.json` constraints and updates the lock file.
- Committing `composer.lock` is recommended for applications; libraries should gitignore it so downstream users resolve their own compatible versions.
- `composer dump-autoload --classmap-authoritative` generates a complete classmap for production, which is faster than scanning the filesystem but requires re-running after adding new classes.

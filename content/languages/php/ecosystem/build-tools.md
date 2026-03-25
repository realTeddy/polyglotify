---
title: "Build Tools"
language: "php"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

PHP has no compiler — scripts are interpreted at runtime. "Build" in PHP context means running static analysis, tests, linting, and generating optimized autoloaders. Common tools include PHPStan or Psalm (static analysis), PHP CS Fixer or Laravel Pint (code style), PHPUnit (tests), and Docker for environment consistency. CI pipelines orchestrate these with Make, just, or GitHub Actions.

## Example

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.3'
          extensions: mbstring, xml
      - run: composer install --no-progress
      - run: vendor/bin/phpstan analyse src tests --level=8
      - run: vendor/bin/phpunit --coverage-text
      - run: vendor/bin/pint --test
```

```bash
# Locally
composer install
./vendor/bin/phpstan analyse src --level=8
./vendor/bin/phpunit
./vendor/bin/pint

# Optimize autoloader for production
composer install --no-dev --optimize-autoloader
```

## Gotchas

- OPcache must be enabled in production (`opcache.enable=1`) — without it, PHP parses every file on every request, which is drastically slower.
- `composer install --no-dev` excludes `require-dev` packages; ensure production code never imports dev-only classes.
- PHPStan level 8 (the highest meaningful level) requires type annotations on every function and catches the most bugs; start at level 5 and raise it over time.

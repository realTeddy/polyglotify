---
title: "Build Tools"
language: "bash"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Bash scripts themselves are often the build tool for other projects. For Bash project automation, **Make** is the most common choice — `Makefile` targets wrap lint, test, and install commands. **Task** (taskfile.dev) is a modern YAML-based alternative. Bash scripts are also widely used as CI/CD pipeline steps in GitHub Actions, GitLab CI, and Jenkins.

## Example

```makefile
# Makefile for a Bash project
SHELL := /usr/bin/env bash
SCRIPTS := bin/myapp lib/*.sh
BATS    := ./test_helper/bats-core/bin/bats

.PHONY: all lint test install clean

all: lint test

lint:
	shellcheck $(SCRIPTS)

test:
	$(BATS) tests/

install:
	install -m 755 bin/myapp /usr/local/bin/myapp
	install -m 644 lib/*.sh  /usr/local/lib/myapp/

clean:
	rm -f /usr/local/bin/myapp

# Validate a specific script
check-%:
	shellcheck $*
```

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install BATS
        run: |
          git clone https://github.com/bats-core/bats-core test_helper/bats-core
      - name: Lint
        run: shellcheck bin/myapp lib/*.sh
      - name: Test
        run: ./test_helper/bats-core/bin/bats tests/
```

## Gotchas

- `SHELL := /usr/bin/env bash` in a Makefile ensures Make uses Bash instead of `/bin/sh` for all recipe lines; otherwise Bash-specific syntax will fail.
- Each line in a Makefile recipe runs in a separate subshell; to keep state across lines, join them with `&&` or use a single `$(shell ...)` call.
- ShellCheck is available as a GitHub Action (`shellcheck-action`) for easy CI integration without manual installation.

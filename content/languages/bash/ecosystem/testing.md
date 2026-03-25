---
title: "Testing"
language: "bash"
feature: "testing"
category: "ecosystem"
applicable: true
---

**BATS** (Bash Automated Testing System) is the standard testing framework for Bash scripts. Tests are written in `.bats` files using `@test` annotations and assertion helpers from the `bats-assert` and `bats-file` libraries. Each test runs in an isolated subshell. ShellCheck provides static analysis to catch common bugs before tests even run.

## Example

```bash
# tests/test_utils.bats
#!/usr/bin/env bats

load 'test_helper/bats-support/load'
load 'test_helper/bats-assert/load'

# Source the library under test
setup() {
    source "${BATS_TEST_DIRNAME}/../lib/utils.sh"
}

@test "to_upper converts string to uppercase" {
    run to_upper "hello world"
    assert_success
    assert_output "HELLO WORLD"
}

@test "is_integer returns true for integers" {
    run is_integer "42"
    assert_success
}

@test "is_integer returns false for strings" {
    run is_integer "abc"
    assert_failure
}

@test "trim removes leading and trailing whitespace" {
    run trim "  hello  "
    assert_output "hello"
}
```

```bash
# lib/utils.sh
to_upper()   { echo "${1^^}"; }
is_integer() { [[ "${1}" =~ ^-?[0-9]+$ ]]; }
trim()       { local s="${1}"; s="${s#"${s%%[! ]*}"}"; s="${s%"${s##*[! ]}"}"; echo "${s}"; }
```

```bash
# Install BATS
git clone https://github.com/bats-core/bats-core.git test_helper/bats-core
# Run tests
./test_helper/bats-core/bin/bats tests/
```

## Gotchas

- BATS runs each test in a subshell; environment changes (exported variables, `cd`, etc.) in one test do not affect others, which is good for isolation but means you must `source` dependencies in `setup()`.
- `run` captures stdout and stderr into `$output` and the exit code into `$status`; not using `run` means assertion helpers cannot inspect the output of your command.
- ShellCheck should be part of CI — it catches unquoted expansions, `[ ]` vs `[[ ]]` mistakes, and other common bugs that tests might not cover.

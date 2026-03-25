---
title: "Project Structure"
language: "bash"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

There is no official project structure for Bash scripts, but a widely used convention separates the main entry point from sourced library files. Large shell projects split reusable functions into `lib/` or `src/` directories and source them in the main script. Tests live in `test/` or `tests/`. A `bin/` directory holds executable scripts. ShellCheck and BATS are the standard static analysis and testing tools.

## Example

```
my-bash-project/
├── bin/
│   └── myapp           # entry point (#!/usr/bin/env bash)
├── lib/
│   ├── logging.sh      # log functions
│   ├── utils.sh        # string/file utilities
│   └── config.sh       # config loading
├── tests/
│   ├── test_utils.bats
│   └── test_logging.bats
├── config/
│   └── defaults.env    # default configuration values
├── .shellcheckrc       # ShellCheck configuration
└── Makefile            # build/lint/test tasks
```

```bash
# bin/myapp
#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LIB_DIR="${SCRIPT_DIR}/../lib"

source "${LIB_DIR}/logging.sh"
source "${LIB_DIR}/utils.sh"
source "${LIB_DIR}/config.sh"

main() {
    log_info "Starting myapp"
    # ...
}
main "$@"
```

```makefile
# Makefile
lint:
    shellcheck bin/myapp lib/*.sh
test:
    bats tests/
```

## Gotchas

- `BASH_SOURCE[0]` gives the path to the current script; `$(dirname ...)` combined with `cd && pwd` resolves symlinks safely. Never use `$0` alone for library-relative paths.
- Sourced library files should not call any functions or produce output at source time; they should only define functions and variables, leaving execution to the caller.
- `.shellcheckrc` can disable noisy warnings globally; start with `disable=SC2034` (unused variable) and add others as needed, but review each disabled rule carefully.

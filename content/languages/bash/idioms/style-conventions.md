---
title: "Style Conventions"
language: "bash"
feature: "style-conventions"
category: "idioms"
applicable: true
---

The Google Shell Style Guide is the most widely referenced convention for Bash. Key rules: use `#!/usr/bin/env bash` shebang, `UPPER_CASE` for exported/global variables and `lower_case` for local/internal ones, always double-quote variable expansions, use `[[ ]]` instead of `[ ]`, use `$(...)` instead of backticks, and use `local` for all function variables. **ShellCheck** enforces many of these automatically.

## Example

```bash
#!/usr/bin/env bash
# File: bin/deploy.sh
# Description: Deploy the application to the target environment.
set -euo pipefail

# Global constants — UPPER_CASE
readonly DEPLOY_DIR="/opt/myapp"
readonly LOG_FILE="/var/log/myapp/deploy.log"
readonly DEFAULT_ENV="staging"

# Global variable
TARGET_ENV="${1:-${DEFAULT_ENV}}"

# Functions — lower_snake_case
log_info() {
    echo "[INFO] $*" | tee -a "${LOG_FILE}"
}

log_error() {
    echo "[ERROR] $*" >&2
}

# Local variables with 'local'
deploy_app() {
    local env="${1}"
    local timestamp
    timestamp=$(date +%Y%m%d_%H%M%S)
    local backup_dir="${DEPLOY_DIR}/backups/${timestamp}"

    log_info "Deploying to ${env}..."
    mkdir -p "${backup_dir}"
    # ... deployment steps
    log_info "Deploy complete"
}

main() {
    log_info "Starting deploy to ${TARGET_ENV}"
    deploy_app "${TARGET_ENV}"
}

main "$@"
```

## Gotchas

- ShellCheck (https://www.shellcheck.net) catches most style violations and real bugs; run it in CI on every script.
- Backtick command substitution `` `cmd` `` is legacy syntax; `$(cmd)` is preferred because it nests cleanly and is more readable.
- Functions should be defined before being called; Bash reads scripts top-to-bottom, so calling a function before its definition causes a "command not found" error.

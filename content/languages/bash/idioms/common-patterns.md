---
title: "Common Patterns"
language: "bash"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Key Bash patterns include: `set -euo pipefail` as a safety header, the `SCRIPT_DIR` idiom for script-relative paths, safe temporary file/directory creation with `mktemp`, the `trap EXIT` cleanup pattern, heredocs for multiline strings, `xargs` for bulk operations, and `tee` for logging while continuing a pipeline. These patterns make scripts robust and maintainable.

## Example

```bash
#!/usr/bin/env bash
set -euo pipefail

# Script-relative path
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Cleanup trap
TMPDIR_WORK=$(mktemp -d)
cleanup() { rm -rf "${TMPDIR_WORK}"; }
trap cleanup EXIT

# Heredoc for multiline content
cat > "${TMPDIR_WORK}/config.json" <<'EOF'
{
  "host": "localhost",
  "port": 8080
}
EOF

# Logging with tee
log() { echo "[$(date +%T)] $*" | tee -a "${TMPDIR_WORK}/run.log"; }
log "Starting script"

# Retry pattern
retry() {
    local retries="${1}"; shift
    local delay="${1}"; shift
    local attempt=0
    until "$@"; do
        ((attempt++))
        if (( attempt >= retries )); then
            echo "Failed after ${retries} attempts" >&2; return 1
        fi
        echo "Attempt ${attempt} failed, retrying in ${delay}s..." >&2
        sleep "${delay}"
    done
}
retry 3 2 curl -sSf "https://httpbin.org/get" -o "${TMPDIR_WORK}/data.json"

# Process files in parallel
find "${TMPDIR_WORK}" -name "*.json" \
    | xargs -P4 -I{} sh -c 'echo "Processing: {}"'

log "Done"
```

## Gotchas

- `mktemp -d` creates a directory in `$TMPDIR` (usually `/tmp`); always pair it with `trap cleanup EXIT` to ensure deletion even on errors.
- `xargs -I{}` cannot handle filenames with newlines; use `find -print0 | xargs -0` for robust filename handling.
- Piping through `tee` changes the exit code to `tee`'s exit code, not the command before it; use `set -o pipefail` to catch failures earlier in the pipe.

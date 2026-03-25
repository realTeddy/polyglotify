---
title: "Exceptions & Try/Catch"
language: "bash"
feature: "exceptions"
category: "error-handling"
applicable: false
---

Bash has no exception mechanism. Error handling is done via exit codes and the `||`, `&&`, `set -e`, and `trap` mechanisms. Commands return exit codes (0 = success, non-zero = failure). `set -e` (errexit) exits the script on any non-zero exit code. `trap ERR` fires a handler when a command fails. These tools together provide a pragmatic error-handling model.

## Example

```bash
#!/usr/bin/env bash
set -euo pipefail   # exit on error, unset variable, pipe failure

# Trap for cleanup / error reporting
cleanup() {
    echo "Cleaning up..." >&2
    # Remove temp files, etc.
}
on_error() {
    echo "Error on line ${BASH_LINENO[0]}: ${BASH_COMMAND}" >&2
}
trap cleanup EXIT
trap on_error ERR

# Inline error handling with ||
mkdir /some/path 2>/dev/null || echo "Could not create directory"

# Function with explicit exit code checking
safe_copy() {
    local src="${1}" dst="${2}"
    if ! cp "${src}" "${dst}" 2>/dev/null; then
        echo "ERROR: failed to copy '${src}' to '${dst}'" >&2
        return 1
    fi
    echo "Copied '${src}' to '${dst}'"
}

# Temporarily disable errexit for a fallible command
set +e
grep -q "pattern" /nonexistent/file
grep_exit=$?
set -e
echo "grep exited with: ${grep_exit}"

safe_copy /etc/hosts /tmp/hosts_copy && echo "Done"
```

## Gotchas

- `set -e` does not catch errors in the condition of `if`, `while`, or `until`, or on the left side of `&&` and `||`; commands in those positions are exempt from errexit.
- `set -o pipefail` is essential with `set -e`; without it, a failed command in the middle of a pipe is invisible because the pipe's exit code is the last command's exit code.
- `trap ERR` does not fire when `set -e` is disabled (`set +e`); you must re-enable errexit or check exit codes manually in that section.

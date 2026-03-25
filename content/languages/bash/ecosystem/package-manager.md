---
title: "Package Manager"
language: "bash"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Bash itself has no package manager, but shell scripts are distributed and managed through the system package manager of the host OS (`apt`, `yum`/`dnf`, `brew`, `pacman`, etc.). For Bash-specific utility libraries, **bpkg** is a community package manager for shell scripts. **BATS** (Bash Automated Testing System) is commonly installed via npm or package managers. Scripts typically declare their tool dependencies with comments or a `check_dependencies` function.

## Example

```bash
#!/usr/bin/env bash

# Declare and check script dependencies
REQUIRED_TOOLS=(curl jq git awk)

check_dependencies() {
    local missing=()
    for tool in "${REQUIRED_TOOLS[@]}"; do
        if ! command -v "${tool}" &>/dev/null; then
            missing+=("${tool}")
        fi
    done
    if [[ ${#missing[@]} -gt 0 ]]; then
        echo "Missing required tools: ${missing[*]}" >&2
        echo "Install with: sudo apt install ${missing[*]}" >&2
        exit 1
    fi
}
check_dependencies

# bpkg — install a shell package
# bpkg install bpkg/term   # terminal colour library

# Homebrew (macOS/Linux)
# brew install bash         # install newer Bash on macOS
# brew install shellcheck   # Bash linter

# apt (Debian/Ubuntu)
# sudo apt install bats     # Bash testing framework

# One-liner installer pattern (common for shell tools)
# curl -sSL https://example.com/install.sh | bash
# (verify checksums before piping to bash in production!)
echo "All dependencies satisfied"
```

## Gotchas

- `curl | bash` installers are convenient but execute untrusted remote code; always download first, verify the checksum, and then execute.
- There is no standardised lock file for Bash script dependencies; maintaining reproducibility means pinning exact OS package versions in a `Dockerfile` or provisioning script.
- `command -v` is the POSIX-portable way to check if a command exists; prefer it over `which` (not always available) or `type` (shell built-in with different output format).

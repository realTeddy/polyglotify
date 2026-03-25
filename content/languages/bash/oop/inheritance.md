---
title: "Inheritance"
language: "bash"
feature: "inheritance"
category: "oop"
applicable: false
---

Bash has no inheritance mechanism. The concept does not apply to shell scripting. Bash achieves code reuse through sourcing other scripts with `source` (or `.`), calling functions, and composing commands in pipelines. If your project requires inheritance hierarchies, use a language that supports OOP.

## Example

```bash
#!/usr/bin/env bash

# Code reuse in Bash: sourcing shared libraries
# lib/logging.sh
# log() { echo "[$(date +%T)] $*"; }

# Main script sources the library
# source ./lib/logging.sh
# log "Starting application"

# Function composition as a reuse mechanism
format_output() {
    local prefix="${1}"; shift
    echo "${prefix}: $*"
}

log_info()  { format_output "INFO"  "$@"; }
log_error() { format_output "ERROR" "$@"; }
log_debug() { format_output "DEBUG" "$@"; }

log_info  "Server started"
log_error "Connection refused"

# Delegation pattern: wrapping a base function
base_process() {
    echo "Processing: ${1}"
}

# "Child" extends base by adding pre/post steps
extended_process() {
    echo "Pre-processing..."
    base_process "${1}"
    echo "Post-processing..."
}
extended_process "data.csv"
```

## Gotchas

- Sourcing files (`source` or `.`) executes in the current shell's context; all variable assignments in the sourced file become part of the calling shell's environment.
- There is no way to `override` a sourced function selectively — redefining the function after sourcing replaces it entirely.
- Long chains of sourced libraries with shared variable names will collide; use naming conventions (prefixes) to avoid silent overwrites.

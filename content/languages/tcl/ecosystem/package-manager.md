---
title: "Package Manager"
language: "tcl"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Tcl's built-in package system uses `package require` to load packages and `package provide` to register them. The primary package repository is **Tcllib** (pure Tcl utility library) and **Tklib** (Tk utilities), distributed as part of most Tcl installations. **Teapot** was the historical package manager for ActiveTcl. Modern community tooling includes **tin** and manual installation from GitHub/SourceForge.

## Example

```tcl
# Load a standard library package
package require Tcl 8.6         ;# minimum version check
package require http            ;# HTTP client
package require json            ;# JSON parser (from Tcllib)
package require csv             ;# CSV parser (from Tcllib)

# Making an HTTP GET request
set token [http::geturl "http://example.com/api"]
set body  [http::data $token]
http::cleanup $token

# JSON parsing (Tcllib)
set data {{"name": "Alice", "age": 30}}
set parsed [json::json2dict $data]
puts [dict get $parsed name]   ;# Alice

# Check what's available
puts [package names]            ;# list all loaded packages
puts [package version http]     ;# e.g., 2.9.9
```

```bash
# Installing Tcllib (most distributions)
# Debian/Ubuntu:
apt-get install tcllib

# macOS with Homebrew:
brew install tcllib

# ActiveTcl (Windows) — includes Tcllib
# Download from https://www.activestate.com/products/tcl/

# tin — modern package manager
# https://github.com/tcl-insight/tin
# tin install Tcllib

# Manual install: copy package dir to a path in $auto_path
# Then: package require mypackage
```

## Gotchas

- Tcl has no central package registry with version locking like npm or cargo — dependency management is mostly manual.
- `package require` searches directories listed in `$auto_path`; add custom directories with `lappend ::auto_path /my/pkg/dir`.
- Tcllib is a large collection of pure-Tcl packages; not all sub-packages are available on all platforms (check with `package names`).
- Package versioning uses `package require name ?version?` with a minimum version; there is no semver range syntax built in.

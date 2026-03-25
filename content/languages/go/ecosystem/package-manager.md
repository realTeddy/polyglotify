---
title: "Package Manager"
language: "go"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Go modules (introduced in Go 1.11, default since 1.16) are the official dependency management system. A module is defined by a `go.mod` file at the root of the project. The `go` command handles fetching, updating, and vendoring dependencies. There is no separate package manager binary — `go get`, `go mod tidy`, and `go mod vendor` are built into the toolchain.

## Example

```go
// go.mod
module github.com/example/myapp

go 1.22

require (
    github.com/gin-gonic/gin v1.9.1
    golang.org/x/sync v0.6.0
)
```

```bash
# Initialize a new module
go mod init github.com/example/myapp

# Add a dependency (updates go.mod and go.sum)
go get github.com/gin-gonic/gin@v1.9.1

# Remove unused, add missing dependencies
go mod tidy

# Vendor dependencies locally
go mod vendor
```

## Gotchas

- `go.sum` contains cryptographic hashes of all module contents; it must be committed to version control and never manually edited.
- Running `go get` without a version tag fetches the latest tagged release; use `@latest` or `@v1.2.3` to be explicit.
- The module proxy (`GOPROXY`) caches modules centrally; set `GONOSUMCHECK` or `GOFLAGS=-mod=vendor` in air-gapped environments.

---
title: "Build Tools"
language: "go"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

The `go` command is the all-in-one build tool for Go. `go build` compiles packages and produces binaries; `go run` compiles and runs in one step; `go install` builds and installs to `$GOPATH/bin`. Cross-compilation is built in by setting `GOOS` and `GOARCH` environment variables. Build tags in source files allow conditional compilation.

## Example

```bash
# Build binary for current platform
go build -o myapp ./cmd/myapp

# Run without producing a file
go run ./cmd/myapp

# Cross-compile for Linux on ARM
GOOS=linux GOARCH=arm64 go build -o myapp-linux-arm64 ./cmd/myapp

# Install to $GOPATH/bin
go install github.com/example/myapp/cmd/myapp@latest

# Vet for common errors
go vet ./...

# Format all code
gofmt -w .
# or
goimports -w .
```

```go
//go:build linux || darwin

package config
// This file is only compiled on Linux and macOS
```

## Gotchas

- Build tags must appear before the `package` declaration with a blank line separating them; the old `// +build` syntax is still accepted but `//go:build` is the modern form.
- `go build` produces a single statically linked binary by default (on Linux with CGO disabled); CGO complicates cross-compilation significantly.
- The `go generate` command runs code generators specified in source comments and must be run manually before `go build`.

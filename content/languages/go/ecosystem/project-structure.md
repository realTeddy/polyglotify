---
title: "Project Structure"
language: "go"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Go projects follow a module-based layout. The conventional structure separates `cmd/` (entry points), `internal/` (private packages), and top-level packages. The `internal/` directory is enforced by the compiler — packages inside it cannot be imported by code outside the parent directory tree. There is no required folder convention, but the community standard layout is widely adopted.

## Example

```
myapp/
├── go.mod
├── go.sum
├── cmd/
│   └── myapp/
│       └── main.go        # package main
├── internal/
│   ├── config/
│   │   └── config.go
│   └── db/
│       └── db.go
├── pkg/
│   └── api/
│       └── handler.go     # importable by external code
└── README.md
```

```go
// cmd/myapp/main.go
package main

import "github.com/example/myapp/internal/config"

func main() {
    cfg := config.Load()
    _ = cfg
}
```

## Gotchas

- The `pkg/` directory is a convention, not enforced; many modern projects place public packages at the module root.
- Package names should match their directory names; mismatches confuse tooling even though they are technically legal.
- Everything in `internal/` is private to the module — even sibling modules in a monorepo cannot import it.

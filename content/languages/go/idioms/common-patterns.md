---
title: "Common Patterns"
language: "go"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Key Go idioms include: the functional options pattern for flexible constructors, `defer` for resource cleanup, the `io.Reader`/`io.Writer` interface pair as universal I/O abstractions, context propagation for cancellation and deadlines, and the "accept interfaces, return structs" principle for decoupled APIs.

## Example

```go
package main

import (
    "fmt"
    "os"
)

// Functional options pattern
type Server struct {
    host    string
    port    int
    timeout int
}

type Option func(*Server)

func WithPort(p int) Option    { return func(s *Server) { s.port = p } }
func WithTimeout(t int) Option { return func(s *Server) { s.timeout = t } }

func NewServer(host string, opts ...Option) *Server {
    s := &Server{host: host, port: 8080, timeout: 30}
    for _, opt := range opts {
        opt(s)
    }
    return s
}

// Defer for cleanup
func writeFile(name, content string) error {
    f, err := os.Create(name)
    if err != nil {
        return err
    }
    defer f.Close() // always runs, even on early return

    _, err = fmt.Fprint(f, content)
    return err
}

func main() {
    s := NewServer("localhost", WithPort(9090), WithTimeout(60))
    fmt.Printf("%+v\n", s)
}
```

## Gotchas

- `defer` arguments are evaluated at the `defer` statement, not when the deferred function runs; use a closure if you need to capture the current value at execution time.
- The functional options pattern adds indirection; for simple types, a plain config struct passed by value is equally idiomatic and easier to read.

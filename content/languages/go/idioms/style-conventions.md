---
title: "Style Conventions"
language: "go"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Go enforces a single canonical style via `gofmt`, which is non-negotiable. Naming conventions include `camelCase` for unexported identifiers, `PascalCase` for exported ones, and very short names for short-lived variables (e.g., `i`, `r`, `w`). Acronyms are written in all-caps (`HTTP`, `URL`, `ID`). Comments on exported identifiers must begin with the identifier's name.

## Example

```go
// Package server provides an HTTP server implementation.
package server

import "net/http"

// Handler processes incoming HTTP requests.
// Correct: starts with the identifier name.
type Handler struct {
    mux *http.ServeMux
}

// ServeHTTP implements the http.Handler interface.
func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    h.mux.ServeHTTP(w, r)
}

// NewHandler returns a Handler with the given routes registered.
func NewHandler() *Handler {
    return &Handler{mux: http.NewServeMux()}
}
```

## Gotchas

- `gofmt` is enforced in almost all CI pipelines; code that is not `gofmt`-formatted is rejected by convention and many automated checks.
- Error variables are named `err` (local) or `ErrXxx` (package-level sentinel); wrapping a sentinel with `fmt.Errorf` + `%w` is the preferred way to add context.
- Avoid "stutter" in package-qualified names: a `user` package should export `User`, not `UserUser`; callers write `user.User`, which is already redundant but acceptable, but `user.NewUser` is preferred over `user.NewUserUser`.

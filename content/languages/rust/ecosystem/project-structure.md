---
title: "Project Structure"
language: "rust"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A Rust project (crate) has `src/` as the source root. Binaries have `src/main.rs`; libraries have `src/lib.rs`. Workspaces (defined in a root `Cargo.toml`) group multiple crates. Modules map to files (`src/foo.rs`) or directories (`src/foo/mod.rs`). Visibility is controlled with `pub`.

## Example

```
my-workspace/
├── Cargo.toml              # workspace manifest
├── crates/
│   ├── core/
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── lib.rs
│   │       └── models.rs
│   └── cli/
│       ├── Cargo.toml
│       └── src/
│           └── main.rs
```

```toml
# my-workspace/Cargo.toml
[workspace]
members = ["crates/core", "crates/cli"]
resolver = "2"
```

```rust
// src/lib.rs
pub mod models;     // declares the models module (maps to src/models.rs)
mod internal;       // private module (maps to src/internal.rs)
```

## Gotchas

- The `mod` declaration in `src/lib.rs` (or `main.rs`) is required to include a file in the crate; just placing a `.rs` file in `src/` without a `mod` declaration does nothing.
- `pub(crate)` makes an item visible within the crate but not to external users — useful for sharing code between modules without exposing it in the public API.
- Integration tests live in a top-level `tests/` directory and are compiled as separate crates that only access the library's public API.

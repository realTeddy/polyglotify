---
title: "Package Manager"
language: "rust"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Cargo is Rust's built-in package manager and build system. Packages (called "crates") are listed in `Cargo.toml` under `[dependencies]`. `Cargo.lock` pins exact versions for reproducible builds. The `crates.io` registry is the central repository. Cargo handles building, testing, benchmarking, documentation, and publishing.

## Example

```toml
# Cargo.toml
[package]
name = "my-app"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
tokio = { version = "1", features = ["full"] }
anyhow = "1.0"

[dev-dependencies]
mockall = "0.12"
```

```bash
# Create a new project
cargo new my-app

# Add a dependency
cargo add serde --features derive

# Build
cargo build --release

# Run
cargo run

# Test
cargo test

# Publish to crates.io
cargo publish
```

## Gotchas

- `Cargo.lock` should be committed for applications and binaries; for libraries it is conventionally gitignored so downstream users resolve fresh versions.
- Feature flags control conditional compilation of optional functionality; enabling too many features of a dependency can significantly increase compile time.
- `cargo update` updates dependencies within the semver constraints in `Cargo.toml`; it does not perform major version upgrades automatically.

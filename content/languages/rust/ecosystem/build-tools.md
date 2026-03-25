---
title: "Build Tools"
language: "rust"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Cargo is both the package manager and the build system. It handles compilation, linking, feature flags, and custom build scripts (`build.rs`). `rustup` manages Rust toolchain versions and targets. The `cross` tool simplifies cross-compilation. Release profiles control optimization levels and debug info.

## Example

```toml
# Cargo.toml — release profile tuning
[profile.release]
opt-level = 3
lto = true
codegen-units = 1
strip = true
```

```bash
# Build debug (fast compile, runtime checks)
cargo build

# Build release (optimized)
cargo build --release

# Check without producing a binary (fastest feedback)
cargo check

# Cross-compile (requires 'cross' tool or a target installed via rustup)
rustup target add aarch64-unknown-linux-gnu
cargo build --target aarch64-unknown-linux-gnu

# Lint with Clippy
cargo clippy -- -D warnings

# Format code
cargo fmt
```

## Gotchas

- `build.rs` is a Rust script run before compilation; it can generate code, link to C libraries, or emit `cargo:` directives to influence the build.
- `cargo clean` removes the `target/` directory which can be gigabytes in size for large projects; the `sccache` tool caches artifacts across clean builds.
- The nightly toolchain is required for some features (proc-macros, unstable APIs); pin the required toolchain with a `rust-toolchain.toml` file.

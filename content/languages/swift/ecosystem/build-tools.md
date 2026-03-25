---
title: "Build Tools"
language: "swift"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Swift code is built with either `swift build` (SPM projects, CLI) or Xcode (Apple platform apps). The Swift compiler (`swiftc`) handles compilation; the linker produces binaries or frameworks. Build configurations (`Debug`/`Release`) control optimization and debug info. SPM supports plugins for code generation tasks.

## Example

```bash
# Build debug
swift build

# Build optimized release binary
swift build -c release

# Run
swift run MyApp

# Run tests
swift test

# Generate Xcode project from SPM manifest
swift package generate-xcodeproj

# Build for a specific platform (via xcodebuild)
xcodebuild -scheme MyApp -destination "platform=iOS Simulator,name=iPhone 16"

# Check documentation
swift package generate-documentation
```

```swift
// Package.swift — build plugin example
.plugin(
    name: "GenerateCode",
    capability: .buildTool(),
    dependencies: ["CodeGenTool"]
)
```

## Gotchas

- Incremental compilation is much faster than full builds; `swift build` only recompiles files and their dependents when sources change.
- Cross-compilation to non-Apple platforms is possible with the Swift toolchain for Linux and Windows, but library availability differs from Apple platforms.
- The Swift compiler can be slow on large files with complex type inference; break large files into smaller ones and add explicit type annotations to help the compiler.

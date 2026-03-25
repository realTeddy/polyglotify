---
title: "Package Manager"
language: "swift"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Swift Package Manager (SPM) is the official dependency management tool, integrated into Xcode and the Swift toolchain. Packages are defined in a `Package.swift` manifest using a Swift DSL. Dependencies are resolved from Git repositories by version, branch, or commit. SPM also supports binary dependencies via XCFrameworks.

## Example

```swift
// Package.swift
import PackageDescription

let package = Package(
    name: "MyLibrary",
    platforms: [.macOS(.v13), .iOS(.v16)],
    products: [
        .library(name: "MyLibrary", targets: ["MyLibrary"]),
    ],
    dependencies: [
        .package(url: "https://github.com/apple/swift-algorithms", from: "1.2.0"),
        .package(url: "https://github.com/apple/swift-argument-parser", from: "1.3.0"),
    ],
    targets: [
        .target(name: "MyLibrary", dependencies: [
            .product(name: "Algorithms", package: "swift-algorithms"),
        ]),
        .testTarget(name: "MyLibraryTests", dependencies: ["MyLibrary"]),
    ]
)
```

```bash
# Resolve dependencies
swift package resolve

# Build
swift build

# Run tests
swift test
```

## Gotchas

- SPM resolves the *minimum* compatible version from all dependency constraints; conflicting minimum requirements result in a build error.
- CocoaPods and Carthage are older alternatives still found in many iOS projects; SPM is now preferred for new projects.
- Binary targets (XCFramework) bypass SPM's source-level dependency resolution and cannot be inspected for security.

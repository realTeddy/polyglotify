---
title: "Project Structure"
language: "swift"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Swift projects come in two flavors: SPM packages (cross-platform, CLI-friendly) and Xcode projects (required for Apple platform apps). An SPM package has `Sources/` for code and `Tests/` for tests. Xcode projects use `.xcodeproj` or `.xcworkspace` files and group sources by feature or layer, though the actual layout on disk is flexible.

## Example

```
MyApp/                          # SPM package
├── Package.swift
├── Sources/
│   ├── MyApp/
│   │   ├── main.swift
│   │   ├── Models/
│   │   │   └── User.swift
│   │   └── Services/
│   │       └── UserService.swift
│   └── MyLibrary/
│       └── Library.swift
└── Tests/
    └── MyAppTests/
        └── UserServiceTests.swift
```

```swift
// Sources/MyApp/main.swift
import MyLibrary

@main
struct App {
    static func main() {
        print("Hello from MyApp")
    }
}
```

## Gotchas

- Each directory under `Sources/` that contains Swift files becomes a separate target (module); code in different source directories cannot access each other's internal symbols.
- Xcode's `.xcodeproj` stores file references separately from the filesystem; adding a file to the directory without adding it in Xcode means it won't be compiled.
- The `@main` attribute (Swift 5.3+) designates the entry point struct; it replaces the need for a top-level `main.swift` file.

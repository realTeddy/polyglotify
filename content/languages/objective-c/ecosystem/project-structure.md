---
title: "Project Structure"
language: "objective-c"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

An Objective-C iOS/macOS project is centred around an Xcode project (`.xcodeproj`) or workspace (`.xcworkspace` when using CocoaPods). Source files are split into header (`.h`) and implementation (`.m`) files. Projects typically organise code by feature or layer into groups within Xcode, though the file system layout can differ from the Xcode group hierarchy.

## Example

```
MyApp/
├── MyApp.xcworkspace          # open this (with CocoaPods)
├── MyApp.xcodeproj/
│   └── project.pbxproj        # Xcode project config (do not edit manually)
├── Podfile
├── Podfile.lock
├── Pods/                      # generated — may or may not be committed
└── MyApp/
    ├── AppDelegate.h
    ├── AppDelegate.m
    ├── Info.plist
    ├── Assets.xcassets/
    ├── Base.lproj/
    │   └── Main.storyboard
    ├── Models/
    │   ├── User.h
    │   └── User.m
    ├── Views/
    │   ├── UserCell.h
    │   └── UserCell.m
    ├── Controllers/
    │   ├── UserListViewController.h
    │   └── UserListViewController.m
    └── Services/
        ├── APIClient.h
        └── APIClient.m

MyAppTests/
├── UserTests.m
└── APIClientTests.m
```

## Gotchas

- The Xcode project file (`project.pbxproj`) is a binary-adjacent text format; merge conflicts in it are common and difficult to resolve — use a tool like `xUnique` or structurize your project to minimise conflicts.
- Files added in Finder are not automatically visible in Xcode; they must be added via Xcode's "Add Files" dialog to be included in the build target.
- Prefix headers (`.pch`) were common in older Objective-C projects for importing Foundation and UIKit globally; they are discouraged in modern projects because they slow incremental builds.

---
title: "Package Manager"
language: "objective-c"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Objective-C projects traditionally use **CocoaPods** or **Carthage** as package managers, and increasingly **Swift Package Manager (SPM)** for projects with Swift/ObjC mixed targets. CocoaPods is the most widely used, managing dependencies via a `Podfile` and generating an Xcode workspace. SPM is Apple's official tool and is integrated into Xcode, but its Objective-C support is limited to static libraries.

## Example

```ruby
# Podfile (CocoaPods)
platform :ios, '15.0'
use_frameworks!

target 'MyApp' do
  pod 'AFNetworking', '~> 4.0'
  pod 'SDWebImage', '~> 5.0'
  pod 'MBProgressHUD', '~> 1.2'

  target 'MyAppTests' do
    inherit! :search_paths
    pod 'OCMock', '~> 3.9'
  end
end
```

```bash
# Install / update dependencies
pod install          # install from Podfile.lock
pod update           # update to latest within constraints
pod outdated         # list outdated pods
```

```
# Swift Package Manager — Package.swift snippet
// Only for packages that expose ObjC headers
.target(
    name: "MyObjCLib",
    path: "Sources/ObjC",
    publicHeadersPath: "include"
)
```

## Gotchas

- After `pod install`, always open the `.xcworkspace` file, not the original `.xcodeproj`; the workspace includes the Pods project.
- CocoaPods modifies your Xcode project file; committing `Pods/` to version control is optional but `Podfile.lock` must always be committed to ensure reproducible builds.
- SPM does not support Objective-C `.m` files in package targets that also contain Swift; mixed-language packages require the ObjC code to be in a separate target with a C/ObjC module map.

---
title: "Build Tools"
language: "objective-c"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Objective-C is compiled by **Clang** (the LLVM C/Objective-C/C++ compiler). The primary build orchestrator for Apple-platform projects is **Xcode** via its GUI or the `xcodebuild` command-line tool. **xcbeautify** and **xcpretty** make `xcodebuild` output human-readable. **Fastlane** is widely used for automating builds, signing, and App Store deployment in CI environments.

## Example

```bash
# xcodebuild — build and test from command line
xcodebuild \
  -workspace MyApp.xcworkspace \
  -scheme MyApp \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 15' \
  clean build test \
  | xcbeautify

# Build for release (archive)
xcodebuild archive \
  -workspace MyApp.xcworkspace \
  -scheme MyApp \
  -configuration Release \
  -archivePath build/MyApp.xcarchive

# Export IPA for App Store
xcodebuild -exportArchive \
  -archivePath build/MyApp.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath build/ipa
```

```ruby
# Fastfile snippet
lane :beta do
  increment_build_number
  gym(scheme: "MyApp", export_method: "app-store")
  pilot(skip_waiting_for_build_processing: true)
end
```

## Gotchas

- `xcodebuild` exit codes are unreliable without `set -o pipefail` when piped through `xcbeautify`/`xcpretty`; wrap in a script that captures both tools' exit codes.
- Code signing must be configured correctly before archiving; using `CODE_SIGN_IDENTITY=""` disables signing for simulator builds but will fail for device or distribution builds.
- Derived data (Xcode's build cache at `~/Library/Developer/Xcode/DerivedData`) can grow very large; CI machines should clean it between builds with `xcodebuild clean` or by deleting the directory.

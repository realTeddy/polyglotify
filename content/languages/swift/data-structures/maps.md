---
title: "Maps & Dictionaries"
language: "swift"
feature: "maps"
category: "data-structures"
applicable: true
---

Swift's `Dictionary<Key, Value>` (written `[Key: Value]`) is a value type hash map. Keys must conform to `Hashable`. Subscript access returns an `Optional` — a missing key returns `nil` rather than crashing. The `updateValue(_:forKey:)` method returns the previous value. Dictionaries are unordered.

## Example

```swift
var scores: [String: Int] = ["Alice": 95, "Bob": 87]
scores["Carol"] = 91
scores["Bob"] = nil  // removes "Bob"

// Subscript returns Optional
if let aliceScore = scores["Alice"] {
    print("Alice: \(aliceScore)")
}

// Default value
let daveScore = scores["Dave", default: 0]
print("Dave: \(daveScore)")

// Iterate
for (name, score) in scores.sorted(by: { $0.key < $1.key }) {
    print("\(name): \(score)")
}

// Merge
let extra = ["Eve": 88, "Frank": 72]
scores.merge(extra) { current, _ in current }
print(scores.count)
```

## Gotchas

- Setting a key to `nil` via subscript removes it from the dictionary; to store `nil` as a value you need `[Key: Optional<Value>]`, which is rare.
- Dictionary iteration order is undefined; sort by `keys` or use `sorted(by:)` when order matters.
- `Dictionary` is copy-on-write like `Array`; mutating a dictionary that is shared by multiple owners creates a copy.

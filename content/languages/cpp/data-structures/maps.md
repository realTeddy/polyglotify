---
title: "Maps"
language: "cpp"
feature: "maps"
category: "data-structures"
applicable: true
---

C++ offers `std::map<K, V>` (sorted, red-black tree, O(log n)) and `std::unordered_map<K, V>` (hash table, O(1) average). Prefer `unordered_map` when ordering is not needed. Both support structured binding iteration, `contains()` (C++20), `try_emplace()`, and `insert_or_assign()`. `std::flat_map` (C++23) provides a sorted flat array map with better cache performance.

## Example

```cpp
#include <unordered_map>
#include <map>
#include <string>
#include <iostream>

int main() {
    // unordered_map — O(1) average lookups
    std::unordered_map<std::string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"]   = 87;
    scores["Carol"] = 91;

    // Safe lookup
    if (auto it = scores.find("Alice"); it != scores.end()) {
        std::cout << "Alice: " << it->second << "\n";  // 95
    }

    // C++20: contains
    std::cout << scores.contains("Bob") << "\n";  // 1

    // insert_or_assign — always writes (vs operator[] which default-constructs)
    scores.insert_or_assign("Dave", 78);

    // try_emplace — only inserts if key absent (no overwrite)
    scores.try_emplace("Alice", 0);  // ignored, Alice exists

    // Structured binding iteration
    for (const auto& [name, score] : scores) {
        std::cout << name << ": " << score << "\n";
    }

    // Frequency count
    std::string text = "hello world";
    std::unordered_map<char, int> freq;
    for (char c : text) if (c != ' ') freq[c]++;

    // Sorted map — iteration in key order
    std::map<int, std::string> ordered;
    ordered[3] = "three";
    ordered[1] = "one";
    ordered[2] = "two";
    for (const auto& [k, v] : ordered) std::cout << k << ":" << v << " ";
    // 1:one 2:two 3:three

    return 0;
}
```

## Gotchas

- `operator[]` on a map default-constructs a value if the key is absent, inserting a new entry with a zero/empty value. Use `find()`, `at()` (throws if missing), or `contains()` for read-only checks.
- `std::unordered_map` requires `std::hash<K>` specialization for custom key types; provide it or use a custom hasher.

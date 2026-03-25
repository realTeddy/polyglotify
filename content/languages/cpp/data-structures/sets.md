---
title: "Sets"
language: "cpp"
feature: "sets"
category: "data-structures"
applicable: true
---

C++ provides `std::set<T>` (sorted, red-black tree, O(log n)) and `std::unordered_set<T>` (hash-based, O(1) average). Both support `insert`, `erase`, `find`, `contains` (C++20), and range iteration. Set operations (union, intersection, difference) are performed with `std::set_union`, `std::set_intersection`, and `std::set_difference` from `<algorithm>`, which work on sorted ranges.

## Example

```cpp
#include <unordered_set>
#include <set>
#include <algorithm>
#include <vector>
#include <iterator>
#include <iostream>

int main() {
    // unordered_set — O(1) average
    std::unordered_set<std::string> tags = {"cpp", "oop", "stl"};
    tags.insert("cpp");       // duplicate — ignored
    tags.insert("templates");
    std::cout << tags.contains("oop") << "\n"; // 1
    std::cout << tags.size() << "\n";           // 4

    // Deduplication
    std::vector<int> nums = {1, 2, 2, 3, 3, 3};
    std::unordered_set<int> unique(nums.begin(), nums.end()); // {1, 2, 3}

    // set — sorted order
    std::set<int> a = {1, 2, 3, 4};
    std::set<int> b = {3, 4, 5, 6};

    // Set operations (requires sorted ranges)
    std::vector<int> union_v, inter_v, diff_v;
    std::set_union(a.begin(), a.end(), b.begin(), b.end(),
                   std::back_inserter(union_v));        // {1,2,3,4,5,6}
    std::set_intersection(a.begin(), a.end(), b.begin(), b.end(),
                          std::back_inserter(inter_v)); // {3,4}
    std::set_difference(a.begin(), a.end(), b.begin(), b.end(),
                        std::back_inserter(diff_v));    // {1,2}

    for (int n : union_v) std::cout << n << " ";  // 1 2 3 4 5 6
    std::cout << "\n";

    // erase by value
    a.erase(2);
    std::cout << a.contains(2) << "\n"; // 0

    return 0;
}
```

## Gotchas

- Elements in `std::set` and `std::unordered_set` are immutable once inserted — modifying them would corrupt the internal ordering/hashing. Erase and re-insert to "update".
- `std::unordered_set` requires `std::hash<T>` and `operator==` for T; custom types need both.

---
title: "Sets"
language: "dlang"
feature: "sets"
category: "data-structures"
applicable: true
---

D has no built-in set type. The conventional idiom is an associative array with a dummy value type: `bool[T]` or `void[0][T]` (the latter uses zero bytes per entry). The standard library `std.container` provides `RedBlackTree` which can act as an ordered set. For most use cases the AA idiom is sufficient.

## Example

```d
import std.stdio;
import std.container.rbtree : RedBlackTree, redBlackTree;

void main()
{
    // AA-based set (bool[T])
    bool[string] seen;
    foreach (word; ["apple", "banana", "apple", "cherry"])
    {
        if (word !in seen)
        {
            seen[word] = true;
            writeln("new: ", word);
        }
    }
    writeln(seen.keys);   // unordered unique words

    // void[0][T] — zero storage overhead per entry
    void[0][int] intSet;
    intSet[1] = (void[0]).init;
    intSet[2] = (void[0]).init;
    intSet[1] = (void[0]).init;   // duplicate, ignored effectively
    writeln(intSet.length);        // 2

    // RedBlackTree — ordered set
    auto rbt = redBlackTree!int(5, 3, 1, 4, 2, 3);
    writeln(rbt[]);   // [1, 2, 3, 4, 5] — duplicates removed, sorted
    rbt.insert(6);
    rbt.removeKey(3);
    writeln(3 in rbt); // false
}
```

## Gotchas

- `bool[T]` wastes one byte per entry; `void[0][T]` uses zero bytes but the syntax is verbose.
- `RedBlackTree` is ordered (O(log n) ops) and does not allow duplicates by default; pass `true` as the second template argument to allow duplicates.
- There is no set-union or set-intersection built into the AA idiom — you must implement them with iteration.

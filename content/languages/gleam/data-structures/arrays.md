---
title: "Arrays & Lists"
language: "gleam"
feature: "arrays"
category: "data-structures"
applicable: true
---

Gleam's primary sequential data structure is `List(a)` — a singly-linked, immutable list. There is no mutable array type in the standard library for the Erlang target. The `gleam/list` module provides rich operations. For the JavaScript target, `gleam/javascript/array` exposes JS arrays. Lists support prepend in O(1) but random access is O(n).

## Example

```gleam
import gleam/io
import gleam/list

pub fn main() {
  let nums = [1, 2, 3, 4, 5]

  // Prepend (O(1))
  let more = [0, ..nums]

  // Common list operations
  let doubled  = list.map(nums, fn(x) { x * 2 })
  let evens    = list.filter(nums, fn(x) { x % 2 == 0 })
  let sum      = list.fold(nums, 0, fn(acc, x) { acc + x })
  let reversed = list.reverse(nums)
  let len      = list.length(nums)
  let first    = list.first(nums)   // Result(Int, Nil)

  io.debug(more)
  io.debug(doubled)
  io.debug(evens)
  io.debug(sum)
  io.debug(reversed)
  io.debug(len)
  io.debug(first)

  // Pattern matching on lists
  case nums {
    [] -> io.println("empty")
    [head, ..tail] -> {
      io.debug(head)
      io.debug(tail)
    }
  }
}
```

## Gotchas

- Lists are singly-linked — appending to the end (`list.append`) is O(n). Prefer prepending and reversing.
- `list.first` and `list.last` return `Result(a, Nil)`, not `a` — there is no unsafe head access.
- There is no built-in mutable array for the BEAM target; use `gleam_erlang` FFI or `Dict` for indexed lookup.
- The spread syntax `[head, ..tail]` is only available in pattern matching, not in list construction (except for prepend at the front).

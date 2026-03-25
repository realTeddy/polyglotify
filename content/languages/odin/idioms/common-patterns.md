---
title: "Common Patterns"
language: "odin"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Odin idioms emphasize explicit resource management, `defer` for cleanup, data-oriented design, and the `(value, ok)` error pattern. The `context` system allows passing allocators and loggers implicitly through the call stack. Temporary allocators (`context.temp_allocator`) are common for short-lived allocations.

## Example

```odin
package main

import "core:fmt"
import "core:mem"
import "core:strings"

// 1. defer for resource cleanup
read_file :: proc(path: string) -> ([]byte, bool) {
    // In real code: open file, defer close
    data := make([]byte, 1024)
    // ... fill data ...
    return data, true
}

// 2. Context system for allocators
process :: proc(items: []string, allocator := context.allocator) -> []string {
    result := make([]string, len(items), allocator)
    for item, i in items {
        result[i] = strings.to_upper(item, allocator)
    }
    return result
}

// 3. Temporary allocator for short-lived data
scratch_work :: proc() -> string {
    context.allocator = context.temp_allocator
    // Allocations here are freed on next temp_allocator reset
    builder := strings.builder_make()
    strings.write_string(&builder, "temporary ")
    strings.write_string(&builder, "data")
    return strings.to_string(builder)
}

// 4. Tagged union dispatch
Command :: union { Quit, Move, Print }
Quit  :: struct {}
Move  :: struct { dx, dy: int }
Print :: struct { msg: string }

handle :: proc(cmd: Command) {
    switch c in cmd {
    case Quit:  fmt.println("Quitting")
    case Move:  fmt.printf("Moving %d, %d\n", c.dx, c.dy)
    case Print: fmt.println(c.msg)
    }
}

main :: proc() {
    defer free_all(context.temp_allocator)

    commands: []Command = {Move{1, 2}, Print{"Hello"}, Quit{}}
    for cmd in commands {
        handle(cmd)
    }
}
```

## Gotchas

- The implicit `context` parameter is passed to every procedure call — custom allocators propagate automatically.
- `free_all(context.temp_allocator)` must be called to reclaim temporary memory; it is not automatic.
- Data-oriented design (arrays of structs vs. structs of arrays) is preferred for performance-critical code.
- Odin's explicit allocator model makes memory ownership clear — there is no hidden GC overhead.

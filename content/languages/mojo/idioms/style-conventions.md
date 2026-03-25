---
title: "Style Conventions"
language: "mojo"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Mojo follows Python-inspired conventions: `snake_case` for functions and variables, `PascalCase` for types and traits, `SCREAMING_SNAKE_CASE` for compile-time constants (`alias`). Four-space indentation. `fn` for performance-critical functions, `def` for Python-compatible code. Ownership qualifiers (`borrowed`, `inout`, `owned`) are part of the public API signature.

## Example

```mojo
# PascalCase for structs and traits
trait Printable:
    fn print_self(self): ...

struct NetworkConfig(Printable):
    # snake_case for fields
    var host: String
    var port: Int
    var use_tls: Bool

    # SCREAMING_SNAKE_CASE for compile-time constants (alias)
    alias DEFAULT_PORT = 8080
    alias MAX_RETRIES  = 3

    fn __init__(inout self, host: String, port: Int = Self.DEFAULT_PORT):
        self.host    = host
        self.port    = port
        self.use_tls = False

    # fn for performance methods — explicit types
    fn print_self(self):
        print(self.host + ":" + str(self.port))

    # def for flexible/Python-compatible methods
    def to_dict(self):
        return {"host": self.host, "port": self.port}

# snake_case for functions
fn calculate_checksum(data: List[Int]) -> Int:
    var total = 0
    for i in range(len(data)):
        total += data[i]
    return total % 256

# Type parameters in brackets, descriptive names
fn batch_process[T: Printable, batch_size: Int](items: List[T]):
    for i in range(len(items)):
        items[i].print_self()
```

## Gotchas

- Mojo is evolving rapidly; some style conventions are still being established by the community.
- `mojo format` auto-formats code; use it consistently.
- Ownership qualifiers (`inout`, `owned`) in function signatures are part of the public API — they communicate intent to callers and should be chosen deliberately.

---
title: "Style Conventions"
language: "zig"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Zig enforces some style rules at the compiler level and recommends others via the official style guide. `camelCase` for functions and variables, `PascalCase` for types and structs, `SCREAMING_SNAKE_CASE` is not used (Zig uses `camelCase` for constants too). `zig fmt` is the official formatter and is non-negotiable for community contributions. 4-space indentation.

## Example

```zig
// Naming conventions
const std = @import("std");

// Types: PascalCase
const HttpMethod = enum { get, post, put, delete };
const RequestError = error{ Timeout, NotFound, ServerError };

// Structs: PascalCase
const HttpRequest = struct {
    method: HttpMethod,
    path:   []const u8,
    body:   ?[]const u8 = null,
};

// Functions: camelCase
fn parseRequest(raw: []const u8) !HttpRequest {
    _ = raw;
    return .{ .method = .get, .path = "/" };
}

// Variables: camelCase (including constants)
const maxRetries: u32 = 3;
const defaultTimeout: u64 = 5000;

// Fields: camelCase
const Config = struct {
    serverHost: []const u8 = "localhost",
    serverPort: u16 = 8080,
    maxConnections: u32 = 100,
};

pub fn main() !void {
    const req = try parseRequest("GET / HTTP/1.1");
    const cfg = Config{};
    std.debug.print("{s}:{d}\n", .{cfg.serverHost, cfg.serverPort});
    _ = req;
    _ = maxRetries;
    _ = defaultTimeout;
}
```

## Gotchas

- `zig fmt` reformats code automatically; CI pipelines typically run `zig fmt --check` to enforce formatting.
- Unlike most languages, Zig uses `camelCase` for constants — not `SCREAMING_SNAKE_CASE`.
- Unused variables are compile errors; use `_ = variable;` to acknowledge you intentionally discard a value.

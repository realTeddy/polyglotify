---
title: "Common Patterns"
language: "java"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Idiomatic modern Java (17+) uses records for data, sealed interfaces for discriminated unions, pattern matching for dispatch, streams for data transformation, and `Optional` for nullable returns. The Builder pattern handles complex object construction. Static factory methods are preferred over constructors for clarity. Immutability is the default — mutate only when necessary.

## Example

```java
import java.util.*;
import java.util.stream.*;

// 1. Streams — functional data transformation
List<String> names = List.of("Alice", "Bob", "Charlie", "Anna");
List<String> result = names.stream()
    .filter(n -> n.startsWith("A"))
    .map(String::toUpperCase)
    .sorted()
    .toList();  // ["ALICE", "ANNA"]

// 2. Builder pattern
class Config {
    private final String host;
    private final int port;
    private final boolean tls;

    private Config(Builder b) { host = b.host; port = b.port; tls = b.tls; }

    public static class Builder {
        private String host = "localhost";
        private int port = 8080;
        private boolean tls = false;

        public Builder host(String h) { host = h; return this; }
        public Builder port(int p) { port = p; return this; }
        public Builder tls(boolean t) { tls = t; return this; }
        public Config build() { return new Config(this); }
    }
}

var config = new Config.Builder().host("prod.example.com").port(443).tls(true).build();

// 3. Sealed interface + pattern matching (Java 21)
sealed interface Expr permits Num, Add, Mul {}
record Num(int value) implements Expr {}
record Add(Expr left, Expr right) implements Expr {}
record Mul(Expr left, Expr right) implements Expr {}

static int eval(Expr e) {
    return switch (e) {
        case Num n       -> n.value();
        case Add(var l, var r) -> eval(l) + eval(r);
        case Mul(var l, var r) -> eval(l) * eval(r);
    };
}
```

## Gotchas

- `Stream.toList()` (Java 16+) returns an unmodifiable list, while `Collectors.toList()` returns a modifiable `ArrayList`. Use `toList()` unless you need to mutate the result.
- Record deconstruction patterns in `switch` (Java 21) require preview features in earlier versions — check your Java version.

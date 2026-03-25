---
title: "Result Types"
language: "java"
feature: "result-types"
category: "error-handling"
applicable: true
---

Java's `Optional<T>` handles the "value or nothing" case. For the "success or error" case, there is no standard `Result<T, E>` type, but it is straightforward to implement, or libraries like Vavr provide `Either<L, R>`. The functional streams API uses `Optional` and `Stream` for chainable, null-free pipelines. A common pattern wraps checked exceptions in unchecked ones to use `Optional`-based flow.

## Example

```java
import java.util.Optional;
import java.util.function.Function;

// Lightweight Result type
sealed interface Result<T> {
    record Success<T>(T value) implements Result<T> {}
    record Failure<T>(String message, Throwable cause) implements Result<T> {}

    static <T> Result<T> ok(T value) { return new Success<>(value); }
    static <T> Result<T> fail(String message) { return new Failure<>(message, null); }
    static <T> Result<T> fail(String message, Throwable cause) { return new Failure<>(message, cause); }

    default <U> Result<U> map(Function<T, U> f) {
        return switch (this) {
            case Success<T> s -> Result.ok(f.apply(s.value()));
            case Failure<T> e -> Result.fail(e.message(), e.cause());
        };
    }

    default T orElse(T fallback) {
        return switch (this) {
            case Success<T> s -> s.value();
            case Failure<T> e -> fallback;
        };
    }
}

// Usage
class Demo {
    static Result<Integer> parseInt(String s) {
        try {
            return Result.ok(Integer.parseInt(s));
        } catch (NumberFormatException e) {
            return Result.fail("Not a number: " + s, e);
        }
    }

    public static void main(String[] args) {
        var r1 = parseInt("42").map(n -> n * 2);
        var r2 = parseInt("abc").map(n -> n * 2);

        System.out.println(r1.orElse(-1)); // 84
        System.out.println(r2.orElse(-1)); // -1

        switch (r1) {
            case Result.Success<Integer> s -> System.out.println("Got: " + s.value());
            case Result.Failure<Integer> f -> System.out.println("Error: " + f.message());
        }
    }
}
```

## Gotchas

- `Optional.get()` throws `NoSuchElementException` if empty — always use `orElse`, `orElseGet`, `orElseThrow`, or `ifPresent` instead.
- `Optional` is not `Serializable` (by design) and has some overhead vs. a plain null check; use it for return types where the absence of a value is part of the API contract.

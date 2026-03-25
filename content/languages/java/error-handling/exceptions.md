---
title: "Exceptions"
language: "java"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Java has a checked/unchecked exception distinction. Checked exceptions (subclasses of `Exception` but not `RuntimeException`) must be either caught or declared with `throws`. Unchecked exceptions (`RuntimeException` and `Error` subclasses) need not be declared. Multi-catch and try-with-resources (Java 7+) reduce boilerplate. Modern Java design trend: prefer unchecked exceptions for application logic; use checked only for truly recoverable conditions.

## Example

```java
import java.io.*;
import java.nio.file.*;

// Custom unchecked exception
class AppException extends RuntimeException {
    private final String code;

    public AppException(String code, String message) {
        super(message);
        this.code = code;
    }

    public AppException(String code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }

    public String getCode() { return code; }
}

public class ExceptionDemo {

    // Declares checked exception — caller must handle or declare it
    static String readFile(Path path) throws IOException {
        return Files.readString(path);
    }

    // Wraps checked in unchecked
    static String readFileUnchecked(Path path) {
        try {
            return Files.readString(path);
        } catch (IOException e) {
            throw new AppException("IO_ERROR", "Failed to read: " + path, e);
        }
    }

    // try-with-resources — auto-closes on exit
    static int countLines(String filename) throws IOException {
        try (var reader = new BufferedReader(new FileReader(filename))) {
            return (int) reader.lines().count();
        }
    }

    public static void main(String[] args) {
        // Multi-catch
        try {
            int n = Integer.parseInt("abc");
        } catch (NumberFormatException | ArithmeticException e) {
            System.out.println("Parse or arithmetic error: " + e.getMessage());
        } finally {
            System.out.println("Always runs");
        }
    }
}
```

## Gotchas

- Catching `Exception` (or worse, `Throwable`) is an anti-pattern that swallows unexpected errors. Catch the most specific type you can handle.
- Never leave a `catch` block empty — at minimum log the exception. Silently swallowing exceptions makes bugs nearly impossible to diagnose.

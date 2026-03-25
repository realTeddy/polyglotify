---
title: "Structs & Classes"
language: "java"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Java has no `struct` keyword. Plain data containers use **records** (Java 16+) for immutable, value-like types or regular classes with fields for mutable data. Records automatically generate accessors, `equals`, `hashCode`, and `toString`. For mutable data objects, the Builder pattern (or Lombok `@Builder`) replaces constructor overloading.

## Example

```java
import java.util.Objects;

// Immutable record — Java 16+ struct equivalent
record Point(double x, double y) {
    // Compact constructor for validation
    Point {
        if (Double.isNaN(x) || Double.isNaN(y))
            throw new IllegalArgumentException("NaN coordinates");
    }

    double distanceTo(Point other) {
        double dx = this.x - other.x;
        double dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// Traditional mutable class
class MutablePoint {
    private double x;
    private double y;

    public MutablePoint(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() { return x; }
    public double getY() { return y; }
    public void setX(double x) { this.x = x; }
    public void setY(double y) { this.y = y; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MutablePoint mp)) return false;
        return Double.compare(mp.x, x) == 0 && Double.compare(mp.y, y) == 0;
    }

    @Override
    public int hashCode() { return Objects.hash(x, y); }

    @Override
    public String toString() { return "MutablePoint(" + x + ", " + y + ")"; }
}

class Demo {
    public static void main(String[] args) {
        var p1 = new Point(0, 0);
        var p2 = new Point(3, 4);
        System.out.println(p1.distanceTo(p2)); // 5.0
        System.out.println(p1.equals(new Point(0, 0))); // true
    }
}
```

## Gotchas

- Forgetting to implement `equals()` and `hashCode()` on regular classes means they use identity comparison, causing unexpected behavior in collections. Records implement these automatically.
- Records are shallowly immutable — components are `final`, but if a component is a mutable object (like a `List`), the contents can still be changed.

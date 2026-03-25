---
title: "Arrays & Lists"
language: "objective-c"
feature: "arrays"
category: "data-structures"
applicable: true
---

Objective-C provides `NSArray` (immutable) and `NSMutableArray` (mutable) for ordered collections of objects. The modern literal syntax `@[...]` creates an `NSArray`. Elements must be Objective-C objects — C primitives must be boxed with `@(value)`. `NSArray` is zero-indexed and provides rich filtering, sorting, and enumeration APIs.

## Example

```objc
#import <Foundation/Foundation.h>

int main(void) {
    // Immutable array literal
    NSArray<NSString *> *fruits = @[@"apple", @"banana", @"cherry"];
    NSLog(@"count: %lu", (unsigned long)fruits.count);
    NSLog(@"first: %@", fruits[0]);
    NSLog(@"last: %@", fruits.lastObject);

    // Mutable array
    NSMutableArray<NSNumber *> *nums = [NSMutableArray arrayWithArray:@[@3, @1, @4]];
    [nums addObject:@1];
    [nums addObject:@5];
    [nums removeObjectAtIndex:0];
    NSLog(@"nums: %@", nums);

    // Sorting
    NSArray *sorted = [nums sortedArrayUsingSelector:@selector(compare:)];
    NSLog(@"sorted: %@", sorted);

    // Filtering with predicate
    NSPredicate *pred = [NSPredicate predicateWithBlock:^BOOL(NSNumber *n, NSDictionary *b) {
        return n.integerValue > 2;
    }];
    NSArray *filtered = [nums filteredArrayUsingPredicate:pred];
    NSLog(@"filtered: %@", filtered);

    // Fast enumeration
    for (NSNumber *n in sorted) {
        NSLog(@"  %@", n);
    }

    // Block enumeration
    [fruits enumerateObjectsUsingBlock:^(NSString *obj, NSUInteger idx, BOOL *stop) {
        NSLog(@"[%lu] %@", (unsigned long)idx, obj);
        if ([obj isEqualToString:@"banana"]) *stop = YES;
    }];

    return 0;
}
```

## Gotchas

- `NSArray` cannot store `nil`; use `[NSNull null]` as a placeholder for absent values. Inserting `nil` terminates a variadic initialiser early (e.g., `arrayWithObjects:`).
- Subscript access `array[idx]` throws `NSRangeException` if the index is out of bounds; always check `count` or use `objectAtIndex:` with bounds checking.
- `NSMutableArray` is not thread-safe; use a serial dispatch queue or `NSLock` when accessing a mutable array from multiple threads.

---
title: "Sets"
language: "objective-c"
feature: "sets"
category: "data-structures"
applicable: true
---

Objective-C provides `NSSet` (immutable), `NSMutableSet` (mutable), and `NSOrderedSet` / `NSMutableOrderedSet` for ordered sets. Sets store unique objects using `isEqual:` and `hash` for equality. There is no set literal syntax; sets are created with factory methods. Sets are commonly used for fast membership testing and eliminating duplicates.

## Example

```objc
#import <Foundation/Foundation.h>

int main(void) {
    // Create set from array (removes duplicates)
    NSArray *rawTags = @[@"swift", @"ios", @"swift", @"objc", @"ios"];
    NSSet<NSString *> *tags = [NSSet setWithArray:rawTags];
    NSLog(@"unique tags count: %lu", (unsigned long)tags.count);   // 3

    // Membership
    NSLog(@"has 'ios': %d",   [tags containsObject:@"ios"]);    // 1
    NSLog(@"has 'android': %d", [tags containsObject:@"android"]);  // 0

    // Mutable set operations
    NSMutableSet *a = [NSMutableSet setWithArray:@[@1, @2, @3, @4]];
    NSSet *b = [NSSet setWithArray:@[@3, @4, @5, @6]];

    NSMutableSet *union = [a mutableCopy];
    [union unionSet:b];
    NSLog(@"union count: %lu", (unsigned long)union.count);   // 6

    NSMutableSet *inter = [a mutableCopy];
    [inter intersectSet:b];
    NSLog(@"intersection: %@", inter);   // {3, 4}

    NSMutableSet *diff = [a mutableCopy];
    [diff minusSet:b];
    NSLog(@"difference: %@", diff);   // {1, 2}

    // Ordered set (preserves insertion order + uniqueness)
    NSOrderedSet *ordered = [NSOrderedSet orderedSetWithArray:rawTags];
    NSLog(@"ordered: %@", ordered);   // (swift, ios, objc)

    return 0;
}
```

## Gotchas

- `NSSet` has no guaranteed iteration order; if order matters, use `NSOrderedSet` or convert to a sorted `NSArray`.
- Custom objects stored in a set must implement both `isEqual:` and `hash`; if `hash` is inconsistent with `isEqual:`, the set may contain "duplicates" or fail lookups.
- `NSSet` literal syntax does not exist; always use `setWithArray:` or `setWithObjects:` factory methods.

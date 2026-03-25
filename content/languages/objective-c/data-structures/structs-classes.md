---
title: "Structs & Classes"
language: "objective-c"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Objective-C supports both C `struct`s (value types, stack-allocated) and `NSObject` subclass classes (reference types, heap-allocated, ARC-managed). Structs are used for lightweight geometry and data types (`CGRect`, `CGPoint`, `NSRange`). Classes provide the full Objective-C object model with message passing, inheritance, and dynamic dispatch. Choosing between them follows the same principles as C vs. Objective-C: use structs for simple data and classes for behaviour-rich objects.

## Example

```objc
#import <Foundation/Foundation.h>

// C struct — value type
typedef struct {
    double x;
    double y;
} Vector2D;

Vector2D vector2DAdd(Vector2D a, Vector2D b) {
    return (Vector2D){ a.x + b.x, a.y + b.y };
}

// Objective-C class — reference type
@interface Person : NSObject

@property (nonatomic, copy)   NSString  *name;
@property (nonatomic, assign) NSInteger  age;

- (instancetype)initWithName:(NSString *)name age:(NSInteger)age;
- (NSString *)greeting;

@end

@implementation Person

- (instancetype)initWithName:(NSString *)name age:(NSInteger)age {
    self = [super init];
    if (self) {
        _name = [name copy];
        _age  = age;
    }
    return self;
}

- (NSString *)greeting {
    return [NSString stringWithFormat:@"Hi, I'm %@ (%ld)", _name, (long)_age];
}

@end

int main(void) {
    Vector2D v1 = {1.0, 2.0};
    Vector2D v2 = {3.0, 4.0};
    Vector2D sum = vector2DAdd(v1, v2);
    NSLog(@"Vector: (%.1f, %.1f)", sum.x, sum.y);   // (4.0, 6.0)

    Person *p = [[Person alloc] initWithName:@"Alice" age:30];
    NSLog(@"%@", [p greeting]);

    return 0;
}
```

## Gotchas

- C structs cannot be stored in `NSArray` or `NSDictionary` directly; wrap them in `NSValue` using `valueWithBytes:objCType:` or use the specific constructors like `[NSValue valueWithCGRect:]`.
- `@property (copy)` vs `@property (strong)` matters for mutable types: `copy` ensures your object holds its own immutable snapshot, preventing external mutation.
- The `self = [super init]` pattern in `init` is essential; if `super init` returns a different object (a class cluster pattern), the original `self` pointer is invalid.

---
title: "Interfaces & Traits"
language: "objective-c"
feature: "interfaces"
category: "oop"
applicable: true
---

Objective-C uses **protocols** instead of interfaces. A protocol declares a set of methods that any conforming class promises to implement. Methods can be `@required` (default) or `@optional`. Protocols support composition (a class can conform to multiple protocols) and can be used as types with the syntax `id<ProtocolName>`. Categories allow adding methods to existing classes without subclassing.

## Example

```objc
#import <Foundation/Foundation.h>

// Protocol declaration
@protocol Drawable <NSObject>
@required
- (void)draw;
- (CGRect)boundingBox;

@optional
- (NSString *)debugDescription;
@end

// Conforming class
@interface Circle : NSObject <Drawable>
@property (nonatomic, assign) CGPoint center;
@property (nonatomic, assign) CGFloat radius;
- (instancetype)initWithCenter:(CGPoint)c radius:(CGFloat)r;
@end

@implementation Circle
- (instancetype)initWithCenter:(CGPoint)c radius:(CGFloat)r {
    self = [super init];
    if (self) { _center = c; _radius = r; }
    return self;
}
- (void)draw { NSLog(@"Drawing circle at (%.0f,%.0f) r=%.0f",
                     _center.x, _center.y, _radius); }
- (CGRect)boundingBox {
    return CGRectMake(_center.x - _radius, _center.y - _radius,
                      _radius * 2, _radius * 2);
}
@end

// Using protocol as a type
void renderAll(NSArray<id<Drawable>> *shapes) {
    for (id<Drawable> shape in shapes) {
        [shape draw];
        if ([shape respondsToSelector:@selector(debugDescription)]) {
            NSLog(@"%@", [shape debugDescription]);
        }
    }
}

int main(void) {
    Circle *c = [[Circle alloc] initWithCenter:CGPointMake(50, 50) radius:25];
    renderAll(@[c]);
    return 0;
}
```

## Gotchas

- `@optional` methods must be checked with `respondsToSelector:` before calling; calling an unimplemented optional method crashes at runtime.
- A class can conform to a protocol without actually implementing all `@required` methods; the compiler warns but does not error, so runtime crashes are possible.
- Protocols cannot contain stored properties (unlike Swift protocols with default implementations); any state required by a protocol must be declared in the conforming class.

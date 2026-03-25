---
title: "Interfaces & Traits"
language: "r"
feature: "interfaces"
category: "oop"
applicable: false
---

R does not have formal interfaces or traits. The equivalent is duck typing — if an object has the required S3 generics or R6 methods, it works. S4 virtual classes and abstract classes can partially simulate interface contracts. The `R7` / `S7` system (in development) introduces formal interface-like protocols.

## Example

```r
# S3 "interface" via generic functions
# Define generics as the "interface contract"
serialize   <- function(x, ...) UseMethod("serialize")
deserialize <- function(data, ...) UseMethod("deserialize")

# "Implement" the interface for a class
serialize.Config <- function(x, ...) {
  jsonlite::toJSON(x)
}
deserialize.Config <- function(data, ...) {
  structure(jsonlite::fromJSON(data), class = "Config")
}

# S4 virtual class as abstract interface
setClass("Printable", contains = "VIRTUAL")
setGeneric("printInfo", function(x, ...) standardGeneric("printInfo"))

setClass("User", contains = "Printable",
  representation(name = "character", email = "character"))
setMethod("printInfo", "User", function(x, ...) {
  cat(sprintf("User: %s <%s>\n", x@name, x@email))
})

u <- new("User", name = "Alice", email = "alice@example.com")
printInfo(u)
```

## Gotchas

- S3 generics enforce no contract — a missing method fails at runtime with `no applicable method`
- S4 virtual classes cannot be instantiated but force subclasses to implement specific generics
- R's duck typing is flexible but provides no compile-time interface safety

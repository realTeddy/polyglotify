---
title: "Maps & Dictionaries"
language: "r"
feature: "maps"
category: "data-structures"
applicable: true
---

R does not have a dedicated map/dictionary type. Named vectors, named lists, and `environments` serve as key-value stores. For performance-critical lookups, `hash` environments provide O(1) access. The `hash` package provides a more ergonomic interface.

## Example

```r
# Named vector as map (values must be same type)
scores <- c(Alice = 95, Bob = 87, Carol = 92)
scores["Alice"]           # => 95
scores[c("Alice", "Bob")] # => c(Alice=95, Bob=87)
names(scores)             # => c("Alice", "Bob", "Carol")

# Named list as map (any value types)
config <- list(
  host    = "localhost",
  port    = 3000,
  debug   = TRUE,
  tags    = c("web", "api")
)
config$host         # => "localhost"
config[["port"]]    # => 3000

# Add / modify
config$timeout <- 30
config[["port"]] <- 8080

# Check existence
"host" %in% names(config)

# Environment as hash map (O(1) lookup)
env_map <- new.env(hash = TRUE)
env_map$Alice <- 95
env_map[["Bob"]] <- 87
ls(env_map)             # => c("Alice", "Bob")
exists("Alice", env_map) # => TRUE
```

## Gotchas

- Named vector access with `[` returns a named vector; `[[` returns the bare value (name stripped)
- Environments are mutable reference objects (unlike vectors which are copy-on-modify)
- `NULL` assignment to a list element removes it: `config$host <- NULL`

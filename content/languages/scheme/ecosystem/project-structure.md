---
title: "Project Structure"
language: "scheme"
feature: "project-structure"
category: "ecosystem"
applicable: false
---

Standard R7RS Scheme has no mandated project structure. Each implementation defines its own conventions. Chicken Scheme uses `.egg` info files. Racket uses `info.rkt` and `racket` packages. Guile uses `configure.ac` and autotools. For portable R7RS code, the convention is to organize source by library name in a directory hierarchy matching `(my-project utils)` → `my-project/utils.sld` (`.sld` = Scheme library definition).

## Example

```
;;; R7RS portable project layout
my-project/
├── README.md
├── my-project.sld           ; top-level library definition
├── my-project/
│   ├── utils.sld            ; (my-project utils) library
│   ├── core.sld             ; (my-project core) library
│   └── io.sld               ; (my-project io) library
└── tests/
    ├── run-tests.scm
    ├── test-utils.scm
    └── test-core.scm
```

```scheme
;;; my-project/utils.sld — R7RS library definition
(define-library (my-project utils)
  (import (scheme base)
          (scheme write))
  (export filter-map
          string-join
          take)
  (include "utils.scm"))      ; or inline begin:

;;; Alternate: inline begin
(define-library (my-project core)
  (import (scheme base)
          (my-project utils))
  (export process transform)
  (begin
    (define (process data)
      (filter-map transform data))

    (define (transform x)
      (if (number? x) (* x 2) #f))))
```

```bash
# Load with Guile
guile --r7rs -L . -l my-project/core.scm

# Load with Chibi-Scheme
chibi-scheme -I . my-project/core.scm

# Load with Chicken Scheme (requires compile step)
csi -I . -R r7rs -e '(import (my-project core))'
```

## Gotchas

- `.sld` files (Scheme library definitions) use `define-library`, which is R7RS standard but not supported in all implementations without a compatibility layer.
- The directory/filename convention for library names (`(a b c)` → `a/b/c.sld`) is a community convention, not a standard requirement.
- Portability across implementations is achievable but requires careful use of only `(scheme base)` and SRFI features, avoiding any implementation-specific extensions.

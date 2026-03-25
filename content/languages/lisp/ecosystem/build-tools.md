---
title: "Build Tools"
language: "lisp"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Common Lisp uses **ASDF** (Another System Definition Facility) as its standard build system, bundled with all major implementations. ASDF compiles and loads systems defined in `.asd` files, handling dependency ordering and incremental recompilation (`.fasl` files). For standalone executables, implementations provide `save-lisp-and-die` (SBCL) or equivalent. **Roswell** is a launcher and implementation manager. CI uses `ros run` or direct `sbcl --load` invocations.

## Example

```bash
# Running with SBCL
sbcl --load myfile.lisp

# Load a system and run main
sbcl --eval "(ql:quickload :my-project)" \
     --eval "(my-project:main)" \
     --eval "(quit)"

# Build a standalone executable (SBCL)
sbcl --eval "(ql:quickload :my-project)" \
     --eval "(sb-ext:save-lisp-and-die \"my-program\"
              :executable t
              :toplevel #'my-project:main)"

# Using Roswell
ros init my-script.ros   # create a runnable script
ros run -- --eval '(format t "Hello~%")'
ros build my-project.ros  # create executable
```

```lisp
;; .asd with test integration
(asdf:defsystem #:my-project
  :depends-on (#:alexandria)
  :components ((:file "packages")
               (:file "src/core" :depends-on ("packages")))
  :in-order-to ((test-op (test-op #:my-project/tests))))

(asdf:defsystem #:my-project/tests
  :depends-on (#:my-project #:fiveam)
  :components ((:file "tests/all-tests"))
  :perform (test-op (op sys)
             (symbol-call :fiveam :run! :my-project-suite)))
```

```bash
# Run tests via ASDF
sbcl --eval "(asdf:test-system :my-project)" --eval "(quit)"
```

## Gotchas

- `.fasl` (fast-load) files are implementation-specific compiled bytecode — SBCL's `.fasl` files cannot be loaded by CCL or ABCL. Always compile from source when switching implementations.
- `save-lisp-and-die` saves the entire Lisp image including all loaded libraries — the resulting executable is large (typically 50–200 MB) but starts instantly.
- ASDF's `load-op` is incremental: it only recompiles files whose sources are newer than their `.fasl`. Running `(asdf:compile-system :my-project)` forces a full recompile.

---
title: "Testing"
language: "ocaml"
feature: "testing"
category: "ecosystem"
applicable: true
---

OCaml's most popular test frameworks are **Alcotest** (structured unit tests with rich diffs) and **OUnit2** (xUnit-style). **ppx_inline_test** (Jane Street) enables inline tests. **Crowbar** and **QCheck** provide property-based testing. Run tests with `dune test` or `dune runtest`.

## Example

```ocaml
(* test/test_math.ml — using Alcotest *)
(* opam install alcotest *)

(* Source under test *)
let factorial n =
  let rec aux n acc = if n <= 1 then acc else aux (n-1) (n*acc) in
  aux n 1

let clamp x lo hi = max lo (min hi x)

(* Alcotest tests *)
let test_factorial_base () =
  Alcotest.(check int) "factorial 0" 1 (factorial 0);
  Alcotest.(check int) "factorial 1" 1 (factorial 1)

let test_factorial_positive () =
  Alcotest.(check int) "factorial 5" 120 (factorial 5);
  Alcotest.(check int) "factorial 6" 720 (factorial 6)

let test_clamp_below () =
  Alcotest.(check int) "below" 0 (clamp (-5) 0 10)

let test_clamp_above () =
  Alcotest.(check int) "above" 10 (clamp 15 0 10)

let test_clamp_within () =
  Alcotest.(check int) "within" 5 (clamp 5 0 10)

let () =
  Alcotest.run "Math"
    [ "factorial", [
        Alcotest.test_case "base cases"   `Quick test_factorial_base;
        Alcotest.test_case "positive"     `Quick test_factorial_positive;
      ];
      "clamp", [
        Alcotest.test_case "below range"  `Quick test_clamp_below;
        Alcotest.test_case "above range"  `Quick test_clamp_above;
        Alcotest.test_case "within range" `Quick test_clamp_within;
      ];
    ]
```

## Gotchas

- Alcotest's `check` takes `(testable, label, expected, actual)`; the order is expected-then-actual (opposite of some frameworks).
- `dune test` runs all test stanzas; add `(alias runtest)` to custom test builds.
- Tests marked `` `Slow `` are skipped by default unless `--slow` is passed; use `` `Quick `` for fast unit tests.

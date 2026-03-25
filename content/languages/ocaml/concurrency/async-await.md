---
title: "Async/Await"
language: "ocaml"
feature: "async-await"
category: "concurrency"
applicable: true
---

OCaml has async/await via the **Lwt** (Lightweight Threads) library and **Async** (Jane Street). Both use monadic composition rather than keyword syntax. Lwt uses `let*` (bind) and `Lwt_main.run` as the entry point. OCaml 5.0 introduced native **Effect Handlers** enabling zero-cost async without monads; the `Eio` library builds on this.

## Example

```ocaml
(* Using Lwt — install with: opam install lwt *)

open Lwt.Syntax

(* Async function returns Lwt.t promise *)
let fetch_data url =
  let* () = Lwt_unix.sleep 0.1 in   (* simulate I/O *)
  Lwt.return ("data from " ^ url)

(* Combine promises *)
let fetch_all () =
  let* r1 = fetch_data "https://api.example.com/a" in
  let* r2 = fetch_data "https://api.example.com/b" in
  Lwt_io.printlf "Got: %s and %s" r1 r2

(* Concurrent execution *)
let fetch_concurrent () =
  let p1 = fetch_data "url1" in
  let p2 = fetch_data "url2" in
  let* r1 = p1 in
  let* r2 = p2 in
  Lwt_io.printlf "Concurrent: %s, %s" r1 r2

(* Run the event loop *)
let () = Lwt_main.run (fetch_all ())
let () = Lwt_main.run (fetch_concurrent ())
```

## Gotchas

- `let*` in Lwt is `Lwt.bind`; the promise is created immediately when you call the function — not when you `await` it.
- To run promises concurrently, create them *before* binding with `let*`; binding sequentially serializes them.
- OCaml 5.0+ with `Eio` is the modern approach; Lwt and Async are compatible with OCaml 4.x.

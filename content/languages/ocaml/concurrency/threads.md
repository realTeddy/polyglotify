---
title: "Threads"
language: "ocaml"
feature: "threads"
category: "concurrency"
applicable: true
---

OCaml 4.x has a Global Interpreter Lock (GIL) — the "Global Lock" — meaning OS threads run concurrently for I/O but not for CPU computation. OCaml 5.0 removed the GIL and introduced **Domains** for true CPU parallelism. The `Thread` module creates OS threads; `Mutex` and `Condition` provide synchronization. For CPU parallelism in 4.x, use separate processes or C extensions.

## Example

```ocaml
(* OCaml threads — requires compile with threads library *)
(* ocamlfind ocamlopt -package threads.posix -linkpkg prog.ml *)

let () =
  let mutex   = Mutex.create () in
  let counter = ref 0 in

  let worker () =
    for _ = 1 to 10_000 do
      Mutex.lock mutex;
      incr counter;
      Mutex.unlock mutex
    done
  in

  let threads = Array.init 4 (fun _ -> Thread.create worker ()) in
  Array.iter Thread.join threads;

  Printf.printf "counter = %d\n" !counter   (* 40000 *)

(* OCaml 5.0 Domains — true parallelism *)
(* let d = Domain.spawn (fun () -> compute ()) in
   let result = Domain.join d in
   ... *)
```

## Gotchas

- In OCaml 4.x, the runtime lock prevents true CPU parallelism; threads are useful for I/O concurrency only.
- OCaml 5.0 Domains provide true parallelism but require careful data-race avoidance (no lock protects the runtime).
- `Thread.create f ()` creates a thread; always `Thread.join` to wait for completion and detect exceptions.

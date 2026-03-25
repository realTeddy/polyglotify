---
title: "Channels & Message Passing"
language: "ocaml"
feature: "channels"
category: "concurrency"
applicable: true
---

OCaml provides `Event` module channels for synchronous message passing between threads (CSP-style). Lwt and Eio provide async streams/pipes. OCaml 5.0's `Eio` library includes channels and streams built on effect handlers. The `Thread` + `Mutex` + `Condition` combination implements bounded queues manually.

## Example

```ocaml
(* Synchronous channels via Event module *)
(* compile: ocamlfind ocamlopt -package threads.posix -linkpkg prog.ml *)

let () =
  let ch = Event.new_channel () in

  (* Producer thread *)
  let _producer = Thread.create (fun () ->
    for i = 1 to 5 do
      Event.sync (Event.send ch i);
      Printf.printf "Sent: %d\n" i
    done;
    Event.sync (Event.send ch (-1))   (* sentinel *)
  ) () in

  (* Consumer on main thread *)
  let rec loop () =
    let v = Event.sync (Event.receive ch) in
    if v = -1 then ()
    else begin
      Printf.printf "Received: %d\n" v;
      loop ()
    end
  in
  loop ()

(* Lwt stream (async channel) *)
(* open Lwt_stream
   let (stream, push) = create ()
   let () = Lwt_main.run (
     push (Some 42);
     let* v = next stream in
     Lwt_io.printlf "got %d" (Option.get v)) *)
```

## Gotchas

- `Event.sync` blocks the calling thread until a matching send/receive is ready (rendezvous semantics).
- OCaml's `Event` channels are synchronous — sender and receiver must meet; there is no buffering.
- For production async work, use Lwt's `Lwt_mvar` or `Lwt_stream`, or Eio's `Stream` for buffered channels.

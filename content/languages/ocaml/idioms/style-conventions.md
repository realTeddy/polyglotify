---
title: "Style Conventions"
language: "ocaml"
feature: "style-conventions"
category: "idioms"
applicable: true
---

OCaml style uses `snake_case` for values and functions, `PascalCase` (UpperCamelCase) for modules and type constructors, lowercase for type names and module type names (conventionally). The official formatter is **ocamlformat**. Lines are typically 80–100 characters. `(* ... *)` are block comments; `(*! ... *)` are documentation comments for odoc.

## Example

```ocaml
(* Module names: PascalCase *)
module HttpClient = struct

  (* Type names: snake_case *)
  type request_method = Get | Post | Put | Delete

  type config = {
    base_url : string;
    timeout  : int;
    max_retries : int;
  }

  (* Value constructors: PascalCase *)
  let default_config = {
    base_url    = "http://localhost";
    timeout     = 30;
    max_retries = 3;
  }

  (* Function names: snake_case *)
  let make_request ~method_ ~path config =
    Printf.printf "%s %s%s\n"
      (match method_ with Get -> "GET" | Post -> "POST" | _ -> "OTHER")
      config.base_url
      path

  (** [fetch url] fetches the resource at [url].
      @param url The URL to fetch.
      @return The response body. *)
  let fetch ?(config = default_config) url =
    make_request ~method_:Get ~path:url config

end

let () =
  HttpClient.fetch "/api/users" |> ignore
```

## Gotchas

- `ocamlformat` is the standard formatter; configure it with `.ocamlformat` in the project root.
- `method` is a reserved keyword; use `method_` or `meth` for a parameter named "method".
- `.mli` interface files define the public API; use them to hide implementation details from library users.

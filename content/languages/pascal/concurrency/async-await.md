---
title: "Async/Await"
language: "pascal"
feature: "async-await"
category: "concurrency"
applicable: false
---

Pascal has no `async`/`await` keywords or built-in asynchronous programming model. Free Pascal provides threads via the `Classes` unit (`TThread`) and low-level threading via `cthreads` on Linux. GUI frameworks like Lazarus provide `TThread` with `Synchronize`/`Queue` for marshalling calls back to the main thread. For asynchronous I/O patterns, third-party event-loop libraries (like `fpAsync`) exist but are not part of the standard library.

## Example

```pascal
// Free Pascal — using TThread as the closest async equivalent
program AsyncDemo;

{$mode objfpc}{$H+}

uses
  Classes, SysUtils, cthreads;

type
  TWorker = class(TThread)
  private
    FResult: Integer;
    FInput:  Integer;
  protected
    procedure Execute; override;
  public
    constructor Create(input: Integer);
    property Result: Integer read FResult;
  end;

constructor TWorker.Create(input: Integer);
begin
  inherited Create(False);   // False = start immediately
  FInput := input;
  FreeOnTerminate := False;
end;

procedure TWorker.Execute;
var
  i: Integer;
begin
  // Simulate work
  FResult := 0;
  for i := 1 to FInput do
    FResult += i;
end;

var
  t1, t2: TWorker;
begin
  t1 := TWorker.Create(100);
  t2 := TWorker.Create(200);

  // "Await" — wait for threads to finish
  t1.WaitFor;
  t2.WaitFor;

  WriteLn('Sum 1..100 = ', t1.Result);
  WriteLn('Sum 1..200 = ', t2.Result);

  t1.Free;
  t2.Free;
end.
```

## Gotchas

- `TThread` must be compiled with `cthreads` on Linux/Mac or the threading support is missing; on Windows it uses native threads automatically.
- `FreeOnTerminate := True` frees the thread object when it finishes — do not access the object after that.
- There is no event loop or promise/future abstraction in the standard library; you must implement synchronisation manually with critical sections or semaphores.
- Pascal's threading model is imperative and low-level compared to async/await; consider Lazarus's `TThread.Queue` for simple UI-safe callbacks.

---
title: "Threads"
language: "pascal"
feature: "threads"
category: "concurrency"
applicable: true
---

Free Pascal provides `TThread` in the `Classes` unit for OS-level threading. Synchronisation primitives include `TCriticalSection`, `TEvent`, and `TSemaphore` from the `SyncObjs` unit. On Linux, add `cthreads` to `uses` before any other unit. Shared data must be protected with locks; Free Pascal does not provide any safety guarantees at the type level.

## Example

```pascal
program ThreadsDemo;

{$mode objfpc}{$H+}

uses
  Classes, SyncObjs, SysUtils
  {$ifdef Unix}, cthreads{$endif};

var
  GCounter: Integer = 0;
  GLock: TCriticalSection;

type
  TCounterThread = class(TThread)
  private
    FIncrements: Integer;
  protected
    procedure Execute; override;
  public
    constructor Create(increments: Integer);
  end;

constructor TCounterThread.Create(increments: Integer);
begin
  inherited Create(False);
  FIncrements := increments;
  FreeOnTerminate := False;
end;

procedure TCounterThread.Execute;
var
  i: Integer;
begin
  for i := 1 to FIncrements do
  begin
    GLock.Acquire;
    try
      Inc(GCounter);
    finally
      GLock.Release;
    end;
  end;
end;

const
  ThreadCount = 4;
  IncrPerThread = 1000;

var
  threads: array[0..ThreadCount-1] of TCounterThread;
  i: Integer;
begin
  GLock := TCriticalSection.Create;
  try
    for i := 0 to ThreadCount - 1 do
      threads[i] := TCounterThread.Create(IncrPerThread);

    for i := 0 to ThreadCount - 1 do
      threads[i].WaitFor;

    for i := 0 to ThreadCount - 1 do
      threads[i].Free;

    WriteLn('Counter: ', GCounter);   // 4000
  finally
    GLock.Free;
  end;
end.
```

## Gotchas

- Forgetting `cthreads` on Unix causes a runtime error about threading support not being initialised.
- `FreeOnTerminate := True` frees the thread object automatically but makes it unsafe to call `WaitFor` or access the object afterwards.
- `TCriticalSection` is not re-entrant by default in all platforms; acquiring it twice from the same thread may deadlock.
- Free Pascal does not have a `std::atomic` equivalent in the standard library — use `InterlockedIncrement`/`InterlockedDecrement` from `SysUtils` for simple atomic integer operations.

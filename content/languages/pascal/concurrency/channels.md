---
title: "Channels & Message Passing"
language: "pascal"
feature: "channels"
category: "concurrency"
applicable: false
---

Pascal has no built-in channel or message-passing primitives. Inter-thread communication is done via shared memory protected by critical sections, or via Windows/OS message queues (`PostMessage`/`SendMessage` in GUI apps). Free Pascal provides `TEventObject` and `TSemaphore` for signalling between threads. A thread-safe queue can be constructed manually using `TCriticalSection` and `TList<T>`.

## Example

```pascal
// Manual thread-safe queue as a channel substitute
program ChannelsDemo;

{$mode objfpc}{$H+}

uses
  Classes, SyncObjs, SysUtils, Generics.Collections
  {$ifdef Unix}, cthreads{$endif};

type
  TChannel<T> = class
  private
    FQueue: TQueue<T>;
    FLock:  TCriticalSection;
    FEvent: TEventObject;
  public
    constructor Create;
    destructor  Destroy; override;
    procedure Send(const value: T);
    function  TryReceive(out value: T; timeoutMs: Integer = -1): Boolean;
  end;

constructor TChannel<T>.Create;
begin
  FQueue := TQueue<T>.Create;
  FLock  := TCriticalSection.Create;
  FEvent := TEventObject.Create(nil, False, False, '');
end;

destructor TChannel<T>.Destroy;
begin
  FQueue.Free; FLock.Free; FEvent.Free;
  inherited;
end;

procedure TChannel<T>.Send(const value: T);
begin
  FLock.Acquire;
  try
    FQueue.Enqueue(value);
  finally
    FLock.Release;
  end;
  FEvent.SetEvent;
end;

function TChannel<T>.TryReceive(out value: T; timeoutMs: Integer): Boolean;
begin
  if timeoutMs < 0 then
    FEvent.WaitFor(INFINITE)
  else
    FEvent.WaitFor(timeoutMs);
  FLock.Acquire;
  try
    Result := FQueue.Count > 0;
    if Result then value := FQueue.Dequeue;
  finally
    FLock.Release;
  end;
end;

var
  ch: TChannel<Integer>;
  v:  Integer;
begin
  ch := TChannel<Integer>.Create;
  try
    ch.Send(42);
    if ch.TryReceive(v, 100) then
      WriteLn('Received: ', v);
  finally
    ch.Free;
  end;
end.
```

## Gotchas

- This is a library-level pattern, not a language primitive — Pascal provides no built-in channel type.
- The event (`TEventObject`) is auto-reset, so only one waiting thread is woken per `SetEvent`; use a manual-reset event or a semaphore for multiple consumers.
- No flow-control or backpressure is built in — the queue can grow unboundedly if the producer outpaces the consumer.
- For GUI apps, use `TThread.Queue` or `PostMessage` to safely marshal data back to the main (UI) thread.

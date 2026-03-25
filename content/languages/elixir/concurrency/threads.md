---
title: "Threads"
language: "elixir"
feature: "threads"
category: "concurrency"
applicable: true
---

Elixir uses **processes** (BEAM lightweight processes, not OS threads) as the unit of concurrency. Processes are isolated, share no memory, and communicate via message passing. `spawn/1` creates a process; `GenServer` is the standard abstraction for stateful processes.

## Example

```elixir
# Spawn a process
pid = spawn(fn ->
  IO.puts "Hello from process #{inspect self()}"
end)

# Spawn with module/function/args
pid2 = spawn(MyModule, :run, [arg1, arg2])

# Linked process: if one crashes, the other gets an exit signal
pid3 = spawn_link(fn ->
  # If this crashes, the parent also crashes (unless trapping exits)
  receive do
    :stop -> :ok
  end
end)

# Monitor: receive a message when process exits, without crashing
ref = Process.monitor(pid3)
receive do
  {:DOWN, ^ref, :process, _pid, reason} ->
    IO.puts "Process exited: #{reason}"
end

# GenServer: stateful process (the idiomatic way)
defmodule Counter do
  use GenServer

  def start_link(initial \\ 0), do: GenServer.start_link(__MODULE__, initial)
  def increment(pid),           do: GenServer.cast(pid, :inc)
  def get(pid),                 do: GenServer.call(pid, :get)

  @impl true
  def init(n), do: {:ok, n}

  @impl true
  def handle_cast(:inc, n), do: {:noreply, n + 1}

  @impl true
  def handle_call(:get, _from, n), do: {:reply, n, n}
end

{:ok, pid} = Counter.start_link(0)
Counter.increment(pid)
Counter.increment(pid)
IO.puts Counter.get(pid)   # 2
```

## Gotchas

- BEAM processes are not OS threads; millions can run concurrently with very low overhead (~300 bytes each)
- `spawn_link` ties process lifecycles together; use `spawn_monitor` or `Process.monitor` for independent failure handling
- Always use `GenServer` (or `Agent`, `Task`) instead of raw `spawn` for stateful processes — it handles OTP supervision, crashes, and code upgrades

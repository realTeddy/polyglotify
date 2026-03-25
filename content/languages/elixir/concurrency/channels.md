---
title: "Channels & Message Passing"
language: "elixir"
feature: "channels"
category: "concurrency"
applicable: true
---

Message passing is Elixir's primary concurrency model. Every process has a mailbox; `send/2` puts a message in it; `receive/1` pattern-matches on incoming messages. `GenServer` wraps this into a structured request/reply protocol.

## Example

```elixir
# Basic send / receive
parent = self()

spawn(fn ->
  Process.sleep(100)
  send(parent, {:result, 42})
end)

receive do
  {:result, value} -> IO.puts "Got: #{value}"
  after 1000       -> IO.puts "Timeout!"
end

# Producer / Consumer pattern
defmodule Queue do
  use GenServer

  def start_link(_), do: GenServer.start_link(__MODULE__, :queue.new())
  def enqueue(pid, item), do: GenServer.cast(pid, {:enqueue, item})
  def dequeue(pid),       do: GenServer.call(pid, :dequeue)

  @impl true
  def init(q), do: {:ok, q}

  @impl true
  def handle_cast({:enqueue, item}, q) do
    {:noreply, :queue.in(item, q)}
  end

  @impl true
  def handle_call(:dequeue, _from, q) do
    case :queue.out(q) do
      {{:value, item}, q2} -> {:reply, {:ok, item}, q2}
      {:empty, q2}         -> {:reply, {:error, :empty}, q2}
    end
  end
end

# Phoenix Channels (web real-time messaging, higher level)
# defmodule MyAppWeb.RoomChannel do
#   use Phoenix.Channel
#   def join("room:" <> _id, _params, socket), do: {:ok, socket}
#   def handle_in("msg", %{"text" => text}, socket) do
#     broadcast!(socket, "msg", %{text: text})
#     {:noreply, socket}
#   end
# end
```

## Gotchas

- `receive` without `after` blocks the process indefinitely if no matching message arrives
- Messages accumulate in the mailbox; a process that never clears its mailbox will eventually run out of memory
- For high-throughput messaging between processes, consider `GenStage` or `Broadway` which provide back-pressure

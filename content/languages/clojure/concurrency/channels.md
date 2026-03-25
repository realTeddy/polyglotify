---
title: "Channels & Message Passing"
language: "clojure"
feature: "channels"
category: "concurrency"
applicable: true
---

`core.async` provides CSP-style channels. Channels decouple producers and consumers; `go` blocks use channels for async message passing without blocking OS threads.

## Example

```clojure
(require '[clojure.core.async :as async
           :refer [chan go >! <! >!! <!! close! alts! timeout]])

;; Unbuffered channel (rendezvous)
(let [c (chan)]
  (go (>! c "hello"))
  (println (<!! c)))   ; "hello"

;; Buffered channel
(def ch (chan 10))

;; Producer
(go
  (doseq [i (range 5)]
    (>! ch i))
  (close! ch))

;; Consumer
(go-loop []
  (when-let [v (<! ch)]
    (println "Got:" v)
    (recur)))

;; alts!: select from multiple channels (like Go's select)
(let [c1 (chan) c2 (chan)]
  (go (async/<! (timeout 50))  (>! c1 "from c1"))
  (go (async/<! (timeout 100)) (>! c2 "from c2"))
  (let [[val ch] (alts!! [c1 c2 (timeout 200)])]
    (println "Received:" val)))   ; "from c1"

;; Pipeline with transducers
(let [in  (chan 10)
      out (chan 10 (comp (filter odd?) (map #(* % 10))))]
  (async/pipe in out)
  (doseq [x (range 10)] (>!! in x))
  (close! in)
  (loop []
    (when-let [v (<!! out)]
      (print v " ")
      (recur))))
; 10 30 50 70 90

;; pub/sub
(let [p (async/pub ch :type)]
  (async/sub p :event (chan 5))
  ;; subscribers receive only messages matching their topic
  )
```

## Gotchas

- Channels return `nil` when closed; `when-let [v (<! ch)]` naturally terminates a consumer loop on close
- `alts!` returns `[value channel]`; use destructuring to determine which channel delivered the value
- Transducers on channels apply transformations lazily and efficiently without creating intermediate collections

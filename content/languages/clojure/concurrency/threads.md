---
title: "Threads"
language: "clojure"
feature: "threads"
category: "concurrency"
applicable: true
---

Clojure runs on the JVM and uses Java threads. `future` runs a computation in a thread pool and returns a reference; `@` (deref) blocks until the result is ready. Mutable shared state uses Clojure's reference types: `atom`, `ref` (STM), and `agent`.

## Example

```clojure
;; future: run in a thread pool
(def f (future
         (Thread/sleep 100)
         (+ 1 2 3)))

;; Deref blocks until done
(println @f)   ; 6

;; future-call with timeout
(deref f 1000 :timeout)   ; returns :timeout if not done within 1s

;; Atom: compare-and-swap for independent state
(def counter (atom 0))

(dotimes [_ 100]
  (future (swap! counter inc)))

(Thread/sleep 200)
(println @counter)   ; 100

;; ref + dosync: coordinated STM transactions
(def balance-a (ref 100))
(def balance-b (ref 50))

(defn transfer! [from to amount]
  (dosync
    (alter from - amount)
    (alter to   + amount)))

(transfer! balance-a balance-b 30)
(println @balance-a @balance-b)   ; 70 80

;; agent: asynchronous state, actions serialised
(def log-agent (agent []))

(send log-agent conj "Event 1")
(send log-agent conj "Event 2")

(await log-agent)
(println @log-agent)   ; ["Event 1" "Event 2"]

;; Raw Java thread
(.start (Thread. (fn [] (println "raw thread"))))
```

## Gotchas

- `future` exceptions are swallowed until you `deref`; always deref futures and handle exceptions
- `swap!` on an atom may retry if another thread writes concurrently; the function must be pure (no side effects)
- STM `dosync` retries the transaction on conflict; avoid side effects inside `dosync` — they run multiple times

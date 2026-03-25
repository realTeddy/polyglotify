---
title: "Common Patterns"
language: "clojure"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Clojure idioms emphasise immutability, data transformation via sequences and transducers, REPL-driven development, and treating functions and data as equal citizens. Key patterns include threading macros, `reduce`, transducers, and namespace-qualified keywords.

## Example

```clojure
;; 1. Threading macros for readable pipelines
(-> {:name " Alice " :age 30}
    (update :name clojure.string/trim)
    (update :age inc)
    (assoc :active true))
; {:name "Alice", :age 31, :active true}

(->> (range 1 11)
     (filter odd?)
     (map #(* % %))
     (reduce +))
; 165 (1+9+25+49+81)

;; 2. Transducers: reusable, composable transformation pipelines
(def xf (comp (filter odd?) (map #(* % %))))

(transduce xf + (range 10))        ; same result, no intermediate seqs
(into [] xf (range 10))            ; [1 9 25 49 81]

;; 3. Namespace-qualified keywords (prevent collisions)
{:app/name "MyApp" :app/version "1.0"}
(s/def ::user/name string?)        ; clojure.spec with ns-qualified spec

;; 4. reduce as the universal list builder
(defn group-by-first-char [words]
  (reduce (fn [acc w]
            (update acc (first w) (fnil conj []) w))
          {}
          words))

(group-by-first-char ["apple" "ant" "banana" "avocado"])
; {\a ["apple" "ant" "avocado"], \b ["banana"]}

;; 5. Memoize for caching pure functions
(def memoized-fib
  (memoize (fn fib [n]
             (if (< n 2) n (+ (fib (dec n)) (fib (- n 2)))))))

;; 6. Data-driven dispatch (table instead of if/case)
(def handlers
  {:create  create-handler
   :update  update-handler
   :delete  delete-handler})

(defn dispatch [event]
  (if-let [handler (handlers (:type event))]
    (handler event)
    (throw (ex-info "Unknown event" {:event event}))))
```

## Gotchas

- `->` threads as the **second** argument (not first) when using Java interop: `(.method obj arg)` works but `(-> obj .method arg)` may not
- Transducers are stateful internally; don't share a transducer instance across threads
- `memoize` caches forever; avoid it for functions with unbounded inputs in long-running applications

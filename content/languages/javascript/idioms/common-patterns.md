---
title: "Common Patterns"
language: "javascript"
feature: "common-patterns"
category: "idioms"
applicable: true
---

JavaScript has a set of well-established idioms that appear throughout modern codebases: optional chaining for safe property access, nullish coalescing for defaults, object and array destructuring for clean unpacking, the module pattern for encapsulation, and functional array methods for data transformation pipelines.

## Example

```javascript
// 1. Safe property access + default (optional chaining + nullish coalescing)
const city = user?.address?.city ?? "Unknown";

// 2. Destructuring with defaults and renaming
const { name: userName = "Guest", role = "viewer" } = currentUser ?? {};

// 3. Immutable array/object updates (spread)
const updated = { ...user, age: user.age + 1 };
const appended = [...items, newItem];
const removed  = items.filter((item) => item.id !== targetId);

// 4. Functional pipeline for data transformation
const result = rawData
  .filter(({ active }) => active)
  .map(({ id, name }) => ({ id, displayName: name.toUpperCase() }))
  .sort((a, b) => a.displayName.localeCompare(b.displayName));

// 5. Guard clauses (early return) instead of deep nesting
function process(input) {
  if (!input) return null;
  if (!input.isValid) throw new Error("Invalid input");
  return transform(input);
}

// 6. Object as a lookup table instead of long switch/if chains
const STATUS_LABELS = {
  pending:  "Pending Review",
  approved: "Approved",
  rejected: "Rejected",
};
const label = STATUS_LABELS[status] ?? "Unknown";

// 7. Async initialization with top-level await (ES modules)
const config = await fetch("/config.json").then((r) => r.json());
```

## Gotchas

- Overusing optional chaining (`?.`) can silently swallow errors; only use it for values that are genuinely optional
- Spread creates shallow copies — nested objects are still shared by reference
- Long functional chains can hurt performance on large datasets; a single `for` loop with multiple operations is often faster
- Object lookup tables are a great pattern, but accessing an undefined key returns `undefined`, not a thrown error; always include a default

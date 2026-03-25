---
title: "Style Conventions"
language: "typescript"
feature: "style-conventions"
category: "idioms"
applicable: true
---

The TypeScript community largely follows the Google TypeScript Style Guide and the official Microsoft coding guidelines. ESLint with `typescript-eslint` is the standard linter; Prettier handles formatting. Key conventions: `camelCase` for variables and functions, `PascalCase` for types/classes/interfaces, `SCREAMING_SNAKE_CASE` for module-level constants, and `I`-prefix for interfaces is discouraged in modern TypeScript.

## Example

```typescript
// Naming conventions
const maxRetryCount = 3;                       // camelCase variable
const API_BASE_URL = "https://api.example.com"; // SCREAMING_SNAKE_CASE constant

interface UserProfile {                         // PascalCase, no "I" prefix
  readonly id: number;
  displayName: string;
  email: string;
}

type UserId = number;                           // PascalCase type alias

class UserService {                             // PascalCase class
  constructor(private readonly baseUrl: string) {}

  async getUser(id: UserId): Promise<UserProfile> {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    return response.json() as Promise<UserProfile>;
  }
}

// Prefer explicit return types on public APIs
function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

// Prefer const over let, never var
const items = ["a", "b", "c"];

// Prefer for...of over indexed loops
for (const item of items) {
  console.log(item);
}
```

## Gotchas

- The `I` prefix convention for interfaces (e.g., `IUserService`) is a legacy pattern from early TypeScript; the current community standard omits it — interfaces and classes share the same PascalCase namespace.
- Enable `"strict": true`, `"noImplicitAny": true`, and `"strictNullChecks": true` from day one; retrofitting strict mode to a large codebase is painful.

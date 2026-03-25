---
title: "Style Conventions"
language: "odin"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Odin's official style guide uses `snake_case` for variables and procedures, `Pascal_Case` for types (structs, enums, unions), `SCREAMING_SNAKE_CASE` for constants, and `Ada_Case` (capitalized words with underscores) for some type names. The `odin fmt` tool formats code automatically.

## Example

```odin
package player

import "core:fmt"

// Types: Pascal_Case
Player_State :: enum {
    Idle,
    Running,
    Jumping,
    Dead,
}

Player :: struct {
    name:        string,
    health:      int,
    max_health:  int,
    state:       Player_State,
    position_x:  f32,
    position_y:  f32,
}

// Constants: ALL_CAPS
MAX_HEALTH    :: 100
SPAWN_X       :: 0.0
SPAWN_Y       :: 0.0

// Procedures: snake_case
player_new :: proc(name: string) -> Player {
    return Player{
        name       = name,
        health     = MAX_HEALTH,
        max_health = MAX_HEALTH,
        state      = .Idle,
    }
}

player_take_damage :: proc(p: ^Player, damage: int) {
    p.health -= damage
    if p.health <= 0 {
        p.health = 0
        p.state  = .Dead
    }
}

player_is_alive :: proc(p: Player) -> bool {
    return p.health > 0
}
```

## Gotchas

- Use `odin fmt` to auto-format code — it enforces tabs for indentation (not spaces).
- Group related procedures under a common prefix matching the type name (`player_*` for `Player`).
- Prefer named fields in struct literals (`Player{name = "x", health = 100}`) over positional for readability.
- Procedure names in the same package as the type don't need prefix; external callers use the package name as namespace (`player.new`, `player.take_damage`).

---
title: "Project Structure"
language: "assembly"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Assembly projects have no mandated structure. Conventionally, source files use `.asm` (NASM) or `.s` / `.S` (GAS) extensions. A small project might be a single `.asm` file; a larger one splits routines across multiple files linked together. Build automation is typically done with `make`. The `.S` extension (capital S) is a GAS convention for assembly files that are pre-processed by the C preprocessor before assembling.

## Example

```
my_project/
├── Makefile
├── src/
│   ├── main.asm        ; entry point
│   ├── string.asm      ; string utilities
│   └── math.asm        ; arithmetic routines
├── include/
│   └── macros.inc      ; shared macro definitions
└── build/
    ├── main.o
    ├── string.o
    └── math.o
```

```makefile
# Makefile
ASM    = nasm
ASMFLAGS = -f elf64
LD     = ld
LDFLAGS  =

SRCS   = src/main.asm src/string.asm src/math.asm
OBJS   = $(SRCS:src/%.asm=build/%.o)
TARGET = build/program

all: $(TARGET)

$(TARGET): $(OBJS)
	$(LD) $(LDFLAGS) -o $@ $^

build/%.o: src/%.asm
	$(ASM) $(ASMFLAGS) -o $@ $<

clean:
	rm -f build/*.o $(TARGET)
```

## Gotchas

- Each `.asm` file is assembled independently — symbols shared between files must be declared `global` in the defining file and `extern` in the using file.
- NASM and GAS use incompatible syntax; mixing them in one project requires separate assemble steps.
- Large assembly projects are rare; most real-world uses are isolated hot-path files linked into a C/C++ project.

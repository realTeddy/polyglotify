---
title: "Build Tools"
language: "assembly"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Assembly build tools are the assembler and linker. The primary assemblers for x86/x86-64 are NASM (Netwide Assembler), GAS (GNU Assembler, part of binutils), MASM (Microsoft Macro Assembler), and YASM. The linker is usually GNU `ld` on Linux or `link.exe` on Windows. Build automation uses `make` or integrates into a C/C++ build system (CMake, Meson). LLVM's `llvm-mc` can also assemble AT&T/Intel syntax.

## Example

```bash
# NASM — assemble to ELF64 object, link with ld
nasm -f elf64 -g -F dwarf src/main.asm -o build/main.o
ld -o build/program build/main.o

# Link with libc (for printf etc.)
nasm -f elf64 src/main.asm -o build/main.o
gcc build/main.o -o build/program -no-pie

# GAS (AT&T syntax, .s files)
as --64 src/main.s -o build/main.o
ld -o build/program build/main.o

# Windows: MASM with LINK
ml64 /c /Fo build\main.obj src\main.asm
link /subsystem:console /entry:main build\main.obj kernel32.lib /out:build\program.exe

# NASM flags reference:
# -f elf64      output format (elf64, win64, macho64)
# -g            generate debug info
# -F dwarf      debug format (dwarf, stabs)
# -l main.lst   generate listing file
# -E            preprocess only (with %if/%define support)
```

## Gotchas

- The output format (`-f elf64`, `-f win64`, `-f macho64`) must match the OS and linker; an ELF object cannot be linked by `link.exe`.
- NASM and GAS use entirely different syntax; a `.asm` NASM file cannot be assembled by `as` without translation.
- Debug info generation (`-g -F dwarf`) is essential for using GDB/LLDB with assembly code; without it, you can only debug at the raw address level.

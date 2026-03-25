---
title: "Inheritance"
language: "cobol"
feature: "inheritance"
category: "oop"
applicable: true
---

COBOL 2002 OO supports single inheritance via `INHERITS`. A subclass inherits all methods of its superclass and can override them. The syntax is verbose and compiler support is uneven. In practice, COBOL programmers achieve code reuse through `COPY` copybooks (textual inclusion of shared record layouts) and `CALL` to shared subprograms rather than class inheritance.

## Example

```cobol
       *> Base class
       CLASS-ID. Animal.
       OBJECT.
       PROCEDURE DIVISION.

       METHOD-ID. Speak.
       PROCEDURE DIVISION.
           DISPLAY "..."
           STOP METHOD.
       END METHOD Speak.

       METHOD-ID. Describe.
       PROCEDURE DIVISION.
           DISPLAY "I am an animal"
           STOP METHOD.
       END METHOD Describe.

       END OBJECT.
       END CLASS Animal.

       *> Derived class
       CLASS-ID. Dog INHERITS Animal.
       OBJECT.
       PROCEDURE DIVISION.

       *> Override Speak
       METHOD-ID. Speak.
       PROCEDURE DIVISION.
           DISPLAY "Woof!"
           STOP METHOD.
       END METHOD Speak.

       *> Describe is inherited from Animal

       END OBJECT.
       END CLASS Dog.

       *> Usage
       IDENTIFICATION DIVISION.
       PROGRAM-ID. Main.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-DOG    USAGE OBJECT REFERENCE Dog.
       PROCEDURE DIVISION.
           INVOKE Dog 'NEW' RETURNING WS-DOG
           INVOKE WS-DOG 'Speak'      *> prints "Woof!"
           INVOKE WS-DOG 'Describe'   *> prints "I am an animal"
           STOP RUN.
```

## Gotchas

- COBOL supports only single inheritance — no mixin or multiple inheritance.
- `INVOKE` is the keyword for calling a method on an object; it is quite different from the more concise dot-notation of other OO languages.
- Most production COBOL code avoids OO entirely; `COPY` books and modular paragraphs are the traditional, widely-supported reuse mechanisms.

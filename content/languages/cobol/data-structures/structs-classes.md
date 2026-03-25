---
title: "Structs & Classes"
language: "cobol"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

COBOL's equivalent of a struct is a **group item**: a level-01 data item that contains subordinate elementary items at higher level numbers (02–49). Group items define the memory layout exactly — each sub-item is laid out sequentially with no automatic padding unless you add filler items. They are the fundamental record type for file I/O and inter-program communication in COBOL.

## Example

```cobol
       DATA DIVISION.
       WORKING-STORAGE SECTION.

       *> Simple group item (struct equivalent)
       01 WS-CUSTOMER.
           05 WS-CUST-ID       PIC 9(8).
           05 WS-CUST-NAME     PIC X(40).
           05 WS-CUST-BALANCE  PIC S9(11)V99   USAGE PACKED-DECIMAL.
           05 WS-CUST-ACTIVE   PIC X(1).
               88 CUST-ACTIVE      VALUE 'Y'.
               88 CUST-INACTIVE    VALUE 'N'.

       *> Nested group items
       01 WS-ORDER.
           05 WS-ORDER-ID      PIC 9(10).
           05 WS-ORDER-DATE.
               10 WS-ORD-YEAR  PIC 9(4).
               10 WS-ORD-MON   PIC 9(2).
               10 WS-ORD-DAY   PIC 9(2).
           05 WS-ORDER-ITEMS   OCCURS 20 TIMES.
               10 WS-ITEM-CODE PIC X(10).
               10 WS-ITEM-QTY  PIC 9(4).
               10 WS-ITEM-PRICE PIC 9(7)V99.

       PROCEDURE DIVISION.
           MOVE 12345678     TO WS-CUST-ID
           MOVE 'Acme Corp'  TO WS-CUST-NAME
           MOVE 9999.99      TO WS-CUST-BALANCE
           SET CUST-ACTIVE   TO TRUE

           DISPLAY WS-CUST-ID " " WS-CUST-NAME
           STOP RUN.
```

## Gotchas

- The group item name refers to the raw concatenated bytes of all sub-items — `DISPLAY WS-CUSTOMER` prints the entire record as a string.
- COBOL has no concept of methods on a group item — behavior and data are always separate.
- `REDEFINES` allows a second data item to share the same memory as a group item, enabling union-like type punning.

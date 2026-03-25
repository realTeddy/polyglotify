---
title: "Channels & Message Passing"
language: "cobol"
feature: "channels"
category: "concurrency"
applicable: false
---

COBOL has no channels. Message passing between COBOL programs in a mainframe environment uses IBM MQ (formerly MQSeries) via `EXEC MQSI` commands, or CICS inter-transaction communication with `EXEC CICS PUT/GET CONTAINER`. These are middleware APIs, not language features. In batch processing, programs communicate through sequential files — one program writes a file, the next job step reads it.

## Example

```cobol
       *> IBM MQ message passing (mainframe CICS context)
       *> This is middleware API usage, not a language feature

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-MQ-MESSAGE     PIC X(1024) VALUE SPACES.
       01 WS-QUEUE-NAME     PIC X(48)   VALUE 'MY.INPUT.QUEUE'.
       01 WS-REASON-CODE    PIC 9(9)    COMP VALUE 0.
       01 WS-COMP-CODE      PIC 9(9)    COMP VALUE 0.

       PROCEDURE DIVISION.
           *> Put a message on a queue (send to channel)
           EXEC CICS PUT CONTAINER('MY-MSG')
               FROM(WS-MQ-MESSAGE)
               FLENGTH(LENGTH OF WS-MQ-MESSAGE)
               CHANNEL('MY-CHANNEL')
           END-EXEC

           *> Get a message from a queue (receive from channel)
           EXEC CICS GET CONTAINER('MY-MSG')
               INTO(WS-MQ-MESSAGE)
               FLENGTH(LENGTH OF WS-MQ-MESSAGE)
               CHANNEL('MY-CHANNEL')
           END-EXEC

           DISPLAY "Message: " WS-MQ-MESSAGE
           STOP RUN.
```

## Gotchas

- CICS channels/containers are transactional — if the transaction rolls back, the message is not consumed.
- File-based "channels" (writing a sequential file for the next batch step) are the most common inter-program communication in traditional COBOL batch.
- IBM MQ requires a separately licensed and configured message broker; it is infrastructure, not part of the COBOL language itself.

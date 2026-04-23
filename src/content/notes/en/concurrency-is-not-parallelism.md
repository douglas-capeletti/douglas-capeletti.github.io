---
title: "Concurrency is not parallelism"
pubDate: "2024-10-14"
tags: ["concurrency", "parallelism", "golang"]
video: oV9rvDllKEg
---

### Notes on the Video

- "The world is not object-oriented, it is parallel."

- Concurrency is about dealing with a lot of things at once.
- Parallelism is about doing a lot of things at once.
- One is about structure, the other is about execution.

- Concurrency provides a way to structure a solution to a problem that may (but not necessarily) be parallelizable.
  - e.g., An operating system manages to keep a mouse, a keyboard, a display, and a speaker functioning. Even if the system has one or multiple processing cores, the programming model is concurrent, whether it executes in parallel or not.
- Concurrency is a way to structure a program by breaking it into pieces that can be executed independently.

- Access the [slides](https://go.dev/talks/2012/waza.slide#6)

- Reading tip: [Communicating Sequential Processes, Hoare - 1978](https://www.cs.cmu.edu/~crary/819-f09/Hoare78.pdf)
- Commentary on the reading: [Hoare on communicating sequential processes](https://www.youtube.com/watch?v=QUOlyIHmBrM&ab_channel=TuringAwardeeClips)
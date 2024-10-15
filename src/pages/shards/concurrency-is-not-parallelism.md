---
title: "Concorrência não é paralelismo"
pubDate: "2024-10-14:00:00"
slug: "concurrency-is-not-parallelism"
tags: ["concurrency", "parallelism", "golang"]
layout: "../../layouts/PostLayout.astro"
video: oV9rvDllKEg
---

### Notas sobre o Vídeo

- "O mundo não é orientado a objetos e sim paralelo" 
<br>

- Concorrencia é sobre lidar com várias coisas ao mesmo tempo.
- Paralelismo é sobre fazer várias coisas ao mesmo tempo.
- Um é sobre estrutura, o outro sobre execução
<br>

- Concorrência provém uma forma de estruturar a solução para um problema, que pode ou não ser paralelo
  - e.g. Um sistema operacional gerencia para que um mouse um teclado, um monitor, um auto-falante funcione, mesmo que o sistema tenha um ou mais núcleos de processamento, o modelo de programação é concorrênte, podendo ou não ser paralelo
- Concorrência é a forma de estruturar o um programa, quebrando ele em partes que podem ser executadas independentemente
<br>

- Acesse os [slides](https://go.dev/talks/2012/waza.slide#6)

- Dica de leitura: [Communicating Sequencial Processes, Hoare - 1978](https://www.cs.cmu.edu/~crary/819-f09/Hoare78.pdf)
- Comentários sobre a leitura: [Hoare on communicating sequential processes](https://www.youtube.com/watch?v=QUOlyIHmBrM&ab_channel=TuringAwardeeClips)
<br>

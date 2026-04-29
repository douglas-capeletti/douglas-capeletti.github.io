---
title: "Java Threads"
pubDate: "2026-04-24T00:00:00Z"
hero: "/images/wip.webp"
tags: ["draft", "java", "threads", "concurrency"]
---


## Threads ou Virtual Threads?

Qual a diferença entre uma Thread (Platform Thread) e uma Virtual Thread?
Virtual Threads foram criadas no java 21, mas qual a vantagem nisso?


##### O Modelo Tradicional (Platform Threads)
- Mapeamento 1:1: Historicamente, cada Thread do Java corresponde a uma thread do Sistema Operacional (OS).
- Custo Elevado: Threads do OS consomem cerca de 1MB de memória cada (Stack) e exigem muito processamento para o Context Switch.
- Limitação de Escala: Devido ao consumo de memória, você não consegue criar milhões de threads neste modelo. 
	- Se seu servidor recebe 5.000 requisições simultâneas e cada uma trava uma thread **esperando** o banco de dados (I/O), seu sistema para.
- O Problema do I/O Bloqueante. No Java clássico, quando uma thread faz uma chamada de rede ou banco de dados, ela fica parada (idle) esperando a resposta.

##### Virtual Threads (Java 21+)
- Mapeamento M:N: Milhares de Virtual Threads são executadas em poucas threads reais do sistema operacional (Carrier Threads).
- Leveza Extrema: Uma Virtual Thread não reserva 1MB de memória logo de cara; ela é apenas um objeto na memória Heap. Você pode criar 1 milhão delas sem derrubar a JVM.
- Desbloqueio Inteligente: Quando uma Virtual Thread faz uma operação de I/O, o Java a "tira de cena" e coloca outra tarefa na Thread do sistema. Quando o dado chega, ela volta a ser executada.

##### O que mudou na prática?
Simplicidade: Você volta a escrever código síncrono e fácil de ler, mas com performance de código assíncrono complexo.

Abandono do Pool: Antes, limitávamos o número de threads (Thread Pools) para não travar o servidor. Com Virtual Threads, a recomendação é criar uma thread por tarefa e descartá-la depois.


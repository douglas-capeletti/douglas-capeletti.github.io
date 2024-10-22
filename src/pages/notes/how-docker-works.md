---
title: "Como Docker funciona"
pubDate: "2023-09-13:00:00"
slug: "how-docker-works"
hero: "/images/docker-inside.png"
tags: ["draft", "docker", "container"]
layout: "../../layouts/PostLayout.astro"
---

## O que são Containers?

Containers são uma forma de virtualização de sistemas operacionais.
Cada container é um processo isolado do sistema operacional.
Containers são isolados uns dos outros, mas compartilham o mesmo kernel.
Containers são mais leves que máquinas virtuais por virtualizar somente parte do sistema operacional ao invés de um SO inteiro
Containers são portáteis.
Containers são escaláveis.
Containers são descartáveis.

### Namespaces

Usado para isolamento de processos, usuários, rede, file system, etc.
cada container tem seu próprio namespace.

### Cgroups

Usado para limitar e isolar recursos, exemplo: Esse processo/namespace vai utilizar só:

* memory=500mb
* cpu_shares=512

### Overlay File Systems (OFS)

Usado para criar e modificar imagens, através deste mecanismo que o docker reutiliza camadas/partes (*layers*) de um uma imagem ou dependências em todos os containers que precisarem, sem a necessidade de duplicar a informação

o container contem uma parte com comada(s) de estado imutável, e uma de leitura e escrita

### Dockerfile

descrição de quais os comandos serão executados ao criar o container para que ele funcione da forma esperada

``` yaml
FROM: ubuntu:latest
RUN: ./build-script
EXPOSE: 8080
```

a cada nova execucao o Dockerfile é gerada uma nova imagem

todas as imagens ficam armazenadas no registry para poderem ser reutilizadas no futuro.

ao executar o Dockerfile, é feito um pull desta imagem

ao efetuar um commit dentro de uma imagem docker, é possivel gerar uma imagem nova a partir de uma já existe em execução, tirando proveito dos dados presentes na camada de leitura e escrita, assim feito um push desta imagem (tipo Git, um grande repo de imagens).

### Client - Host

* Host
  * Daemon - API
  * Network (entre containers)
  * Volumes (fora do container, dado persistente)
  * Cache (registry)

* Client
  * Containers
  * Volumes
  * Network

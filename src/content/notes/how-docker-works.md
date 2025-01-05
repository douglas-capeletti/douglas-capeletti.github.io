---
title: "Como Docker funciona"
pubDate: "2025-01-05"
hero: "/images/docker-inside.webp"
tags: ["draft", "docker", "containers"]
---

## O que precisamos entender

- [O que precisamos entender](#o-que-precisamos-entender)
- [O que são Containers?](#o-que-são-containers)
- [Container Runtimes](#container-runtimes)
  - [Outras ferramentas da Docker Inc](#outras-ferramentas-da-docker-inc)
- [Namespaces](#namespaces)
- [Cgroups](#cgroups)
- [Overlay File Systems (OFS)](#overlay-file-systems-ofs)
- [Dockerfile](#dockerfile)
- [Client - Host](#client---host)

## O que são Containers?

Containers são unidades padronizadas de software que empacotam código e todas suas dependências, garantindo uma execução consistente ao escalar containers idênticos e imutáveis. Containers proporcionam uma forma de virtualização leve e rápida ao isolar processos e recursos enquanto compartilham o mesmo kernel do sistema operacional sem a necessidade de um Hypervisor ou múltiplas instâncias do sistema operacional, ao contrário do que é feito ao utilizar máquinas virtuais. Outra característica interessante, é o isolamento entre os containers, cada container, a não ser que seja explicitamente configurado para isto, só tem acesso aos seus próprios recursos, tornando tudo mais seguro.

Containers são:

- Leves
- Portáteis
- Escaláveis
- Imutáveis
- Descartáveis

![Docker VS VMs](/images/docker-vs-vm.webp)

## Container Runtimes

Docker foi uma ferramenta criada pela dotCloud em 2013 para solucionar um problema interno, utilizando parte da estrutura de containers do Linux e outros componentes, posteriormente se tornando Open Source através da [Open Containers Initiative (OCI)](https://opencontainers.org/). Com a popularização a dotCloud foi renomeada para Docker Inc.

Docker é uma ferramenta completa de gerenciamento de rede, disco e imagens com uma arquitetura cliente servidor. Docker também contém um *Daemon*, uma ferramenta centralizadora que faz a gestão dos containers e imagens, este *Daemon* se torna então um ponto único de falha (SPof), pois caso ele pare de executar, todos os containers param junto, algo que já não acontece em outras runtimes como o [Podman](https://podman.io/), outro ponto conturbado sobre o daemon Docker, é o fato de ele por padrão ter acesso de root na máquina host, o que em casos de invasão em algum dos containers, pode dar acesso a partes importantes do sistema operacional host, porém já é possível configurar o Docker como *Rootless* para evitar este tipo de vulnerabilidade, mas tenha em mente que esta não é a configuração padrão.

![Docker Architecture](/images/docker-architecture.webp)

### Outras ferramentas da Docker Inc

Além do Docker em si, a Docker Inc. contém alguma outras ferramentas que podem ser úteis para o desenvolvimento utilizando containers.

- Docker Desktop
- Docker Hub
- Docker Build Cloud
- Docker Scout
- Docker AI
- TestContainers
- [Tilt](https://tilt.dev/)

## Namespaces

Usado para isolamento de processos, usuários, rede, file system, etc.
cada container tem seu próprio namespace.

## Cgroups

Usado para limitar e isolar recursos, exemplo: Esse processo/namespace vai utilizar só:

- memory=500mb
- cpu_shares=512

## Overlay File Systems (OFS)

Usado para criar e modificar imagens, através deste mecanismo que o docker reutiliza camadas/partes (*layers*) de um uma imagem ou dependências em todos os containers que precisarem, sem a necessidade de duplicar a informação

o container contem uma parte com comada(s) de estado imutável, e uma de leitura e escrita

## Dockerfile

descrição de quais os comandos serão executados ao criar o container para que ele funcione da forma esperada

``` yaml
FROM: ubuntu:latest
RUN: ./build-script
EXPOSE: 8080
```

a cada nova execução o Dockerfile é gerada uma nova imagem

todas as imagens ficam armazenadas no registry para poderem ser reutilizadas no futuro.

ao executar o Dockerfile, é feito um pull desta imagem

ao efetuar um commit dentro de uma imagem docker, é possível gerar uma imagem nova a partir de uma já existe em execução, tirando proveito dos dados presentes na camada de leitura e escrita, assim feito um push desta imagem (tipo Git, um grande repo de imagens).

## Client - Host

- Host
  - Daemon - API
  - Network (entre containers)
  - Volumes (fora do container, dado persistente)
  - Cache (registry)

- Client
  - Containers
  - Volumes
  - Network

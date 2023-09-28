---
title: "[WIP] Como funciona o Docker?"
pubDate: "2023-09-13:00:00"
slug: "everything-about-docker"
hero: "/images/docker.jpg"
tags: ["docker", "containers"]
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

Usado para criar e modificar imagens, através deste mecanismo que o docker reutiliza camadas/partes (_layers_) de um uma imagem ou dependências em todos os containers que precisarem, sem a necessidade de duplicar a informação

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

## Comandos Docker

Estado do processo docker (process status - ps)
lista de todos os containers rodando no docker

``` sh
  docker ps
```

### Parametros úteis

| Parametro | Função                                                                       |
| --------- | ---------------------------------------------------------------------------- |
| -a        | incluir containers que não estao mais rodando                                |
| -q        | só o id do container, útil para usar de dado de entrada para outros comandos |

### Rodando coisas no Docker

Começando do básico

``` sh
  docker run hello-world
```

### parâmetros úteis

| Parametro | Função                                               |
| --------- | ---------------------------------------------------- |
| -d        | destravar o terminal e roda o container em backgroud |
| -e        | passar variáveis de ambiente                         |
| -i        | modo interativo, mantém o stdin                      |
| -p        | mapeamento de portas docker -> máquina local         |
| -t        | alocar um tty para acessar o container               |
| -v        | vincular volumes ao container                        |
| -rm       | remove o container assim que ele cair                |
| --name    | define um nome para o container                      |


Entrando em um container
obs.:  "-it"  ==  "-i -t" 

``` sh
  docker run -it ubuntu bash
```

Acessando localmente algo que está no docker
pelo parâmetro -p mapeamos a porta 80 de dentro do docker para a porta 8080 da maquina local

``` sh
  docker run -p 8080:80 nginx
```

assim podemos acessar o nginx [localmente através da porta 8080](http://localhost:8080)


os containers tambem podem ser nomeados para serem removidos pelo nome dado a eles e nao pelo nome gerado

``` sh
  docker run -d -p 8080:80 --name server nginx
```

agora o nginx esta rodando e o container se chama _server_ e pode ser referenciado desta forma.
para acessar um container já em execução, utilizamos o exec

``` sh
  docker exec -it server bash
```

### Bind mounts 
mapeamento de pastas para dentro de um container atraves de _volumes_
Primeiro criando um arquivo na máquina local

```` html
  # ~/Projects/files/index.html
  <html>
  <h1>Custom Server Title</h1>
  <br>
  <h2>Welcome to the server!!<h2>
  </html>
````

depois mapeando este volume arquivo para um diretorio dentro do container
Obs.: a estrutura do container muda de acordo com a imagem usada, caso nao saiba a estrutura do container em utilizacao, pesquise ou entre nele via bash para ver

``` sh
  docker run -d -p 8080:80 -v ~/Projects/files/:/usr/share/nginx/html --name server nginx
```

tip: usar guia anonima para nao ter problemas com cache
tip(2): da pra usar "$(pwd)" no path do comando para referenciar o diretorio atual


A forma mais elegante e atual de executar essa mesma ação

``` sh
  docker run -d -p 8080:80 --mount type=bind,source=~/Projects/files/,target=/usr/share/nginx/html --name server nginx
```

diferenças: --mount é mais explicito o bind, se o source for incorreto, o -v cria o diretorio novo, o --mount da erro

...
#### #todo
* ver diferencas de docker [kill | stop | rm];

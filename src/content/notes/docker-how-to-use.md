---
title: "Docker - Como utilizar"
pubDate: "2023-09-28"
hero: "/images/docker.webp"
tags: ["draft", "docker", "containers"]
---

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

| Parametro | Função                                                |
| --------- | ----------------------------------------------------- |
| -d        | destravar o terminal e roda o container em background |
| -e        | passar variáveis de ambiente                          |
| -i        | modo interativo, mantém o stdin                       |
| -p        | mapeamento de portas docker -> máquina local          |
| -t        | alocar um tty para acessar o container                |
| -v        | vincular volumes ao container                         |
| -rm       | remove o container assim que ele cair                 |
| --name    | define um nome para o container                       |


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

agora o nginx esta rodando e o container se chama *server* e pode ser referenciado desta forma.
para acessar um container já em execução, utilizamos o exec

``` sh
docker exec -it server bash
```

### Bind mounts 
mapeamento de pastas para dentro de um container atraves de *volumes*
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

### Como criar volumes

``` sh
docker create volume meuVolume
```

agora para ver os detalhes do volume

``` sh
docker volume inspect meuVolume  
```

resultado:

``` json
[
  {
      "CreatedAt": "2023-09-28T16:40:47-03:00",
      "Driver": "local",
      "Labels": null,
      "Mountpoint": "/var/lib/docker/volumes/meuVolume/_data",
      "Name": "meuVolume",
      "Options": null,
      "Scope": "local"
  }
]
```
agora da pra usar o volume criado igual qualquer outro e estes arquivos vao ser compartilhados pelos containers que utilizarem estes volumes

``` sh
docker run -d -p 8080:80 --mount source=meuVolume,target=/app --name server nginx
```
ou
``` sh
docker run -d -p 8080:80 -v meuVolume:/app --name server nginx
```

porem criando varios volumes, ao longo do tempo vamos tomando muito espaco em disco, para limpar os volumes do docker, use:

``` sh
docker volume prune
```

## Dockerfile

podemos criar arquivos docker para criar uma imagem personalizada de acordo com a nossa necessidade

``` yaml
# imagem base usada para a criacao da nova imagem
FROM nginx:latest

# comandos a serem executados na criacao da imagem
RUN apt update
RUN apt install -y vim
```

para executarmos este docker file, abrimos o terminal na pasta onde o arquivo se encontra e executamos o comando:

``` sh
docker build -t nginx-vim:latest .
```

o parametro '-t' define a tag da imagem, assim como usamos antes o nginx antes, agora temos uma versao do 'nginx' com o vim instalado chamada de 'nginx-vim'

já o '.' no final se refere a localizacao do arquivo Dockerfile, como estamos com o terminal aberto no mesmo diretorio do arquivo Dockerfile, usamos o ponto, caso nao seja o caso, devemos usar o caminho relativo do arquivo

...
#### #todo
* ver diferencas de docker [kill | stop | rm];

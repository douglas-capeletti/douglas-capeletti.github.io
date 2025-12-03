---
title: "Entendendo Docker & containers"
pubDate: "2025-12-03"
hero: "/images/docker.webp"
tags: ["docker", "containers"]
---

## o que veremos aqui

- [o que veremos aqui](#o-que-veremos-aqui)
  - [Entendendo Containers: Conceitos, Docker e Arquitetura](#entendendo-containers-conceitos-docker-e-arquitetura)
    - [O que são Containers?](#o-que-são-containers)
      - [Características principais:](#características-principais)
      - [A "Mágica" do Kernel: Como funciona o isolamento?](#a-mágica-do-kernel-como-funciona-o-isolamento)
      - [Namespaces](#namespaces)
      - [Cgroups (Control Groups)](#cgroups-control-groups)
      - [Overlay File Systems (OFS)](#overlay-file-systems-ofs)
    - [Docker e Runtimes](#docker-e-runtimes)
      - [Arquitetura Docker](#arquitetura-docker)
      - [Alternativas e Ferramentas](#alternativas-e-ferramentas)
    - [Primeiros Passos: Docker CLI](#primeiros-passos-docker-cli)
      - [Rodando um container simples para teste:](#rodando-um-container-simples-para-teste)
      - [Expondo Portas (Rede)](#expondo-portas-rede)
      - [Nomeando e Gerenciando](#nomeando-e-gerenciando)
    - [Persistência de Dados: Bind Mounts e Volumes](#persistência-de-dados-bind-mounts-e-volumes)
      - [Bind Mounts](#bind-mounts)
      - [Volumes (Gerenciados pelo Docker)](#volumes-gerenciados-pelo-docker)
    - [Imagens e Dockerfile](#imagens-e-dockerfile)
      - [Fluxo de Vida](#fluxo-de-vida)
    - [Networking (Comunicação entre Containers)](#networking-comunicação-entre-containers)
      - [Drivers de Rede Principais](#drivers-de-rede-principais)
    - [Docker Compose (Orquestração Local)](#docker-compose-orquestração-local)
    - [Variáveis de Ambiente (Configuração)](#variáveis-de-ambiente-configuração)
    - [Observabilidade e Logs](#observabilidade-e-logs)
    - [Otimização com .dockerignore](#otimização-com-dockerignore)
    - [Manutenção do Sistema (Prune)](#manutenção-do-sistema-prune)

### Entendendo Containers: Conceitos, Docker e Arquitetura

#### O que são Containers?
Containers são unidades padronizadas de software que empacotam o código e todas as suas dependências (binários, bibliotecas, arquivos de configuração), garantindo uma execução consistente em qualquer ambiente. Ao escalar, garantimos que containers idênticos e imutáveis se comportem da mesma forma, seja no notebook do desenvolvedor ou no servidor de produção.

Diferente das Máquinas Virtuais (VMs), containers proporcionam uma virtualização a nível de sistema operacional. Eles são leves e rápidos pois isolam processos e recursos, mas compartilham o mesmo Kernel do sistema operacional do host (hospedeiro), eliminando a necessidade de um Hypervisor pesado ou de carregar um sistema operacional convidado (Guest OS) completo para cada aplicação.

![Docker VS VMs](/images/docker-vs-vm.webp)

##### Características principais:

- Leves: Consomem menos recursos (RAM/CPU) que VMs.
- Portáteis: "Write once, run anywhere".
- Escaláveis: Podem ser iniciados e parados em segundos.
- Imutáveis: A imagem do container não muda; se precisar alterar, cria-se uma nova.
- Descartáveis: Containers são efêmeros; podem ser destruídos e recriados sem perda de dados importantes (se configurados corretamente com volumes).

##### A "Mágica" do Kernel: Como funciona o isolamento?
Para que os containers funcionem sem um Hypervisor, eles utilizam recursos nativos do Kernel do Linux. É aqui que a "mágica" acontece:

##### Namespaces
São responsáveis pelo isolamento. Cada container possui seu próprio conjunto de namespaces, o que faz com que o processo dentro do container "ache" que é o único rodando na máquina.

- PID: Isolamento de processos.
- NET: Isolamento de interfaces de rede.
- MNT: Isolamento do sistema de arquivos (mount points).
- USER: Isolamento de usuários (root no container pode não ser root no host).

##### Cgroups (Control Groups)
São responsáveis pelo gerenciamento e limitação de recursos. Garantem que um container não consuma toda a memória ou CPU da máquina, derrubando os vizinhos.

- Exemplo: Limitar o container app-web a memory=500mb e cpu_shares=512.

##### Overlay File Systems (OFS)
É o mecanismo de armazenamento em camadas (Union File System). O Docker utiliza isso para eficiência de disco.

Camadas Read-Only: A imagem base e suas dependências são somente leitura e compartilhadas entre todos os containers que usam aquela imagem.

Camada Read-Write: Quando um container inicia, uma fina camada de escrita é criada no topo. Qualquer modificação acontece ali (Copy-on-Write). Se você deleta o container, essa camada some, mantendo a imagem base intacta.

#### Docker e Runtimes
O Docker, lançado pela dotCloud em 2013 (posteriormente Docker Inc.), popularizou o uso de containers ao criar uma interface amigável para essas funcionalidades do Linux (Namespaces/Cgroups). O projeto seguiu padrões abertos, culminando na OCI (Open Containers Initiative).

##### Arquitetura Docker
  O Docker funciona numa arquitetura Cliente-Servidor:

- Client (CLI): Onde você digita docker run, docker build. Envia comandos para o Daemon.

- Daemon (dockerd): O processo centralizador que roda no Host. Ele escuta a API, gerencia as imagens, redes e constrói os containers.

- Atenção: O Daemon pode ser um Ponto Único de Falha (SPoF). Se ele cair, seus containers podem parar. Além disso, por padrão, ele roda como root, o que exige cuidado com segurança (embora o modo Rootless já exista para mitigar isso).

- Registry: O local onde as imagens são armazenadas (ex: Docker Hub, ECR).

![Docker Architecture](/images/docker-architecture.webp)

##### Alternativas e Ferramentas
Devido às questões do Daemon, surgiram outras runtimes como o Podman, que é daemonless e roda sem root por padrão. Porém, o ecossistema Docker continua vasto:

- Docker Desktop: GUI para gerenciamento fácil em Mac/Windows.
- Docker Hub: O maior repositório público de imagens.
- Docker Scout: Análise de vulnerabilidades em imagens (CVEs).
- TestContainers: Bibliotecas para subir containers descartáveis durante testes de integração (Java, Go, .NET, etc).
- Tilt: Ferramenta para desenvolvimento rápido em Kubernetes (adquirida pela Docker).

#### Primeiros Passos: Docker CLI

A interação principal acontece via linha de comando. Abaixo, os comandos essenciais para o ciclo de vida de um container.

##### Rodando um container simples para teste:

``` sh
docker run hello-world
```

Para entrar no terminal de um container, usamos as flags -i (interativo) e -t (tty/terminal):
``` sh
docker run -it ubuntu bash
```

##### Expondo Portas (Rede)

Para acessar um serviço (como um servidor web) rodando dentro do container, precisamos mapear a porta do container para a máquina local (Host).

- Sintaxe: -p [porta_host]:[porta_container]

``` sh
docker run -p 8080:80 nginx
```
Agora, o Nginx está acessível em http://localhost:8080.

##### Nomeando e Gerenciando

Para evitar nomes aleatórios (como suspicious_cori), nomeie seus containers para facilitar o gerenciamento:

``` sh
docker run -d -p 8080:80 --name server nginx
```
- -d: Detached mode (roda em segundo plano, liberando o terminal).
- --name: Define o nome "server".

Para executar um comando dentro de um container já em execução:
``` sh
docker exec -it server bash
```

#### Persistência de Dados: Bind Mounts e Volumes

Por padrão, dados criados dentro de um container somem quando ele é destruído. Para persistir dados, usamos duas abordagens principais.

##### Bind Mounts
Mapeia uma pasta/arquivo específico da sua máquina (host) para dentro do container. Ideal para desenvolvimento (alterar código local e ver reflexo no container).

Crie um arquivo index.html localmente:
``` html
<h1>Servidor Customizado</h1>
```

Monte o arquivo no Nginx:
``` sh 
docker run -d -p 8080:80 -v ~/Projects/files/:/usr/share/nginx/html --name server-custom nginx
```
Dica 1: Use $(pwd) para pegar o caminho atual automaticamente. Dica 2: Teste em aba anônima para evitar cache do navegador.

Sintaxe Moderna (--mount): A flag --mount é mais verbosa, mas recomendada pois é mais explícita e segura (dá erro se a pasta de origem não existir, enquanto o -v cria uma pasta vazia).

``` sh
docker run -d -p 8080:80 \
  --mount type=bind,source="$(pwd)"/files,target=/usr/share/nginx/html \
  --name server-mount nginx
```

##### Volumes (Gerenciados pelo Docker)
Áreas de armazenamento gerenciadas pelo próprio Docker, independentes da estrutura de pastas do host. Ideal para bancos de dados.

Criar e Inspecionar:

``` sh
docker volume create meuVolume
```
``` sh
docker volume inspect meuVolume
```
Resultado (resumido): O Mountpoint mostra onde os dados ficam fisicamente no Linux (/var/lib/docker/volumes/...).

Usando o Volume:

``` sh
# Via flag -v
docker run -d -p 8080:80 -v meuVolume:/app --name app1 nginx
```

``` sh
# Via flag --mount (Recomendado)
docker run -d -p 8080:80 --mount source=meuVolume,target=/app --name app2 nginx
```

Limpeza: Para remover volumes não utilizados e liberar espaço em disco:
``` sh
docker volume prune
```

#### Imagens e Dockerfile
O Dockerfile é a receita para criar suas próprias imagens.

Exemplo 1: Básico (Personalizando uma Imagem)
Criando uma imagem com Nginx e Vim instalados.

Arquivo Dockerfile:
``` sh
# Imagem base
FROM nginx:latest

# Instalação de dependências
RUN apt-get update && apt-get install -y vim
```

Build (Construção):
``` sh
docker build -t nginx-vim:latest .
```
- -t: Tag (nome da imagem).
- ".": Contexto (diretório atual onde está o Dockerfile).

Exemplo 2: Avançado (Aplicação Node.js com Multi-stage Build)
Este exemplo aplica melhores práticas para reduzir o tamanho da imagem e aumentar a segurança, separando o estágio de "construção" do estágio de "execução".

Arquivo Dockerfile:
``` sh
# --- Estágio 1: Builder (Instalação completa) ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# 'npm ci' é mais rápido e seguro para CI/CD
RUN npm ci

# --- Estágio 2: Runner (Apenas o necessário) ---
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Segurança: Usa usuário 'node' (não-root)
USER node

# Copia apenas as dependências baixadas no estágio anterior
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node . .

EXPOSE 3000
CMD ["node", "src/index.js"]
```

##### Fluxo de Vida
- Dockerfile: A receita.

- Build: O Docker lê a receita e cria uma Imagem (composta por camadas cacheadas).

- Push/Pull: A imagem vai para um Registry (como um repositório Git de binários).

- Run: A imagem vira um Container em execução (adiciona a camada de escrita).

- Stop: Envia um SIGTERM ao processo principal dando um tempo para salvar estados, fechar conexões de banco e encerrar graciosamente

- Kill: Envia SIGKILL mata o processo imediatamente no nível do Kernel. Não salva estado, pode corromper arquivos abertos

- Commit: É possível (embora não recomendado como prática padrão) gerar uma nova imagem a partir do estado atual de um container.

#### Networking (Comunicação entre Containers)
Por padrão, containers são isolados. Para que eles conversem entre si (ex: sua API Node.js acessar um banco PostgreSQL), precisamos utilizar redes.

##### Drivers de Rede Principais
- Bridge (Padrão): Cria uma rede privada interna no host. Containers na mesma rede bridge conseguem se comunicar usando o nome do container como hostname (DNS interno).

- Host: O container remove o isolamento de rede e usa diretamente o IP e as portas da máquina hospedeira. Alta performance, mas pode gerar conflito de portas.

- None: O container sobe sem interface de rede (isolamento total).

Criando uma rede personalizada (recomendado para conectar serviços):
``` sh
docker network create minha-rede
```

Rodando containers nessa rede:
``` sh
# Container do Banco de Dados
docker run -d --name db-postgres --network minha-rede postgres
```

``` sh 
# Container da Aplicação (agora consegue "pingar" o host 'db-postgres')
docker run -d --name app-node --network minha-rede minha-imagem-node
```

#### Docker Compose (Orquestração Local)
Rodar vários comandos docker run manualmente (com redes, volumes e portas) é inviável. O Docker Compose resolve isso permitindo definir toda a infraestrutura da aplicação em um único arquivo YAML.

Exemplo: Aplicação Node.js + Banco de Dados
Crie um arquivo `docker-compose.yml` na raiz do projeto:

``` yaml
version: '3.8'

services:
  # Serviço 1: Nossa API
  api:
    build: .                # Constrói a imagem usando o Dockerfile local
    ports:
      - "3000:3000"         # Mapeia portas
    environment:
      - DB_HOST=db          # Passa config via variável de ambiente
      - DB_PASS=secret
    depends_on:
      - db                  # Garante que o banco inicie antes (mas não espera ele estar "pronto")
    networks:
      - app-network

  # Serviço 2: Banco de Dados
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - pgdata:/var/lib/postgresql/data # Persistência de dados
    networks:
      - app-network

# Definição de Volumes
volumes:
  pgdata:

# Definição de Redes
networks:
  app-network:
  driver: bridge
```

Comandos do Compose

``` sh
docker compose up -d: Sobe todos os serviços em background.
```

``` sh
docker compose down: Para e remove containers e redes.
```

``` sh
docker compose logs -f: Acompanha os logs de todos os serviços juntos.
```

#### Variáveis de Ambiente (Configuração)
Nunca coloque senhas ou chaves de API direto no código ou no Dockerfile (Hardcoding). Use injeção de variáveis de ambiente.

Formas de Injetar

Via flag -e:
``` sh
docker run -e NODE_ENV=production -e DB_PASS=12345 minha-app
```

Via arquivo .env (Recomendado): Crie um arquivo .env com DB_PASS=12345 e use:
``` sh
docker run --env-file .env minha-app
```
No Docker Compose, ele lê o arquivo .env automaticamente se estiver na mesma pasta.

#### Observabilidade e Logs
Como debugar o que está acontecendo lá dentro?

Logs: O Docker captura tudo que a aplicação joga no stdout (console.log) ou stderr.

``` sh
docker logs -f meu-container
```
- A flag -f significa "follow", similar ao tail -f do Linux.

Stats: Monitoramento em tempo real de consumo de recursos (CPU, Memória, I/O).
``` sh
docker stats
```
É como se fosse o "Gerenciador de Tarefas" ou "htop" dos seus containers.

#### Otimização com .dockerignore
Assim como o .gitignore evita que arquivos inúteis vão para o Git, o .dockerignore evita que arquivos vão para dentro da imagem durante o comando COPY . ..

Isso é crítico para evitar que a pasta node_modules local (que pode ter binários incompatíveis com o Linux do container) seja copiada, além de evitar copiar logs, arquivos de senha locais ou pastas .git.

```
node_modules
npm-debug.log
Dockerfile
.git
.env
```

#### Manutenção do Sistema (Prune)
Com o tempo, o Docker acumula imagens antigas, containers parados e volumes órfãos, ocupando gigabytes de disco.

Limpeza de Imagens não usadas (Dangling):

``` sh
docker image prune
```

Limpeza Total (Cuidado!): Remove todos os containers parados, redes não usadas e imagens sem container associado (dangling).
``` sh
docker system prune
```
Adicione -a (docker system prune -a) para apagar qualquer imagem que não esteja sendo usada por um container ativo no momento (inclusive as que você acabou de baixar mas não rodou).


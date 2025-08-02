---
title: "System-design"
pubDate: "2025-01-31"
hero: "/images/observability.webp"
tags: ["draft", "observability", "microservices"]
---

Como desenvolver sistemas grandes e escaláveis? 
O Quanto sabe de arquitetura, qual a maturidade, repertório de carreira. 
Procurar alguns cases de exemplo para ter na manga 
40-50 min controlar o tempo 
Perguntar bem mais sobre os requisitos do problema. 
Quantos acessos diários/hora? 
Plano de capacidade, cálculos de acesso, picos, banda, gasto de disco 1-5 anos, redundâncias. 
Modelagem de banco de dados. RDBMS (antigo SGBD), documento, banco em grafo,banco em coluna, chave-valor, focado em search, como escolher.

NoSQL
Atomicity - tratar toda a operação como uma coisa só, transacional, commit e rollback
Consistency - across DB nodes
Isolation - lock de dados durante a transação para evitar condição de corrida
Durability - persistência de dados, mesmo em caso de quedas durante o processo


Modelagem da API para as principais funcionalidades, escolha de protocolo e motivos GRPC, Rest, GraphQL. 
Pesquisar tecnologias que atendam aos problemas, porém não exagerar com tecnologias que não tenha domínio. 

design patterns X clean code X alta performance
  

Mensageiria, melhores usos.
SQS / Pub-Sub / RabbitMQ
Kafka > Brokers - servidores distribuídos > Tópicos 
Flink
  
Load balancer
Nginx / Traefik
direcionamento para bancos de leitura ou escrita dependendo da necessidade
  

Observabilidade.
Data Lake
Websocket e escalabilidade

Passos

Manter anotações durante o processo do que deve ser discutido

1. Estabelecer escopo e definir requisitos principais - 5min
1. motivo
2. público
3. funcionalidades
4. requisitos não funcionais
3. propor solução de alto nível - 20min

1. top-down
2. manter o foco nas funcionalidades definidas
3. estabelecer como será a comunicação | GRPC, Rest, Websockets
4. desenhar o schema dependendo da solução escolhida
5. não entrar em detalhes antes de estabelecer o design como um todo
5. mergulhar no design - 15min
1. abrir o problema > trazer 2 soluções > discutir elas > escolher uma
7. wrap-up - 5min  

  
Bancos de dados X Microsserviços
Vários Microservice X Vários Bancos de dados
Dados ligeiramente duplicados
falta de sincronia
consistência eventual da informação

  
Vários Microservice X Um Bancos de dados
Inconsistência métodos de armazenamento no banco
escalabilidade dependente do uso do banco por outros MSs
Alto acoplamento

---
title: "Kubernetes"
pubDate: "2025-01-31"
hero: "/images/observability.webp"
tags: ["draft", "observability", "microservices"]
---

- architecture:
  - master:
    - descrição:
      - nodo master, podendo haver mais de um no cluster
      - responsável por gerenciar os nodos secundários de aplicação
      - o cérebro do cluster
      - responsável por expor as APIs e agendar as implantações
    - estruturas:
      - api-server:
        - sincroniza e valida as informações rodando nos pods e serviços
      - etcd:
        - provem um armazenamento consistente e de alta disponibilidade para os dados do cluster
        - seria como a memoria compartilhada do cérebro
      - controller-manager:
        - detecta as mudanças no etcd e usa sua api para manipular o estado
      - ha-proxy:
        - pode ser adicionado para balanceamento de carga entre os endpoints criticos do master
  - node:
    - descrição:
      - contem os serviços que são necessários para rodar os componentes, chamados de Pods
      - cada nodo expõe um conjunto de recursos como rede armazenamento e processamento para ass aplicações
      - contem ferramentas para service discovery, logs e add-ons opcionais
      - se equipara a uma vm em um ambiente de cloud
    - estruturas:
      - pod:
        - permite o agrupamento de aplicações em containers juntos 
        - atua como limite logico para os containers com contextos compartilhados
        - os pods podem ser dimensionados quanto a quantidade de containers em tempo de execução
      - kubelet:
        - agente que roda em cada cluster que se certifica que o container esta rodando no pod
      - kube-proxy:
        - gerenciador da rede interna do nodo
        - gerencia a conexão entre os nodos e os tuneis de rede necessários criados para a aplicação
      - container-runtime:
        - responsável por rodar o container que esta interno ao Kubernetes (docker, containerd, cri-o)
        


---
title: "Fundamentos de arquitetura de software"
pubDate: "2024-10-17"
hero: "/images/C4.webp"
tags: ["draft", "architecture", "fundamentals"]
---

## Tipos de arquiteto
- Técnológico
  - Expert em uma tecnologia específica
  - Grau de profundidade extremo
    - Arquiteto AWS, Elastic, Java, DB (dba), SAP
- Corporativo
  - Avalia o impacto estratégico do software organização
    - Vendors, tecnologias, custos
  - Planejamento de implatações
    - Softwares core da organização
    - Migrações
- Solução
  - Ponte entre negócios e software
  - Transcrição de requisitos e soluções
  - Desenhos arquiteturais
  - Análise de impactos comercias nas escolhas de tecnologia
  - Participa mais do processo comercial, entende da solução, podendo ajudar na venda
- Software
  - Faz parte do processo de engenharia do software
  - Mais baixo nível (próximo do código) do que o arquiteto de solução
  - Afeta a estrutura organizacional
    - Formação de times
    - [Lei de conway](/shards/conways-law)
    - "É a organização fundamental de um software e seus componentes, suas relações, seu ambiente, bem como os princípios que guiam seu design e evolução" [(IEEE Standard 1471)]()
  - Como transformar um requisito de negócio em arquitetura de aplicação
  - Orquestra desenvolvedores e experts de domínio
  - Entendimento profundo de conceitos e modelos arquiteturais
  - Auxilia nos momentos de crise
  - Reforça boas práticas (visão arquitetural de baixo nível)
  - Code reviews
  - Papel commumente exercido por tech-leads ou sêniors sem necessariamente a atribuição de cargo
  - Pode ser uma área dentro da empresa, sem necessariamente sem uma posição

## Importância de aprender arquitetura de software
- Habilidade de entender a visão macro e micro dos softwares da empresa
- Entender mais possibilidades de resolutividade de um problema
- Habilidade de pensamento ao longo prazo e sustentabilidade de um software
- Melhor entendimento de boas práticas
- Clareza no impacto do software na organização
- Mais segurança na tomada de decições

## Arquitetura VS Design

- Arquitetura - Escopo Global (alto nível)
  - Interação entre os componentes
  - Abstrações
- Design - Escopo local
  - Uso de padrões
  - Melhores prática de código

## Sustentabilidade de software

- Desenvolver software é caro
  - Times de desenvolvimento e infraestrutura
- Software resolve uma "dor"
  - Um software que não resolve problema, não faz sentido
- Software precisa se pagar ao longo do tempo
  - O valor gerado a longo prazo deve ser mais que os custos do projeto
- Precisa acompanhar a evolução do negócio
  - O software precisa comportar todas as possíveis mudanças estratégicas do negócio
- Quanto mais tempo o software fica no ar, mais retorno ele gera
  - Quanto mais sustentável ele for, mais tarde ele precisará ser reescrito
- A solução precisa ser arquitetada
  - Um software mal planejado, logo precisará ser refeito

## Pilares da arquitetura de software

- Estruturação
  - fácil evolução
  - base sólida
- Componentização para atender o negócio
- Relacionamento entre sistemas
  - protocolos
  - segurança
  - resiliência
- Governança
  - Padrões
  - Regras
  - Documentações
  - Definições claras
  - Independência de pessoas


## Requisitos arquiteturais (RAs)
### (Não funcionais)

- Performance
  - Tempo de resposta
  - Carga
- Armazenamento de dados
  - Custos de armazenamento
  - Legislações sobre armazenamento de dados (e.g LGPD)
- Escalabilidade
  - Elasticidade da estrutura
  - Comportar picos de utilização
  - Escalabilidade horizontal ou vertical
- Segurança
  - Dados sensíveis
  - Dados bancários
  - Criptografias
- Legal
  - Atender as leis locais
- Auditoria
  - retenção de dados de utilização
  - política de retenção
  - política de monitoramento dos dados de auditoria
- Marketing
  - Rastreabilidade de metadados (jornada do usuário)
  - Análise de dados do negócio para decisões estratégicas

## Características arquiteturais

Estas são características que devem ser avaliadas que são requisitos não necessariamente funcionais durante o processo de planejamento e arquitetura um software.


Veja também: Metodologia dos [Doze fatores](/shards/twelve-factors) para construção de software

### Características operacionais
- Disponibilidade
  - SLA - Service Level Agreement
    - Métrica definida com o cliente
  - SLO - Service Level Objective
    - Objetivo a ser alcançado pelo time
  - SLI - Service level Indicators
    - Indicador real de performance
  - SRE - Site Reliability Engineering
    - Soluções de engenharia para garantir a confiabilidade do software
- Recuperação de disastres
  - Planejamento de redundâncias de dados
  - Testes de redundâncias e backups
  - Plano de ação para possíveis problemas (de qualquer tipo)
- Performance
  - Escolha de ferramentas para atender as demandas de performance
  - Escalabilidade da estrutura definida
- Confiabilidade e Segurança
  - Estratégias de validação de dados e acesso ao banco de dados
  - Planos de ação para ataques (e.g. DDOS)
- Escalabilidade
  - Vertical ou horizontal para comportar a necessidade do negócio

### Características estruturais
- Configurável
  - Variáveis de ambiente
  - Agnostica ao ambiente
- Extensibilidade
  - Facilidade para mudanças de bibliotecas
  - Habilidade de fazer trocas de vendors (e.g. salesforce)
- Fácil instalação
  - Padronização de ambientes
  - Pipelines de instalação
  - Gerenciamento de configuração de ferramentas externas (e.g. kafka)
- Reuso de componentes
  - Bibliotecas internas
  - DevTools
- Internacionalização
  - layouts de tela
  - Mensagens de erro
  - Moeda/Ferramentas de cobrança
- Fácil manutenção
  - SOLID
  - Design Patterns
  - Estruturas da aplicação
  - Extensabilidade
  - Testes
- Portabilidade
  - Habilidade de trocar de provedores de banco de dados
  - Troca de provedores de serviço (e.g. AWS)
- Fácil suporte
  - Logs
  - Debbuging
  - Observabilidade

### Características cross-cutting
- Acessibilidade
  - Boas práticas para de tela
  - Padrões de design
- Políticas de retenção e recuperação de dados
  - Armazenamento de dados antigos ou menos relevantes em armazenamentos mais baratos
- Autenticação e Autorização
  - Autenticação via Identity provider ou API Gateway
  - Autenticação entre microsserviços
  - Politícas do segurança
- Legal
  - Conformidade as demandas legais locais
- Privacidade
  - Avaliação de pontos críticos de acesso e vazamento de dados
  - Políticas anti vazamento de dados
- Segurança
  - Firewall
  - Validações de requisições
  - Monitoramento de vulnerabilidades
- Usabilidade
  - Mapeamento da jornada do usuário no Frontend
  - Estruturação de APIs de forma que atendam o negócio e não somente o domínio da aplicação
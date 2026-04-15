---
title: "Versão 1"
---

# Requisitos de negócio

## Sessão
O usuário para criar uma sessão de votação precisa preencher os seguintes campos:

- **Nome:** máx 50 caracteres alfanuméricos.
- **Descrição:** máx. 150 caracteres alfanuméricos e símbolos, opcional.
- **Opções de voto:** Lista de nomes alfanuméricos máx. 50, Mínimo de 2 opções, valores únicos.
- **Tempo de votação:** Entre 1 minuto e 1 semana, em formato número de segundos desde o início da sessão.
- **Hora de início:** Data, opcional, caso não enviado utilizar a data atual.
- **Identificador único:** Cada sessão terá um ID único, valor a critério da implementação, gerado automaticamente.

## Voto
Para votar, o usuário:
- **Identificação da sessão:** Acessa a sessão usando o ID.
- **Escolha de voto:** Escolhe uma opção.

## Resultado
Ao fim da votação, o resultado será exibido:
- **Ordem decrescente de votos.**
- **Exibição em porcentagem.**
- **Total de votos.**

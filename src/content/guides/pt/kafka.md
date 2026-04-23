---
title: "Kafka"
pubDate: "2025-01-31"
hero: "/images/observability.webp"
tags: ["draft", "observability", "microservices"]
---

"Plataforma distribuída de streaming de eventos em alta performance"
- Alto throughput
- Latência baixa
- Escalável
- Armazenamento
- Alta disponibilidade
- Alta conectividade externa
- Bibliotecas prontas

### Dinâmica de utilização
![[Pasted image 20241018130850.png]]

- Cluster kafka
	- Mínimo 3 máquinas (recomendação)
	- Múltiplas máquinas (brokers)
		- Banco de dados para cara broker

![[Pasted image 20241018131447.png]]
- Tópicos
	- Canal de comunicação
	- pode ter mais de um consumer 1-*
	- Persistência de mensagens para serem lidas dentro de um período de tempo por todos os subscribers ou reprocessadas
	- Filtragem de mensagens
	- Real-time streaming
	- Melhor para casos de broadcasts
- Filas (rabbitMQ)
	- Canal de comunicação assim como os tópicos
	- somente um consumer 1-1
	- garantia de ordenamento
	- distribuição de carga (e.g. load balancer)
	- soluciona casos mais simples de um para um

- Partições
	- São subdivisões das mensagens de um tópico em mais de uma máquina de forma a distribuir a o overhead de IO, aumentar o throughput do tópico e evitar problemas de concorrência, porém trás problemas de ordenamento (solucionado via keys) dado que podem existir máquinas no cluster com capacidades de processamento diferentes
	
	- Offset
		- Headers
			- Metadados úteis da mensagem
		- key
			- chaves de agrupamento e garantia de ordenamento
			- keys iguais irão para a mesma partição, garantindo a ordem de execução
		- value
			- conteúdo
		- Timestamp
	- Replicação
		- Replication factory
			- número de cópias de backup que um brokers deve ter em outro
			- Número comum: 2 ou 3 (numero de followers)
			- ![[Pasted image 20241018134437.png]]
		- Partition leadership
			- É a partição que será lida durante o acesso ao broker
			- Em caso de indisponibilidade, uma réplica daquela partição será procurada dentro do cluster e irá se tornar líder (junto com a que já era líder antes), para garantir disponibilidade
			- ![[Pasted image 20241018134806.png]]
		- Tipos de garantia de entrega
			- None
				- Ack 0 - sem confirmação de entrega
			- Leader
				- Ack 1 - recebe a confirmação
				- leader replica a mensagem para os demais brokers (followers)
			- All
				- Ack -1 -recebe a confirmação de todas as réplicas
				- Só confirma o recebimento depois da garantia de armazenamento dos followers 

Ver também: [Queues vs Topics: Understanding the Differences in Messaging Frameworks](https://medium.com/version-1/queues-vs-topics-understanding-the-differences-in-messaging-frameworks-88861e2effa8#:~:text=Choosing%20Between%20Queues%20and%20Topics&text=Communication%20model%3A%20If%20your%20system,architecture%2C%20topics%20are%20more%20suitable)
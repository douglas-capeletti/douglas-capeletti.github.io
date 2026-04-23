---
title: "Kafka"
pubDate: "2025-01-31"
hero: "/images/observability.webp"
tags: ["draft", "observability", "microservices"]
---

"High-performance distributed event streaming platform"
- High throughput
- Low latency
- Scalable
- Storage
- High availability
- High external connectivity
- Ready-to-use libraries

### Usage dynamics
![[Pasted image 20241018130850.png]]

- Kafka cluster
	- Minimum of 3 machines (recommended)
	- Multiple machines (brokers)
		- Database for each broker

![[Pasted image 20241018131447.png]]
- Topics
	- Communication channel
	- can have more than one consumer 1-*
	- Message persistence to be read within a timeframe by all subscribers or reprocessed
	- Message filtering
	- Real-time streaming
	- Best for broadcast cases
- Queues (rabbitMQ)
	- Communication channel just like topics
	- only one consumer 1-1
	- ordering guarantee
	- load distribution (e.g. load balancer)
	- solves simpler one-to-one cases

- Partitions
	- They are subdivisions of a topic's messages across multiple machines to distribute IO overhead, increase topic throughput and avoid concurrency issues, however it brings ordering issues (solved via keys) since there can be machines in the cluster with different processing capacities
	
	- Offset
		- Headers
			- Useful message metadata
		- key
			- grouping keys and ordering guarantee
			- identical keys will go to the same partition, guaranteeing execution order
		- value
			- content
		- Timestamp
	- Replication
		- Replication factor
			- number of backup copies a broker must have on another
			- Common number: 2 or 3 (number of followers)
			- ![[Pasted image 20241018134437.png]]
		- Partition leadership
			- It is the partition that will be read when accessing the broker
			- In case of unavailability, a replica of that partition will be looked up within the cluster and will become leader (along with the one that was leader before), to ensure availability
			- ![[Pasted image 20241018134806.png]]
		- Types of delivery guarantees
			- None
				- Ack 0 - no delivery confirmation
			- Leader
				- Ack 1 - receives confirmation
				- leader replicates the message to other brokers (followers)
			- All
				- Ack -1 - receives confirmation from all replicas
				- Only confirms receipt after the followers' storage guarantee 

See also: Queues vs Topics: Understanding the Differences in Messaging Frameworks
---
title: "Kubernetes"
pubDate: "2025-01-31T00:00:00Z"
hero: "/images/wip.webp"
tags: ["draft", "observability", "microservices"]
---

- architecture:
  - master:
    - description:
      - master node, can have more than one in the cluster
      - responsible for managing secondary application nodes
      - the cluster's brain
      - responsible for exposing APIs and scheduling deployments
    - structures:
      - api-server:
        - synchronizes and validates information running in pods and services
      - etcd:
        - provides consistent, high-availability storage for cluster data
        - would be like the brain's shared memory
      - controller-manager:
        - detects changes in etcd and uses its api to manipulate state
      - ha-proxy:
        - can be added for load balancing across critical master endpoints
  - node:
    - description:
      - contains the services required to run components, called Pods
      - each node exposes a set of resources like network, storage and processing to applications
      - contains tools for service discovery, logs and optional add-ons
      - comparable to a vm in a cloud environment
    - structures:
      - pod:
        - allows grouping applications in containers together 
        - acts as a logical boundary for containers with shared contexts
        - pods can be scaled in terms of the number of containers at runtime
      - kubelet:
        - agent running on each node that makes sure the container is running in the pod
      - kube-proxy:
        - internal network manager of the node
        - manages the connection between nodes and necessary network tunnels created for the application
      - container-runtime:
        - responsible for running the container inside Kubernetes (docker, containerd, cri-o)
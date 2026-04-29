---
title: "Understanding Docker & containers"
pubDate: "2025-12-03T00:00:00Z"
hero: "/images/docker.webp"
tags: ["docker", "containers"]
---

## What we will cover here

- [What we will cover here](#what-we-will-cover-here)
  - [Understanding Containers: Concepts, Docker and Architecture](#understanding-containers-concepts-docker-and-architecture)
    - [What are Containers?](#what-are-containers)
      - [Main characteristics:](#main-characteristics)
      - [The Kernel "Magic": How does isolation work?](#the-kernel-magic-how-does-isolation-work)
      - [Namespaces](#namespaces)
      - [Cgroups (Control Groups)](#cgroups-control-groups)
      - [Overlay File Systems (OFS)](#overlay-file-systems-ofs)
    - [Docker and Runtimes](#docker-and-runtimes)
      - [Docker Architecture](#docker-architecture)
      - [Alternatives and Tools](#alternatives-and-tools)
    - [First Steps: Docker CLI](#first-steps-docker-cli)
      - [Running a simple container for testing:](#running-a-simple-container-for-testing)
      - [Exposing Ports (Network)](#exposing-ports-network)
      - [Naming and Managing](#naming-and-managing)
    - [Data Persistence: Bind Mounts and Volumes](#data-persistence-bind-mounts-and-volumes)
      - [Bind Mounts](#bind-mounts)
      - [Volumes (Managed by Docker)](#volumes-managed-by-docker)
    - [Images and Dockerfile](#images-and-dockerfile)
      - [Lifecycle](#lifecycle)
    - [Networking (Container Communication)](#networking-container-communication)
      - [Main Network Drivers](#main-network-drivers)
    - [Docker Compose (Local Orchestration)](#docker-compose-local-orchestration)
    - [Environment Variables (Configuration)](#environment-variables-configuration)
    - [Observability and Logs](#observability-and-logs)
    - [Optimization with .dockerignore](#optimization-with-dockerignore)
    - [System Maintenance (Prune)](#system-maintenance-prune)

### Understanding Containers: Concepts, Docker and Architecture

#### What are Containers?
Containers are standardized units of software that package code and all its dependencies (binaries, libraries, configuration files), ensuring consistent execution in any environment. When scaling, we ensure that identical and immutable containers behave the same way, whether on a developer's laptop or in a production server.

Unlike Virtual Machines (VMs), containers provide virtualization at the operating system level. They are lightweight and fast because they isolate processes and resources, but share the same host operating system Kernel, eliminating the need for a heavy Hypervisor or loading a full guest operating system (Guest OS) for each application.

![Docker VS VMs](/images/docker-vs-vm.webp)

##### Main characteristics:

- Lightweight: Consume fewer resources (RAM/CPU) than VMs.
- Portable: "Write once, run anywhere".
- Scalable: Can be started and stopped in seconds.
- Immutable: The container image does not change; if you need to modify it, you create a new one.
- Disposable: Containers are ephemeral; they can be destroyed and recreated without losing important data (if properly configured with volumes).

##### The Kernel "Magic": How does isolation work?
For containers to work without a Hypervisor, they utilize native Linux Kernel features. This is where the "magic" happens:

##### Namespaces
They are responsible for isolation. Each container has its own set of namespaces, which makes the process inside the container "think" it is the only one running on the machine.

- PID: Process isolation.
- NET: Network interface isolation.
- MNT: File system isolation (mount points).
- USER: User isolation (root in the container may not be root on the host).

##### Cgroups (Control Groups)
They are responsible for resource management and limitation. They ensure that a container doesn't consume all the machine's memory or CPU, bringing down its neighbors.

- Example: Limit the app-web container to memory=500mb and cpu_shares=512.

##### Overlay File Systems (OFS)
It is the layered storage mechanism (Union File System). Docker uses this for disk efficiency.

Read-Only Layers: The base image and its dependencies are read-only and shared among all containers using that image.

Read-Write Layer: When a container starts, a thin writable layer is created on top. Any modification happens there (Copy-on-Write). If you delete the container, this layer disappears, keeping the base image intact.

#### Docker and Runtimes
Docker, released by dotCloud in 2013 (later Docker Inc.), popularized the use of containers by creating a user-friendly interface for these Linux features (Namespaces/Cgroups). The project followed open standards, culminating in the OCI (Open Containers Initiative).

##### Docker Architecture
  Docker operates in a Client-Server architecture:

- Client (CLI): Where you type docker run, docker build. It sends commands to the Daemon.

- Daemon (dockerd): The centralizing process that runs on the Host. It listens to the API, manages images, networks, and builds containers.

- Attention: The Daemon can be a Single Point of Failure (SPoF). If it goes down, your containers might stop. Additionally, by default, it runs as root, which requires care regarding security (although Rootless mode already exists to mitigate this).

- Registry: The place where images are stored (e.g., Docker Hub, ECR).

![Docker Architecture](/images/docker-architecture.webp)

##### Alternatives and Tools
Due to Daemon-related issues, other runtimes like Podman emerged, which is daemonless and runs without root by default. However, the Docker ecosystem remains vast:

- Docker Desktop: GUI for easy management on Mac/Windows.
- Docker Hub: The largest public repository of images.
- Docker Scout: Vulnerability analysis for images (CVEs).
- TestContainers: Libraries for spinning up disposable containers during integration tests (Java, Go, .NET, etc).
- Tilt: Tool for rapid development in Kubernetes (acquired by Docker).

#### First Steps: Docker CLI

The main interaction happens via the command line. Below are the essential commands for a container's lifecycle.

##### Running a simple container for testing:

``` sh
docker run hello-world
```

To enter a container's terminal, we use the -i (interactive) and -t (tty/terminal) flags:
``` sh
docker run -it ubuntu bash
```

##### Exposing Ports (Network)

To access a service (like a web server) running inside the container, we need to map the container's port to the local machine (Host).

- Syntax: -p [host_port]:[container_port]

``` sh
docker run -p 8080:80 nginx
```
Now, Nginx is accessible at http://localhost:8080.

##### Naming and Managing

To avoid random names (like suspicious_cori), name your containers to make management easier:

``` sh
docker run -d -p 8080:80 --name server nginx
```
- -d: Detached mode (runs in the background, freeing up the terminal).
- --name: Sets the name "server".

To execute a command inside an already running container:
``` sh
docker exec -it server bash
```

#### Data Persistence: Bind Mounts and Volumes

By default, data created inside a container disappears when it is destroyed. To persist data, we use two main approaches.

##### Bind Mounts
Maps a specific folder/file from your machine (host) to inside the container. Ideal for development (changing local code and seeing it reflected in the container).

Create an index.html file locally:
``` html
<h1>Custom Server</h1>
```

Mount the file into Nginx:
``` sh 
docker run -d -p 8080:80 -v ~/Projects/files/:/usr/share/nginx/html --name server-custom nginx
```
Tip 1: Use $(pwd) to automatically get the current path. Tip 2: Test in an incognito tab to avoid browser cache.

Modern Syntax (--mount): The --mount flag is more verbose but recommended because it is more explicit and secure (it throws an error if the source folder doesn't exist, whereas -v creates an empty folder).

``` sh
docker run -d -p 8080:80 \
  --mount type=bind,source="$(pwd)"/files,target=/usr/share/nginx/html \
  --name server-mount nginx
```

##### Volumes (Managed by Docker)
Storage areas managed by Docker itself, independent of the host's folder structure. Ideal for databases.

Create and Inspect:

``` sh
docker volume create myVolume
```
``` sh
docker volume inspect myVolume
```
Result (summary): The Mountpoint shows where the data physically resides in Linux (/var/lib/docker/volumes/...).

Using the Volume:

``` sh
# Via -v flag
docker run -d -p 8080:80 -v myVolume:/app --name app1 nginx
```

``` sh
# Via --mount flag (Recommended)
docker run -d -p 8080:80 --mount source=myVolume,target=/app --name app2 nginx
```

Cleanup: To remove unused volumes and free up disk space:
``` sh
docker volume prune
```

#### Images and Dockerfile
The Dockerfile is the recipe for creating your own images.

Example 1: Basic (Customizing an Image)
Creating an image with Nginx and Vim installed.

Dockerfile file:
``` sh
# Base image
FROM nginx:latest

# Installing dependencies
RUN apt-get update && apt-get install -y vim
```

Build (Construction):
``` sh
docker build -t nginx-vim:latest .
```
- -t: Tag (image name).
- ".": Context (current directory where the Dockerfile is located).

Example 2: Advanced (Node.js application with Multi-stage Build)
This example applies best practices to reduce image size and increase security, separating the "build" stage from the "runner" stage.

Dockerfile file:
``` sh
# --- Stage 1: Builder (Full installation) ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# 'npm ci' is faster and safer for CI/CD
RUN npm ci

# --- Stage 2: Runner (Only what is necessary) ---
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Security: Uses 'node' user (non-root)
USER node

# Copies only the dependencies downloaded in the previous stage
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node . .

EXPOSE 3000
CMD ["node", "src/index.js"]
```

##### Lifecycle
- Dockerfile: The recipe.

- Build: Docker reads the recipe and creates an Image (made up of cached layers).

- Push/Pull: The image goes to a Registry (like a Git repository for binaries).

- Run: The image becomes a running Container (adds the writable layer).

- Stop: Sends a SIGTERM to the main process, giving it time to save states, close database connections, and shut down gracefully.

- Kill: Sends SIGKILL, killing the process immediately at the Kernel level. It does not save state and can corrupt open files.

- Commit: It is possible (though not recommended as standard practice) to generate a new image from the current state of a container.

#### Networking (Container Communication)
By default, containers are isolated. For them to talk to each other (e.g., your Node.js API accessing a PostgreSQL database), we need to use networks.

##### Main Network Drivers
- Bridge (Default): Creates an internal private network on the host. Containers on the same bridge network can communicate using the container name as a hostname (internal DNS).

- Host: The container removes network isolation and directly uses the host machine's IP and ports. High performance, but can cause port conflicts.

- None: The container spins up without a network interface (total isolation).

Creating a custom network (recommended for connecting services):
``` sh
docker network create my-network
```

Running containers on this network:
``` sh
# Database Container
docker run -d --name db-postgres --network my-network postgres
```

``` sh 
# Application Container (now able to "ping" the host 'db-postgres')
docker run -d --name app-node --network my-network my-node-image
```

#### Docker Compose (Local Orchestration)
Running multiple manual docker run commands (with networks, volumes, and ports) is unfeasible. Docker Compose solves this by allowing you to define the entire application infrastructure in a single YAML file.

Example: Node.js Application + Database
Create a `docker-compose.yml` file in the root of the project:

``` yaml
version: '3.8'

services:
  # Service 1: Our API
  api:
    build: .                # Builds the image using the local Dockerfile
    ports:
      - "3000:3000"         # Maps ports
    environment:
      - DB_HOST=db          # Passes config via environment variable
      - DB_PASS=secret
    depends_on:
      - db                  # Ensures the database starts first (but doesn't wait for it to be "ready")
    networks:
      - app-network

  # Service 2: Database
  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=secret
    volumes:
      - pgdata:/var/lib/postgresql/data # Data persistence
    networks:
      - app-network

# Volume Definition
volumes:
  pgdata:

# Network Definition
networks:
  app-network:
  driver: bridge
```

Compose Commands

``` sh
docker compose up -d: Starts all services in the background.
```

``` sh
docker compose down: Stops and removes containers and networks.
```

``` sh
docker compose logs -f: Follows the logs of all services together.
```

#### Environment Variables (Configuration)
Never place passwords or API keys directly in the code or Dockerfile (Hardcoding). Use environment variable injection.

Ways to Inject

Via -e flag:
``` sh
docker run -e NODE_ENV=production -e DB_PASS=12345 my-app
```

Via .env file (Recommended): Create a .env file with DB_PASS=12345 and use:
``` sh
docker run --env-file .env my-app
```
In Docker Compose, it reads the .env file automatically if it is in the same folder.

#### Observability and Logs
How to debug what's happening inside?

Logs: Docker captures everything the application throws to stdout (console.log) or stderr.

``` sh
docker logs -f my-container
```
- The -f flag stands for "follow", similar to Linux tail -f.

Stats: Real-time monitoring of resource consumption (CPU, Memory, I/O).
``` sh
docker stats
```
It is basically the "Task Manager" or "htop" for your containers.

#### Optimization with .dockerignore
Just as .gitignore prevents useless files from going into Git, .dockerignore prevents files from going into the image during the COPY . .. command.

This is critical to prevent the local node_modules folder (which might have binaries incompatible with the container's Linux) from being copied, as well as avoiding copying logs, local password files, or .git folders.

```
node_modules
npm-debug.log
Dockerfile
.git
.env
```

#### System Maintenance (Prune)
Over time, Docker accumulates old images, stopped containers, and orphaned volumes, taking up gigabytes of disk space.

Cleaning unused Images (Dangling):

``` sh
docker image prune
```

Total Cleanup (Careful!): Removes all stopped containers, unused networks, and images without an associated container (dangling).
``` sh
docker system prune
```
Add -a (docker system prune -a) to delete any image that is not currently being used by an active container (including those you just downloaded but haven't run).
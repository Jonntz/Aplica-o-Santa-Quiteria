FROM jenkins/jenkins:lts
USER root

# Instala o Docker CLI e o plugin oficial do Docker Compose (v2)
RUN apt-get update && \
    apt-get install -y docker.io curl && \
    mkdir -p /usr/libexec/docker/cli-plugins && \
    curl -SL https://github.com/docker/compose/releases/download/v2.26.1/docker-compose-linux-x86_64 -o /usr/libexec/docker/cli-plugins/docker-compose && \
    chmod +x /usr/libexec/docker/cli-plugins/docker-compose && \
    rm -rf /var/lib/apt/lists/*

USER jenkins
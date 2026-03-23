FROM jenkins/jenkins:lts
USER root
# Instala o Docker CLI para que o Jenkins possa conversar com o Docker Host
RUN apt-get update && \
    apt-get install -y docker.io && \
    rm -rf /var/lib/apt/lists/*
USER jenkins
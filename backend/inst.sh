#!/bin/bash

# Exibe mensagem de início
echo "Iniciando o processo de build e deploy..."

# Define o nome da imagem e o nome do container
VERSION=$(git describe --tags $(git rev-list --tags --max-count=1))
echo "Instalando versão: $VERSION"

IMAGE_NAME="casamento:$VERSION"
CONTAINER_NAME="casamento_app"

# Derruba o container usando o docker-compose
echo "Derrubando o container com o docker-compose..."
docker compose down $CONTAINER_NAME|| { echo "Erro ao iniciar o docker-compose"; exit 1; }


if docker images --format "{{.Repository}}:{{.Tag}}" | grep -q "$IMAGE_NAME"; then
  echo "Eliminando docker image $IMAGE_NAME..."
  docker rmi $IMAGE_NAME
  echo "Docker image $IMAGE_NAME removida com sucesso."
else
  echo "A imagem $IMAGE_NAME não foi encontrada, porntanto será construída."
fi

# Build da imagem Docker
echo "Construindo a imagem Docker..."
docker build -t $IMAGE_NAME .

# Sobe o container usando o docker-compose
echo "Iniciando o container com o docker-compose..."
docker compose up $CONTAINER_NAME -d || { echo "Erro ao iniciar o docker-compose"; exit 1; }
echo "Deploy finalizado. O container $CONTAINER_NAME está em execução."
#!/bin/bash

APP_NAME=top-driver

echo "Parando e removendo o container existente..."
docker stop $APP_NAME 2>/dev/null
docker rm $APP_NAME 2>/dev/null

echo "Removendo imagem antiga..."
docker rmi $APP_NAME:latest 2>/dev/null

echo "Construindo nova imagem..."
docker build -t $APP_NAME .

echo "Subindo novo container..."
docker run -d \
    --name $APP_NAME \
    -p 4001:4001 \
    --restart always \
    $APP_NAME

echo "✅ Deploy concluído!"

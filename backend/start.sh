#!/bin/bash

# Atualiza o repositório

# Muda para o diretório do projeto e executa o servidor Go em segundo plano
cd ../../tecnosoft_api/cmd &&  git pull && go run main.go &
git pull 
cd ./cmd/ && go run casamento.go &
# Muda para o diretório onde o ngrok está localizado
cd ../../../ngrok-v3-stable-windows-amd64 || { echo "Falha ao mudar de diretório"; exit 1; }

# Executa o ngrok em segundo plano
./ngrok.exe http --url=tight-lark-equal.ngrok-free.app 8070 &

# echo "ngrok foi iniciado em segundo plano."
    
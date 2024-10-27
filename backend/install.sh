#!/bin/bash
# Script para iniciar o ngrok apontando para o servidor local na porta 8080

echo "Iniciando ngrok apontando para http://localhost:8080..."

# Executa o comando ngrok
ngrok http --url=tight-lark-equal.ngrok-free.app 8087

echo "ngrok foi encerrado."

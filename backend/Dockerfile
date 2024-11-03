# Etapa 1: Build da aplicação Go usando Alpine com o Go instalado
FROM golang:1.23.0-alpine AS builder

# Instalar dependências adicionais, caso necessário
RUN apk add --no-cache git

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar arquivos de dependências (go.mod e go.sum, se existirem)
COPY go.mod go.sum ./

# Baixar as dependências do Go
RUN go mod download

# Copiar o restante do código da aplicação
COPY . .

# Mudar o diretório de trabalho para onde o arquivo main.go está
WORKDIR /app/cmd

# Compilar a aplicação Go com o novo nome de binário
RUN go build -o casamento .

# Etapa 2: Criar a imagem final mínima usando Alpine
FROM alpine:latest

# Definir o diretório de trabalho
WORKDIR /root/app/cmd/

# Copiar o binário gerado da etapa de build
COPY --from=builder /app/cmd/casamento .

# Expor a porta que sua aplicação Go vai utilizar
EXPOSE 8082

# Comando para rodar a aplicação
CMD ["./casamento"]
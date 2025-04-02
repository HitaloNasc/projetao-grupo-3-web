# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Imagem final
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app ./
EXPOSE 4001
CMD ["npm", "start"]

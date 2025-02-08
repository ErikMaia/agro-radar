# Usa uma imagem oficial do Node.js como base
FROM node:18-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia arquivos essenciais primeiro (para otimizar cache)
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# # Copia o restante do código
# COPY . .

# # Compila a aplicação Next.js
# RUN npm run build

# # -----------------------------------
# # Etapa final: Servir a aplicação
# FROM node:18-alpine

# WORKDIR /app

# # Copia apenas os arquivos necessários da etapa anterior
# COPY --from=builder /app/package.json /app/package-lock.json ./
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules

# Expõe a porta padrão do Next.js
EXPOSE 3000
# Comando para rodar o servidor Next.js
# CMD ["npm", "run", "start"]
CMD ["npm", "run", "dev"]

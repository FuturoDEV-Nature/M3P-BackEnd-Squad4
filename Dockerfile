# Usar a imagem oficial do Node.js como a imagem base
FROM node:22-alpine3.19

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos 'package.json' e 'packgage-lock.json' (ou 'yarn.lock') para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar os arquivos restantes do projeto para o diretório de trabalho
COPY . .

# Expor a porta que o servidor de desenvolvimento utiliza
EXPOSE 3000

# Comando para iniciar a aplicação usando o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
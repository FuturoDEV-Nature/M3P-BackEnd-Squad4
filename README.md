# M3P-BackEnd-Squad4

# Natureza365 🌿🌞

## Rodando o Repositório: 🏃‍♂️

### Instalação das Dependências: 🚀
Para começar, assegure-se de ter todas as dependências instaladas. Na primeira execução, siga estes passos:
1. Execute `npm install`.
2. Para ambiente local, execute também `npm install --dev`.
3. Faça uma cópia do arquivo de exemplo de variáveis de ambiente: `cp .env_example .env`.
4. Certifique-se de revisar e atualizar as variáveis de ambiente necessárias no arquivo `.env` e no arquivo `./config/config.json`.

## Trabalhando com Migrations: 🛠️

### Configurando o Banco de Dados: 🗃️
Antes de começar, crie um novo banco de dados PostgreSQL chamado 'natureza365'.

### Executando Migrations: 🔄
Para atualizar o esquema do banco de dados, você pode escolher entre duas opções:
1. Execute `sequelize db:migrate`.
2. Ou, se preferir, `npx sequelize db:migrate`.

## Trabalhando com Seeders: 🌱

### Inserindo Dados Iniciais: 🌱
Para popular o banco de dados com dados iniciais, execute:
1. `sequelize db:seed:all`.
2. Ou, alternativamente, `npx sequelize db:seed:all`.

## Executando o Repositório em Ambiente Local: 🖥️
Para iniciar o servidor localmente,
execute `npm run start:dev`.

## Documentação da API com Swagger: 📚
Explore a documentação detalhada da API usando o Swagger. Acesse [localhost:3000/docs](http://localhost:3000/docs) para visualizar endpoints, parâmetros e exemplos de uso.
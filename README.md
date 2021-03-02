# API de autenticação JWT com TypeScript e TypeORM

## 1. Instalar dependências
$ yarn

## 2. Iniciar o Servidor
$ yarn dev

------------------
## Download PostgreSQL
https://www.postgresql.org/download/

como criar migrations:
$ yarn typeorm migration:create -n <MIGRATION_NAME> //example of migration name: CreateUsersTable

Executar Migrations:
$ yarn typeorm migration:run
# API de autenticação JWT com TypeScript e TypeORM

## 1. Instalar dependências
$ yarn

## 2. Configure Database and the `ormconfig.json`
create a database in Postgres and udpate the `ormconfig.json` file if necessary

## 3. Iniciar o Servidor
$ yarn dev


## API Rotes
host: http://localhost

You can use the Insomnia or Postman to see the routes

Users;
    Create /users (POST)


------------------
## Download PostgreSQL
https://www.postgresql.org/download/

## TypeORM
como criar migrations:
$ yarn typeorm migration:create -n <MIGRATION_NAME> //example of migration name: CreateUsersTable

Executar Migrations:
$ yarn typeorm migration:run
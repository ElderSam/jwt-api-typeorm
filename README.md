# 📝 JWT Authentication API with TypeScript e TypeORM


## Initialization 🚀

## 1️⃣ Install dependencies
$ yarn

## 2️⃣ Configure Database and the `ormconfig.json`
create a database in Postgres and udpate the <code>`ormconfig.ts`</code> file if necessary

## 3️⃣ Run Migrations (Create tables)
$ yarn typeorm migration:run

## 4️⃣ Configure the Enviroment Variables;
Create a `.env` file in the root folder and set the PORT and JWT_SECRET, for example;
    PORT=3000
    JWT_SECRET=mysecret74598

## 5️⃣ Start the Server
$ yarn dev

----------------------
## Run Tests
$ yarn test

OBS: In ``package.json`` file the script for ``Windows``;
    ``"test": "SET NODE_ENV=test & jest"``

    If you are running in ``Linux/Mac``, you need to set;
    ``"test": "NODE_ENV=test jest"``

-----------------------------------------------------
## 🚚 API Rotes 
host: <code>http://localhost:3000</code>

You can use the Insomnia to see the routes.
Open Insomnia, and import the file in `/api_documentation` folder

### USERS;
*``Create: /users (POST)``*

*``Authenticate: /auth (POST)``*

*``List: /users (GET)``*


-----------------------------------------------------
# 📚 Tools and Libraries used:

**Jest**
Jest is a JavaScript testing framework
Docs: https://jestjs.io/docs/en/getting-started.html

1. Install Jest:
``$ yarn add jest -D``

2. Follow the tutorials:
Configure to Typescript & TypeORM: https://dev.to/caiulucas/tests-with-jest-and-typeorm-4j1l
OR Configure to Typescript: https://sharklabs.com.br/testes-unitarios-com-nodejs-jest-typescript/

3. create config files:
``$ npx ts-jest config:init``

--------

**body-parser**
Parses the client's request from JSON into Javascript objects

**JWT (JSON Web Token)**
Used for user authentication. Will handle the JWT operations for us
Documentation: https://jwt.io/

https://medium.com/qualyteam-engineering/jwt-refresh-token-b79440a239


**bcryptjs**
Help us to hash user passwords

**ts-node**
Automatically restarts the server when we change any file

**PostgreSQL**
Relational Database Manager
Download PostgreSQL: https://www.postgresql.org/download/
To start the server manually when has Connection Error: 
    In Windows, press win + R and open services.msc
    find postgreSQL service and click right buttom and start

**TypeORM**
To manipulate database
Documentation: https://typeorm.io/#/
https://typeorm.io/#/select-query-builder/how-to-create-and-use-a-querybuilder

    how to create migrations:
    $ yarn typeorm migration:create -n <MIGRATION_NAME> //example of migration name: CreateUsersTable

    Run Migrations:
    $ yarn typeorm migration:run

**reflect-metadata**
allow some annotations features used with TypeORM


---------------------
## Links Úteis:
😉 Emojis: https://emojipedia.org/check-mark/

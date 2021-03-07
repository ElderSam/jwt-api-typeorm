# JWT Authentication API with TypeScript e TypeORM

## 1. Install dependencies
$ yarn

## 2. Configure Database and the `ormconfig.json`
create a database in Postgres and udpate the `ormconfig.json` file if necessary

## 3. Configure the Enviroment Variables;
Create a `.env` file in the root folder and set the PORT and JWT_SECRET, for example;
    PORT=3000
    JWT_SECRET=mysecret74598

## 4. Start the Server
$ yarn dev

-----------------
## API Rotes
host: http://localhost:3000

You can use the Insomnia or Postman to see the routes

### USERS;
    Create: /users (POST)

    Authenticate: /auth (POST)

    List: /users (GET)


------------------
# Tools and Libraries used:

**body-parser**
Parses the client's request from JSON into Javascript objects

**JWT (JSON Web Token)**
Used for user authentication. Will handle the JWT operations for us
Documentation: https://jwt.io/

**bcryptjs**
Help us to hash user passwords

**ts-node-dev**
Automatically restarts the server when we change any file

**PostgreSQL**
Relational Database Manager
Download PostgreSQL: https://www.postgresql.org/download/

**TypeORM**
To manipulate database
Documentation: https://typeorm.io/#/

    how to create migrations:
    $ yarn typeorm migration:create -n <MIGRATION_NAME> //example of migration name: CreateUsersTable

    Run Migrations:
    $ yarn typeorm migration:run

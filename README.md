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

You can use the Insomnia to see the routes.
Open Insomnia, and import the file in `/api_documentation` folder

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
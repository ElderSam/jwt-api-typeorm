require("dotenv").config({
	path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

let TEST_ENV = {};

if(process.env.NODE_ENV === "test") {
   TEST_ENV = { // properties to Test Enviroment
      "dropSchema": true, // So, let the dropSchema: true because this will delete your data after the tests.
      "logging": false,
      "synchroize": true,
      "migrationsRun": true, // migrationsRun: true to automatically run migrations before the tests.
   }
}

module.exports = {
   "type": "postgres",
   "host": process.env.DB_HOST,
   "port": process.env.DB_PORT,
   "username": process.env.DB_USER,
   "password": process.env.DB_PASS,
   "database": process.env.DB_NAME,
   ...TEST_ENV,

   "entities": [
      "src/app/models/*.ts"
   ],
   "migrations": [
      "src/database/migrations/*.ts"
   ],
   "cli": {
      //"entitiesDir": 'src/app/models',
      "migrationsDir": "src/database/migrations"
   }
 }
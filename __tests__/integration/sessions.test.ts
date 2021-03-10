require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

import { UserToInsert } from "../../src/app/utils/UserInterface";
import request from 'supertest';

import connection from '../../src/database/connect';
import { fistLetterToUpper } from "../../src/app/utils/several";
const app = require('./../../src/server');

let users: Array<UserToInsert>;

users = [
    {
      name: "Samuel",
      email: "samuel@test.com",
      password: "123"
    },
    {
      name: "João",
      email: "joao@test.com",
      password: "123"
    }
]

let globalToken: string;

function updateGlobalToken(token: string) {
    globalToken = token;
}

beforeAll(async () =>{
    await connection.create();
});

afterAll(async () =>{
    await connection.close();
});
  
beforeEach(async () => {
    await connection.clear();
});


describe("User - create", () => {

    it("should allow create a new User", async() => {

        const response = await request(app)
            .post("/users") // create user route
            .send(users[0]);

        const { name } = JSON.parse(response.text)

        expect(response.status).toBe(200)
        expect(name).toBe(users[0].name)
    });

    it("should not allow create a new User with an Email that already exists", async() => {

        const response = await request(app)
            .post("/users") // create user route
            .send({
                name: 'João',
                email: users[0].email,
                password: "1235646"
            });

        //console.log(response.text)
        expect(response.status).toBe(400); //Bad request
    });

    it("should not allow create a new User with an Name that already exists", async() => {

        const response = await request(app)
            .post("/users") // create user route
            .send({
                name: users[0].name,
                email: 'teste2@gmail.com',
                password: "123"
            });

        expect(response.status).toBe(400); //Bad request
    });

    it("should List users", async() => {
        const response = await request(app)
            .get("/listUsers")
            .send();

        const { listUsers } = JSON.parse(response.text);

        expect(response.status).toBe(200)
        expect(listUsers.length).toBe(1)
    });
})

describe("User - catch invalid fields when try create", () => {
    const requiredFields = ['name', 'email', 'password'];

    let auxField: string;
    let itemExcluded;

    requiredFields.forEach(async (field, index) => {
        auxField = fistLetterToUpper(field);

        it(`should not allow create a new User without ${auxField}`, async() => {
            const auxUser: any = {
                name: 'João',
                email: 'joao@gmail.com',
                password: "123"
            };

            itemExcluded = auxUser[field];
            delete auxUser[field];

            const response = await request(app)
                .post("/users") // create user route
                .send(auxUser);
    
            expect(response.status).toBe(400); //Bad request

            const { invalidFields } = JSON.parse(response.text)
            expect(invalidFields.error).toBe(true)

            const { incorrectFields } = invalidFields;
            expect(incorrectFields.length).toBe(1)
            expect(incorrectFields[0]).toBe(field)
        });
    })

})


describe("User - Authenticate", () => {
    const { email, password } = users[0];

    it("should authenticate with valid credentials", async() => {

        const response = await request(app)
            .post("/auth")
            .send({ email, password });

        const { token } = JSON.parse(response.text)
        updateGlobalToken(token)

        expect(response.status).toBe(200);
    });

    it("should not authenticate with invalid credentials", async() => {

        const response = await request(app)
            .post("/auth")
            .send({
                email,
                password: "395"
            });

        expect(response.status).toBe(401);
    });
})

describe("Users - Update", () => {

    it("should not update withoud a Token", async() => {

        const response = await request(app)
            .put("/users")
            .send({
                email: 'UPDATED@gmail.com'
            });

        expect(response.status).toBe(401)
    });

    it("should update email", async() => {

        let response = undefined;

        var PromiseUpdate: any = async function () {
            return new Promise(async function (resolve, reject) {
                const field = 'email'
                const value = 'UPDATED@gmail.com'
        
                response = await request(app)
                    .put(`/users?${field}=${value}`)
                    .set('Authorization', `Bearer ${globalToken}`)
                    .send()

                if (response === undefined)
                    resolve(response);
                else
                    reject(response);
            });
        }

        PromiseUpdate().then(function (response: any) {
            console.log("Promise Resolved", response.text);
        }).catch(function (response: any) {
            console.error("Promise Rejected", response.text);
        });
    });
})
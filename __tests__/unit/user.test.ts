require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

import connection from '../../src/database/connect';
import User from '../../src/app/models/Users';
import { UserToInsert } from "../../src/app/utils/UserInterface";

console.log('NODE_ENV: ', process.env.NODE_ENV)

let users: Array<UserToInsert>;

beforeAll(async () =>{
  await connection.create();
});

afterAll(async () =>{
  await connection.close();
  
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
    },
  ]
});

beforeEach(async () => {
  await connection.clear();
});

describe('User', () => {

  it("should create a new User", async() => {
    const newUser = await User.insert(users[0]);
    //console.log(newUser);
    expect(newUser.email).toBe(users[0].email);
  });

  it("should not allow create a new User with an email that already exists", async() => {
    const newUser = await User.insert(users[0]);
    //console.log(newUser);
    expect(newUser.email).toBe(users[0].email);
  });

  it("should list all Users", async() => {
    const user = await User.list();
    //console.log(user)
    expect(user.length).toBe(1);  
  });

})
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

import connection from '../../src/database/connect';
import User from '../../src/app/models/Users';
import UserController from '../../src/app/controllers/UserController';
import { UserToInsert } from "../../src/app/utils/UserInterface";
import bcrypt from 'bcryptjs';


let users: Array<UserToInsert>;

beforeAll(async () =>{
  await connection.create();

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

afterAll(async () =>{
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

describe('User', () => {
  let newUser: any;
  it("should create a new User", async() => {
    newUser = await User.insert(users[0]);
    //console.log(newUser);
    expect(newUser.email).toBe(users[0].email);
  });

  it('should receive the encrypted password of the new User', async() => {
    const compareHash = await bcrypt.compare(users[1].password, newUser.password);
    expect(compareHash).toBe(true)
  });

  it("should list all Users", async() => {
    const list = await User.list();
    expect(list.length).toBe(1);  
  });

})
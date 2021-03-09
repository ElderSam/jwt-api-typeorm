import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { UserReturn } from './../utils/UserInterface';
import User from '../models/Users';
import { fistLetterToUpper } from '../utils/several';

class UserController {
    index(req: Request, res: Response) {
        return res.send({ userID: req.userId });
    }

    async listAll(req: Request, res: Response) { // list all users
        const list = await User.list();

        return res.send({ listUsers: list });
    }

    async store(req: Request, res: Response) { // create new user
        const { name, email, password } = req.body;

        const userExists = await UserController.verifyUserExists(email, name);

        if(userExists) {
            return res.status(400).send({ error: userExists }); // bad request
        }

        const newUser = await User.insert({ name, email, password });

        const auxUser: UserReturn = newUser;
        delete auxUser.password; // not to send the password to the frontend

        return res.json(auxUser);
    }

    async update(req: Request, res: Response) {

        if(JSON.stringify(req.query) === "{}") // if the Params object is empty
            return res.status(400).send({ error: 'No params received' })

        const id = req.userId;
        const auxUser = req.query;
        // console.log(auxUser)

        if(auxUser.password) {
            auxUser.password = bcrypt.hashSync((auxUser.password).toString(), 8); // encrypts the password
        }

        try{
            const updatedUser = await User.update(id, auxUser);
  
            // console.log('UPDATE: ', updatedUser);

            return res.json({ message: 'User Updated!' });

        }catch(err) {
            /*const { name, message } = err;
            console.log({ name, message })*/
            
            return res.status(400).send({ error: err.message });
        }
    }

    async delete(req: Request, res: Response) { // delete user
        const id = req.userId;

        const deleteRes = await User.delete(id)
        // console.log(deleteRes)

        return res.send({ deleted: Boolean(deleteRes.affected), id })
    }

    static async verifyUserExists(email: string, name: string) { // // implementation of the Singleton design pattern

        let message = 'There is already a user with this ';

        const tests = [
            { column: 'email', value: email },
            { column: 'name', value: name }
        ];

        for(let i=0; i<2; i++) {
            let { column, value  } = tests[i];
            let userExists = await this.searchUserByColumn(column, value);

            if(userExists) {
                return { column: message + fistLetterToUpper(column) }
                break;
            }
        }

        return false;
    }

    static async searchUserByColumn(column: string, value: string) {
        const res = await User.findbyColumnValue(column, value);

        if(res) {
            return true;
        }

        return false;
    }
}

export default new UserController();
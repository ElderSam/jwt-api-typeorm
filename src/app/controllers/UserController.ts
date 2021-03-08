import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';

import UserInterface from './../utils/UserInterface';
import User from '../models/Users';

class UserController {
    index(req: Request, res: Response) {
        return res.send({ userID: req.userId });
    }

    async listAll(req: Request, res: Response) { // list all users

        const list = await getRepository(User)
            .createQueryBuilder("users")
            .select([
                "id",
                "name",
                "email"
            ]) // without password
            .getRawMany();

        return res.send({ listUsers: list });
    }

    async store(req: Request, res: Response) { // create new user
        const repository = getRepository(User);
        const { name, email, password } = req.body;

        const userExists = await UserController.verifyUserExists(repository, email, name);

        if(userExists) {
            return res.status(400).send({ error: userExists }); // bad request
        }

        const user = repository.create({ name, email, password });
        await repository.save(user); // seve on Database

        const auxUser: UserInterface = user;
        delete auxUser.password; // not to send the password to the frontend

        return res.json(auxUser);
    }

    async update(req: Request, res: Response) {

        if(JSON.stringify(req.query) === "{}") // if the Params object is empty
            return res.status(400).send({ error: 'No params received' })

        const repository = getRepository(User);

        const id = req.userId;
        const auxUser = req.query;
        // console.log(auxUser)

        if(auxUser.password) {
            auxUser.password = bcrypt.hashSync((auxUser.password).toString(), 8); // encrypts the password
        }

        try{
            const updatedUser = await repository.createQueryBuilder("users")
            .update(User)
            .set(auxUser)
            .where("id = :id", { id })
            .execute();
  
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

        const repositoty = getRepository(User);
        const deleteRes = await repositoty.delete(id)
        // console.log(deleteRes)

        return res.send({ deleted: Boolean(deleteRes.affected), id })
    }

    static async verifyUserExists(
        repository: Repository<User>, email: string, name: string
    ) { // // implementation of the Singleton design pattern

        let message = 'There is already a user with this ';

        let userExists = await repository.createQueryBuilder("users")
            .where("LOWER(email) = LOWER(:email)", { email })
            .getOne();

        if(userExists) 
            return { message: message += 'Email' }

        userExists = await repository.createQueryBuilder("users")
            .where("LOWER(name) = LOWER(:name)", { name })
            .getOne();

        if(userExists)
            return { message: message += 'Name' }

        return false;
    }
}

export default new UserController();
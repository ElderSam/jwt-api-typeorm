import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';

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

    static async verifyUserExists(
        repository: Repository<User>, email: string, name: string
    ) { // // implementation of the Singleton design pattern

        let message = 'There is already a user with this ';

        let userExists = await repository.findOne({ where: { email } });

        if(userExists) 
            return { message: message += 'Email' }

        userExists = await repository.findOne({ where: { name } })

        if(userExists)
            return { message: message += 'Name' }

        return false;
    }
}

export default new UserController();
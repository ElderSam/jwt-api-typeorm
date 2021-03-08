import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

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
                "email"
            ]) // without password
            .getRawMany();

        return res.send({ listUsers: list });
    }

    async store(req: Request, res: Response) { // create new user
        const repository = getRepository(User);
        const { email, password } = req.body;

        const userExists = await repository.findOne({ where: { email } });
        
        if(userExists) { // implementation of the Singleton design pattern
            return res.status(400).send({ error: 'There is already a user with this email' }); // bad request
        }

        const user = repository.create({ email, password });
        await repository.save(user); // seve on Database

        const auxUser: UserInterface = user;
        delete auxUser.password; // not to send the password to the frontend

        return res.json(auxUser);
    }
}

export default new UserController();
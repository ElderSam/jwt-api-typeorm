import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/Users';

class UserController {
    index(req: Request, res: Response) {
        return res.send({ userID: req.userId });
    }

    async store(req: Request, res: Response) {
        const repository = getRepository(User);
        const { email, password } = req.body;

        const userExists = await repository.findOne({ where: { email } });
        
        if(userExists) { // implementation of the Singleton design pattern
            return res.status(400).send({ error: 'There is already a user with this email' }); // bad request
        }

        const user = repository.create({ email, password });
        await repository.save(user); // seve on Database

        return res.json(user);
    }
}

export default new UserController();
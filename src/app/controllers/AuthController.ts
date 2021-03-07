import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserInterface from './../utils/UserInterface';
import User from '../models/Users';

const SECRET = process.env.JWT_SECRET as string;

class AuthController {
    async authenticate(req: Request, res: Response) {
        const repository = getRepository(User);
        const { email, password } = req.body;

        const user = await repository.findOne({ where: { email } });

        if(!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return res.sendStatus(401);
        }

        const token = jwt.sign({ id: user.id }, SECRET, {
            expiresIn: '1d' // Token expiration time
        });
        /* the second parameter of sign() -> SECRET is sensitive data,
            so the ideal would be to get it through a dotenv
            or a local file (which does not go to github) in a real application, for security reasons.
        */

        const auxUser: UserInterface = user;
        delete auxUser.password; // not to send the password to the frontend

        return res.json({
            auxUser,
            token
        });
    }
}

export default new AuthController();
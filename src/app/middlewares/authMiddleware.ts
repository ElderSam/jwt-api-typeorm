import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET as string;

interface TokenPayload {
    id: string,
    iat: number;
    exp: number;
}

export default function authMiddleware(
    req: Request, res: Response, next: NextFunction
) {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).send({ error: 'No token provided' });
    }

    const parts = authorization.split(' ');

    if(parts.length !== 2)
        return res.status(401).send({ error: 'Token error' });

    let [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformated' });

    jwt.verify(token, SECRET, (err, decoded) => {

        if(err) return res.status(401).send({ error: 'Token invalid' });

        const { id } = decoded as TokenPayload;
        req.userId = id; // id will be used in any Controller function that is authenticated

        return next();
    });
}
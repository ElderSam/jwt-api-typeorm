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
        return res.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, SECRET);
        //console.log(data)

        const { id } = data as TokenPayload;

        req.userId = id;

        return next();

    } catch {
        return res.sendStatus(401);
    }
}
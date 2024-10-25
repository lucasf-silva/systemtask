import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const jwttoken: string = process.env.JWT_SECRET || 'secret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Invalid token format' });
        return;
    }

    try {
        const decoded = jwt.verify(token, jwttoken) as jwt.JwtPayload;
        
        req.user = decoded;
        
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
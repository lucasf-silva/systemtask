import 'dotenv/config';
import { Request, Response } from 'express';
import { userRepository } from '../repository/userRepository';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import { groupRepository } from '../repository/groupRepository';
import { In } from 'typeorm';
import jwt from 'jsonwebtoken';

const jwttoken: string = process.env.JWT_SECRET || 'secret';

export class UserController {
    async register(req: Request, res: Response): Promise<Response> {
        const { username, email, password, firstName, lastName, phone, groups } = req.body;

        if (!username || !email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'Please fill in all required fields correctly before submitting.' });
        }

        try {
            const user = await userRepository.findOne({
                where: [{ username }, { email }]
            });

            if (user) {
                return res.status(400).json({ message: 'Already registered user' });
            }

            const foundGroups = await groupRepository.find({
                where: {
                    id: In(groups),
                }
            });

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User();
            newUser.username = username;
            newUser.email = email;
            newUser.password = hashedPassword;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.phone = phone;
            newUser.createdAt = new Date();
            newUser.updatedAt = new Date();
            newUser.lastLogin = new Date();
            newUser.groups = foundGroups;

            await userRepository.save(newUser);

            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async Login(req: Request, res: Response): Promise<Response> {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Please fill in all required fields correctly before submitting.' });
        }

        try {
            const user = await userRepository.findOne({
                where: { username }
            });

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ userId: user.id, email: user.email }, jwttoken, {
                expiresIn: '6h',
            });

            return res.status(200).json({ token, user: {email: user.email, name: `${user.firstName} ${user.lastName}`} });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const saltRounds = 10;
const jwtSecret = 'your_jwt_secret'; // Ideally, store this in an environment variable

const userModel = {
    findUserByMob: async (mob) => {
        return await prisma.users.findUnique({
            where: { mob }
        });
    },

    createUser: async (userData) => {
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        return await prisma.users.create({
            data: { ...userData, password: hashedPassword }
        });
    },

    findUserById: async (id) => {
        return await prisma.users.findUnique({
            where: { id }
        });
    },

    validatePassword: async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    },

    generateToken: (user) => {
        return jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });
    },

    assignRole: async (id, role) => {
        return await prisma.users.update({
            where: { id },
            data: { role }
        });
    }
};

export default userModel;

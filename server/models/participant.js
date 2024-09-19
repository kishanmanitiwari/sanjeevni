// models/participant.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllParticipants = async (filters) => {
    return await prisma.participants.findMany({
        where: filters // Apply optional filters
    });
};

export const createParticipant = async (data) => {
    return await prisma.participants.create({
        data
    });
};

export const getParticipantById = async (id) => {
    return await prisma.participants.findUnique({
        where: { id: Number(id) }
    });
};

export const updateParticipant = async (id, data) => {
    return await prisma.participants.update({
        where: { id: Number(id) },
        data
    });
};

export const deleteParticipant = async (id) => {
    return await prisma.participants.delete({
        where: { id: Number(id) }
    });
};

export const findUserById = async (id) => {
    return await prisma.users.findUnique({
        where: { id: Number(id) }
    });
};

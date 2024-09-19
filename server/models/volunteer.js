// volunteerModel.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCourse = async ({ name, title, startDate, endDate, userId }) => {
  return await prisma.course.create({
    data: {
      name,
      title,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId, // Reference to the user creating the course
    },
  });
};

export const createSession = async ({ name, date, courseId }) => {
  try {
    return await prisma.session.create({
      data: {
        name,
        date: new Date(date), // Ensure date is a Date object
        courseId, // Ensure courseId is valid
      },
    });
  } catch (error) {
    throw new Error('Error creating session: ' + error.message);
  }
};

export const getCoursesByMentorId = async (userId) => {
  return await prisma.course.findMany({
    where: {
      userId,
    },
    include: {
      sessions: true, // Assuming you want to include related sessions
    },
  });
};

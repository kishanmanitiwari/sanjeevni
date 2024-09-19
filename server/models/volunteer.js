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
  return await prisma.session.create({
    data: {
      title: name, // Adjust according to the Session model definition
      date: new Date(date),
      courseId,
    },
  });
};

export const getCoursesByMentorId = async (userId) => {
  return await prisma.course.findMany({
    where: {
      userId,
    },
    include: {
      lectures: true, // Assuming you want to include related sessions
    },
  });
};

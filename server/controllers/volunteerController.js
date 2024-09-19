import * as volunteerModel from '../models/volunteer.js';
import Joi from 'joi';
import { login } from './authController.js';

// POST /volunteer/create-course
export const createCourse = async (req, res) => {
  const courseSchema = Joi.object({
    name: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
  });

  const { error } = courseSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, title, startDate, endDate } = req.body;
  const userId = req.user.id; // Assuming user ID is available from authentication middleware

  try {
    const newCourse = await volunteerModel.createCourse({
      name,
      title,
      startDate,
      endDate,
      userId, // Ensure this matches the Prisma schema field
    });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error });
  }
};

export const createSession = async (req, res) => {
  const sessionSchema = Joi.object({
    name: Joi.string().min(3).required(),
    date: Joi.date().iso().required(),
    courseId: Joi.number().integer().required(),
  });

  const { error } = sessionSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, date, courseId } = req.body;
  
  try {
    // Call the model function to create a session
    const newSession = await volunteerModel.createSession({ name, date, courseId });
    res.status(201).json(newSession);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Error creating session', error: error.message });
  }
};



// GET /volunteer/my-courses
export const getMyCourses = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is available from authentication middleware

  try {
    const courses = await volunteerModel.getCoursesByMentorId(userId);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving courses', error });
  }
};

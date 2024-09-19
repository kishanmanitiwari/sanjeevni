import express from 'express';
import { createCourse, createSession, getMyCourses } from '../controllers/volunteerController.js';
import authenticate from '../middlewares/authenticate.js'; // Assume you have this middleware for auth

const router = express.Router();

// POST /volunteer/create-course: Create a new course
router.post('/volunteer/create-course',authenticate, createCourse);

// POST /volunteer/create-lecture: Create a new lecture under a specific course
router.post('/volunteer/create-lecture',authenticate, createSession);

// GET /volunteer/my-courses: Get courses created by the logged-in volunteer
router.get('/volunteer/my-courses',authenticate, getMyCourses);

export default router;

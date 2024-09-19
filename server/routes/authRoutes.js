// routes/authRoutes.js
import express from 'express';
import { register, login, assignRole } from '../controllers/authController.js';
import authenticate from '../middlewares/authenticate.js'; // Assume you have this middleware for auth

const router = express.Router();

// Define routes
router.post('/register', register);
router.post('/login', login);
router.post('/assign-role', authenticate, assignRole);

export default router;
